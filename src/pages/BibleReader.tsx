import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Book,
  ChevronLeft,
  ChevronRight,
  Bold,
  Italic,
  Underline,
  Palette,
  Copy,
  MoreVertical,
  Settings,
  Search,
  X,
  Trash2,
  Eraser,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { bibleBooks } from '@/utils/bibleData';
import { bibliaApiService, BibleChapter } from '@/services/bibliaApiService';
// Auth service removed - formatting available for everyone
import {
  formatVersionName,
  getVersionFullName,
} from '@/utils/bibleVersionsMap';
import {
  verseFormattingService,
  VerseFormatting as DBVerseFormatting,
} from '@/services/verseFormattingService';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface Verse {
  number: number;
  text: string;
}

interface Chapter {
  number: number;
  verses: Verse[];
}

interface BibleVersion {
  abbreviation: string;
  name: string;
}

interface VerseFormatting {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  backgroundColor: string;
  textColor: string;
}

const defaultBibleVersions: BibleVersion[] = [
  { abbreviation: 'nvi', name: 'Nova Versão Internacional' },
  { abbreviation: 'acf', name: 'Almeida Corrigida Fiel' },
];

const formatColors = [
  { name: 'Amarelo', bg: '#fef3c7', text: '#92400e' },
  { name: 'Verde', bg: '#d1fae5', text: '#065f46' },
  { name: 'Azul', bg: '#dbeafe', text: '#1e40af' },
  { name: 'Rosa', bg: '#fce7f3', text: '#be185d' },
  { name: 'Roxo', bg: '#e9d5ff', text: '#7c3aed' },
  { name: 'Laranja', bg: '#fed7aa', text: '#c2410c' },
];

