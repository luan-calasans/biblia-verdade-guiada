import { userService, User } from './userService';
import { toast } from 'sonner';

interface BibleBook {
  abbrev: { pt: string; en: string };
  author: string;
  chapters: number;
  group: string;
  name: string;
  testament: string;
}

interface BibleVerse {
  number: number;
  text: string;
}

interface BibleChapter {
  book: {
    abbrev: { pt: string; en: string };
    name: string;
    author: string;
    group: string;
    version: string;
  };
  chapter: {
    number: number;
    verses: number;
  };
  verses: BibleVerse[];
}

interface BibleVersion {
  version: string;
  verses: number;
}

// Mapeamento dos nomes dos livros em português para abreviações
const BOOK_ABBREVIATIONS: Record<string, string> = {
  // Antigo Testamento
  Gênesis: 'gn',
  Êxodo: 'ex',
  Levítico: 'lv',
  Números: 'nm',
  Deuteronômio: 'dt',
  Josué: 'js',
  Juízes: 'jz',
  Rute: 'rt',
  '1 Samuel': '1sm',
  '2 Samuel': '2sm',
  '1 Reis': '1rs',
  '2 Reis': '2rs',
  '1 Crônicas': '1cr',
  '2 Crônicas': '2cr',
  Esdras: 'ed',
  Neemias: 'ne',
  Ester: 'et',
  Jó: 'jó',
  Salmos: 'sl',
  Provérbios: 'pv',
  Eclesiastes: 'ec',
  Cantares: 'ct',
  Isaías: 'is',
  Jeremias: 'jr',
  Lamentações: 'lm',
  Ezequiel: 'ez',
  Daniel: 'dn',
  Oséias: 'os',
  Joel: 'jl',
  Amós: 'am',
  Obadias: 'ob',
  Jonas: 'jn',
  Miquéias: 'mq',
  Naum: 'na',
  Habacuque: 'hc',
  Sofonias: 'sf',
  Ageu: 'ag',
  Zacarias: 'zc',
  Malaquias: 'ml',

  // Novo Testamento
  Mateus: 'mt',
  Marcos: 'mc',
  Lucas: 'lc',
  João: 'jo',
  Atos: 'at',
  Romanos: 'rm',
  '1 Coríntios': '1co',
  '2 Coríntios': '2co',
  Gálatas: 'gl',
  Efésios: 'ef',
  Filipenses: 'fp',
  Colossenses: 'cl',
  '1 Tessalonicenses': '1ts',
  '2 Tessalonicenses': '2ts',
  '1 Timóteo': '1tm',
  '2 Timóteo': '2tm',
  Tito: 'tt',
  Filemom: 'fm',
  Hebreus: 'hb',
  Tiago: 'tg',
  '1 Pedro': '1pe',
  '2 Pedro': '2pe',
  '1 João': '1jo',
  '2 João': '2jo',
  '3 João': '3jo',
  Judas: 'jd',
  Apocalipse: 'ap',
};

const API_BASE_URL = 'https://www.abibliadigital.com.br/api';

class BibliaApiService {
  private user: User | null = null;
  private initializePromise: Promise<void> | null = null;
  private retryCount = 0;
  private maxRetries = 3;

  // Inicializar ou obter usuário existente
  private async initialize(): Promise<void> {
    if (this.user) return;

    // Verificar se existe usuário no localStorage
    const savedUser = localStorage.getItem('biblia_api_user');
    if (savedUser) {
      try {
        this.user = JSON.parse(savedUser);
        // Verificar se o token ainda é válido fazendo uma requisição teste
        await this.testToken();
        return;
      } catch (error) {
        localStorage.removeItem('biblia_api_user');
        this.user = null;
      }
    }

    // Criar novo usuário com retry
    await this.createUserWithRetry();
  }

  // Criar usuário com tentativas automáticas
  private async createUserWithRetry(): Promise<void> {
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        const newUser = await userService.createUser('Bible Reader User');
        if (newUser) {
          this.user = newUser;
          localStorage.setItem('biblia_api_user', JSON.stringify(newUser));
          return;
        }
      } catch (error) {
        if (i < this.maxRetries - 1) {
          // Aguardar um pouco antes da próxima tentativa
          await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }

    // Se todas as tentativas falharam, lançar erro
    throw new Error('Não foi possível criar usuário para a API');
  }

