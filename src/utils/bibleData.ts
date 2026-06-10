// bibleData.ts

export interface BibleBook {
  name: string;
  chapters: number;
  testament: 'old' | 'new';
  chronologicalOrder?: number;
  traditionalOrder?: number;
  versesPerChapter: number[];
}

export const bibleBooks: BibleBook[] = [
  // Antigo Testamento (ordem tradicional e cronológica)
  {
    name: 'Gênesis',
    chapters: 50,
    testament: 'old',
    chronologicalOrder: 2,
    traditionalOrder: 1,
    versesPerChapter: [
      31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33,
      38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43,
      36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26,
    ],
  },
  {
    name: 'Êxodo',
    chapters: 40,
    testament: 'old',
    chronologicalOrder: 3,
    traditionalOrder: 2,
    versesPerChapter: [
      22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27,
      25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38,
      29, 31, 43, 38,
    ],
  },
  {
    name: 'Levítico',
    chapters: 27,
    testament: 'old',
    chronologicalOrder: 4,
    traditionalOrder: 3,
    versesPerChapter: [
      17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37,
      27, 24, 33, 44, 23, 55, 46, 34,
    ],
  },
  {
    name: 'Números',
    chapters: 36,
    testament: 'old',
    chronologicalOrder: 5,
    traditionalOrder: 4,
    versesPerChapter: [
      54, 34, 51, 49, 31, 27, 89, 26, 14, 36, 35, 16, 33, 45, 41, 50, 13, 32,
      22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13,
    ],
  },
  {
    name: 'Deuteronômio',
    chapters: 34,
    testament: 'old',
    chronologicalOrder: 6,
    traditionalOrder: 5,
    versesPerChapter: [
      46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22,
      21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12,
    ],
  },
  {
    name: 'Josué',
    chapters: 24,
    testament: 'old',
    chronologicalOrder: 7,
    traditionalOrder: 6,
    versesPerChapter: [
      18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28,
      51, 9, 45, 34, 16, 33,
    ],
  },
  {
    name: 'Juízes',
    chapters: 21,
    testament: 'old',
    chronologicalOrder: 8,
    traditionalOrder: 7,
    versesPerChapter: [
      36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31,
      30, 48, 25,
    ],
  },
  {
    name: 'Rute',
    chapters: 4,
    testament: 'old',
    chronologicalOrder: 9,
    traditionalOrder: 8,
    versesPerChapter: [22, 23, 18, 22],
  },
  {
    name: '1 Samuel',
    chapters: 31,
    testament: 'old',
    chronologicalOrder: 10,
    traditionalOrder: 9,
    versesPerChapter: [
      28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 14, 52, 35, 23, 58, 30,
      24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13,
    ],
  },
  {
    name: '2 Samuel',
    chapters: 24,
    testament: 'old',
    chronologicalOrder: 11,
    traditionalOrder: 10,
    versesPerChapter: [
      27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33,
      43, 26, 22, 51, 39, 25,
    ],
  },
  {
    name: '1 Reis',
    chapters: 22,
    testament: 'old',
    chronologicalOrder: 16,
    traditionalOrder: 11,
    versesPerChapter: [
      53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46,
      25, 43, 29, 53,
    ],
  },
  {
    name: '2 Reis',
    chapters: 25,
    testament: 'old',
    chronologicalOrder: 17,
    traditionalOrder: 12,
    versesPerChapter: [
      18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 19, 21, 25, 29, 38, 20, 41, 37,
      37, 21, 26, 20, 25, 29, 30,
    ],
  },
  {
    name: '1 Crônicas',
    chapters: 29,
    testament: 'old',
    chronologicalOrder: 37,
    traditionalOrder: 13,
    versesPerChapter: [
      54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17,
      19, 30, 19, 32, 31, 31, 32, 34, 21, 30, 25,
    ],
  },
  {
    name: '2 Crônicas',
    chapters: 36,
    testament: 'old',
    chronologicalOrder: 38,
    traditionalOrder: 14,
    versesPerChapter: [
      17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 34, 11,
      37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 26, 20, 27, 25, 23,
    ],
  },
  {
    name: 'Esdras',
    chapters: 10,
    testament: 'old',
    chronologicalOrder: 32,
    traditionalOrder: 15,
    versesPerChapter: [11, 70, 13, 24, 17, 22, 28, 36, 15, 44],
  },
  {
    name: 'Neemias',
    chapters: 13,
    testament: 'old',
    chronologicalOrder: 36,
    traditionalOrder: 16,
    versesPerChapter: [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31],
  },
  {
    name: 'Ester',
    chapters: 10,
    testament: 'old',
    chronologicalOrder: 35,
    traditionalOrder: 17,
    versesPerChapter: [22, 23, 15, 17, 14, 14, 10, 17, 32, 3],
  },
  {
    name: 'Jó',
    chapters: 42,
    testament: 'old',
    chronologicalOrder: 1,
    traditionalOrder: 18,
    versesPerChapter: [
      22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21,
      29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24,
      41, 30, 24, 34, 17,
    ],
  },
  {
    name: 'Salmos',
    chapters: 150,
    testament: 'old',
    chronologicalOrder: 12,
    traditionalOrder: 19,
    versesPerChapter: [
      6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13,
      31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17,
      13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12,
      8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13,
      19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9,
      5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176,
      7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 7, 7,
      12, 15, 21, 10, 20, 14, 9, 6,
    ],
  },
  {
    name: 'Provérbios',
    chapters: 31,
    testament: 'old',
    chronologicalOrder: 14,
    traditionalOrder: 20,
    versesPerChapter: [
      33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24,
      29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31,
    ],
  },
  {
    name: 'Eclesiastes',
    chapters: 12,
    testament: 'old',
    chronologicalOrder: 15,
    traditionalOrder: 21,
    versesPerChapter: [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14],
  },
  {
    name: 'Cânticos',
    chapters: 8,
    testament: 'old',
    chronologicalOrder: 13,
    traditionalOrder: 22,
    versesPerChapter: [17, 17, 11, 16, 16, 13, 13, 14],
  },
  {
    name: 'Isaías',
    chapters: 66,
    testament: 'old',
    chronologicalOrder: 24,
    traditionalOrder: 23,
    versesPerChapter: [
      31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6,
      17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8,
      31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 12, 22, 15, 12, 21, 13, 12, 21,
      14, 3, 23, 11, 13, 10, 17, 25, 24,
    ],
  },
  {
    name: 'Jeremias',
    chapters: 52,
    testament: 'old',
    chronologicalOrder: 28,
    traditionalOrder: 24,
    versesPerChapter: [
      19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 18, 23,
      15, 18, 14, 30, 10, 38, 24, 22, 17, 32, 40, 44, 26, 22, 19, 32, 21, 28,
      18, 18, 16, 23, 13, 30, 33, 34, 9, 25, 32, 10, 29, 22, 26, 23,
    ],
  },
  {
    name: 'Lamentações',
    chapters: 5,
    testament: 'old',
    chronologicalOrder: 29,
    traditionalOrder: 25,
    versesPerChapter: [22, 22, 66, 22, 22],
  },
  {
    name: 'Ezequiel',
    chapters: 48,
    testament: 'old',
    chronologicalOrder: 30,
    traditionalOrder: 26,
    versesPerChapter: [
      28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14,
      49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28,
      23, 29, 49, 26, 20, 27, 31, 25, 18, 23, 35,
    ],
  },
  {
    name: 'Daniel',
    chapters: 12,
    testament: 'old',
    chronologicalOrder: 31,
    traditionalOrder: 27,
    versesPerChapter: [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13],
  },
  {
    name: 'Oséias',
    chapters: 14,
    testament: 'old',
    chronologicalOrder: 22,
    traditionalOrder: 28,
    versesPerChapter: [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 14, 9],
  },
  {
    name: 'Joel',
    chapters: 3,
    testament: 'old',
    chronologicalOrder: 19,
    traditionalOrder: 29,
    versesPerChapter: [20, 32, 21],
  },
  {
    name: 'Amós',
    chapters: 9,
    testament: 'old',
    chronologicalOrder: 21,
    traditionalOrder: 30,
    versesPerChapter: [15, 16, 15, 13, 27, 14, 17, 14, 15],
  },
  {
    name: 'Obadias',
    chapters: 1,
    testament: 'old',
    chronologicalOrder: 18,
    traditionalOrder: 31,
    versesPerChapter: [21],
  },
  {
    name: 'Jonas',
    chapters: 4,
    testament: 'old',
    chronologicalOrder: 20,
    traditionalOrder: 32,
    versesPerChapter: [17, 10, 10, 11],
  },
  {
    name: 'Miquéias',
    chapters: 7,
    testament: 'old',
    chronologicalOrder: 23,
    traditionalOrder: 33,
    versesPerChapter: [16, 13, 12, 13, 15, 16, 20],
  },
  {
    name: 'Naum',
    chapters: 3,
    testament: 'old',
    chronologicalOrder: 25,
    traditionalOrder: 34,
    versesPerChapter: [15, 13, 19],
  },
  {
    name: 'Habacuque',
    chapters: 3,
    testament: 'old',
    chronologicalOrder: 27,
    traditionalOrder: 35,
    versesPerChapter: [17, 20, 19],
  },
  {
    name: 'Sofonias',
    chapters: 3,
    testament: 'old',
    chronologicalOrder: 26,
    traditionalOrder: 36,
    versesPerChapter: [18, 15, 20],
  },
  {
    name: 'Ageu',
    chapters: 2,
    testament: 'old',
    chronologicalOrder: 33,
    traditionalOrder: 37,
    versesPerChapter: [15, 23],
  },
  {
    name: 'Zacarias',
    chapters: 14,
    testament: 'old',
    chronologicalOrder: 34,
    traditionalOrder: 38,
    versesPerChapter: [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21],
  },
  {
    name: 'Malaquias',
    chapters: 4,
    testament: 'old',
    chronologicalOrder: 39,
    traditionalOrder: 39,
    versesPerChapter: [14, 17, 18, 6],
  },

  // Novo Testamento (ordem tradicional e cronológica)
  {
    name: 'Mateus',
    chapters: 28,
    testament: 'new',
    chronologicalOrder: 54,
    traditionalOrder: 40,
    versesPerChapter: [
      25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35,
      30, 34, 46, 46, 39, 51, 46, 75, 66, 20,
    ],
  },
  {
    name: 'Marcos',
    chapters: 16,
    testament: 'new',
    chronologicalOrder: 47,
    traditionalOrder: 41,
    versesPerChapter: [
      45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20,
    ],
  },
  {
    name: 'Lucas',
    chapters: 24,
    testament: 'new',
    chronologicalOrder: 48,
    traditionalOrder: 42,
    versesPerChapter: [
      80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43,
      48, 47, 38, 71, 56, 53,
    ],
  },
  {
    name: 'João',
    chapters: 21,
    testament: 'new',
    chronologicalOrder: 62,
    traditionalOrder: 43,
    versesPerChapter: [
      51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40,
      42, 31, 25,
    ],
  },
  {
    name: 'Atos',
    chapters: 28,
    testament: 'new',
    chronologicalOrder: 49,
    traditionalOrder: 44,
    versesPerChapter: [
      26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28,
      41, 38, 40, 30, 35, 27, 27, 32, 44, 31,
    ],
  },
  {
    name: 'Romanos',
    chapters: 16,
    testament: 'new',
    chronologicalOrder: 46,
    traditionalOrder: 45,
    versesPerChapter: [
      32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27,
    ],
  },
  {
    name: '1 Coríntios',
    chapters: 16,
    testament: 'new',
    chronologicalOrder: 44,
    traditionalOrder: 46,
    versesPerChapter: [
      31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24,
    ],
  },
  {
    name: '2 Coríntios',
    chapters: 13,
    testament: 'new',
    chronologicalOrder: 45,
    traditionalOrder: 47,
    versesPerChapter: [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14],
  },
  {
    name: 'Gálatas',
    chapters: 6,
    testament: 'new',
    chronologicalOrder: 41,
    traditionalOrder: 48,
    versesPerChapter: [24, 21, 29, 31, 26, 18],
  },
  {
    name: 'Efésios',
    chapters: 6,
    testament: 'new',
    chronologicalOrder: 50,
    traditionalOrder: 49,
    versesPerChapter: [23, 22, 21, 32, 33, 24],
  },
  {
    name: 'Filipenses',
    chapters: 4,
    testament: 'new',
    chronologicalOrder: 51,
    traditionalOrder: 50,
    versesPerChapter: [30, 30, 21, 23],
  },
  {
    name: 'Colossenses',
    chapters: 4,
    testament: 'new',
    chronologicalOrder: 52,
    traditionalOrder: 51,
    versesPerChapter: [29, 23, 25, 18],
  },
  {
    name: '1 Tessalonicenses',
    chapters: 5,
    testament: 'new',
    chronologicalOrder: 42,
    traditionalOrder: 52,
    versesPerChapter: [10, 20, 13, 18, 28],
  },
  {
    name: '2 Tessalonicenses',
    chapters: 3,
    testament: 'new',
    chronologicalOrder: 43,
    traditionalOrder: 53,
    versesPerChapter: [12, 17, 18],
  },
  {
    name: '1 Timóteo',
    chapters: 6,
    testament: 'new',
    chronologicalOrder: 57,
    traditionalOrder: 54,
    versesPerChapter: [20, 15, 16, 16, 25, 21],
  },
  {
    name: '2 Timóteo',
    chapters: 4,
    testament: 'new',
    chronologicalOrder: 58,
    traditionalOrder: 55,
    versesPerChapter: [18, 26, 17, 22],
  },
  {
    name: 'Tito',
    chapters: 3,
    testament: 'new',
    chronologicalOrder: 56,
    traditionalOrder: 56,
    versesPerChapter: [16, 15, 15],
  },
  {
    name: 'Filemom',
    chapters: 1,
    testament: 'new',
    chronologicalOrder: 53,
    traditionalOrder: 57,
    versesPerChapter: [25],
  },
  {
    name: 'Hebreus',
    chapters: 13,
    testament: 'new',
    chronologicalOrder: 60,
    traditionalOrder: 58,
    versesPerChapter: [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25],
  },
  {
    name: 'Tiago',
    chapters: 5,
    testament: 'new',
    chronologicalOrder: 40,
    traditionalOrder: 59,
    versesPerChapter: [27, 26, 18, 17, 20],
  },
  {
    name: '1 Pedro',
    chapters: 5,
    testament: 'new',
    chronologicalOrder: 55,
    traditionalOrder: 60,
    versesPerChapter: [25, 25, 22, 19, 14],
  },
  {
    name: '2 Pedro',
    chapters: 3,
    testament: 'new',
    chronologicalOrder: 59,
    traditionalOrder: 61,
    versesPerChapter: [21, 22, 18],
  },
  {
    name: '1 João',
    chapters: 5,
    testament: 'new',
    chronologicalOrder: 63,
    traditionalOrder: 62,
    versesPerChapter: [10, 29, 24, 21, 21],
  },
  {
    name: '2 João',
    chapters: 1,
    testament: 'new',
    chronologicalOrder: 64,
    traditionalOrder: 63,
    versesPerChapter: [13],
  },
  {
    name: '3 João',
    chapters: 1,
    testament: 'new',
    chronologicalOrder: 65,
    traditionalOrder: 64,
    versesPerChapter: [14],
  },
  {
    name: 'Judas',
    chapters: 1,
    testament: 'new',
    chronologicalOrder: 61,
    traditionalOrder: 65,
    versesPerChapter: [25],
  },
  {
    name: 'Apocalipse',
    chapters: 22,
    testament: 'new',
    chronologicalOrder: 66,
    traditionalOrder: 66,
    versesPerChapter: [
      20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21,
      15, 27, 21,
    ],
  },
];

