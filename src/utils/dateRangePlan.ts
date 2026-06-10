import { bibleBooks, BibleBook } from './bibleData';

export interface DateRangePlanEntry {
  date: Date;
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
 * Gera um plano de leitura para um período específico (data início até data fim)
 */
export const generateDateRangePlan = (
  startDate: Date,
  endDate: Date
): DateRangePlanEntry[] => {
  // Calcula o número de dias entre as datas
  const timeDiff = endDate.getTime() - startDate.getTime();
  const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  if (totalDays <= 0) {
    return [];
  }

  // Usa todos os livros da Bíblia em ordem tradicional
  const booksToInclude = bibleBooks
    .slice()
    .sort(
      (a, b) =>
        (a.traditionalOrder || Infinity) - (b.traditionalOrder || Infinity)
    );

  // Calcula total de versículos
  const totalVerses = booksToInclude.reduce((sum, book) => {
    return (
      sum +
      book.versesPerChapter.reduce((verseSum, verses) => verseSum + verses, 0)
    );
  }, 0);

  if (totalVerses === 0) {
    return [];
  }

  // Calcula versículos por dia (divisão precisa)
  const versesPerDay = totalVerses / totalDays;

  // Gera o plano dia a dia
  const plan: DateRangePlanEntry[] = [];

  for (let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayIndex);

    const startPosition = Math.floor(dayIndex * versesPerDay);
    const endPosition = Math.min(
      Math.floor((dayIndex + 1) * versesPerDay) - 1,
      totalVerses - 1
    );

    const startVerse = getVersePosition(startPosition, booksToInclude);
    const endVerse = getVersePosition(endPosition, booksToInclude);

    const readingRange = formatReadingRange(startVerse, endVerse);

    plan.push({
      date: new Date(currentDate),
      readings: [readingRange],
    });
  }

  return plan;
};
