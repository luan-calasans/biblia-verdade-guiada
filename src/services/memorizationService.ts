import { authService } from './authService';

// Serviço para gerenciar memorização de versículos com repetição espaçada
export interface MemorizationVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  reference: string;
  dateAdded: Date;
  lastReviewed: Date | null;
  nextReview: Date;
  interval: number; // dias
  repetitions: number;
  easeFactor: number; // fator de facilidade (1.3 - 2.5)
  quality: number; // última qualidade da resposta (0-5)
  streak: number; // sequência de acertos
  totalReviews: number;
  correctReviews: number;
  tags: string[];
}

export interface ReviewSession {
  id: string;
  date: Date;
  versesReviewed: number;
  correctAnswers: number;
  averageQuality: number;
  timeSpent: number; // em minutos
}

export interface MemorizationStats {
  totalVerses: number;
  dueToday: number;
  masteredVerses: number; // versículos com interval > 30 dias
  averageEaseFactor: number;
  streakDays: number;
  totalReviews: number;
  accuracy: number;
  weeklyProgress: number[];
}

class MemorizationService {
  private readonly VERSES_KEY = 'biblia_memorization_verses';
  private readonly SESSIONS_KEY = 'biblia_memorization_sessions';

  private getStorageKey(userId: string, type: 'verses' | 'sessions'): string {
    return type === 'verses' 
      ? `${this.VERSES_KEY}_${userId}` 
      : `${this.SESSIONS_KEY}_${userId}`;
  }

  private loadVerses(userId: string): MemorizationVerse[] {
    const key = this.getStorageKey(userId, 'verses');
    const data = localStorage.getItem(key);
    if (!data) return [];
    
    try {
      const verses = JSON.parse(data);
      // Convert date strings back to Date objects
      return verses.map((v: any) => ({
        ...v,
        dateAdded: new Date(v.dateAdded),
        lastReviewed: v.lastReviewed ? new Date(v.lastReviewed) : null,
        nextReview: new Date(v.nextReview),
      }));
    } catch (error) {
      console.error('Error loading verses:', error);
      return [];
    }
  }

  private saveVerses(userId: string, verses: MemorizationVerse[]): void {
    const key = this.getStorageKey(userId, 'verses');
    localStorage.setItem(key, JSON.stringify(verses));
  }

  private loadSessions(userId: string): ReviewSession[] {
    const key = this.getStorageKey(userId, 'sessions');
    const data = localStorage.getItem(key);
    if (!data) return [];
    
    try {
      const sessions = JSON.parse(data);
      // Convert date strings back to Date objects
      return sessions.map((s: any) => ({
        ...s,
        date: new Date(s.date),
      }));
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  }

  private saveSessions(userId: string, sessions: ReviewSession[]): void {
    const key = this.getStorageKey(userId, 'sessions');
    localStorage.setItem(key, JSON.stringify(sessions));
  }

  // Algoritmo de repetição espaçada baseado no SuperMemo 2
  calculateNextReview(
    quality: number,
    repetitions: number,
    easeFactor: number,
    interval: number
  ): { nextInterval: number; newEaseFactor: number } {
    let newEaseFactor = easeFactor;
    let nextInterval = interval;

    if (quality >= 3) {
      // Resposta correta
      if (repetitions === 0) {
        nextInterval = 1;
      } else if (repetitions === 1) {
        nextInterval = 6;
      } else {
        nextInterval = Math.round(interval * easeFactor);
      }

      newEaseFactor = Math.max(
        1.3,
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
      );
    } else {
      // Resposta incorreta - reinicia o processo
      nextInterval = 1;
      repetitions = 0;
    }

    return { nextInterval, newEaseFactor };
  }

  async addVerse(
    book: string,
    chapter: number,
    verse: number,
    text: string
  ): Promise<string> {
    const userId = authService.getCurrentUserId();
    const id = `${book}-${chapter}-${verse}`;
    const reference = `${book} ${chapter}:${verse}`;

    const verses = this.loadVerses(userId);

    // Verifica se o versículo já existe
    const existingVerse = verses.find(v => v.id === id);
    if (existingVerse) {
      throw new Error('Este versículo já foi adicionado para memorização');
    }

    const now = new Date();
    const newVerse: MemorizationVerse = {
      id,
      book,
      chapter,
      verse,
      text,
      reference,
      dateAdded: now,
      lastReviewed: null,
      nextReview: now, // Disponível imediatamente
      interval: 0,
      repetitions: 0,
      easeFactor: 2.5,
      quality: 0,
      streak: 0,
      totalReviews: 0,
      correctReviews: 0,
      tags: [],
    };

    verses.push(newVerse);
    this.saveVerses(userId, verses);

    return id;
  }

  async getAllVerses(): Promise<MemorizationVerse[]> {
    const userId = authService.getCurrentUserId();
    const verses = this.loadVerses(userId);
    return verses.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
  }

  async getDueVerses(): Promise<MemorizationVerse[]> {
    const userId = authService.getCurrentUserId();
    const verses = this.loadVerses(userId);
    const now = new Date();

    return verses
      .filter(v => v.nextReview <= now)
      .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime());
  }

