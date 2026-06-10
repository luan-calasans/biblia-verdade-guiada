import { authService } from './authService';

export interface TextFormat {
  style: 'title' | 'heading' | 'subheading' | 'body' | 'monostyle';
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  color: string;
  highlightColor?: string;
  fontSize?: number;
  listType?: 'none' | 'numbered' | 'bulleted';
}

export interface Attachment {
  id: string;
  type: 'image' | 'link';
  url: string;
  name: string;
  size?: number;
  uploadedAt: string;
}

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  text_format: Record<string, TextFormat>;
  attachments: Attachment[];
  drawing_data?: string;
  tags: string[];
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateNoteRequest {
  title?: string;
  content?: string;
  text_format?: Record<string, TextFormat>;
  attachments?: Attachment[];
  drawing_data?: string;
  tags?: string[];
  is_pinned?: boolean;
}

export interface UpdateNoteRequest extends Partial<CreateNoteRequest> {
  id: string;
}

class NotesService {
  private readonly STORAGE_KEY = 'biblia_notes';

  private getStorageKey(userId: string): string {
    return `${this.STORAGE_KEY}_${userId}`;
  }

  private loadNotes(userId: string): Note[] {
    const key = this.getStorageKey(userId);
    const data = localStorage.getItem(key);
    if (!data) return [];
    
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading notes:', error);
      return [];
    }
  }

  private saveNotes(userId: string, notes: Note[]): void {
    const key = this.getStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(notes));
  }

  async checkDatabaseSetup(): Promise<{ exists: boolean; error?: string }> {
    // LocalStorage always exists
    return { exists: true };
  }

  async createNote(noteData: CreateNoteRequest): Promise<Note> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado. Faça login para continuar.');
    }

    const userId = authService.getCurrentUserId();
    const notes = this.loadNotes(userId);

    const newNote: Note = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      user_id: userId,
      title: noteData.title || 'Nova Nota',
      content: noteData.content || '',
      text_format: noteData.text_format || {},
      attachments: noteData.attachments || [],
      drawing_data: noteData.drawing_data || undefined,
      tags: noteData.tags || [],
      is_pinned: noteData.is_pinned || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    notes.push(newNote);
    this.saveNotes(userId, notes);

    return newNote;
  }

  async getNotes(): Promise<Note[]> {
    if (!authService.isAuthenticated()) {
      return [];
    }

    const userId = authService.getCurrentUserId();
    const notes = this.loadNotes(userId);

    // Sort by pinned first, then by updated_at
    return notes.sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }

  async getNote(id: string): Promise<Note | null> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado.');
    }

    const userId = authService.getCurrentUserId();
    const notes = this.loadNotes(userId);
    
    return notes.find(note => note.id === id) || null;
  }

  async updateNote(noteData: UpdateNoteRequest): Promise<Note> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado.');
    }

    const userId = authService.getCurrentUserId();
    const notes = this.loadNotes(userId);
    const noteIndex = notes.findIndex(note => note.id === noteData.id);

    if (noteIndex === -1) {
      throw new Error('Nota não encontrada.');
    }

    const updatedNote: Note = {
      ...notes[noteIndex],
      ...(noteData.title !== undefined && { title: noteData.title }),
      ...(noteData.content !== undefined && { content: noteData.content }),
      ...(noteData.text_format !== undefined && { text_format: noteData.text_format }),
      ...(noteData.attachments !== undefined && { attachments: noteData.attachments }),
      ...(noteData.drawing_data !== undefined && { drawing_data: noteData.drawing_data }),
      ...(noteData.tags !== undefined && { tags: noteData.tags }),
      ...(noteData.is_pinned !== undefined && { is_pinned: noteData.is_pinned }),
      updated_at: new Date().toISOString(),
    };

    notes[noteIndex] = updatedNote;
    this.saveNotes(userId, notes);

    return updatedNote;
  }

  async deleteNote(id: string): Promise<void> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado.');
    }

    const userId = authService.getCurrentUserId();
    const notes = this.loadNotes(userId);
    const filteredNotes = notes.filter(note => note.id !== id);
    
    this.saveNotes(userId, filteredNotes);
  }

  async togglePinNote(id: string): Promise<Note> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado.');
    }

    const note = await this.getNote(id);
    if (!note) {
      throw new Error('Nota não encontrada.');
    }

    return this.updateNote({
      id,
      is_pinned: !note.is_pinned,
    });
  }

  async searchNotes(query: string): Promise<Note[]> {
    if (!authService.isAuthenticated()) {
      return [];
    }

    const userId = authService.getCurrentUserId();
    const notes = this.loadNotes(userId);
    const lowerQuery = query.toLowerCase();

    const filteredNotes = notes.filter(note => 
      note.title.toLowerCase().includes(lowerQuery) ||
      note.content.toLowerCase().includes(lowerQuery)
    );

    // Sort by pinned first, then by updated_at
    return filteredNotes.sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }

  async getNotesByTag(tag: string): Promise<Note[]> {
    if (!authService.isAuthenticated()) {
      return [];
    }

    const userId = authService.getCurrentUserId();
    const notes = this.loadNotes(userId);

    const filteredNotes = notes.filter(note => note.tags.includes(tag));

    // Sort by pinned first, then by updated_at
    return filteredNotes.sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }

  async getAllTags(): Promise<string[]> {
    if (!authService.isAuthenticated()) {
      return [];
    }

    const userId = authService.getCurrentUserId();
    const notes = this.loadNotes(userId);

    const allTags = new Set<string>();
    notes.forEach(note => {
      note.tags.forEach(tag => allTags.add(tag));
    });

    return Array.from(allTags).sort();
  }

  // Utility methods for text formatting
  getDefaultTextFormat(): TextFormat {
    return {
      style: 'body',
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      color: '#000000',
      listType: 'none',
    };
  }

  applyTextFormat(
    content: string,
    format: TextFormat,
    startIndex: number,
    endIndex: number
  ): string {
    // This will be implemented in the component level for better performance
    // Here we just return the content as is
    return content;
  }

  async uploadAttachment(file: File): Promise<Attachment> {
    if (!authService.isAuthenticated()) {
      throw new Error('Usuário não autenticado.');
    }

    // Convert file to base64 for localStorage
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const attachment: Attachment = {
          id: Date.now().toString(),
          type: file.type.startsWith('image/') ? 'image' : 'link',
          url: reader.result as string,
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
        resolve(attachment);
      };
      reader.onerror = () => {
        reject(new Error('Falha ao fazer upload do arquivo. Tente novamente.'));
      };
      reader.readAsDataURL(file);
    });
  }
}

export const notesService = new NotesService();
