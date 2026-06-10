import { authService } from './authService';

export interface SalvationRecord {
  id: string;
  user_id: string;
  person_name: string;
  date: string;
  location?: string;
  notes?: string;
  created_at: string;
}

export interface BaptismRecord {
  id: string;
  user_id: string;
  person_name: string;
  date: string;
  location?: string;
  pastor_name?: string;
  notes?: string;
  created_at: string;
}

export interface ReadingSession {
  id: string;
  user_id: string;
  date: string;
  book: string;
  chapters_read: string[];
  duration_minutes?: number;
  notes?: string;
  created_at: string;
}

export interface DailyPlanCheck {
  id: string;
  user_id: string;
  date: string;
  plan_type: 'reading' | 'memorization' | 'prayer' | 'worship' | 'study';
  completed: boolean;
  notes?: string;
  created_at: string;
}

export interface SpiritualGoal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  type:
    | 'reading'
    | 'memorization'
    | 'salvation'
    | 'baptism'
    | 'prayer'
    | 'custom';
  target: number;
  current_progress: number;
  deadline: string;
  completed: boolean;
  created_at: string;
}

export interface SpiritualStats {
  salvations: number;
  baptisms: number;
  reading_sessions: number;
  daily_checks: number;
  current_streak: number;
  longest_streak: number;
}

class SpiritualTrackingService {
  private readonly SALVATIONS_KEY = 'biblia_salvation_records';
  private readonly BAPTISMS_KEY = 'biblia_baptism_records';
  private readonly READING_SESSIONS_KEY = 'biblia_reading_sessions';
  private readonly DAILY_CHECKS_KEY = 'biblia_daily_plan_checks';
  private readonly GOALS_KEY = 'biblia_spiritual_goals';

  private getStorageKey(userId: string, type: string): string {
    return `${type}_${userId}`;
  }

