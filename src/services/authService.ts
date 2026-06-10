import {
  checkRateLimit,
  validateEmail,
  validatePassword,
  sanitizeInput,
} from '@/utils/security';

export interface User {
  id: string;
  email?: string;
  isAnonymous: boolean;
  username?: string;
}

class AuthService {
  private currentUser: User | null = null;
  private readonly STORAGE_KEY = 'biblia_auth_user';

  constructor() {
    this.initializeUser();
  }

  private initializeUser() {
    // Load user from localStorage
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
      } catch (error) {
        localStorage.removeItem(this.STORAGE_KEY);
        this.currentUser = null;
      }
    }
  }

  private saveUser(user: User | null) {
    if (user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.currentUser = user;
  }

  getCurrentUser(): User | null {
    // Se não há usuário autenticado, retorna null
    if (!this.currentUser || this.currentUser.isAnonymous) {
      return null;
    }
    return this.currentUser;
  }

  getCurrentUserId(): string {
    if (!this.currentUser) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    return this.currentUser.id;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && !this.currentUser.isAnonymous;
  }

  async signInAnonymously(): Promise<User> {
    const anonymousId =
      'anon_' +
      Math.random().toString(36).substring(2) +
      Date.now().toString(36);
    
    const user: User = {
      id: anonymousId,
      isAnonymous: true,
    };
    
    this.saveUser(user);
    return user;
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    // Rate limiting
    if (!checkRateLimit('login', 5, 900000)) {
      throw new Error(
        'Muitas tentativas de login. Tente novamente em 15 minutos.'
      );
    }

    // Validação de entrada
    const sanitizedEmail = sanitizeInput(email, 254);
    if (!validateEmail(sanitizedEmail)) {
      throw new Error('Email inválido.');
    }

    if (!password || password.length < 6 || password.length > 128) {
      throw new Error('Senha inválida.');
    }

    // Get stored users
    const usersData = localStorage.getItem('biblia_users');
    const users: Record<string, { password: string; username?: string }> = usersData
      ? JSON.parse(usersData)
      : {};

    const userData = users[sanitizedEmail];
    if (!userData || userData.password !== password) {
      throw new Error('Email ou senha incorretos.');
    }

    const user: User = {
      id: sanitizedEmail,
      email: sanitizedEmail,
      isAnonymous: false,
      username: userData.username,
    };

    this.saveUser(user);
    return user;
  }

  async signUpWithEmail(
    email: string,
    password: string,
    username?: string
  ): Promise<User> {
    // Rate limiting
    if (!checkRateLimit('register', 3, 3600000)) {
      throw new Error(
        'Muitas tentativas de registro. Tente novamente em 1 hora.'
      );
    }

    try {
      // Validação de entrada
      const sanitizedEmail = sanitizeInput(email, 254);
      if (!validateEmail(sanitizedEmail)) {
        throw new Error('Email inválido.');
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.errors.join('. '));
      }

      const sanitizedUsername = username ? sanitizeInput(username, 20) : '';

      // Get stored users
      const usersData = localStorage.getItem('biblia_users');
      const users: Record<string, { password: string; username?: string }> = usersData
        ? JSON.parse(usersData)
        : {};

      // Check if user already exists
      if (users[sanitizedEmail]) {
        throw new Error('Este email já está cadastrado.');
      }

      // Store new user
      users[sanitizedEmail] = {
        password,
        username: sanitizedUsername,
      };
      localStorage.setItem('biblia_users', JSON.stringify(users));

      const user: User = {
        id: sanitizedEmail,
        email: sanitizedEmail,
        isAnonymous: false,
        username: sanitizedUsername,
      };

      this.saveUser(user);
      return user;
    } catch (error) {
      console.error('Erro no processo de signUp:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    this.saveUser(null);
    // Clear all stored user data from localStorage
    this.clearAllLocalStorage();
  }

  private clearAllLocalStorage(): void {
    // Lista de chaves específicas da aplicação para limpar
    const keysToRemove = [
      'anonymous_user_id',
      'biblia_api_user',
      'memorization_cache',
      'notes_cache',
      'spiritual_tracking_cache',
      'quiz_cache',
      'user_preferences',
      'reading_progress',
      'theme_preference',
      'bible-quiz-streak',
      'bible-quiz-xp',
      'bible-quiz-daily-hints',
      'bible-quiz-score',
      'bible-quiz-history',
    ];

    // Remove chaves específicas
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });

    // Também remove qualquer chave que comece com prefixos da aplicação
    const prefixes = [
      'biblia_',
      'graca_',
      'user_',
      'auth_',
      'app_',
    ];
    Object.keys(localStorage).forEach((key) => {
      if (prefixes.some((prefix) => key.startsWith(prefix))) {
        localStorage.removeItem(key);
      }
    });
  }

  // Reset password - send reset email
  async resetPassword(email: string): Promise<void> {
    // Rate limiting
    if (!checkRateLimit('reset_password', 3, 3600000)) {
      throw new Error(
        'Muitas tentativas de redefinição de senha. Tente novamente em 1 hora.'
      );
    }

    // Validação de entrada
    const sanitizedEmail = sanitizeInput(email, 254);
    if (!validateEmail(sanitizedEmail)) {
      throw new Error('Email inválido.');
    }

    // Get stored users
    const usersData = localStorage.getItem('biblia_users');
    const users: Record<string, { password: string; username?: string }> = usersData
      ? JSON.parse(usersData)
      : {};

    if (!users[sanitizedEmail]) {
      // Don't reveal if email exists or not for security
      console.log('Password reset requested for:', sanitizedEmail);
    }

    // In a real implementation, this would send an email
    // For now, we'll just log it
    console.log('Password reset email would be sent to:', sanitizedEmail);
  }

  // Update password with new password
  async updatePassword(newPassword: string): Promise<void> {
    if (!this.currentUser || !this.currentUser.email) {
      throw new Error('Usuário não autenticado.');
    }

    // Validação de senha
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join('. '));
    }

    // Get stored users
    const usersData = localStorage.getItem('biblia_users');
    const users: Record<string, { password: string; username?: string }> = usersData
      ? JSON.parse(usersData)
      : {};

    if (users[this.currentUser.email]) {
      users[this.currentUser.email].password = newPassword;
      localStorage.setItem('biblia_users', JSON.stringify(users));
    }
  }
}

export const authService = new AuthService();