  async getVerseById(id: string): Promise<MemorizationVerse | null> {
    const userId = authService.getCurrentUserId();
    const verses = this.loadVerses(userId);
    return verses.find(v => v.id === id) || null;
  }

  async reviewVerse(id: string, quality: number): Promise<void> {
    const userId = authService.getCurrentUserId();
    const verses = this.loadVerses(userId);
    const verseIndex = verses.findIndex(v => v.id === id);

    if (verseIndex === -1) {
      throw new Error('Versículo não encontrado');
    }

    const currentVerse = verses[verseIndex];
    const { nextInterval, newEaseFactor } = this.calculateNextReview(
      quality,
      currentVerse.repetitions,
      currentVerse.easeFactor,
      currentVerse.interval
    );

    const now = new Date();
    const nextReview = new Date(
      now.getTime() + nextInterval * 24 * 60 * 60 * 1000
    );

    verses[verseIndex] = {
      ...currentVerse,
      lastReviewed: now,
      nextReview: nextReview,
      interval: nextInterval,
      easeFactor: newEaseFactor,
      quality: quality,
      totalReviews: currentVerse.totalReviews + 1,
      repetitions: quality >= 3 ? currentVerse.repetitions + 1 : 0,
      correctReviews: quality >= 3 ? currentVerse.correctReviews + 1 : currentVerse.correctReviews,
      streak: quality >= 3 ? currentVerse.streak + 1 : 0,
    };

    this.saveVerses(userId, verses);
  }

  async removeVerse(id: string): Promise<void> {
    const userId = authService.getCurrentUserId();
    const verses = this.loadVerses(userId);
    const filteredVerses = verses.filter(v => v.id !== id);
    this.saveVerses(userId, filteredVerses);
  }

  async addTagToVerse(id: string, tag: string): Promise<void> {
    const userId = authService.getCurrentUserId();
    const verses = this.loadVerses(userId);
    const verseIndex = verses.findIndex(v => v.id === id);

    if (verseIndex === -1) {
      throw new Error('Versículo não encontrado');
    }

    const verse = verses[verseIndex];
    if (!verse.tags.includes(tag)) {
      verse.tags.push(tag);
      this.saveVerses(userId, verses);
    }
  }

  async removeTagFromVerse(id: string, tag: string): Promise<void> {
    const userId = authService.getCurrentUserId();
    const verses = this.loadVerses(userId);
    const verseIndex = verses.findIndex(v => v.id === id);

    if (verseIndex === -1) {
      throw new Error('Versículo não encontrado');
    }

    const verse = verses[verseIndex];
    verse.tags = verse.tags.filter(t => t !== tag);
    this.saveVerses(userId, verses);
  }

  async getVersesByTag(tag: string): Promise<MemorizationVerse[]> {
    const userId = authService.getCurrentUserId();
    const verses = this.loadVerses(userId);
    return verses.filter(v => v.tags.includes(tag));
  }