  private loadData<T>(userId: string, key: string): T[] {
    const storageKey = this.getStorageKey(userId, key);
    const data = localStorage.getItem(storageKey);
    if (!data) return [];
    
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      return [];
    }
  }

  private saveData<T>(userId: string, key: string, data: T[]): void {
    const storageKey = this.getStorageKey(userId, key);
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  // Função para verificar se as tabelas existem
  async checkDatabaseTables(): Promise<{
    exists: boolean;
    missingTables: string[];
  }> {
    // LocalStorage always exists
    return {
      exists: true,
      missingTables: [],
    };
  }

  async addSalvation(
    salvation: Omit<SalvationRecord, 'id' | 'user_id' | 'created_at'>
  ): Promise<SalvationRecord> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    const userId = authService.getCurrentUserId();

    const newSalvation: SalvationRecord = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      user_id: userId,
      ...salvation,
      created_at: new Date().toISOString(),
    };

    const salvations = this.loadData<SalvationRecord>(userId, this.SALVATIONS_KEY);
    salvations.push(newSalvation);
    this.saveData(userId, this.SALVATIONS_KEY, salvations);

    return newSalvation;
  }

  async getSalvations(): Promise<SalvationRecord[]> {
    if (!authService.isAuthenticated()) {
      return [];
    }
    const userId = authService.getCurrentUserId();
    const salvations = this.loadData<SalvationRecord>(userId, this.SALVATIONS_KEY);
    return salvations.sort((a, b) => b.date.localeCompare(a.date));
  }

  async deleteSalvation(id: string): Promise<void> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    const userId = authService.getCurrentUserId();

    const salvations = this.loadData<SalvationRecord>(userId, this.SALVATIONS_KEY);
    const filtered = salvations.filter(s => s.id !== id);
    this.saveData(userId, this.SALVATIONS_KEY, filtered);
  }

  async addBaptism(
    baptism: Omit<BaptismRecord, 'id' | 'user_id' | 'created_at'>
  ): Promise<BaptismRecord> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    const userId = authService.getCurrentUserId();

    const newBaptism: BaptismRecord = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      user_id: userId,
      ...baptism,
      created_at: new Date().toISOString(),
    };

    const baptisms = this.loadData<BaptismRecord>(userId, this.BAPTISMS_KEY);
    baptisms.push(newBaptism);
    this.saveData(userId, this.BAPTISMS_KEY, baptisms);

    return newBaptism;
  }

  async getBaptisms(): Promise<BaptismRecord[]> {
    if (!authService.isAuthenticated()) {
      return [];
    }
    const userId = authService.getCurrentUserId();
    const baptisms = this.loadData<BaptismRecord>(userId, this.BAPTISMS_KEY);
    return baptisms.sort((a, b) => b.date.localeCompare(a.date));
  }

  async deleteBaptism(id: string): Promise<void> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    const userId = authService.getCurrentUserId();

    const baptisms = this.loadData<BaptismRecord>(userId, this.BAPTISMS_KEY);
    const filtered = baptisms.filter(b => b.id !== id);
    this.saveData(userId, this.BAPTISMS_KEY, filtered);
  }

  async addReadingSession(
    session: Omit<ReadingSession, 'id' | 'user_id' | 'created_at'>
  ): Promise<ReadingSession> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    const userId = authService.getCurrentUserId();

    const newSession: ReadingSession = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      user_id: userId,
      ...session,
      created_at: new Date().toISOString(),
    };

    const sessions = this.loadData<ReadingSession>(userId, this.READING_SESSIONS_KEY);
    sessions.push(newSession);
    this.saveData(userId, this.READING_SESSIONS_KEY, sessions);

    return newSession;
  }

  async getReadingSessions(limit?: number): Promise<ReadingSession[]> {
    if (!authService.isAuthenticated()) {
      return [];
    }
    const userId = authService.getCurrentUserId();
    const sessions = this.loadData<ReadingSession>(userId, this.READING_SESSIONS_KEY);
    const sorted = sessions.sort((a, b) => b.date.localeCompare(a.date));
    
    return limit ? sorted.slice(0, limit) : sorted;
  }

  async deleteReadingSession(id: string): Promise<void> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    const userId = authService.getCurrentUserId();

    const sessions = this.loadData<ReadingSession>(userId, this.READING_SESSIONS_KEY);
    const filtered = sessions.filter(s => s.id !== id);
    this.saveData(userId, this.READING_SESSIONS_KEY, filtered);
  }

  async addDailyPlanCheck(
    check: Omit<DailyPlanCheck, 'id' | 'user_id' | 'created_at'>
  ): Promise<DailyPlanCheck> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    const userId = authService.getCurrentUserId();

    const checks = this.loadData<DailyPlanCheck>(userId, this.DAILY_CHECKS_KEY);

    // Check if already exists for today
    const existing = checks.find(
      c => c.date === check.date && c.plan_type === check.plan_type
    );

    if (existing) {
      // Update existing
      existing.completed = check.completed;
      existing.notes = check.notes;
      this.saveData(userId, this.DAILY_CHECKS_KEY, checks);
      return existing;
    } else {
      // Create new
      const newCheck: DailyPlanCheck = {
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        user_id: userId,
        ...check,
        created_at: new Date().toISOString(),
      };

      checks.push(newCheck);
      this.saveData(userId, this.DAILY_CHECKS_KEY, checks);
      return newCheck;
    }
  }

  async getDailyPlanChecks(date?: string): Promise<DailyPlanCheck[]> {
    if (!authService.isAuthenticated()) {
      return [];
    }
    const userId = authService.getCurrentUserId();
    const checks = this.loadData<DailyPlanCheck>(userId, this.DAILY_CHECKS_KEY);

    const filtered = date ? checks.filter(c => c.date === date) : checks;
    return filtered.sort((a, b) => b.date.localeCompare(a.date));
  }

  async getStats(): Promise<SpiritualStats> {
    if (!authService.isAuthenticated()) {
      return {
        salvations: 0,
        baptisms: 0,
        reading_sessions: 0,
        daily_checks: 0,
        current_streak: 0,
        longest_streak: 0,
      };
    }
    const userId = authService.getCurrentUserId();

    const salvations = this.loadData<SalvationRecord>(userId, this.SALVATIONS_KEY);
    const baptisms = this.loadData<BaptismRecord>(userId, this.BAPTISMS_KEY);
    const sessions = this.loadData<ReadingSession>(userId, this.READING_SESSIONS_KEY);
    const checks = this.loadData<DailyPlanCheck>(userId, this.DAILY_CHECKS_KEY);

    const { current_streak, longest_streak } = await this.calculateReadingStreaks();

    return {
      salvations: salvations.length,
      baptisms: baptisms.length,
      reading_sessions: sessions.length,
      daily_checks: checks.filter(c => c.completed).length,
      current_streak,
      longest_streak,
    };
  }

  private async calculateReadingStreaks(): Promise<{
    current_streak: number;
    longest_streak: number;
  }> {
    if (!authService.isAuthenticated()) {
      return { current_streak: 0, longest_streak: 0 };
    }
    const userId = authService.getCurrentUserId();

    const sessions = this.loadData<ReadingSession>(userId, this.READING_SESSIONS_KEY);

    if (sessions.length === 0) {
      return { current_streak: 0, longest_streak: 0 };
    }

    // Get unique dates
    const uniqueDates = [...new Set(sessions.map((s) => s.date))]
      .sort()
      .reverse();

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = new Date().toISOString().split('T')[0];
    let expectedDate = new Date(today);

    // Calculate current streak
    for (const dateStr of uniqueDates) {
      const sessionDate = new Date(dateStr);
      const expectedDateStr = expectedDate.toISOString().split('T')[0];

      if (dateStr === expectedDateStr) {
        currentStreak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Calculate longest streak
    for (let i = 0; i < uniqueDates.length; i++) {
      tempStreak = 1;

      for (let j = i + 1; j < uniqueDates.length; j++) {
        const currentDate = new Date(uniqueDates[j - 1]);
        const nextDate = new Date(uniqueDates[j]);
        const dayDiff = Math.abs(
          (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (dayDiff === 1) {
          tempStreak++;
        } else {
          break;
        }
      }

      longestStreak = Math.max(longestStreak, tempStreak);
    }

    return { current_streak: currentStreak, longest_streak: longestStreak };
  }

  async getReadingCalendar(
    year: number,
    month: number
  ): Promise<{ [date: string]: number }> {
    if (!authService.isAuthenticated()) {
      return {};
    }
    const userId = authService.getCurrentUserId();

    const startDate = new Date(year, month, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];

    const sessions = this.loadData<ReadingSession>(userId, this.READING_SESSIONS_KEY);
    const filtered = sessions.filter(s => s.date >= startDate && s.date <= endDate);

    const calendar: { [date: string]: number } = {};
    filtered.forEach((session) => {
      calendar[session.date] = (calendar[session.date] || 0) + 1;
    });

    return calendar;
  }

  // =====================================================
  // METAS ESPIRITUAIS
  // =====================================================

  async addSpiritualGoal(
    goal: Omit<
      SpiritualGoal,
      'id' | 'user_id' | 'created_at' | 'current_progress' | 'completed'
    >
  ): Promise<SpiritualGoal> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    const userId = authService.getCurrentUserId();

    const newGoal: SpiritualGoal = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      user_id: userId,
      current_progress: 0,
      completed: false,
      ...goal,
      created_at: new Date().toISOString(),
    };

    const goals = this.loadData<SpiritualGoal>(userId, this.GOALS_KEY);
    goals.push(newGoal);
    this.saveData(userId, this.GOALS_KEY, goals);

    return newGoal;
  }

  async getSpiritualGoals(): Promise<SpiritualGoal[]> {
    if (!authService.isAuthenticated()) {
      return [];
    }
    const userId = authService.getCurrentUserId();
    const goals = this.loadData<SpiritualGoal>(userId, this.GOALS_KEY);
    return goals.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  async updateSpiritualGoal(
    id: string,
    updates: Partial<Omit<SpiritualGoal, 'id' | 'user_id' | 'created_at'>>
  ): Promise<SpiritualGoal> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    const userId = authService.getCurrentUserId();

    const goals = this.loadData<SpiritualGoal>(userId, this.GOALS_KEY);
    const goalIndex = goals.findIndex(g => g.id === id);

    if (goalIndex === -1) {
      throw new Error('Meta não encontrada.');
    }

    goals[goalIndex] = {
      ...goals[goalIndex],
      ...updates,
    };

    this.saveData(userId, this.GOALS_KEY, goals);
    return goals[goalIndex];
  }

  async deleteSpiritualGoal(id: string): Promise<void> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    const userId = authService.getCurrentUserId();

    const goals = this.loadData<SpiritualGoal>(userId, this.GOALS_KEY);
    const filtered = goals.filter(g => g.id !== id);
    this.saveData(userId, this.GOALS_KEY, filtered);
  }

  async updateGoalProgress(
    id: string,
    newProgress: number
  ): Promise<SpiritualGoal> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }
    const userId = authService.getCurrentUserId();

    const goals = this.loadData<SpiritualGoal>(userId, this.GOALS_KEY);
    const goalIndex = goals.findIndex(g => g.id === id);

    if (goalIndex === -1) {
      throw new Error('Meta não encontrada.');
    }

    const goal = goals[goalIndex];
    const completed = newProgress >= goal.target;

    goals[goalIndex] = {
      ...goal,
      current_progress: newProgress,
      completed: completed,
    };

    this.saveData(userId, this.GOALS_KEY, goals);
    return goals[goalIndex];
  }
}

export const spiritualTrackingService = new SpiritualTrackingService();
