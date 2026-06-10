import { getVersionFullName } from '@/utils/bibleVersionsMap';
import { bibliaApiService, BibleVersion } from './bibliaApiService';
import { authService } from './authService';

export interface QuizUserData {
  id: string;
  user_id: string;
  current_streak: number;
  total_xp: number;
  daily_hints_available: number;
  daily_hints_date: string;
  bonus_hints: number;
  best_score: number;
  total_questions_answered: number;
  correct_answers: number;
  created_at: string;
  updated_at: string;
}

export interface QuizScoreHistory {
  id: string;
  user_id: string;
  score: number;
  questions_answered: number;
  correct_answers: number;
  streak_at_time: number;
  created_at: string;
}

interface QuizQuestion {
  verse: string;
  reference: string;
  options: string[];
  correctAnswer: string;
  version: string;
}

const generateRandomOptions = (correctAnswer: string): string[] => {
  // Lista de referências bíblicas comuns para gerar opções falsas
  const commonReferences = [
    'João 3:16',
    'Salmos 23:1',
    'Romanos 8:28',
    'Filipenses 4:13',
    'Isaías 40:31',
    '1 Coríntios 13:4',
    'Provérbios 3:5',
    'Mateus 6:33',
    'Hebreus 11:1',
    'Gálatas 5:22',
    'Efésios 2:8',
    'Tiago 1:17',
    'Apocalipse 3:20',
    'Marcos 16:15',
    'Lucas 6:31',
    'Atos 1:8',
    'Romanos 3:23',
    'João 14:6',
    'Mateus 28:19',
    'Salmos 119:105',
  ];

  // Filtrar para não incluir a resposta correta
  const availableOptions = commonReferences.filter(
    (ref) => ref !== correctAnswer
  );

  // Embaralhar e pegar 3 opções falsas
  const shuffled = availableOptions.sort(() => Math.random() - 0.5);
  const wrongOptions = shuffled.slice(0, 3);

  // Adicionar a resposta correta e embaralhar tudo
  const allOptions = [...wrongOptions, correctAnswer];
  return allOptions.sort(() => Math.random() - 0.5);
};

