/**
 * Utilitários para normalizar dados bíblicos
 */

/**
 * Normaliza nomes de autores bíblicos para o padrão brasileiro
 * @param author Nome do autor a ser normalizado
 * @returns Nome do autor normalizado
 */
export const normalizeAuthorName = (author: string): string => {
  if (!author) return author;

  // Converter David/david para Davi (case insensitive)
  if (author.toLowerCase() === 'david') {
    return 'Davi';
  }

  // Substituir David por Davi em strings que contenham o nome
  return author.replace(/David/gi, 'Davi');
};

/**
 * Normaliza um objeto de versículo completo
 * @param verse Objeto versículo a ser normalizado
 * @returns Versículo com dados normalizados
 */
export const normalizeVerse = (verse: any) => {
  if (!verse || !verse.book) return verse;

  return {
    ...verse,
    book: {
      ...verse.book,
      author: normalizeAuthorName(verse.book.author),
    },
  };
};

/**
 * Normaliza uma lista de versículos
 * @param verses Array de versículos a serem normalizados
 * @returns Array de versículos normalizados
 */
export const normalizeVerses = (verses: any[]): any[] => {
  if (!Array.isArray(verses)) return verses;

  return verses.map(normalizeVerse);
};
