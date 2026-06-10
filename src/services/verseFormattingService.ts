// No authentication needed - formatting available for everyone

export interface VerseFormatting {
  id?: string;
  user_id?: string;
  book: string;
  chapter: number;
  verse: number;
  bible_version: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  background_color: string;
  text_color: string;
  created_at?: string;
  updated_at?: string;
}

export interface VerseFormattingInput {
  book: string;
  chapter: number;
  verse: number;
  bible_version: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  background_color?: string;
  text_color?: string;
}

class VerseFormattingService {
  private readonly STORAGE_KEY = 'biblia_verse_formatting';
  private readonly DEFAULT_USER_ID = 'default_user'; // Everyone uses the same storage

  private getStorageKey(): string {
    return `${this.STORAGE_KEY}_${this.DEFAULT_USER_ID}`;
  }

  private loadFormattings(): VerseFormatting[] {
    const key = this.getStorageKey();
    const data = localStorage.getItem(key);
    if (!data) return [];
    
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading verse formattings:', error);
      return [];
    }
  }

  private saveFormattings(formattings: VerseFormatting[]): void {
    const key = this.getStorageKey();
    localStorage.setItem(key, JSON.stringify(formattings));
  }

  private findFormattingIndex(
    formattings: VerseFormatting[],
    book: string,
    chapter: number,
    verse: number,
    bibleVersion: string
  ): number {
    return formattings.findIndex(
      f =>
        f.book === book &&
        f.chapter === chapter &&
        f.verse === verse &&
        f.bible_version === bibleVersion
    );
  }

  // Salvar ou atualizar formatação de um versículo
  async saveVerseFormatting(
    formatting: VerseFormattingInput
  ): Promise<VerseFormatting> {
    const formattings = this.loadFormattings();

    const formattingData: VerseFormatting = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      user_id: this.DEFAULT_USER_ID,
      book: formatting.book,
      chapter: formatting.chapter,
      verse: formatting.verse,
      bible_version: formatting.bible_version,
      bold: formatting.bold ?? false,
      italic: formatting.italic ?? false,
      underline: formatting.underline ?? false,
      background_color: formatting.background_color ?? 'transparent',
      text_color: formatting.text_color ?? 'inherit',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Check if formatting already exists
    const existingIndex = this.findFormattingIndex(
      formattings,
      formatting.book,
      formatting.chapter,
      formatting.verse,
      formatting.bible_version
    );

    if (existingIndex !== -1) {
      // Update existing
      formattingData.id = formattings[existingIndex].id;
      formattingData.created_at = formattings[existingIndex].created_at;
      formattings[existingIndex] = formattingData;
    } else {
      // Add new
      formattings.push(formattingData);
    }

    this.saveFormattings(formattings);
    return formattingData;
  }

  // Salvar formatação para múltiplos versículos
  async saveMultipleVerseFormatting(
    book: string,
    chapter: number,
    verses: number[],
    bibleVersion: string,
    formatting: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      background_color?: string;
      text_color?: string;
    }
  ): Promise<VerseFormatting[]> {
    const formattings = this.loadFormattings();
    const results: VerseFormatting[] = [];

    for (const verse of verses) {
      const formattingData: VerseFormatting = {
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        user_id: this.DEFAULT_USER_ID,
        book,
        chapter,
        verse,
        bible_version: bibleVersion,
        bold: formatting.bold ?? false,
        italic: formatting.italic ?? false,
        underline: formatting.underline ?? false,
        background_color: formatting.background_color ?? 'transparent',
        text_color: formatting.text_color ?? 'inherit',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Check if formatting already exists
      const existingIndex = this.findFormattingIndex(
        formattings,
        book,
        chapter,
        verse,
        bibleVersion
      );

      if (existingIndex !== -1) {
        // Update existing
        formattingData.id = formattings[existingIndex].id;
        formattingData.created_at = formattings[existingIndex].created_at;
        formattings[existingIndex] = formattingData;
      } else {
        // Add new
        formattings.push(formattingData);
      }

      results.push(formattingData);
    }

    this.saveFormattings(formattings);
    return results;
  }

  // Buscar formatações de um capítulo
  async getChapterFormatting(
    book: string,
    chapter: number,
    bibleVersion: string
  ): Promise<VerseFormatting[]> {
    const formattings = this.loadFormattings();

    return formattings.filter(
      f =>
        f.book === book &&
        f.chapter === chapter &&
        f.bible_version === bibleVersion
    );
  }

  // Buscar formatação de um versículo específico
  async getVerseFormatting(
    book: string,
    chapter: number,
    verse: number,
    bibleVersion: string
  ): Promise<VerseFormatting | null> {
    const formattings = this.loadFormattings();

    const formatting = formattings.find(
      f =>
        f.book === book &&
        f.chapter === chapter &&
        f.verse === verse &&
        f.bible_version === bibleVersion
    );

    return formatting || null;
  }

  // Remover formatação de um versículo
  async removeVerseFormatting(
    book: string,
    chapter: number,
    verse: number,
    bibleVersion: string
  ): Promise<boolean> {
    const formattings = this.loadFormattings();

    const filtered = formattings.filter(
      f =>
        !(
          f.book === book &&
          f.chapter === chapter &&
          f.verse === verse &&
          f.bible_version === bibleVersion
        )
    );

    this.saveFormattings(filtered);
    return true;
  }

  // Remover formatação de múltiplos versículos
  async removeMultipleVerseFormatting(
    book: string,
    chapter: number,
    verses: number[],
    bibleVersion: string
  ): Promise<boolean> {
    const formattings = this.loadFormattings();

    const filtered = formattings.filter(
      f =>
        !(
          f.book === book &&
          f.chapter === chapter &&
          verses.includes(f.verse) &&
          f.bible_version === bibleVersion
        )
    );

    this.saveFormattings(filtered);
    return true;
  }

  // Limpar apenas cores de versículos
  async clearVerseColors(
    book: string,
    chapter: number,
    verses: number[],
    bibleVersion: string
  ): Promise<VerseFormatting[]> {
    const formattings = this.loadFormattings();
    const results: VerseFormatting[] = [];

    for (let i = 0; i < formattings.length; i++) {
      const f = formattings[i];
      if (
        f.book === book &&
        f.chapter === chapter &&
        verses.includes(f.verse) &&
        f.bible_version === bibleVersion
      ) {
        formattings[i] = {
          ...f,
          background_color: 'transparent',
          text_color: 'inherit',
          updated_at: new Date().toISOString(),
        };
        results.push(formattings[i]);
      }
    }

    this.saveFormattings(formattings);
    return results;
  }
}

export const verseFormattingService = new VerseFormattingService();