export const quizService = {
  // Inicializar dados do usuário
  initializeUserData: async (): Promise<QuizUserData> => {
    try {
      const userId = authService.getCurrentUserId();
      const key = `biblia_quiz_user_data_${userId}`;
      const existingData = localStorage.getItem(key);

      if (existingData) {
        return JSON.parse(existingData);
      }

      // Criar dados iniciais para o usuário
      const newData: QuizUserData = {
        id: Date.now().toString(),
        user_id: userId,
        current_streak: 0,
        total_xp: 0,
        daily_hints_available: 2,
        daily_hints_date: new Date().toISOString().split('T')[0],
        bonus_hints: 0,
        best_score: 0,
        total_questions_answered: 0,
        correct_answers: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      localStorage.setItem(key, JSON.stringify(newData));
      return newData;
    } catch (error) {
      throw error;
    }
  },

  // Obter dados do usuário
  getUserData: async (): Promise<QuizUserData> => {
    try {
      const userId = authService.getCurrentUserId();
      const key = `biblia_quiz_user_data_${userId}`;
      const data = localStorage.getItem(key);

      if (!data) {
        return await quizService.initializeUserData();
      }

      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  },

  getVersions: async (): Promise<BibleVersion[]> => {
    try {
      return await bibliaApiService.getVersions();
    } catch (error) {
      return [];
    }
  },

  getRandomVerse: async (
    selectedVersion?: string
  ): Promise<QuizQuestion | null> => {
    try {
      // Se não foi especificada uma versão, usar 'nvi' como padrão
      const versionToUse = selectedVersion || 'nvi';

      // Buscar versículo aleatório usando o bibliaApiService
      const data = await bibliaApiService.getRandomVerse(versionToUse);

      // Construir referência
      const reference = `${data.book.name} ${data.chapter}:${data.number}`;
      const options = generateRandomOptions(reference);

      // Obter nome da versão em português
      const versionName = getVersionFullName(versionToUse);

      return {
        verse: data.text,
        reference: reference,
        options,
        correctAnswer: reference,
        version: versionName,
      };
    } catch (error) {
      return null;
    }
  },

  // Sistema de dicas
  getDailyHints: async (): Promise<{
    available: number;
    lastReset: string;
  }> => {
    try {
      const userData = await quizService.getUserData();
      const today = new Date().toISOString().split('T')[0];

      // Verificar se é um novo dia
      if (userData.daily_hints_date !== today) {
        // Reset para novo dia
        userData.daily_hints_available = 2;
        userData.daily_hints_date = today;
        userData.updated_at = new Date().toISOString();

        const userId = authService.getCurrentUserId();
        const key = `biblia_quiz_user_data_${userId}`;
        localStorage.setItem(key, JSON.stringify(userData));

        return {
          available: userData.daily_hints_available,
          lastReset: today,
        };
      }

      return {
        available: userData.daily_hints_available + userData.bonus_hints,
        lastReset: userData.daily_hints_date,
      };
    } catch (error) {
      return {
        available: 2,
        lastReset: new Date().toISOString().split('T')[0],
      };
    }
  },

  useDailyHint: async (): Promise<boolean> => {
    try {
      const userData = await quizService.getUserData();
      const totalHints = userData.daily_hints_available + userData.bonus_hints;

      if (totalHints <= 0) {
        return false;
      }

      // Usar primeiro das dicas bônus, depois das diárias
      if (userData.bonus_hints > 0) {
        userData.bonus_hints = userData.bonus_hints - 1;
      } else {
        userData.daily_hints_available = userData.daily_hints_available - 1;
      }

      userData.updated_at = new Date().toISOString();

      const userId = authService.getCurrentUserId();
      const key = `biblia_quiz_user_data_${userId}`;
      localStorage.setItem(key, JSON.stringify(userData));

      return true;
    } catch (error) {
      return false;
    }
  },

  addBonusHints: async (amount: number): Promise<void> => {
    try {
      const userData = await quizService.getUserData();
      userData.bonus_hints = userData.bonus_hints + amount;
      userData.updated_at = new Date().toISOString();

      const userId = authService.getCurrentUserId();
      const key = `biblia_quiz_user_data_${userId}`;
      localStorage.setItem(key, JSON.stringify(userData));
    } catch (error) {}
  },

  // Atualizar dados do usuário após resposta
  updateUserStats: async (
    isCorrect: boolean,
    newStreak: number,
    newXp: number
  ): Promise<void> => {
    try {
      const userData = await quizService.getUserData();

      userData.current_streak = newStreak;
      userData.total_xp = newXp;
      userData.total_questions_answered = userData.total_questions_answered + 1;
      userData.correct_answers = userData.correct_answers + (isCorrect ? 1 : 0);
      userData.best_score = Math.max(userData.best_score, newXp);
      userData.updated_at = new Date().toISOString();

      const userId = authService.getCurrentUserId();
      const key = `biblia_quiz_user_data_${userId}`;
      localStorage.setItem(key, JSON.stringify(userData));
    } catch (error) {}
  },

  saveScore: async (
    score: number,
    questionsAnswered: number = 1,
    correctAnswers: number = 0,
    streakAtTime: number = 0
  ): Promise<boolean> => {
    try {
      const userId = authService.getCurrentUserId();
      const key = `biblia_quiz_score_history_${userId}`;
      const existingData = localStorage.getItem(key);
      const history: QuizScoreHistory[] = existingData ? JSON.parse(existingData) : [];

      const newScore: QuizScoreHistory = {
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        user_id: userId,
        score,
        questions_answered: questionsAnswered,
        correct_answers: correctAnswers,
        streak_at_time: streakAtTime,
        created_at: new Date().toISOString(),
      };

      history.push(newScore);
      localStorage.setItem(key, JSON.stringify(history));

      return true;
    } catch (error) {
      return false;
    }
  },

  getScoreHistory: async (): Promise<QuizScoreHistory[]> => {
    try {
      const userId = authService.getCurrentUserId();
      const key = `biblia_quiz_score_history_${userId}`;
      const data = localStorage.getItem(key);

      if (!data) return [];

      const history: QuizScoreHistory[] = JSON.parse(data);
      return history
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 50);
    } catch (error) {
      return [];
    }
  },

  getBestScore: async (): Promise<number> => {
    try {
      const userData = await quizService.getUserData();
      return userData.best_score;
    } catch (error) {
      return 0;
    }
  },

  // Resetar dados do quiz para valores padrão (mantendo dados salvos)
  resetQuizSession: async (): Promise<void> => {
    try {
      const userData = await quizService.getUserData();

      userData.current_streak = 0;
      userData.daily_hints_available = 2;
      userData.daily_hints_date = new Date().toISOString().split('T')[0];
      userData.bonus_hints = 0;
      userData.updated_at = new Date().toISOString();

      const userId = authService.getCurrentUserId();
      const key = `biblia_quiz_user_data_${userId}`;
      localStorage.setItem(key, JSON.stringify(userData));
    } catch (error) {}
  },
};

export type { QuizQuestion };