/**
 * Soma de todos os versículos (todos os testamentos)
 */
export const getTotalVerses = (): number =>
  bibleBooks.reduce((sum, b) => {
    return sum + b.versesPerChapter.reduce((s, v) => s + v, 0);
  }, 0);

/**
 * Soma de versículos de um testamento específico
 */
export const getTestamentVerses = (testament: 'old' | 'new'): number =>
  bibleBooks
    .filter((b) => b.testament === testament)
    .reduce((sum, b) => {
      return sum + b.versesPerChapter.reduce((s, v) => s + v, 0);
    }, 0);

/**
 * Soma de versículos dos livros selecionados
 */
export const getSelectedBooksVerses = (books: BibleBook[]): number =>
  books.reduce((sum, b) => {
    return sum + b.versesPerChapter.reduce((s, v) => s + v, 0);
  }, 0);

/**
 * Soma de todos os capítulos (continua disponível caso você use em outro local)
 */
export const getTotalChapters = (): number =>
  bibleBooks.reduce((sum, b) => sum + b.chapters, 0);

/**
 * Soma de todos os capítulos de um testamento
 */
export const getTestamentChapters = (testament: 'old' | 'new'): number =>
  bibleBooks
    .filter((b) => b.testament === testament)
    .reduce((sum, b) => sum + b.chapters, 0);