const BibleReader: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string>('Gênesis');
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [selectedVersion, setSelectedVersion] = useState<string>('nvi');
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verseFormatting, setVerseFormatting] = useState<
    Record<string, VerseFormatting>
  >({});
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
  const [bibleVersions, setBibleVersions] =
    useState<BibleVersion[]>(defaultBibleVersions);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});

  // Estados para a nova interface de seleção de livros
  const [showBookSelector, setShowBookSelector] = useState<boolean>(false);
  const [bookSearchTerm, setBookSearchTerm] = useState<string>('');

  // Formatting available for everyone - no authentication needed
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Estado para mostrar todos os capítulos
  const [showAllChapters, setShowAllChapters] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Funções para SEO dinâmico
  const generatePageTitle = () => {
    const versionName =
      bibleVersions.find((v) => v.abbreviation === selectedVersion)?.name ||
      'Bíblia';
    return `${selectedBook} ${selectedChapter} - ${versionName} | Leitura da Bíblia Online`;
  };

  const generatePageDescription = () => {
    if (chapter && chapter.verses.length > 0) {
      const firstVersePreview = chapter.verses[0].text.substring(0, 120);
      return `Leia ${selectedBook} capítulo ${selectedChapter} completo na versão ${getVersionFullName(
        selectedVersion
      )}. "${firstVersePreview}..." e mais versículos com formatação e ferramentas de estudo.`;
    }
    return `Leia ${selectedBook} capítulo ${selectedChapter} completo na Bíblia online. Acesso gratuito com múltiplas versões, formatação de texto e ferramentas de estudo bíblico.`;
  };

  const generateStructuredData = () => {
    if (!chapter || !chapter.verses.length) return null;

    const selectedBookData = bibleBooks.find(
      (book) => book.name === selectedBook
    );

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${selectedBook} ${selectedChapter}`,
      description: generatePageDescription(),
      author: {
        '@type': 'Person',
        name: 'Escritor Bíblico',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Graça e Leitura',
        logo: {
          '@type': 'ImageObject',
          url: `${window.location.origin}/logo.png`,
        },
      },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': window.location.href,
      },
      articleSection:
        selectedBookData?.testament === 'old'
          ? 'Antigo Testamento'
          : 'Novo Testamento',
      keywords: [
        selectedBook,
        `${selectedBook} ${selectedChapter}`,
        getVersionFullName(selectedVersion),
        'Bíblia online',
        'estudo bíblico',
        'leitura bíblica',
      ].join(', '),
      text:
        chapter.verses
          .map((v) => v.text)
          .join(' ')
          .substring(0, 500) + '...',
      wordCount: chapter.verses.reduce(
        (acc, verse) => acc + verse.text.split(' ').length,
        0
      ),
    };
  };

  // Buscar versículos do capítulo
  const fetchChapter = async (
    book: string,
    chapterNum: number,
    version: string
  ) => {
    setIsLoading(true);
    setIsContentVisible(false);
    try {
      const data: BibleChapter = await bibliaApiService.getChapter(
        version,
        book,
        chapterNum
      );

      // Transformar dados da API no formato esperado
      const verses: Verse[] = data.verses.map((verse: any) => ({
        number: verse.number,
        text: verse.text,
      }));

      setChapter({
        number: chapterNum,
        verses: verses,
      });

      setIsLoading(false);

      // Aguardar um pouco para o fade in
      setTimeout(() => {
        setIsContentVisible(true);
      }, 100);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Carregar formatações do banco de dados
  const loadChapterFormatting = async (
    book: string,
    chapter: number,
    version: string
  ) => {
    try {
      const formattings = await verseFormattingService.getChapterFormatting(
        book,
        chapter,
        version
      );

      const formattingMap: Record<string, VerseFormatting> = {};
      formattings.forEach((formatting) => {
        const verseKey = `${book}-${chapter}-${formatting.verse}`;
        formattingMap[verseKey] = {
          bold: formatting.bold,
          italic: formatting.italic,
          underline: formatting.underline,
          backgroundColor: formatting.background_color,
          textColor: formatting.text_color,
        };
      });

      setVerseFormatting(formattingMap);
    } catch (error) {
      // Se houver erro, limpar formatações
      setVerseFormatting({});
    }
  };

  // Carregar capítulo inicial
  useEffect(() => {
    fetchChapter(selectedBook, selectedChapter, selectedVersion);
    loadChapterFormatting(selectedBook, selectedChapter, selectedVersion);
  }, [selectedBook, selectedChapter, selectedVersion]);

  // No authentication check needed - formatting available for everyone

  // Carregar versões disponíveis da API
  useEffect(() => {
    const loadVersions = async () => {
      try {
        const apiVersions = await bibliaApiService.getVersions();

        const formattedVersions = apiVersions.map((version) => ({
          abbreviation: version.version,
          name: getVersionFullName(version.version),
        }));

        setBibleVersions(formattedVersions);
      } catch (error) {
        // Manter versões padrão se houver erro
      }
    };

    loadVersions();
  }, []);

  // Obter dados do livro selecionado
  const selectedBookData = bibleBooks.find(
    (book) => book.name === selectedBook
  );
  const maxChapters = selectedBookData?.chapters || 1;

  // Filtrar livros baseado no termo de busca
  const filteredBooks = bibleBooks.filter((book) =>
    book.name.toLowerCase().includes(bookSearchTerm.toLowerCase())
  );

  // Navegação entre capítulos
  const changeChapter = (newBook: string, newChapter: number) => {
    // Fade out effect
    setIsContentVisible(false);

    // Wait for fade out to complete, then change chapter
    setTimeout(() => {
      setSelectedBook(newBook);
      setSelectedChapter(newChapter);
    }, 200);
  };

  const goToPreviousChapter = () => {
    if (selectedChapter > 1) {
      changeChapter(selectedBook, selectedChapter - 1);
    } else {
      // Ir para o livro anterior, último capítulo
      const currentIndex = bibleBooks.findIndex(
        (book) => book.name === selectedBook
      );
      if (currentIndex > 0) {
        const previousBook = bibleBooks[currentIndex - 1];
        changeChapter(previousBook.name, previousBook.chapters);
      }
    }
  };

  const goToNextChapter = () => {
    if (selectedChapter < maxChapters) {
      changeChapter(selectedBook, selectedChapter + 1);
    } else {
      // Ir para o próximo livro, primeiro capítulo
      const currentIndex = bibleBooks.findIndex(
        (book) => book.name === selectedBook
      );
      if (currentIndex < bibleBooks.length - 1) {
        const nextBook = bibleBooks[currentIndex + 1];
        changeChapter(nextBook.name, 1);
      }
    }
  };

  // Aplicar formatação ao versículo
  const applyFormatting = async (
    verseNumber: number,
    formatting: Partial<VerseFormatting>
  ) => {
    const verseKey = `${selectedBook}-${selectedChapter}-${verseNumber}`;
    const newFormatting = {
      bold: false,
      italic: false,
      underline: false,
      backgroundColor: 'transparent',
      textColor: 'inherit',
      ...verseFormatting[verseKey],
      ...formatting,
    };

    // Atualizar estado local imediatamente
    setVerseFormatting((prev) => ({
      ...prev,
      [verseKey]: newFormatting,
    }));

    // Salvar no banco de dados
    try {
      await verseFormattingService.saveVerseFormatting({
        book: selectedBook,
        chapter: selectedChapter,
        verse: verseNumber,
        bible_version: selectedVersion,
        bold: newFormatting.bold,
        italic: newFormatting.italic,
        underline: newFormatting.underline,
        background_color: newFormatting.backgroundColor,
        text_color: newFormatting.textColor,
      });
    } catch (error) {
      // Mostrar notificação de erro
      const notification = document.createElement('div');
      notification.className =
        'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in';
      notification.textContent =
        'Erro ao salvar formatação. Tente novamente.';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  // Aplicar formatação a múltiplos versículos
  const applyFormattingToMultipleVerses = async (
    verseNumbers: number[],
    formatting: Partial<VerseFormatting>
  ) => {
    // Atualizar estado local imediatamente
    verseNumbers.forEach((verseNumber) => {
      const verseKey = `${selectedBook}-${selectedChapter}-${verseNumber}`;
      const newFormatting = {
        bold: false,
        italic: false,
        underline: false,
        backgroundColor: 'transparent',
        textColor: 'inherit',
        ...verseFormatting[verseKey],
        ...formatting,
      };

      setVerseFormatting((prev) => ({
        ...prev,
        [verseKey]: newFormatting,
      }));
    });

    // Salvar no banco de dados
    try {
      await verseFormattingService.saveMultipleVerseFormatting(
        selectedBook,
        selectedChapter,
        verseNumbers,
        selectedVersion,
        {
          bold: formatting.bold,
          italic: formatting.italic,
          underline: formatting.underline,
          background_color: formatting.backgroundColor,
          text_color: formatting.textColor,
        }
      );

      // Feedback visual de sucesso
      const notification = document.createElement('div');
      notification.className =
        'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-bible-accent text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in';
      notification.textContent = `Formatação salva para ${
        verseNumbers.length
      } versículo${verseNumbers.length > 1 ? 's' : ''}`;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 2000);
    } catch (error) {
      // Feedback visual de erro
      const notification = document.createElement('div');
      notification.className =
        'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in';
      notification.textContent =
        'Erro ao salvar formatações. Tente novamente.';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  // Limpar todas as formatações de um versículo
  const clearAllFormatting = (verseNumber: number) => {
    const verseKey = `${selectedBook}-${selectedChapter}-${verseNumber}`;
    setVerseFormatting((prev) => {
      const newFormatting = { ...prev };
      delete newFormatting[verseKey];
      return newFormatting;
    });
  };

  // Limpar formatação de múltiplos versículos
  const clearAllFormattingFromMultipleVerses = async (
    verseNumbers: number[]
  ) => {
    // Atualizar estado local
    verseNumbers.forEach((verseNumber) => {
      const verseKey = `${selectedBook}-${selectedChapter}-${verseNumber}`;
      setVerseFormatting((prev) => {
        const newFormatting = { ...prev };
        delete newFormatting[verseKey];
        return newFormatting;
      });
    });

    // Remover do banco de dados
    try {
      await verseFormattingService.removeMultipleVerseFormatting(
        selectedBook,
        selectedChapter,
        verseNumbers,
        selectedVersion
      );
    } catch (error) {}
  };

  // Limpar apenas as cores de um versículo
  const clearColors = (verseNumber: number) => {
    applyFormatting(verseNumber, {
      backgroundColor: 'transparent',
      textColor: 'inherit',
    });
  };

  // Limpar cores de múltiplos versículos
  const clearColorsFromMultipleVerses = async (verseNumbers: number[]) => {
    // Atualizar estado local
    verseNumbers.forEach((verseNumber) => {
      const verseKey = `${selectedBook}-${selectedChapter}-${verseNumber}`;
      setVerseFormatting((prev) => ({
        ...prev,
        [verseKey]: {
          ...prev[verseKey],
          backgroundColor: 'transparent',
          textColor: 'inherit',
        },
      }));
    });

    // Limpar cores no banco de dados
    try {
      await verseFormattingService.clearVerseColors(
        selectedBook,
        selectedChapter,
        verseNumbers,
        selectedVersion
      );
    } catch (error) {}
  };

  // Função para determinar cor do texto baseada na luminosidade da cor de fundo
  const getContrastColor = (hexColor: string): string => {
    // Remove o # se existir
    const color = hexColor.replace('#', '');

    // Converte para RGB
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    // Calcula a luminosidade
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Retorna preto para cores claras e branco para cores escuras
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Obter formatação do versículo
  const getVerseFormatting = (verseNumber: number): VerseFormatting => {
    const verseKey = `${selectedBook}-${selectedChapter}-${verseNumber}`;
    return (
      verseFormatting[verseKey] || {
        bold: false,
        italic: false,
        underline: false,
        backgroundColor: 'transparent',
        textColor: 'inherit',
      }
    );
  };

  // Detectar versículos selecionados
  const getSelectedVerseNumbers = (): number[] => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return [];

    const range = selection.getRangeAt(0);
    const container = contentRef.current;
    if (!container) return [];

    const verseNumbers = new Set<number>();

    // Iterar pelos nós do texto selecionado
    const startContainer = range.startContainer;
    const endContainer = range.endContainer;

    // Função para encontrar o elemento verse mais próximo
    const findVerseElement = (node: Node): Element | null => {
      let current =
        node.nodeType === Node.TEXT_NODE
          ? node.parentElement
          : (node as Element);
      while (current && current !== container) {
        if (current.hasAttribute && current.hasAttribute('data-verse-number')) {
          return current;
        }
        current = current.parentElement;
      }
      return null;
    };

    // Adicionar versículo do início da seleção
    const startVerseElement = findVerseElement(startContainer);
    if (startVerseElement) {
      const verseNumber = parseInt(
        startVerseElement.getAttribute('data-verse-number') || '0'
      );
      if (verseNumber > 0) {
        verseNumbers.add(verseNumber);
      }
    }

    // Adicionar versículo do final da seleção (se diferente do início)
    const endVerseElement = findVerseElement(endContainer);
    if (endVerseElement && endVerseElement !== startVerseElement) {
      const verseNumber = parseInt(
        endVerseElement.getAttribute('data-verse-number') || '0'
      );
      if (verseNumber > 0) {
        verseNumbers.add(verseNumber);
      }
    }

    // Se seleção spans múltiplos versículos, adicionar os intermediários
    if (verseNumbers.size >= 2) {
      const numbers = Array.from(verseNumbers).sort((a, b) => a - b);
      const minVerse = numbers[0];
      const maxVerse = numbers[numbers.length - 1];

      for (let i = minVerse; i <= maxVerse; i++) {
        verseNumbers.add(i);
      }
    }

    // Verificar se a seleção contém texto de múltiplos versículos
    // mesmo que não tenha sido detectado pelos elementos
    const selectedText = selection.toString();
    if (selectedText && verseNumbers.size === 1) {
      // Contar quantos números de versículos aparecem no texto selecionado
      const verseNumberMatches = selectedText.match(/^\d+\s/gm);
      if (verseNumberMatches && verseNumberMatches.length > 1) {
        // Extrair os números dos versículos do texto
        const extractedNumbers = verseNumberMatches
          .map((match) => parseInt(match.trim()))
          .filter((num) => !isNaN(num))
          .sort((a, b) => a - b);

        if (extractedNumbers.length > 1) {
          const minVerse = extractedNumbers[0];
          const maxVerse = extractedNumbers[extractedNumbers.length - 1];

          for (let i = minVerse; i <= maxVerse; i++) {
            verseNumbers.add(i);
          }
        }
      }
    }

    return Array.from(verseNumbers).sort((a, b) => a - b);
  };

  // Lidar com seleção de texto melhorada
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString().trim();
      if (selectedText) {
        setSelectedText(selectedText);
        const verses = getSelectedVerseNumbers();
        setSelectedVerses(verses);
      } else {
        setSelectedText('');
        setSelectedVerses([]);
      }
    }
  };

  // Limpar seleção quando clicar fora
  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as Element;
    // Se clicou fora do conteúdo dos versículos e fora do menu flutuante
    if (
      contentRef.current &&
      !contentRef.current.contains(target) &&
      !target.closest('[data-floating-menu]')
    ) {
      setSelectedText('');
      setSelectedVerses([]);
    }
  };

  // Adicionar listener para cliques no documento
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Processar texto selecionado para remover números de versículos e quebras de linha
  const processSelectedText = (selectedText: string): string => {
    return (
      selectedText
        // Remover números de versículos isolados (números sozinhos em linhas)
        .replace(/^\d+$/gm, '')
        // Remover números de versículos no início de linhas seguidos por espaço
        .replace(/^\d+\s+/gm, '')
        // Remover números isolados entre quebras de linha
        .replace(/\n\s*\d+\s*\n/g, ' ')
        // Substituir múltiplas quebras de linha por espaço único
        .replace(/\n+/g, ' ')
        // Remover espaços múltiplos
        .replace(/\s+/g, ' ')
        // Limpar espaços no início e fim
        .trim()
    );
  };

  // Função de busca no capítulo atual
  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (!term.trim() || !chapter) {
      setSearchResults([]);
      return;
    }

    const results: number[] = [];
    const searchLower = term.toLowerCase();

    chapter.verses.forEach((verse) => {
      if (verse.text.toLowerCase().includes(searchLower)) {
        results.push(verse.number);
      }
    });

    setSearchResults(results);
  };

  // Função para destacar texto da busca
  const highlightSearchTerm = (text: string, term: string): React.ReactNode => {
    if (!term.trim()) return text;

    const regex = new RegExp(
      `(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi'
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className='bg-yellow-200 dark:bg-yellow-600 px-1 rounded'
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Limpar busca quando mudar de capítulo
  useEffect(() => {
    setSearchTerm('');
    setSearchResults([]);
  }, [selectedBook, selectedChapter, selectedVersion]);

  // Função para detectar se precisa adicionar "[...]"
  const shouldAddEllipsis = (
    selectedText: string,
    fullVerseText: string
  ): boolean => {
    const cleanSelected = selectedText.trim();
    const cleanFull = fullVerseText.trim();

    // Se o texto selecionado é exatamente igual ao versículo completo, não adicionar [...]
    if (cleanSelected === cleanFull) {
      return false;
    }

    // Verificar se o texto selecionado faz parte do versículo
    if (!cleanFull.includes(cleanSelected)) {
      return false;
    }

    // Calcular a porcentagem de texto selecionado
    const selectedLength = cleanSelected.length;
    const fullLength = cleanFull.length;
    const percentage = (selectedLength / fullLength) * 100;

    // Verificar se o texto começa no início do versículo mas não termina no final
    const startsAtBeginning = cleanFull.startsWith(cleanSelected);
    const endsAtEnd = cleanFull.endsWith(cleanSelected);

    // Adicionar [...] se:
    // 1. Representa pelo menos 50% do versículo
    // 2. Começa no início do versículo mas não termina no final (texto foi cortado)
    return percentage >= 50 && startsAtBeginning && !endsAtEnd;
  };

  // Copiar versículo com referência melhorada
  const copyVerseWithReference = async (
    verseNumber?: number,
    verseText?: string,
    customText?: string
  ) => {
    let textToCopy = '';
    let reference = '';

    if (customText && selectedVerses.length > 0) {
      // Cópia de múltiplos versículos selecionados - processar texto
      textToCopy = processSelectedText(customText);

      // Verificar se é um versículo único para adicionar [...] se necessário
      if (selectedVerses.length === 1 && chapter) {
        const verseData = chapter.verses.find(
          (v) => v.number === selectedVerses[0]
        );
        if (verseData && shouldAddEllipsis(customText, verseData.text)) {
          textToCopy = textToCopy + '[...]';
        }
        reference = `${selectedBook} ${selectedChapter}:${selectedVerses[0]}`;
      } else {
        const firstVerse = Math.min(...selectedVerses);
        const lastVerse = Math.max(...selectedVerses);
        reference = `${selectedBook} ${selectedChapter}:${firstVerse}-${lastVerse}`;
      }
    } else if (verseNumber && verseText) {
      // Cópia de versículo único
      textToCopy = verseText;
      reference = `${selectedBook} ${selectedChapter}:${verseNumber}`;
    } else {
      return;
    }

    const versionAbbr =
      bibleVersions
        .find((v) => v.abbreviation === selectedVersion)
        ?.abbreviation.toUpperCase() || selectedVersion.toUpperCase();
    const formattedText = `"${textToCopy}" - ${reference} [${versionAbbr}]`;

    try {
      await navigator.clipboard.writeText(formattedText);
    } catch (error) {}
  };

  // Detectar Ctrl+C melhorado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        const selection = window.getSelection();
        const selectedText = selection?.toString().trim();

        if (selectedText && selectedVerses.length > 0) {
          event.preventDefault();
          copyVerseWithReference(undefined, undefined, selectedText);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    selectedVerses,
    selectedBook,
    selectedChapter,
    selectedVersion,
    bibleVersions,
  ]);

  // Filtrar livros por testamento
  const oldTestamentBooks = bibleBooks.filter(
    (book) => book.testament === 'old'
  );
  const newTestamentBooks = bibleBooks.filter(
    (book) => book.testament === 'new'
  );

  const structuredData = generateStructuredData();

  return (
    <>
      <Helmet>
        {/* Meta tags básicas */}
        <title>{generatePageTitle()}</title>
        <meta name='description' content={generatePageDescription()} />
        <meta
          name='keywords'
          content={`${selectedBook}, ${selectedBook} ${selectedChapter}, Bíblia online, ${getVersionFullName(
            selectedVersion
          )}, estudo bíblico, leitura bíblica, versículos, ${
            bibleBooks.find((book) => book.name === selectedBook)?.testament ===
            'old'
              ? 'Antigo Testamento'
              : 'Novo Testamento'
          }`}
        />

        {/* Open Graph para redes sociais */}
        <meta property='og:title' content={generatePageTitle()} />
        <meta property='og:description' content={generatePageDescription()} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={window.location.href} />
        <meta
          property='og:image'
          content={`${window.location.origin}/seo.png`}
        />
        <meta property='og:site_name' content='Graça e Leitura' />
        <meta property='og:locale' content='pt_BR' />

        {/* Twitter Cards */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={generatePageTitle()} />
        <meta name='twitter:description' content={generatePageDescription()} />
        <meta
          name='twitter:image'
          content={`${window.location.origin}/seo.png`}
        />

        {/* Meta tags específicas */}
        <meta name='author' content='Escritor Bíblico' />
        <meta name='robots' content='index, follow, max-image-preview:large' />
        <meta name='googlebot' content='index, follow' />
        <link rel='canonical' href={window.location.href} />

        {/* Structured Data */}
        {structuredData && (
          <script type='application/ld+json'>
            {JSON.stringify(structuredData)}
          </script>
        )}

        {/* Meta tags para Bible-specific SEO */}
        <meta name='bible:book' content={selectedBook} />
        <meta name='bible:chapter' content={selectedChapter.toString()} />
        <meta name='bible:version' content={selectedVersion.toUpperCase()} />
        <meta
          name='bible:testament'
          content={
            bibleBooks.find((book) => book.name === selectedBook)?.testament ===
            'old'
              ? 'OT'
              : 'NT'
          }
        />
      </Helmet>

      <div className='container mx-auto p-4 max-w-7xl'>
        {/* Layout responsivo: componentes à esquerda no desktop, texto à direita */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Sidebar com controles - à esquerda no desktop */}
          <div className='lg:col-span-4 space-y-6'>
            {/* Cabeçalho */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl'>
                  <Book className='h-5 w-5 text-bible-accent' />
                  Leitura da Bíblia
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Busca no Capítulo */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Busca no Capítulo</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  Pesquise palavras ou frases dentro do capítulo atual
                </p>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                    <input
                      type='text'
                      placeholder={`Buscar em ${selectedBook} ${selectedChapter}...`}
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className='w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-bible-accent focus:border-transparent bg-background text-foreground border-border text-sm'
                    />
                    {searchTerm && (
                      <Button
                        variant='ghost'
                        size='sm'
                        className='absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0'
                        onClick={() => handleSearch('')}
                      >
                        <X className='h-3 w-3' />
                      </Button>
                    )}
                  </div>
                  {searchResults.length > 0 && (
                    <Badge variant='outline' className='text-xs'>
                      {searchResults.length} resultado
                      {searchResults.length !== 1 ? 's' : ''} encontrado
                      {searchResults.length !== 1 ? 's' : ''} no capítulo
                    </Badge>
                  )}
                  {searchTerm && searchResults.length === 0 && (
                    <p className='text-sm text-muted-foreground'>
                      Nenhum resultado encontrado para "{searchTerm}" neste
                      capítulo
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Controles de Seleção */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Seleção</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Seleção de Livro */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Livro</label>
                  <div className='flex flex-col gap-2'>
                    <Select
                      value={selectedBook}
                      onValueChange={(value) => changeChapter(value, 1)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Antigo Testamento</SelectLabel>
                          {oldTestamentBooks.map((book) => (
                            <SelectItem key={book.name} value={book.name}>
                              {book.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Novo Testamento</SelectLabel>
                          {newTestamentBooks.map((book) => (
                            <SelectItem key={book.name} value={book.name}>
                              {book.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setShowBookSelector(!showBookSelector)}
                      className='text-bible-accent w-full justify-center text-xs sm:text-sm'
                    >
                      {showBookSelector ? (
                        <ChevronUp size={14} className='flex-shrink-0' />
                      ) : (
                        <ChevronDown size={14} className='flex-shrink-0' />
                      )}
                      <span className='ml-1 truncate'>
                        {showBookSelector
                          ? 'Ocultar livros'
                          : 'Mostrar todos os livros'}
                      </span>
                    </Button>
                  </div>

                  {/* Interface expandida de seleção de livros */}
                  {showBookSelector && (
                    <div className='border rounded-md p-3 sm:p-4 space-y-3 w-full overflow-hidden'>
                      <div className='flex items-center space-x-2'>
                        <Search className='h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0' />
                        <Input
                          placeholder='Pesquisar livros...'
                          value={bookSearchTerm}
                          onChange={(e) => setBookSearchTerm(e.target.value)}
                          className='flex-1 min-w-0 text-xs sm:text-sm'
                        />
                      </div>

                      <div className='grid grid-cols-2 gap-3 max-h-60 overflow-y-auto'>
                        {filteredBooks.map((book) => {
                          const isSelected = selectedBook === book.name;

                          return (
                            <div
                              key={book.name}
                              className='flex items-center space-x-2 min-w-0'
                            >
                              <Checkbox
                                id={`book-${book.name}`}
                                checked={isSelected}
                                onCheckedChange={() =>
                                  changeChapter(book.name, 1)
                                }
                                className='flex-shrink-0'
                              />
                              <Label
                                htmlFor={`book-${book.name}`}
                                className={`text-xs sm:text-sm cursor-pointer min-w-0 flex-1 ${
                                  book.testament === 'old'
                                    ? 'text-amber-700'
                                    : 'text-blue-700'
                                } ${isSelected ? 'font-bold' : ''}`}
                              >
                                <span className='truncate block'>
                                  {book.name}
                                </span>
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Seleção de Capítulo */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Capítulo</label>
                  <div className='flex flex-col gap-2'>
                    <Select
                      value={selectedChapter.toString()}
                      onValueChange={(value) =>
                        changeChapter(selectedBook, parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: maxChapters },
                          (_, i) => i + 1
                        ).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            Capítulo {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setShowAllChapters(!showAllChapters)}
                      className='text-bible-accent w-full justify-center text-xs sm:text-sm'
                    >
                      {showAllChapters ? (
                        <ChevronUp size={14} className='flex-shrink-0' />
                      ) : (
                        <ChevronDown size={14} className='flex-shrink-0' />
                      )}
                      <span className='ml-1 truncate'>
                        {showAllChapters
                          ? 'Ocultar capítulos'
                          : 'Mostrar todos os capítulos'}
                      </span>
                    </Button>
                  </div>

                  {/* Interface expandida de seleção de capítulos */}
                  {showAllChapters && (
                    <div className='border rounded-md p-3 sm:p-4 space-y-3 w-full overflow-hidden'>
                      <div className='grid grid-cols-3 gap-2 max-h-60 overflow-y-auto'>
                        {Array.from(
                          { length: maxChapters },
                          (_, i) => i + 1
                        ).map((num) => (
                          <Button
                            key={num}
                            variant={
                              selectedChapter === num ? 'default' : 'outline'
                            }
                            size='sm'
                            onClick={() => changeChapter(selectedBook, num)}
                            className='text-xs sm:text-sm h-8 sm:h-9'
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Seleção de Versão */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Versão</label>
                  <Select
                    value={selectedVersion}
                    onValueChange={setSelectedVersion}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {bibleVersions.map((version) => (
                        <SelectItem
                          key={version.abbreviation}
                          value={version.abbreviation}
                        >
                          {formatVersionName(version.abbreviation)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Navegação */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Navegação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={goToPreviousChapter}
                    disabled={
                      selectedBook === 'Gênesis' && selectedChapter === 1
                    }
                    className='flex-1'
                  >
                    <ChevronLeft className='h-4 w-4 mr-1' />
                    Anterior
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={goToNextChapter}
                    disabled={
                      selectedBook === 'Apocalipse' && selectedChapter === 22
                    }
                    className='flex-1'
                  >
                    Próximo
                    <ChevronRight className='h-4 w-4 ml-1' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal - texto da Bíblia à direita */}
          <div className='lg:col-span-8'>
            {/* Conteúdo dos Versículos */}
            <Card>
              <CardHeader>
                <CardTitle className='text-2xl'>
                  {selectedBook} {selectedChapter}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className='text-center py-8'>
                    <p className='text-muted-foreground'>
                      Carregando capítulo...
                    </p>
                  </div>
                ) : chapter && isContentVisible ? (
                  <div
                    ref={contentRef}
                    className='space-y-4 relative opacity-100'
                    onMouseUp={handleTextSelection}
                  >
                    {/* Indicador de seleção única */}
                    {selectedVerses.length === 1 && selectedText && (
                      <div className='fixed top-4 right-4 z-40 animate-fade-in'>
                        <div className='bg-bible-accent/10 border border-bible-accent/20 rounded-lg px-3 py-2 text-sm text-bible-accent'>
                          <div className='flex items-center gap-2'>
                            <span className='w-2 h-2 bg-bible-accent rounded-full'></span>
                            Versículo {selectedVerses[0]} selecionado
                          </div>
                          <div className='text-xs text-muted-foreground mt-1'>
                            Selecione múltiplos versículos para mais opções
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Multiple verse selection message removed - formatting available for everyone */}

                    {/* Menu flutuante para múltiplos versículos selecionados */}
                    {selectedVerses.length > 1 &&
                      selectedText && (
                        <div
                          className='fixed top-1/2 right-4 transform -translate-y-1/2 z-50 animate-fade-in'
                          data-floating-menu
                        >
                          <Card className='shadow-sm border border-border/30 bg-background/80 backdrop-blur-md'>
                            <CardHeader className='pb-1 pt-3 px-3'>
                              <CardTitle className='text-xs flex items-center gap-1.5 text-muted-foreground'>
                                <Palette className='h-3 w-3' />
                                Formatar {selectedVerses.length} versículos
                              </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-2 px-3 pb-3'>
                              {/* Botões de formatação de texto */}
                              <div className='flex gap-1'>
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className='h-7 w-7 p-0 hover:bg-muted/50'
                                  onClick={() =>
                                    applyFormattingToMultipleVerses(
                                      selectedVerses,
                                      {
                                        bold: true,
                                      }
                                    )
                                  }
                                  title='Negrito'
                                >
                                  <Bold className='h-3.5 w-3.5' />
                                </Button>
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className='h-7 w-7 p-0 hover:bg-muted/50'
                                  onClick={() =>
                                    applyFormattingToMultipleVerses(
                                      selectedVerses,
                                      {
                                        italic: true,
                                      }
                                    )
                                  }
                                  title='Itálico'
                                >
                                  <Italic className='h-3.5 w-3.5' />
                                </Button>
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className='h-7 w-7 p-0 hover:bg-muted/50'
                                  onClick={() =>
                                    applyFormattingToMultipleVerses(
                                      selectedVerses,
                                      {
                                        underline: true,
                                      }
                                    )
                                  }
                                  title='Sublinhado'
                                >
                                  <Underline className='h-3.5 w-3.5' />
                                </Button>
                              </div>

                              {/* Cores predefinidas */}
                              <div>
                                <div className='text-xs font-medium text-muted-foreground mb-1.5'>
                                  Cores
                                </div>
                                <div className='grid grid-cols-3 gap-1 mb-1.5'>
                                  {formatColors.map((color) => (
                                    <Button
                                      key={color.name}
                                      size='sm'
                                      variant='ghost'
                                      className='h-6 w-6 p-0 border border-border/50 rounded hover:scale-105 transition-transform'
                                      style={{
                                        backgroundColor: color.bg,
                                        borderColor: color.text,
                                      }}
                                      onClick={() =>
                                        applyFormattingToMultipleVerses(
                                          selectedVerses,
                                          {
                                            backgroundColor: color.bg,
                                            textColor: color.text,
                                          }
                                        )
                                      }
                                      title={color.name}
                                    />
                                  ))}
                                </div>

                                {/* Color picker personalizado */}
                                <div className='flex items-center gap-1 mb-1.5'>
                                  <input
                                    type='color'
                                    className='w-6 h-6 border border-border/50 rounded cursor-pointer hover:scale-105 transition-transform'
                                    onChange={(e) => {
                                      const selectedColor = e.target.value;
                                      const textColor =
                                        getContrastColor(selectedColor);
                                      applyFormattingToMultipleVerses(
                                        selectedVerses,
                                        {
                                          backgroundColor: selectedColor + '40',
                                          textColor: textColor,
                                        }
                                      );
                                    }}
                                    title='Selecionar cor personalizada'
                                  />
                                  <span className='text-xs text-muted-foreground ml-1'>
                                    Personalizada
                                  </span>
                                </div>
                              </div>

                              {/* Botões de ação */}
                              <div className='space-y-0.5'>
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className='flex items-center gap-1 text-xs px-2 py-1 h-6 w-full hover:bg-muted/50'
                                  onClick={() =>
                                    clearColorsFromMultipleVerses(
                                      selectedVerses
                                    )
                                  }
                                  title='Limpar cores'
                                >
                                  <Trash2 className='h-3 w-3' />
                                  Limpar Cores
                                </Button>
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className='flex items-center gap-1 text-xs px-2 py-1 h-6 w-full hover:bg-muted/50'
                                  onClick={() =>
                                    clearAllFormattingFromMultipleVerses(
                                      selectedVerses
                                    )
                                  }
                                  title='Limpar toda formatação'
                                >
                                  <Eraser className='h-3 w-3' />
                                  Limpar Tudo
                                </Button>
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className='flex items-center gap-1 text-xs px-2 py-1 h-6 w-full hover:bg-muted/50'
                                  onClick={() =>
                                    copyVerseWithReference(
                                      undefined,
                                      undefined,
                                      selectedText
                                    )
                                  }
                                  title='Copiar versículos selecionados'
                                >
                                  <Copy className='h-3 w-3' />
                                  Copiar
                                </Button>
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className='flex items-center gap-1 text-xs px-2 py-1 h-6 w-full hover:bg-muted/50'
                                  onClick={() => {
                                    setSelectedText('');
                                    setSelectedVerses([]);
                                    window.getSelection()?.removeAllRanges();
                                  }}
                                  title='Fechar menu'
                                >
                                  <X className='h-3 w-3' />
                                  Fechar
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}

                    {chapter.verses.map((verse) => {
                      const formatting = getVerseFormatting(verse.number);
                      const isSearchResult = searchResults.includes(
                        verse.number
                      );
                      const isSelected = selectedVerses.includes(verse.number);
                      const verseStyle = {
                        fontWeight: formatting.bold ? 'bold' : 'normal',
                        fontStyle: formatting.italic ? 'italic' : 'normal',
                        textDecoration: formatting.underline
                          ? 'underline'
                          : 'none',
                        backgroundColor: formatting.backgroundColor,
                        color: formatting.textColor,
                        padding:
                          formatting.backgroundColor !== 'transparent'
                            ? '4px 8px'
                            : '0',
                        borderRadius:
                          formatting.backgroundColor !== 'transparent'
                            ? '4px'
                            : '0',
                        display: 'inline',
                      };

                      return (
                        <div
                          key={verse.number}
                          className={`group relative ${
                            isSearchResult
                              ? 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 pl-2 py-1 rounded-r'
                              : ''
                          } ${
                            isSelected && selectedVerses.length > 1
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 pl-2 py-1 rounded-r'
                              : ''
                          }`}
                        >
                          <div className='flex gap-3'>
                            <span
                              className={`font-bold text-sm mt-1 select-none ${
                                isSearchResult
                                  ? 'text-yellow-600 dark:text-yellow-400'
                                  : 'text-bible-accent'
                              }`}
                            >
                              {verse.number}
                            </span>
                            <div className='flex-1'>
                              <span
                                data-verse-number={verse.number}
                                style={verseStyle}
                                className='leading-relaxed cursor-text'
                              >
                                {searchTerm
                                  ? highlightSearchTerm(verse.text, searchTerm)
                                  : verse.text}
                              </span>
                            </div>
                          </div>

                          {/* Menu de opções simplificado */}
                          <div className='absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity'>
                            <DropdownMenu
                              onOpenChange={(open) =>
                                setOpenMenus((prev) => ({
                                  ...prev,
                                  [verse.number]: open,
                                }))
                              }
                            >
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size='sm'
                                  variant='ghost'
                                  className={`h-8 w-8 p-0 hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-bible-accent ${
                                    openMenus[verse.number]
                                      ? 'underline decoration-2 decoration-bible-accent underline-offset-2'
                                      : ''
                                  }`}
                                >
                                  <MoreVertical className='h-3 w-3' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end' className='w-48'>
                                <DropdownMenuItem
                                  onClick={() =>
                                    applyFormatting(verse.number, {
                                      bold: !formatting.bold,
                                    })
                                  }
                                  className='flex items-center gap-2'
                                >
                                  <Bold className='h-4 w-4' />
                                  {formatting.bold
                                    ? 'Remover Negrito'
                                    : 'Negrito'}
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    applyFormatting(verse.number, {
                                      italic: !formatting.italic,
                                    })
                                  }
                                  className='flex items-center gap-2'
                                >
                                  <Italic className='h-4 w-4' />
                                  {formatting.italic
                                    ? 'Remover Itálico'
                                    : 'Itálico'}
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    applyFormatting(verse.number, {
                                      underline: !formatting.underline,
                                    })
                                  }
                                  className='flex items-center gap-2'
                                >
                                  <Underline className='h-4 w-4' />
                                  {formatting.underline
                                    ? 'Remover Sublinhado'
                                    : 'Sublinhado'}
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                {/* Seletor de cores redesenhado */}
                                <div className='px-2 py-1'>
                                  <div className='text-xs font-medium text-muted-foreground mb-2'>
                                    Cores
                                  </div>

                                  {/* Cores predefinidas */}
                                  <div className='grid grid-cols-3 gap-1 mb-2'>
                                    {formatColors.map((color) => (
                                      <Button
                                        key={color.name}
                                        size='sm'
                                        variant='outline'
                                        className='h-8 w-8 p-0 border-2 rounded'
                                        style={{
                                          backgroundColor: color.bg,
                                          borderColor: color.text,
                                        }}
                                        onClick={() =>
                                          applyFormatting(verse.number, {
                                            backgroundColor: color.bg,
                                            textColor: color.text,
                                          })
                                        }
                                        title={color.name}
                                      />
                                    ))}
                                  </div>

                                  {/* Color picker personalizado */}
                                  <div className='flex items-center gap-1 mb-2'>
                                    <input
                                      type='color'
                                      className='w-8 h-8 border border-border rounded cursor-pointer'
                                      onChange={(e) => {
                                        const selectedColor =
                                          e.target.value;
                                        // Determinar cor do texto baseada na luminosidade
                                        const textColor =
                                          getContrastColor(selectedColor);
                                        applyFormatting(verse.number, {
                                          backgroundColor:
                                            selectedColor + '40', // Adiciona transparência
                                          textColor: textColor,
                                        });
                                      }}
                                      title='Selecionar cor personalizada'
                                    />
                                    <span className='text-xs text-muted-foreground ml-1'>
                                      Personalizada
                                    </span>
                                  </div>

                                  {/* Botões de ação */}
                                  <div className='space-y-1'>
                                    <Button
                                      size='sm'
                                      variant='outline'
                                      className='flex items-center gap-1 text-xs px-2 py-1 h-7 w-full'
                                      onClick={() =>
                                        clearColors(verse.number)
                                      }
                                      title='Limpar cores'
                                    >
                                      <Trash2 className='h-3 w-3' />
                                      Limpar Cores
                                    </Button>
                                    <Button
                                      size='sm'
                                      variant='outline'
                                      className='flex items-center gap-1 text-xs px-2 py-1 h-7 w-full'
                                      onClick={() =>
                                        clearAllFormatting(verse.number)
                                      }
                                      title='Limpar toda formatação'
                                    >
                                      <Eraser className='h-3 w-3' />
                                      Limpar Tudo
                                    </Button>
                                  </div>
                                </div>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  onClick={() =>
                                    copyVerseWithReference(
                                      verse.number,
                                      verse.text
                                    )
                                  }
                                  className='flex items-center gap-2'
                                >
                                  <Copy className='h-4 w-4' />
                                  Copiar Versículo
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className='text-center text-muted-foreground py-8'>
                    Carregando capítulo...
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Navegação entre capítulos no final */}
            <Card className='mt-6'>
              <CardContent className='pt-6'>
                <div className='flex items-center justify-between'>
                  <Button
                    variant='outline'
                    onClick={goToPreviousChapter}
                    disabled={
                      selectedBook === 'Gênesis' && selectedChapter === 1
                    }
                    className='flex items-center gap-2'
                  >
                    <ChevronLeft className='h-4 w-4' />
                    Anterior
                  </Button>

                  <Button
                    variant='outline'
                    onClick={goToNextChapter}
                    disabled={
                      selectedBook === 'Apocalipse' && selectedChapter === 22
                    }
                    className='flex items-center gap-2'
                  >
                    Próximo
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BibleReader;