  async getAllTags(): Promise<string[]> {
    const verses = await this.getAllVerses();
    const allTags = verses.flatMap((v) => v.tags);
    return [...new Set(allTags)].sort();
  }

  async saveReviewSession(session: Omit<ReviewSession, 'id'>): Promise<void> {
    const userId = authService.getCurrentUserId();
    const sessions = this.loadSessions(userId);

    const newSession: ReviewSession = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      ...session,
    };

    sessions.push(newSession);
    this.saveSessions(userId, sessions);
  }

  async getAllSessions(): Promise<ReviewSession[]> {
    const userId = authService.getCurrentUserId();
    const sessions = this.loadSessions(userId);
    return sessions.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async getStats(): Promise<MemorizationStats> {
    const verses = await this.getAllVerses();
    const sessions = await this.getAllSessions();
    const now = new Date();

    const totalVerses = verses.length;
    const dueToday = verses.filter((v) => v.nextReview <= now).length;
    const masteredVerses = verses.filter((v) => v.interval > 30).length;
    const averageEaseFactor =
      verses.length > 0
        ? verses.reduce((sum, v) => sum + v.easeFactor, 0) / verses.length
        : 0;

    const totalReviews = verses.reduce((sum, v) => sum + v.totalReviews, 0);
    const correctReviews = verses.reduce((sum, v) => sum + v.correctReviews, 0);
    const accuracy =
      totalReviews > 0 ? (correctReviews / totalReviews) * 100 : 0;

    // Calcula streak de dias consecutivos
    const streakDays = this.calculateStreakDays(sessions);

    // Progresso semanal (últimos 7 dias)
    const weeklyProgress = this.getWeeklyProgress(sessions);

    return {
      totalVerses,
      dueToday,
      masteredVerses,
      averageEaseFactor,
      streakDays,
      totalReviews,
      accuracy,
      weeklyProgress,
    };
  }

  private calculateStreakDays(sessions: ReviewSession[]): number {
    if (sessions.length === 0) return 0;

    const today = new Date();
    const sortedSessions = sessions.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    let streak = 0;
    let currentDate = new Date(today);
    currentDate.setHours(0, 0, 0, 0);

    for (const session of sortedSessions) {
      const sessionDate = new Date(session.date);
      sessionDate.setHours(0, 0, 0, 0);

      if (sessionDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (sessionDate.getTime() < currentDate.getTime()) {
        break;
      }
    }

    return streak;
  }

  private getWeeklyProgress(sessions: ReviewSession[]): number[] {
    const today = new Date();
    const weeklyProgress: number[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayProgress = sessions
        .filter((s) => s.date >= date && s.date < nextDate)
        .reduce((sum, s) => sum + s.versesReviewed, 0);

      weeklyProgress.push(dayProgress);
    }

    return weeklyProgress;
  }

  // Utilitários para backup e restauração
  async exportData(): Promise<string> {
    const verses = await this.getAllVerses();
    const sessions = await this.getAllSessions();

    const data = {
      verses,
      sessions,
      exportDate: new Date(),
    };

    return JSON.stringify(data, null, 2);
  }

  async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      const userId = authService.getCurrentUserId();

      if (data.verses && Array.isArray(data.verses)) {
        const verses: MemorizationVerse[] = data.verses.map((v: any) => ({
          ...v,
          dateAdded: new Date(v.dateAdded),
          lastReviewed: v.lastReviewed ? new Date(v.lastReviewed) : null,
          nextReview: new Date(v.nextReview),
        }));
        this.saveVerses(userId, verses);
      }

      if (data.sessions && Array.isArray(data.sessions)) {
        const sessions: ReviewSession[] = data.sessions.map((s: any) => ({
          ...s,
          date: new Date(s.date),
        }));
        this.saveSessions(userId, sessions);
      }
    } catch (error) {
      throw new Error('Formato de dados inválido');
    }
  }

  async clearAllData(): Promise<void> {
    const userId = authService.getCurrentUserId();
    this.saveVerses(userId, []);
    this.saveSessions(userId, []);
  }
}

export const memorizationService = new MemorizationService();
