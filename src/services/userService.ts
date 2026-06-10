interface User {
  name: string;
  email: string;
  token: string;
  notifications?: boolean;
}

interface CreateUserResponse {
  name: string;
  email: string;
  token: string;
  notifications: boolean;
}

interface UpdateTokenResponse {
  name: string;
  email: string;
  token: string;
}

const API_BASE_URL = 'https://www.abibliadigital.com.br/api';

// Lista de domínios alternativos para tentar
const EMAIL_DOMAINS = [
  'gracaeleitura.com',
  'biblia.gracaeleitura.com',
  'oracao.gracaeleitura.com',
];

export const userService = {
  createUser: async (name: string = 'Bible App User'): Promise<User | null> => {
    // Tentar múltiplas estratégias para criar usuário
    const strategies = [
      () => userService.createUserWithRandomDomain(name),
      () => userService.createUserWithTimestamp(name),
      () => userService.createUserWithGUID(name),
      () => userService.createUserWithFallback(name),
    ];

    for (const strategy of strategies) {
      try {
        const result = await strategy();
        if (result) {
          return result;
        }
      } catch (error) {
        continue;
      }
    }

    return null;
  },

  createUserWithRandomDomain: async (name: string): Promise<User | null> => {
    try {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const randomDomain =
        EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)];
      const email = `user${timestamp}${randomString}@${randomDomain}`;

      // Senha mais robusta
      const password = generateSecurePassword();

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Bible-Reader-App/1.0',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          notifications: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const data = (await response.json()) as CreateUserResponse;
      return {
        name: data.name,
        email: data.email,
        token: data.token,
      };
    } catch (error) {
      throw error;
    }
  },

  createUserWithTimestamp: async (name: string): Promise<User | null> => {
    try {
      const now = new Date();
      const timestamp = now.getTime();
      const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
      const randomId = Math.random().toString(36).substring(2, 10);

      const email = `biblia_${dateStr}_${randomId}@bibliaapp.com`;
      const password = generateSecurePassword();

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: 'https://biblia.gracaeleitura.com',
          Referer: 'https://biblia.gracaeleitura.com',
        },
        body: JSON.stringify({
          name: `${name} - ${dateStr}`,
          email,
          password,
          notifications: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as CreateUserResponse;
      return {
        name: data.name,
        email: data.email,
        token: data.token,
      };
    } catch (error) {
      throw error;
    }
  },

  createUserWithGUID: async (name: string): Promise<User | null> => {
    try {
      // Gerar um GUID simples
      const guid = 'xxxx-xxxx-xxxx'.replace(/[x]/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
      });

      const email = `user-${guid}@bible-reader.app`;
      const password = generateSecurePassword();

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${name} ${guid}`,
          email,
          password,
          notifications: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as CreateUserResponse;
      return {
        name: data.name,
        email: data.email,
        token: data.token,
      };
    } catch (error) {
      throw error;
    }
  },

  createUserWithFallback: async (name: string): Promise<User | null> => {
    try {
      // Estratégia final com padrão mais simples
      const randomId = Math.random().toString(36).substring(2, 15);
      const email = `anonymous${randomId}@tempmail.com`;
      const password = 'BibleApp2024!';

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Anonymous User',
          email,
          password,
          notifications: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as CreateUserResponse;
      return {
        name: data.name,
        email: data.email,
        token: data.token,
      };
    } catch (error) {
      throw error;
    }
  },

  getUser: async (email: string, token: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user');
      }

      return (await response.json()) as User;
    } catch (error) {
      return null;
    }
  },

  updateToken: async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/token`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to update token');
      }

      const data = (await response.json()) as UpdateTokenResponse;
      return {
        name: data.name,
        email: data.email,
        token: data.token,
      };
    } catch (error) {
      return null;
    }
  },

  getUserStats: async (token: string): Promise<any | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user stats');
      }

      return await response.json();
    } catch (error) {
      return null;
    }
  },
};

// Função para gerar senha segura
function generateSecurePassword(): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export type { User };