/**
 * Soma de capítulos de livros selecionados
 */
export const getSelectedBooksChapters = (books: BibleBook[]): number =>
  books.reduce((sum, b) => sum + b.chapters, 0);

/**
 * Retorna um livro aleatório
 */
export const getRandomBook = (): BibleBook => {
  const idx = Math.floor(Math.random() * bibleBooks.length);
  return bibleBooks[idx];
};

export interface ReadingPlanEntry {
  day: number;
  readings: string[];
}

interface VersePosition {
  bookIndex: number;
  chapter: number;
  verse: number;
  bookName: string;
}

/**
 * Converte posição absoluta do versículo para posição específica (livro, capítulo, versículo)
 */
const getVersePosition = (
  absolutePosition: number,
  books: BibleBook[]
): VersePosition => {
  let currentPosition = 0;

  for (let bookIndex = 0; bookIndex < books.length; bookIndex++) {
    const book = books[bookIndex];
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      const versesInChapter = book.versesPerChapter[chapter - 1] || 0;

      if (currentPosition + versesInChapter > absolutePosition) {
        const verseInChapter = absolutePosition - currentPosition + 1;
        return {
          bookIndex,
          chapter,
          verse: verseInChapter,
          bookName: book.name,
        };
      }
      currentPosition += versesInChapter;
    }
  }

  // Se chegou aqui, retorna o último versículo
  const lastBook = books[books.length - 1];
  const lastChapter = lastBook.chapters;
  const lastVerse = lastBook.versesPerChapter[lastChapter - 1];

  return {
    bookIndex: books.length - 1,
    chapter: lastChapter,
    verse: lastVerse,
    bookName: lastBook.name,
  };
};

