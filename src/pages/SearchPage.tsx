import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { normalizeAuthorName, normalizeVerses } from '@/utils/bibleNormalizer';
import { useBibleApi } from '@/hooks/useBibleApi';
import {
  Search,
  X,
  BookOpen,
  Loader2,
  Copy,
  Filter,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { bibliaApiService } from '@/services/bibliaApiService';
import {
  formatVersionName,
  getVersionFullName,
} from '@/utils/bibleVersionsMap';

interface Verse {
  book: {
    abbrev: { pt: string; en: string };
    name: string;
    author: string;
    chapters: number;
    group: string;
    testament: string;
  };
  chapter: number;
  number: number;
  text: string;
}

interface SearchResponse {
  occurrence: number;
  version: string;
  verses: Verse[];
}

interface BibleVersion {
  abbreviation: string;
  name: string;
}

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(
    null
  );
  const [displayedVerses, setDisplayedVerses] = useState<Verse[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string>('nvi');
  const [bibleVersions, setBibleVersions] = useState<BibleVersion[]>([
    { abbreviation: 'nvi', name: 'Nova Versão Internacional' },
    { abbreviation: 'acf', name: 'Almeida Corrigida Fiel' },
  ]);

  const { fetchWithNormalization } = useBibleApi();

  // Filtros
  const [selectedTestament, setSelectedTestament] = useState<
    'all' | 'VT' | 'NT'
  >('all');
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isTestamentOpen, setIsTestamentOpen] = useState(true);
  const [isBooksOpen, setIsBooksOpen] = useState(false);
  const [isAuthorsOpen, setIsAuthorsOpen] = useState(false);

  const versesPerPage = 10;

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

  // Filtrar versículos baseado nos filtros selecionados
  const filteredVerses = useMemo(() => {
    if (!searchResults) return [];

    let filtered = searchResults.verses;

    // Filtro por testamento
    if (selectedTestament !== 'all') {
      filtered = filtered.filter(
        (verse) => verse.book.testament === selectedTestament
      );
    }

    // Filtro por livros
    if (selectedBooks.length > 0) {
      filtered = filtered.filter((verse) =>
        selectedBooks.includes(verse.book.name)
      );
    }

    // Filtro por autores
    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((verse) => {
        const author = normalizeAuthorName(verse.book.author);
        return selectedAuthors.includes(author);
      });
    }

    return filtered;
  }, [searchResults, selectedTestament, selectedBooks, selectedAuthors]);

  // Obter lista única de livros dos resultados
  const availableBooks = useMemo(() => {
    if (!searchResults) return [];

    const books = searchResults.verses.map((verse) => verse.book);
    const uniqueBooks = books.filter(
      (book, index, self) =>
        index === self.findIndex((b) => b.name === book.name)
    );

    return uniqueBooks.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchResults]);

  // Obter lista única de autores dos resultados
  const availableAuthors = useMemo(() => {
    if (!searchResults) return [];

    const authors = searchResults.verses.map((verse) => {
      const author = normalizeAuthorName(verse.book.author);
      return { name: author, testament: verse.book.testament };
    });

    const uniqueAuthors = authors.filter(
      (author, index, self) =>
        index === self.findIndex((a) => a.name === author.name)
    );

    return uniqueAuthors.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchResults]);

  // Atualizar versículos exibidos quando os filtros mudam
  useEffect(() => {
    if (filteredVerses.length > 0) {
      const initialVerses = filteredVerses.slice(0, versesPerPage);
      setDisplayedVerses(initialVerses);
      setHasMoreToLoad(filteredVerses.length > versesPerPage);
      setCurrentPage(1);
    } else if (searchResults) {
      setDisplayedVerses([]);
      setHasMoreToLoad(false);
      setCurrentPage(0);
    }
  }, [filteredVerses, versesPerPage, searchResults]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setCurrentPage(0);
    setDisplayedVerses([]);

    try {
      const data = await bibliaApiService.searchVerses(
        selectedVersion,
        searchTerm.trim()
      );

      if (data && data.verses && Array.isArray(data.verses)) {
        const normalizedResults = data.verses.map((verse: any) => ({
          book: { name: verse.book?.name || 'Livro desconhecido' },
          chapter: verse.chapter || 0,
          number: verse.number || 0,
          text: verse.text || '',
          version: selectedVersion,
        }));
        setSearchResults(data);
        setDisplayedVerses(normalizedResults.slice(0, versesPerPage));
        setHasMoreToLoad(data.verses.length > versesPerPage);
        setCurrentPage(1);
      } else {
        setSearchResults(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao buscar versículos'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults(null);
    setDisplayedVerses([]);
    setCurrentPage(0);
    setHasMoreToLoad(false);
    setIsLoading(false);
    setIsLoadingMore(false);
    setError(null);
    setIsFiltersOpen(false);
    setIsTestamentOpen(true);
    setIsBooksOpen(false);
    clearFilters();
  };

  const clearFilters = () => {
    setSelectedTestament('all');
    setSelectedBooks([]);
    setSelectedAuthors([]);
  };

  const handleTestamentChange = (testament: 'all' | 'VT' | 'NT') => {
    setSelectedTestament(testament);
  };

  const handleBookToggle = (bookName: string) => {
    setSelectedBooks((prev) =>
      prev.includes(bookName)
        ? prev.filter((name) => name !== bookName)
        : [...prev, bookName]
    );
  };

  const handleAuthorToggle = (authorName: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorName)
        ? prev.filter((name) => name !== authorName)
        : [...prev, authorName]
    );
  };

  const getTestamentCounts = () => {
    if (!searchResults) return { VT: 0, NT: 0 };

    let vtCount = 0;
    let ntCount = 0;

    searchResults.verses.forEach((verse) => {
      // Aplicar filtros de livros
      if (
        selectedBooks.length > 0 &&
        !selectedBooks.includes(verse.book.name)
      ) {
        return;
      }

      // Aplicar filtros de autores
      if (selectedAuthors.length > 0) {
        const author = normalizeAuthorName(verse.book.author);
        if (!selectedAuthors.includes(author)) {
          return;
        }
      }

      if (verse.book.testament === 'VT') {
        vtCount++;
      } else if (verse.book.testament === 'NT') {
        ntCount++;
      }
    });

    return { VT: vtCount, NT: ntCount };
  };

  const getBookCounts = () => {
    if (!searchResults) return {};

    const counts: Record<string, number> = {};

    searchResults.verses.forEach((verse) => {
      // Aplicar filtros de testamento
      if (
        selectedTestament !== 'all' &&
        verse.book.testament !== selectedTestament
      ) {
        return;
      }

      // Aplicar filtros de autores
      if (selectedAuthors.length > 0) {
        const author = normalizeAuthorName(verse.book.author);
        if (!selectedAuthors.includes(author)) {
          return;
        }
      }

      counts[verse.book.name] = (counts[verse.book.name] || 0) + 1;
    });

    return counts;
  };

  const getAuthorCounts = () => {
    if (!searchResults) return {};

    const counts: Record<string, number> = {};

    searchResults.verses.forEach((verse) => {
      // Aplicar filtros de testamento
      if (
        selectedTestament !== 'all' &&
        verse.book.testament !== selectedTestament
      ) {
        return;
      }

      // Aplicar filtros de livros
      if (
        selectedBooks.length > 0 &&
        !selectedBooks.includes(verse.book.name)
      ) {
        return;
      }

      const author = normalizeAuthorName(verse.book.author);
      counts[author] = (counts[author] || 0) + 1;
    });

    return counts;
  };

  const loadMoreVerses = useCallback(() => {
    if (!filteredVerses || isLoadingMore || !hasMoreToLoad) return;

    setIsLoadingMore(true);

    // Simular um pequeno delay para suavidade
    setTimeout(() => {
      const startIndex = currentPage * versesPerPage;
      const endIndex = startIndex + versesPerPage;
      const newVerses = filteredVerses.slice(startIndex, endIndex);

      setDisplayedVerses((prev) => [...prev, ...newVerses]);
      setCurrentPage((prev) => prev + 1);
      setHasMoreToLoad(endIndex < filteredVerses.length);
      setIsLoadingMore(false);
    }, 300);
  }, [
    filteredVerses,
    currentPage,
    isLoadingMore,
    hasMoreToLoad,
    versesPerPage,
  ]);

  // Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 // Carrega quando está a 1000px do fim
      ) {
        loadMoreVerses();
      }
    };

    if (hasMoreToLoad) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [loadMoreVerses, hasMoreToLoad]);

  const formatVerseReference = (verse: Verse) => {
    return `${verse.book.name} ${verse.chapter}:${verse.number}`;
  };

  const highlightSearchTerm = (text: string, term: string) => {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, 'gi');
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

  const copyVerseToClipboard = async (verse: Verse) => {
    const verseText = `"${verse.text}" - ${formatVerseReference(verse)}`;
  };

  const testamentCounts = getTestamentCounts();
  const bookCounts = getBookCounts();
  const authorCounts = getAuthorCounts();

  return (
    <>
      <Helmet>
        <title>Pesquisa de Versículos Bíblicos | Graça e Leitura</title>
        <meta
          name='description'
          content='Pesquise versículos bíblicos por palavras-chave em múltiplas versões (NVI, ACF, etc.). Busca avançada com filtros por testamento, livros e autores. Encontre passagens específicas para seu estudo bíblico.'
        />
        <meta
          name='keywords'
          content='pesquisa bíblica, busca versículos, versículos por palavra-chave, NVI, ACF, múltiplas versões, busca bíblica, encontrar versículos, pesquisa escrituras, filtros bíblicos, testamento, livros bíblicos, autores bíblicos'
        />
        <link
          rel='canonical'
          href='https://biblia.gracaeleitura.com/pesquisa'
        />

        {/* Open Graph */}
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://biblia.gracaeleitura.com/pesquisa'
        />
        <meta
          property='og:title'
          content='Pesquisa de Versículos Bíblicos | Graça e Leitura'
        />
        <meta
          property='og:description'
          content='Pesquise versículos bíblicos por palavras-chave em múltiplas versões (NVI, ACF, etc.). Busca avançada com filtros por testamento, livros e autores.'
        />
        <meta
          property='og:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:url'
          content='https://biblia.gracaeleitura.com/pesquisa'
        />
        <meta
          name='twitter:title'
          content='Pesquisa de Versículos Bíblicos | Graça e Leitura'
        />
        <meta
          name='twitter:description'
          content='Pesquise versículos bíblicos por palavras-chave em múltiplas versões (NVI, ACF, etc.). Busca avançada com filtros por testamento, livros e autores.'
        />
        <meta
          name='twitter:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
      </Helmet>

      <div className='bible-container'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <BookOpen className='w-8 h-8 text-bible-accent' />
              <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-bible-text'>
                Pesquisar Versículos
              </h1>
            </div>
          </div>

          {/* Search Input */}
          <Card className='mb-8'>
            <CardContent className='p-6'>
              <div className='space-y-4'>
                {/* Seletor de Versão */}
                <div className='flex justify-center'>
                  <div className='w-full max-w-md flex flex-col items-center'>
                    <label
                      htmlFor='bible-version-search'
                      className='text-xs sm:text-sm font-medium text-bible-text mb-2 block'
                    >
                      Versão da Bíblia
                    </label>
                    <Select
                      value={selectedVersion}
                      onValueChange={setSelectedVersion}
                    >
                      <SelectTrigger
                        id='bible-version-search'
                        className='w-full'
                      >
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
                </div>

                {/* Campo de Busca */}
                <div className='flex gap-3'>
                  <div className='relative flex-1'>
                    <Input
                      type='text'
                      placeholder='Digite uma palavra ou frase'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className='pr-10 text-xs lg:text-sm h-12'
                    />
                    {searchTerm && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={clearSearch}
                        className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0'
                      >
                        <X className='w-4 h-4' />
                      </Button>
                    )}
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={!searchTerm.trim() || isLoading}
                    className='bg-bible-accent hover:bg-bible-accent/90 text-white dark:text-black h-12 px-6'
                    size='lg'
                  >
                    {isLoading ? (
                      <Loader2 className='w-5 h-5 animate-spin' />
                    ) : (
                      <Search className='w-5 h-5' />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Layout principal com sidebar de filtros */}
          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Filtros Mobile - Botão para abrir */}
            {searchResults && (
              <div className='lg:hidden'>
                <Button
                  variant='outline'
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className='w-full justify-between'
                >
                  <span className='flex items-center gap-2'>
                    <Filter className='w-4 h-4' />
                    Filtros
                    {(selectedTestament !== 'all' ||
                      selectedBooks.length > 0 ||
                      selectedAuthors.length > 0) && (
                      <Badge variant='secondary' className='ml-2'>
                        {selectedTestament !== 'all' ? 1 : 0} +{' '}
                        {selectedBooks.length} + {selectedAuthors.length}
                      </Badge>
                    )}
                  </span>
                  {isFiltersOpen ? (
                    <ChevronUp className='w-4 h-4' />
                  ) : (
                    <ChevronDown className='w-4 h-4' />
                  )}
                </Button>

                {isFiltersOpen && (
                  <Card className='mt-4'>
                    <CardHeader className='pb-4'>
                      <div className='flex items-center justify-between'>
                        <CardTitle className='flex items-center gap-2 text-bible-accent'>
                          <Filter className='w-5 h-5' />
                          Filtros
                        </CardTitle>
                        {(selectedTestament !== 'all' ||
                          selectedBooks.length > 0) && (
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={clearFilters}
                            className='text-xs hover:bg-bible-accent/10'
                          >
                            Limpar
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      {/* Conteúdo dos filtros mobile - mesmo que desktop */}
                      <Collapsible
                        open={isTestamentOpen}
                        onOpenChange={setIsTestamentOpen}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant='ghost'
                            className='w-full justify-between p-0 h-auto hover:bg-transparent'
                          >
                            <span className='font-medium'>Testamento</span>
                            {isTestamentOpen ? (
                              <ChevronUp className='w-4 h-4' />
                            ) : (
                              <ChevronDown className='w-4 h-4' />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className='space-y-2 mt-2'>
                          <div className='flex items-center space-x-2'>
                            <Checkbox
                              id='all-testament-mobile'
                              checked={selectedTestament === 'all'}
                              onCheckedChange={() =>
                                handleTestamentChange('all')
                              }
                            />
                            <label
                              htmlFor='all-testament-mobile'
                              className='text-sm cursor-pointer flex-1 flex justify-between'
                            >
                              <span>Todos</span>
                              <span className='text-bible-text/60'>
                                {searchResults.verses.length}
                              </span>
                            </label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <Checkbox
                              id='old-testament-mobile'
                              checked={selectedTestament === 'VT'}
                              onCheckedChange={() =>
                                handleTestamentChange('VT')
                              }
                            />
                            <label
                              htmlFor='old-testament-mobile'
                              className='text-sm cursor-pointer flex-1 flex justify-between'
                            >
                              <span>Antigo Testamento</span>
                              <span className='text-bible-text/60'>
                                {testamentCounts.VT}
                              </span>
                            </label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <Checkbox
                              id='new-testament-mobile'
                              checked={selectedTestament === 'NT'}
                              onCheckedChange={() =>
                                handleTestamentChange('NT')
                              }
                            />
                            <label
                              htmlFor='new-testament-mobile'
                              className='text-sm cursor-pointer flex-1 flex justify-between'
                            >
                              <span>Novo Testamento</span>
                              <span className='text-bible-text/60'>
                                {testamentCounts.NT}
                              </span>
                            </label>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      <Separator />

                      <Collapsible
                        open={isBooksOpen}
                        onOpenChange={setIsBooksOpen}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant='ghost'
                            className='w-full justify-between p-0 h-auto hover:bg-transparent'
                          >
                            <span className='font-medium'>
                              Livros{' '}
                              {selectedBooks.length > 0 &&
                                `(${selectedBooks.length})`}
                            </span>
                            {isBooksOpen ? (
                              <ChevronUp className='w-4 h-4' />
                            ) : (
                              <ChevronDown className='w-4 h-4' />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className='mt-2'>
                          <ScrollArea className='h-64'>
                            <div className='space-y-2 pr-4'>
                              {availableBooks.map((book) => (
                                <div
                                  key={`${book.name}-mobile`}
                                  className='flex items-center space-x-2'
                                >
                                  <Checkbox
                                    id={`book-${book.name}-mobile`}
                                    checked={selectedBooks.includes(book.name)}
                                    onCheckedChange={() =>
                                      handleBookToggle(book.name)
                                    }
                                  />
                                  <label
                                    htmlFor={`book-${book.name}-mobile`}
                                    className='text-sm cursor-pointer flex-1 flex justify-between'
                                  >
                                    <span>{book.name}</span>
                                    <div className='flex items-center gap-2'>
                                      <span className='text-bible-text/60'>
                                        {bookCounts[book.name]}
                                      </span>
                                      <Badge
                                        variant='outline'
                                        className='text-xs'
                                      >
                                        {book.testament === 'VT' ? 'AT' : 'NT'}
                                      </Badge>
                                    </div>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </CollapsibleContent>
                      </Collapsible>

                      <Separator />

                      <Collapsible
                        open={isAuthorsOpen}
                        onOpenChange={setIsAuthorsOpen}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant='ghost'
                            className='w-full justify-between p-0 h-auto hover:bg-transparent'
                          >
                            <span className='font-medium'>
                              Autores{' '}
                              {selectedAuthors.length > 0 &&
                                `(${selectedAuthors.length})`}
                            </span>
                            {isAuthorsOpen ? (
                              <ChevronUp className='w-4 h-4' />
                            ) : (
                              <ChevronDown className='w-4 h-4' />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className='mt-2'>
                          <ScrollArea className='h-64'>
                            <div className='space-y-2 pr-4'>
                              {availableAuthors.map((author) => (
                                <div
                                  key={`${author.name}-mobile`}
                                  className='flex items-center space-x-2'
                                >
                                  <Checkbox
                                    id={`author-${author.name}-mobile`}
                                    checked={selectedAuthors.includes(
                                      author.name
                                    )}
                                    onCheckedChange={() =>
                                      handleAuthorToggle(author.name)
                                    }
                                  />
                                  <label
                                    htmlFor={`author-${author.name}-mobile`}
                                    className='text-sm cursor-pointer flex-1 flex justify-between'
                                  >
                                    <span>{author.name}</span>
                                    <div className='flex items-center gap-2'>
                                      <span className='text-bible-text/60'>
                                        {authorCounts[author.name]}
                                      </span>
                                      <Badge
                                        variant='outline'
                                        className='text-xs'
                                      >
                                        {author.testament === 'VT'
                                          ? 'AT'
                                          : 'NT'}
                                      </Badge>
                                    </div>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </CollapsibleContent>
                      </Collapsible>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Sidebar de Filtros Desktop */}
            {searchResults && (
              <div className='hidden lg:block w-80 flex-shrink-0'>
                <Card className='sticky top-4'>
                  <CardHeader className='pb-4'>
                    <div className='flex items-center justify-between'>
                      <CardTitle className='flex items-center gap-2 text-bible-accent'>
                        <Filter className='w-5 h-5' />
                        Filtros
                      </CardTitle>
                      {(selectedTestament !== 'all' ||
                        selectedBooks.length > 0 ||
                        selectedAuthors.length > 0) && (
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={clearFilters}
                          className='text-xs hover:bg-bible-accent/10'
                        >
                          Limpar
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    {/* Filtro por Testamento */}
                    <Collapsible
                      open={isTestamentOpen}
                      onOpenChange={setIsTestamentOpen}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant='ghost'
                          className='w-full justify-between p-0 h-auto hover:bg-transparent'
                        >
                          <span className='font-medium'>Testamento</span>
                          {isTestamentOpen ? (
                            <ChevronUp className='w-4 h-4' />
                          ) : (
                            <ChevronDown className='w-4 h-4' />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className='space-y-2 mt-2'>
                        <div className='flex items-center space-x-2'>
                          <Checkbox
                            id='all-testament'
                            checked={selectedTestament === 'all'}
                            onCheckedChange={() => handleTestamentChange('all')}
                          />
                          <label
                            htmlFor='all-testament'
                            className='text-sm cursor-pointer flex-1 flex justify-between'
                          >
                            <span>Todos</span>
                            <span className='text-bible-text/60'>
                              {searchResults.verses.length}
                            </span>
                          </label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Checkbox
                            id='old-testament'
                            checked={selectedTestament === 'VT'}
                            onCheckedChange={() => handleTestamentChange('VT')}
                          />
                          <label
                            htmlFor='old-testament'
                            className='text-sm cursor-pointer flex-1 flex justify-between'
                          >
                            <span>Antigo Testamento</span>
                            <span className='text-bible-text/60'>
                              {testamentCounts.VT}
                            </span>
                          </label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Checkbox
                            id='new-testament'
                            checked={selectedTestament === 'NT'}
                            onCheckedChange={() => handleTestamentChange('NT')}
                          />
                          <label
                            htmlFor='new-testament'
                            className='text-sm cursor-pointer flex-1 flex justify-between'
                          >
                            <span>Novo Testamento</span>
                            <span className='text-bible-text/60'>
                              {testamentCounts.NT}
                            </span>
                          </label>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <Separator />

                    {/* Filtro por Livros */}
                    <Collapsible
                      open={isBooksOpen}
                      onOpenChange={setIsBooksOpen}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant='ghost'
                          className='w-full justify-between p-0 h-auto hover:bg-transparent'
                        >
                          <span className='font-medium'>
                            Livros{' '}
                            {selectedBooks.length > 0 &&
                              `(${selectedBooks.length})`}
                          </span>
                          {isBooksOpen ? (
                            <ChevronUp className='w-4 h-4' />
                          ) : (
                            <ChevronDown className='w-4 h-4' />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className='mt-2'>
                        <ScrollArea className='h-64'>
                          <div className='space-y-2 pr-4'>
                            {availableBooks.map((book) => (
                              <div
                                key={book.name}
                                className='flex items-center space-x-2'
                              >
                                <Checkbox
                                  id={`book-${book.name}`}
                                  checked={selectedBooks.includes(book.name)}
                                  onCheckedChange={() =>
                                    handleBookToggle(book.name)
                                  }
                                />
                                <label
                                  htmlFor={`book-${book.name}`}
                                  className='text-sm cursor-pointer flex-1 flex justify-between'
                                >
                                  <span>{book.name}</span>
                                  <div className='flex items-center gap-2'>
                                    <span className='text-bible-text/60'>
                                      {bookCounts[book.name]}
                                    </span>
                                    <Badge
                                      variant='outline'
                                      className='text-xs'
                                    >
                                      {book.testament === 'VT' ? 'AT' : 'NT'}
                                    </Badge>
                                  </div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CollapsibleContent>
                    </Collapsible>

                    <Separator />

                    {/* Filtro por Autores */}
                    <Collapsible
                      open={isAuthorsOpen}
                      onOpenChange={setIsAuthorsOpen}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant='ghost'
                          className='w-full justify-between p-0 h-auto hover:bg-transparent'
                        >
                          <span className='font-medium'>
                            Autores{' '}
                            {selectedAuthors.length > 0 &&
                              `(${selectedAuthors.length})`}
                          </span>
                          {isAuthorsOpen ? (
                            <ChevronUp className='w-4 h-4' />
                          ) : (
                            <ChevronDown className='w-4 h-4' />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className='mt-2'>
                        <ScrollArea className='h-64'>
                          <div className='space-y-2 pr-4'>
                            {availableAuthors.map((author) => (
                              <div
                                key={author.name}
                                className='flex items-center space-x-2'
                              >
                                <Checkbox
                                  id={`author-${author.name}`}
                                  checked={selectedAuthors.includes(
                                    author.name
                                  )}
                                  onCheckedChange={() =>
                                    handleAuthorToggle(author.name)
                                  }
                                />
                                <label
                                  htmlFor={`author-${author.name}`}
                                  className='text-sm cursor-pointer flex-1 flex justify-between'
                                >
                                  <span>{author.name}</span>
                                  <div className='flex items-center gap-2'>
                                    <span className='text-bible-text/60'>
                                      {authorCounts[author.name]}
                                    </span>
                                    <Badge
                                      variant='outline'
                                      className='text-xs'
                                    >
                                      {author.testament === 'VT' ? 'AT' : 'NT'}
                                    </Badge>
                                  </div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Conteúdo principal */}
            <div className='flex-1'>
              {/* Error State */}
              {error && (
                <Card className='border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 mb-6'>
                  <CardContent className='p-6'>
                    <div className='flex items-center gap-3'>
                      <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                      <p className='text-red-600 dark:text-red-400 font-medium'>
                        {error}
                      </p>
                    </div>
                    <p className='text-red-500 dark:text-red-300 text-sm mt-2'>
                      Tente novamente em alguns minutos ou verifique sua conexão
                      com a internet.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Results */}
              {searchResults && (
                <div className='space-y-6'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-2xl font-semibold text-bible-text'>
                      Resultados
                    </h2>
                    <div className='flex items-center gap-3'>
                      <Badge
                        variant='secondary'
                        className='bg-bible-accent/10 text-bible-accent text-xs px-3 py-1'
                      >
                        {searchResults.occurrence} ocorrências
                      </Badge>
                    </div>
                  </div>

                  {displayedVerses.length === 0 ? (
                    <Card>
                      <CardContent className='p-12 text-center'>
                        <BookOpen className='w-16 h-16 mx-auto mb-6 text-bible-text/30' />
                        <h3 className='text-xl font-medium text-bible-text/70 mb-2'>
                          Nenhum versículo encontrado
                        </h3>
                        <p className='text-bible-text/50'>
                          Não foram encontrados versículos para "{searchTerm}".
                          Tente usar outras palavras-chave.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className='grid gap-4'>
                      {displayedVerses.map((verse, index) => (
                        <Card
                          key={`${verse.book.name}-${verse.chapter}-${verse.number}`}
                          className='hover:shadow-lg transition-all duration-200 hover:border-bible-accent/20 animate-fade-in'
                          style={{
                            animationDelay: `${(index % versesPerPage) * 50}ms`,
                          }}
                        >
                          <CardHeader className='pb-3'>
                            <div className='flex items-center justify-between'>
                              <CardTitle className='text-lg font-semibold text-bible-accent'>
                                {formatVerseReference(verse)}
                              </CardTitle>
                              <div className='flex items-center gap-2'>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  onClick={() => copyVerseToClipboard(verse)}
                                  className='h-9 w-9 p-0 hover:bg-bible-accent/10'
                                  title='Copiar versículo'
                                >
                                  <Copy className='w-4 h-4' />
                                </Button>
                                <Badge variant='outline' className='text-xs'>
                                  {verse.book.testament === 'VT' ? 'AT' : 'NT'}
                                </Badge>
                                <Badge variant='outline' className='text-xs'>
                                  {verse.book.group}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className='pt-0'>
                            <p className='text-bible-text leading-relaxed text-lg mb-3'>
                              {highlightSearchTerm(verse.text, searchTerm)}
                            </p>
                            <div className='text-sm text-bible-text/60'>
                              <span className='font-medium'>Autor:</span>{' '}
                              {normalizeAuthorName(verse.book.author)}
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {/* Botão Carregar Mais */}
                      {hasMoreToLoad && !isLoadingMore && (
                        <div className='text-center py-6'>
                          <Button
                            onClick={loadMoreVerses}
                            variant='outline'
                            className='hover:bg-bible-accent/10 hover:border-bible-accent/30'
                          >
                            <Search className='w-4 h-4 mr-2' />
                            Carregar mais versículos
                          </Button>
                        </div>
                      )}

                      {/* Loading indicator para mais versículos */}
                      {isLoadingMore && (
                        <div className='flex items-center justify-center py-8'>
                          <div className='flex items-center gap-3 text-bible-text/70'>
                            <Loader2 className='w-5 h-5 animate-spin' />
                            <span>Carregando mais versículos...</span>
                          </div>
                        </div>
                      )}

                      {/* Indicador de fim dos resultados */}
                      {!hasMoreToLoad &&
                        displayedVerses.length > versesPerPage && (
                          <div className='text-center py-8'>
                            <div className='inline-flex items-center gap-2 px-4 py-2 bg-bible-accent/10 text-bible-accent rounded-full text-sm'>
                              <BookOpen className='w-4 h-4' />
                              <span>Todos os versículos foram carregados</span>
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              )}

              {/* Empty State */}
              {!searchResults && !error && !isLoading && (
                <div className='text-center py-16'>
                  <Search className='w-20 h-20 mx-auto mb-6 text-bible-text/20' />
                  <h3 className='text-2xl font-medium text-bible-text/70 mb-4'>
                    Comece sua pesquisa
                  </h3>
                  <p className='text-bible-text/50 max-w-lg mx-auto mb-8'>
                    Use o campo de pesquisa acima para encontrar versículos por
                    palavras-chave. Nossa base de dados contém toda a Bíblia na
                    versão NVI.
                  </p>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-3 max-w-lg mx-auto'>
                    {['amor', 'fé', 'esperança', 'paz'].map((term) => (
                      <Button
                        key={term}
                        variant='outline'
                        onClick={() => {
                          setSearchTerm(term);
                          setTimeout(() => handleSearch(), 100);
                        }}
                        className='hover:bg-bible-accent/10 hover:border-bible-accent/30'
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