  // Testar se o token é válido
  private async testToken(): Promise<void> {
    if (!this.user) {
      throw new Error('Usuário não está disponível');
    }

    const response = await fetch(`${API_BASE_URL}/versions`, {
      headers: {
        Authorization: `Bearer ${this.user.token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Token inválido');
    }
  }

  // Garantir que o serviço está inicializado
  private async ensureInitialized(): Promise<void> {
    if (!this.initializePromise) {
      this.initializePromise = this.initialize();
    }
    await this.initializePromise;
  }

  // Fazer requisição autenticada
  private async makeRequest(endpoint: string): Promise<any> {
    await this.ensureInitialized();

    if (!this.user) {
      throw new Error('Usuário não está disponível');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.user.token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      // Se o token expirou, tentar renovar
      if (response.status === 401) {
        await this.handleTokenExpired();
        // Tentar novamente após renovar
        return this.makeRequest(endpoint);
      }
      throw new Error(
        `Erro na API: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }

  // Lidar com token expirado
  private async handleTokenExpired(): Promise<void> {
    this.user = null;
    this.initializePromise = null;
    localStorage.removeItem('biblia_api_user');
    await this.initialize();
  }

  // Obter todos os livros
  async getBooks(): Promise<BibleBook[]> {
    try {
      return await this.makeRequest('/books');
    } catch (error) {
      throw error;
    }
  }

  // Obter detalhes de um livro
  async getBook(bookName: string): Promise<BibleBook> {
    try {
      const abbrev = BOOK_ABBREVIATIONS[bookName];
      if (!abbrev) {
        throw new Error(`Abreviação não encontrada para o livro: ${bookName}`);
      }
      return await this.makeRequest(`/books/${abbrev}`);
    } catch (error) {
      throw error;
    }
  }

  // Obter capítulo completo
  async getChapter(
    version: string,
    bookName: string,
    chapter: number
  ): Promise<BibleChapter> {
    try {
      const abbrev = BOOK_ABBREVIATIONS[bookName];
      if (!abbrev) {
        throw new Error(`Abreviação não encontrada para o livro: ${bookName}`);
      }

      return await this.makeRequest(`/verses/${version}/${abbrev}/${chapter}`);
    } catch (error) {
      throw error;
    }
  }

  // Obter versículo específico
  async getVerse(
    version: string,
    bookName: string,
    chapter: number,
    verse: number
  ): Promise<any> {
    try {
      const abbrev = BOOK_ABBREVIATIONS[bookName];
      if (!abbrev) {
        throw new Error(`Abreviação não encontrada para o livro: ${bookName}`);
      }

      return await this.makeRequest(
        `/verses/${version}/${abbrev}/${chapter}/${verse}`
      );
    } catch (error) {
      throw error;
    }
  }

  // Obter versículo aleatório
  async getRandomVerse(version: string): Promise<any> {
    try {
      return await this.makeRequest(`/verses/${version}/random`);
    } catch (error) {
      throw error;
    }
  }

  // Obter versículo aleatório de um livro específico
  async getRandomVerseFromBook(
    version: string,
    bookName: string
  ): Promise<any> {
    try {
      const abbrev = BOOK_ABBREVIATIONS[bookName];
      if (!abbrev) {
        throw new Error(`Abreviação não encontrada para o livro: ${bookName}`);
      }

      return await this.makeRequest(`/verses/${version}/${abbrev}/random`);
    } catch (error) {
      throw error;
    }
  }

  // Pesquisar versículos por palavra
  async searchVerses(version: string, searchTerm: string): Promise<any> {
    try {
      await this.ensureInitialized();

      if (!this.user) {
        throw new Error('Usuário não está autenticado');
      }

      const response = await fetch(`${API_BASE_URL}/verses/search`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version,
          search: searchTerm,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Erro na pesquisa: ${response.status} - ${response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  // Obter versões disponíveis
  async getVersions(): Promise<BibleVersion[]> {
    try {
      return await this.makeRequest('/versions');
    } catch (error) {
      throw error;
    }
  }

  // Limpar dados do usuário (logout)
  clearUser(): void {
    this.user = null;
    this.initializePromise = null;
    localStorage.removeItem('biblia_api_user');
  }

  // Obter usuário atual
  getCurrentUser(): User | null {
    return this.user;
  }
}

// Exportar instância singleton
export const bibliaApiService = new BibliaApiService();
export type { BibleBook, BibleVerse, BibleChapter, BibleVersion };