/**
 * Formata o range de leitura
 */
const formatReadingRange = (
  start: VersePosition,
  end: VersePosition
): string => {
  if (start.bookIndex === end.bookIndex && start.chapter === end.chapter) {
    // Mesmo capítulo
    if (start.verse === end.verse) {
      return `${start.bookName} ${start.chapter}:${start.verse}`;
    }
    return `${start.bookName} ${start.chapter}:${start.verse}-${end.verse}`;
  } else if (start.bookIndex === end.bookIndex) {
    // Mesmo livro, capítulos diferentes
    return `${start.bookName} ${start.chapter}:${start.verse} – ${end.chapter}:${end.verse}`;
  } else {
    // Livros diferentes
    return `${start.bookName} ${start.chapter}:${start.verse} – ${end.bookName} ${end.chapter}:${end.verse}`;
  }
};

/**
 * Gera um plano de leitura preciso por versículos
 */
export const generateReadingPlan = (
  timeValue: number,
  timeUnit: 'days' | 'months' | 'year',
  includeOldTestament: boolean,
  includeNewTestament: boolean,
  selectedBooks: BibleBook[] = [],
  isChronological: boolean = false
): ReadingPlanEntry[] => {
  // 1) Monta a lista de livros a incluir
  let booksToInclude: BibleBook[] =
    selectedBooks.length > 0
      ? selectedBooks.slice()
      : bibleBooks.filter(
          (b) =>
            (includeOldTestament && b.testament === 'old') ||
            (includeNewTestament && b.testament === 'new')
        );

  if (booksToInclude.length === 0) {
    return [];
  }

  // 2) Ordena conforme opção escolhida
  if (isChronological) {
    booksToInclude.sort(
      (a, b) =>
        (a.chronologicalOrder || Infinity) - (b.chronologicalOrder || Infinity)
    );
  } else {
    booksToInclude.sort(
      (a, b) =>
        (a.traditionalOrder || Infinity) - (b.traditionalOrder || Infinity)
    );
  }

  // 3) Converte timeValue + timeUnit em totalDays
  let totalDays: number;
  switch (timeUnit) {
    case 'year':
      totalDays = timeValue * 365;
      break;
    case 'months':
      totalDays = timeValue * 30;
      break;
    default:
      totalDays = timeValue;
  }

  if (totalDays <= 0) {
    return [];
  }

  // 4) Calcula total de versículos
  const totalVerses = booksToInclude.reduce((sum, book) => {
    return (
      sum +
      book.versesPerChapter.reduce((verseSum, verses) => verseSum + verses, 0)
    );
  }, 0);

  if (totalVerses === 0) {
    return [];
  }

  // 5) Calcula versículos por dia (divisão precisa)
  const versesPerDay = totalVerses / totalDays;

  // 6) Gera o plano dia a dia
  const plan: ReadingPlanEntry[] = [];
  let currentVersePosition = 0;

  for (let day = 1; day <= totalDays; day++) {
    const startPosition = Math.floor((day - 1) * versesPerDay);
    const endPosition = Math.min(
      Math.floor(day * versesPerDay) - 1,
      totalVerses - 1
    );

    const startVerse = getVersePosition(startPosition, booksToInclude);
    const endVerse = getVersePosition(endPosition, booksToInclude);

    const readingRange = formatReadingRange(startVerse, endVerse);

    plan.push({
      day,
      readings: [readingRange],
    });
  }

  return plan;
};

/**
 * Gera um plano de leitura baseado em número de capítulos por período
 */
export const generateChapterBasedPlan = (
  chaptersPerPeriod: number,
  timeUnit: 'days' | 'months' | 'year',
  includeOldTestament: boolean,
  includeNewTestament: boolean,
  selectedBooks: BibleBook[] = [],
  isChronological: boolean = false
): ReadingPlanEntry[] => {
  // 1) Monta a lista de livros a incluir
  let booksToInclude: BibleBook[] =
    selectedBooks.length > 0
      ? selectedBooks.slice()
      : bibleBooks.filter(
          (b) =>
            (includeOldTestament && b.testament === 'old') ||
            (includeNewTestament && b.testament === 'new')
        );

  if (booksToInclude.length === 0) {
    return [];
  }

  // 2) Ordena conforme opção escolhida
  if (isChronological) {
    booksToInclude.sort(
      (a, b) =>
        (a.chronologicalOrder || Infinity) - (b.chronologicalOrder || Infinity)
    );
  } else {
    booksToInclude.sort(
      (a, b) =>
        (a.traditionalOrder || Infinity) - (b.traditionalOrder || Infinity)
    );
  }

  // 3) Cria uma lista sequencial de todos os capítulos
  const allChapters: { bookName: string; chapter: number }[] = [];
  booksToInclude.forEach((book) => {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      allChapters.push({ bookName: book.name, chapter });
    }
  });

  if (allChapters.length === 0) {
    return [];
  }

  // 4) Gera o plano dividindo os capítulos por período
  const plan: ReadingPlanEntry[] = [];
  let currentChapterIndex = 0;
  let day = 1;

  while (currentChapterIndex < allChapters.length) {
    const readings: string[] = [];
    let chaptersForThisPeriod = 0;

    // Agrupa capítulos consecutivos do mesmo livro
    while (
      chaptersForThisPeriod < chaptersPerPeriod &&
      currentChapterIndex < allChapters.length
    ) {
      const startChapter = allChapters[currentChapterIndex];
      let endIndex = currentChapterIndex;

      // Encontra quantos capítulos consecutivos do mesmo livro podemos incluir
      while (
        endIndex < allChapters.length &&
        allChapters[endIndex].bookName === startChapter.bookName &&
        chaptersForThisPeriod < chaptersPerPeriod
      ) {
        endIndex++;
        chaptersForThisPeriod++;
      }

      const endChapter = allChapters[endIndex - 1];

      // Formata a leitura
      if (startChapter.chapter === endChapter.chapter) {
        readings.push(`${startChapter.bookName} ${startChapter.chapter}`);
      } else {
        readings.push(
          `${startChapter.bookName} ${startChapter.chapter}-${endChapter.chapter}`
        );
      }

      currentChapterIndex = endIndex;

      // Se mudou de livro e ainda temos capítulos para ler, continua com o próximo livro
      if (
        currentChapterIndex < allChapters.length &&
        chaptersForThisPeriod < chaptersPerPeriod
      ) {
        const nextChapter = allChapters[currentChapterIndex];
        if (nextChapter.bookName !== startChapter.bookName) {
          // Continua para incluir capítulos do próximo livro se ainda temos "espaço"
          continue;
        }
      }
    }

    plan.push({
      day,
      readings,
    });

    day++;
  }

  return plan;
};
