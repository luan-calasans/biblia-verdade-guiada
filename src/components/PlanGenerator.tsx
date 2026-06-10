import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  Calendar,
  Shuffle,
  X,
  ListOrdered,
  Clock,
  Target,
  Heart,
} from 'lucide-react';
import {
  generateReadingPlan,
  generateChapterBasedPlan,
  ReadingPlanEntry,
  getTestamentChapters,
  getTotalChapters,
  bibleBooks,
  BibleBook,
  getSelectedBooksChapters,
  getRandomBook,
  getTestamentVerses,
  getTotalVerses,
  getSelectedBooksVerses,
} from '@/utils/bibleData';
import PlanTable from './PlanTable';
import ThematicPlanGenerator from './ThematicPlanGenerator';
import ThematicPlanTable from './ThematicPlanTable';
import { ThematicPlan } from '@/utils/thematicPlans';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type PlanMode = 'duration' | 'chapters';
type PlanType = 'traditional' | 'thematic';

const PlanGenerator: React.FC = () => {
  const [planType, setPlanType] = useState<PlanType>('traditional');
  const [planMode, setPlanMode] = useState<PlanMode>('duration');
  const [timeValue, setTimeValue] = useState<number | ''>('');
  const [timeUnit, setTimeUnit] = useState<'days' | 'months' | 'year'>('days');
  const [chaptersPerPeriod, setChaptersPerPeriod] = useState<number | ''>('');
  const [includeOldTestament, setIncludeOldTestament] = useState<boolean>(true);
  const [includeNewTestament, setIncludeNewTestament] =
    useState<boolean>(false);
  const [readingPlan, setReadingPlan] = useState<ReadingPlanEntry[]>([]);
  const [thematicPlan, setThematicPlan] = useState<ThematicPlan | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<BibleBook[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showBookSelector, setShowBookSelector] = useState<boolean>(false);
  const [isChronological, setIsChronological] = useState<boolean>(false);
  const [recentlyAddedBook, setRecentlyAddedBook] = useState<BibleBook | null>(
    null
  );
  const [orderType, setOrderType] = useState<'chronological' | 'traditional'>(
    'traditional'
  );

  const handleGeneratePlan = () => {
    if (
      selectedBooks.length === 0 &&
      !includeOldTestament &&
      !includeNewTestament
    ) {
      toast.error(
        'Selecione pelo menos um testamento ou livros específicos para gerar o plano.'
      );
      return;
    }

    if (planMode === 'duration') {
      if (!timeValue || timeValue <= 0) {
        toast.error('O período de tempo deve ser maior que zero.');
        return;
      }

      const useChronological = orderType === 'chronological';

      const plan = generateReadingPlan(
        Number(timeValue),
        timeUnit,
        includeOldTestament,
        includeNewTestament,
        selectedBooks,
        useChronological
      );
      setReadingPlan(plan);
      setThematicPlan(null);
      setIsChronological(useChronological);
    } else {
      if (!chaptersPerPeriod || chaptersPerPeriod <= 0) {
        toast.error(
          'O número de capítulos por período deve ser maior que zero.'
        );
        return;
      }

      const useChronological = orderType === 'chronological';

      const plan = generateChapterBasedPlan(
        Number(chaptersPerPeriod),
        timeUnit,
        includeOldTestament,
        includeNewTestament,
        selectedBooks,
        useChronological
      );
      setReadingPlan(plan);
      setThematicPlan(null);
      setIsChronological(useChronological);
    }

    toast.success('Plano de leitura gerado com sucesso!');
  };

  const handleThematicPlanGenerated = (plan: ThematicPlan) => {
    setThematicPlan(plan);
    setReadingPlan([]);
  };

  const calculateVersesPerDay = (): string => {
    if (planMode === 'duration') {
      if (!timeValue || timeValue <= 0) return '0';

      let totalDays = Number(timeValue);
      if (timeUnit === 'months') totalDays = Number(timeValue) * 30;
      if (timeUnit === 'year') totalDays = Number(timeValue) * 365;

      let totalVerses = 0;
      if (selectedBooks.length > 0) {
        totalVerses = getSelectedBooksVerses(selectedBooks);
      } else {
        if (includeOldTestament) totalVerses += getTestamentVerses('old');
        if (includeNewTestament) totalVerses += getTestamentVerses('new');
      }

      if (totalDays === 0 || totalVerses === 0) return '0';
      return (totalVerses / totalDays).toFixed(1);
    } else {
      if (!chaptersPerPeriod || chaptersPerPeriod <= 0) return '0';

      let totalChapters = 0;
      if (selectedBooks.length > 0) {
        totalChapters = getSelectedBooksChapters(selectedBooks);
      } else {
        if (includeOldTestament) totalChapters += getTestamentChapters('old');
        if (includeNewTestament) totalChapters += getTestamentChapters('new');
      }

      const totalDays = Math.ceil(totalChapters / Number(chaptersPerPeriod));

      let totalVerses = 0;
      if (selectedBooks.length > 0) {
        totalVerses = getSelectedBooksVerses(selectedBooks);
      } else {
        if (includeOldTestament) totalVerses += getTestamentVerses('old');
        if (includeNewTestament) totalVerses += getTestamentVerses('new');
      }

      if (totalDays === 0 || totalVerses === 0) return '0';
      return (totalVerses / totalDays).toFixed(1);
    }
  };

  const calculateEstimatedDuration = (): string => {
    if (planMode === 'chapters' && chaptersPerPeriod && chaptersPerPeriod > 0) {
      let totalChapters = 0;
      if (selectedBooks.length > 0) {
        totalChapters = getSelectedBooksChapters(selectedBooks);
      } else {
        if (includeOldTestament) totalChapters += getTestamentChapters('old');
        if (includeNewTestament) totalChapters += getTestamentChapters('new');
      }

      const totalPeriods = Math.ceil(totalChapters / Number(chaptersPerPeriod));

      if (timeUnit === 'days') {
        return `${totalPeriods} dias`;
      } else if (timeUnit === 'months') {
        return `${totalPeriods} meses`;
      } else {
        return `${totalPeriods} anos`;
      }
    }
    return '';
  };

  const toggleBookSelection = (book: BibleBook) => {
    if (selectedBooks.some((b) => b.name === book.name)) {
      setSelectedBooks(selectedBooks.filter((b) => b.name !== book.name));
      if (recentlyAddedBook?.name === book.name) {
        setRecentlyAddedBook(null);
      }
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const handleSelectRandomBook = () => {
    const randomBook = getRandomBook();
    if (!selectedBooks.some((b) => b.name === randomBook.name)) {
      setSelectedBooks([...selectedBooks, randomBook]);
      setRecentlyAddedBook(randomBook);
      toast.success(`Livro adicionado: ${randomBook.name}`);
    } else {
      // Try again if the book is already selected
      handleSelectRandomBook();
    }
  };

  const clearSelection = () => {
    setSelectedBooks([]);
    setRecentlyAddedBook(null);
  };

  const removeRecentBook = () => {
    if (recentlyAddedBook) {
      setSelectedBooks(
        selectedBooks.filter((b) => b.name !== recentlyAddedBook.name)
      );
      setRecentlyAddedBook(null);
    }
  };

  const filteredBooks = bibleBooks.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Configurações à esquerda no desktop */}
      <div className='lg:col-span-5 space-y-6'>
        {/* Seleção do tipo de plano */}
        <Card className='bg-bible-white shadow-sm border-bible-gray animate-fade-in'>
          <CardHeader className='px-3 sm:px-4'>
            <CardTitle className='flex items-center gap-2 text-bible-accent text-base sm:text-lg'>
              <BookOpen className='h-4 w-4 sm:h-5 sm:w-5' />
              Escolha o Tipo de Plano
            </CardTitle>
            <CardDescription className='text-xs sm:text-sm'>
              Selecione entre um plano tradicional ou plano temático
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3 px-3 sm:px-4'>
            <ToggleGroup
              type='single'
              value={planType}
              onValueChange={(value) => {
                if (value) setPlanType(value as PlanType);
              }}
              className='flex flex-col sm:flex-row gap-2 justify-start w-full'
            >
              <ToggleGroupItem
                value='traditional'
                aria-label='Plano tradicional'
                className='w-full sm:w-auto justify-start px-2 py-1.5 text-xs sm:text-sm data-[state=on]:dark:text-black'
              >
                <BookOpen className='h-3 w-3 sm:h-4 sm:w-4 mr-1.5 flex-shrink-0' />
                <span className='truncate'>Plano Tradicional</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value='thematic'
                aria-label='Plano temático'
                className='w-full sm:w-auto justify-start px-2 py-1.5 text-xs sm:text-sm data-[state=on]:dark:text-black'
              >
                <Heart className='h-3 w-3 sm:h-4 sm:w-4 mr-1.5 flex-shrink-0' />
                <span className='truncate'>Plano Temático</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        {/* Configurações dos planos */}
        {planType === 'thematic' && (
          <ThematicPlanGenerator
            onPlanGenerated={handleThematicPlanGenerated}
          />
        )}
        {planType !== 'thematic' && (
          <Card className='bg-bible-white shadow-sm border-bible-gray animate-fade-in w-full'>
            <CardHeader className='px-3 sm:px-4'>
              <CardTitle className='flex items-center gap-2 text-bible-accent text-base sm:text-lg'>
                <BookOpen className='h-4 w-4 sm:h-5 sm:w-5' /> Gerar Plano de
                Leitura Bíblica
              </CardTitle>
              <CardDescription className='text-xs sm:text-sm'>
                Configure seu plano de leitura personalizado
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4 sm:space-y-5 px-3 sm:px-4'>
              {/* Modo do plano */}
              <div className='space-y-2'>
                <Label className='text-xs sm:text-sm font-medium'>
                  Tipo de plano
                </Label>
                <ToggleGroup
                  type='single'
                  value={planMode}
                  onValueChange={(value) => {
                    if (value) setPlanMode(value as PlanMode);
                  }}
                  className='flex flex-col sm:flex-row gap-2 justify-start w-full'
                >
                  <ToggleGroupItem
                    value='duration'
                    aria-label='Plano por duração'
                    className='w-full sm:w-auto justify-start px-2 py-1.5 text-xs sm:text-sm data-[state=on]:dark:text-black'
                  >
                    <Clock className='h-3 w-3 sm:h-4 sm:w-4 mr-1.5 flex-shrink-0' />
                    <span className='truncate'>Por duração</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='chapters'
                    aria-label='Plano por capítulos'
                    className='w-full sm:w-auto justify-start px-2 py-1.5 text-xs sm:text-sm data-[state=on]:dark:text-black'
                  >
                    <Target className='h-3 w-3 sm:h-4 sm:w-4 mr-1.5 flex-shrink-0' />
                    <span className='truncate'>Por capítulos</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Configuração do período */}
              <div className='space-y-3'>
                <div className='flex flex-col gap-3'>
                  <div className='w-full space-y-1.5'>
                    <Label
                      htmlFor='timeValue'
                      className='text-xs sm:text-sm font-medium'
                    >
                      {planMode === 'duration'
                        ? 'Período de Tempo'
                        : 'Capítulos por Período'}
                    </Label>
                    <Input
                      id='timeValue'
                      type='number'
                      min={1}
                      placeholder={
                        planMode === 'duration'
                          ? 'Informe o período'
                          : 'Quantos capítulos por período'
                      }
                      value={
                        planMode === 'duration' ? timeValue : chaptersPerPeriod
                      }
                      onChange={(e) => {
                        const value = e.target.value
                          ? Number(e.target.value)
                          : '';
                        if (planMode === 'duration') {
                          setTimeValue(value);
                        } else {
                          setChaptersPerPeriod(value);
                        }
                      }}
                      className='border-bible-gray focus:border-bible-accent w-full'
                    />
                  </div>
                  <div className='w-full space-y-1.5'>
                    <Label className='text-xs sm:text-sm font-medium'>
                      Unidade de Tempo
                    </Label>
                    <RadioGroup
                      value={timeUnit}
                      onValueChange={(val) =>
                        setTimeUnit(val as 'days' | 'months' | 'year')
                      }
                      className='flex flex-col sm:flex-row gap-2 sm:gap-4 justify-start'
                    >
                      <div className='flex items-center space-x-1.5'>
                        <RadioGroupItem value='days' id='days' />
                        <Label
                          htmlFor='days'
                          className='cursor-pointer text-xs sm:text-sm'
                        >
                          Dias
                        </Label>
                      </div>
                      <div className='flex items-center space-x-1.5'>
                        <RadioGroupItem value='months' id='months' />
                        <Label
                          htmlFor='months'
                          className='cursor-pointer text-xs sm:text-sm'
                        >
                          Meses
                        </Label>
                      </div>
                      <div className='flex items-center space-x-1.5'>
                        <RadioGroupItem value='year' id='year' />
                        <Label
                          htmlFor='year'
                          className='cursor-pointer text-xs sm:text-sm'
                        >
                          Anos
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Opção de ordenação */}
              <div className='space-y-2'>
                <Label className='text-xs sm:text-sm font-medium'>
                  Ordenação dos livros
                </Label>
                <ToggleGroup
                  type='single'
                  value={orderType}
                  onValueChange={(value) => {
                    if (value)
                      setOrderType(value as 'chronological' | 'traditional');
                  }}
                  className='flex flex-col sm:flex-row gap-2 justify-start w-full'
                >
                  <ToggleGroupItem
                    value='traditional'
                    aria-label='Ordem tradicional da Bíblia brasileira'
                    className='w-full sm:w-auto justify-start px-2 py-1.5 text-xs sm:text-sm data-[state=on]:dark:text-black'
                  >
                    <ListOrdered className='h-3 w-3 sm:h-4 sm:w-4 mr-1.5 flex-shrink-0' />
                    <span className='truncate'>Ordem tradicional</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='chronological'
                    aria-label='Ordem cronológica'
                    className='w-full sm:w-auto justify-start px-2 py-1.5 text-xs sm:text-sm data-[state=on]:dark:text-black'
                  >
                    <Calendar className='h-3 w-3 sm:h-4 sm:w-4 mr-1.5 flex-shrink-0' />
                    <span className='truncate'>Ordem cronológica</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Seleção de livros específicos */}
              <div className='space-y-2 w-full'>
                <div className='w-full'>
                  <Label className='text-xs sm:text-sm font-medium'>
                    Selecionar livros específicos
                  </Label>
                </div>
                <div className='flex flex-col sm:flex-row gap-2 w-full'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleSelectRandomBook}
                    className='text-bible-accent flex items-center gap-1.5 w-full sm:w-auto justify-center text-xs sm:text-sm'
                  >
                    <Shuffle className='h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0' />
                    <span className='truncate'>Livro aleatório</span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setShowBookSelector(!showBookSelector)}
                    className='text-bible-accent w-full sm:w-auto justify-center text-xs sm:text-sm'
                  >
                    {showBookSelector ? (
                      <ChevronUp size={14} className='flex-shrink-0' />
                    ) : (
                      <ChevronDown size={14} className='flex-shrink-0' />
                    )}
                    <span className='ml-1 truncate'>
                      {showBookSelector ? 'Ocultar livros' : 'Mostrar livros'}
                    </span>
                  </Button>
                </div>

                {/* Mostrar livro aleatório recentemente adicionado */}
                {recentlyAddedBook && (
                  <div className='flex items-start gap-2 p-2 sm:p-3 bg-bible-soft-green rounded-md w-full'>
                    <div className='flex-1 min-w-0'>
                      <div className='text-xs sm:text-sm font-medium'>
                        Livro aleatório adicionado:
                      </div>
                      <div className='text-xs sm:text-sm text-bible-text break-words'>
                        {recentlyAddedBook.name}
                        <span className='block sm:inline sm:ml-2 text-xs text-bible-text/70'>
                          ({recentlyAddedBook.testament === 'old' ? 'AT' : 'NT'}{' '}
                          - {recentlyAddedBook.chapters} capítulos)
                        </span>
                      </div>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={removeRecentBook}
                      className='hover:bg-bible-gray/20 flex-shrink-0 p-1'
                    >
                      <X className='h-3 w-3 sm:h-4 sm:w-4' />
                    </Button>
                  </div>
                )}

                {showBookSelector && (
                  <div className='border rounded-md p-3 sm:p-4 space-y-3 w-full overflow-hidden'>
                    <div className='flex items-center space-x-2'>
                      <Search className='h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0' />
                      <Input
                        placeholder='Pesquisar livros...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='flex-1 min-w-0 text-xs sm:text-sm'
                      />
                    </div>

                    <div className='flex flex-col sm:flex-row sm:justify-between gap-2'>
                      <span className='text-xs sm:text-sm text-muted-foreground'>
                        {selectedBooks.length} livros selecionados
                      </span>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={clearSelection}
                        className='text-xs sm:text-sm w-full sm:w-auto'
                      >
                        Limpar seleção
                      </Button>
                    </div>

                    <div className='grid grid-cols-2 gap-3 max-h-60 overflow-y-auto'>
                      {filteredBooks.map((book) => {
                        const isSelected = selectedBooks.some(
                          (b) => b.name === book.name
                        );
                        const isRecentRandom =
                          recentlyAddedBook?.name === book.name;

                        return (
                          <div
                            key={book.name}
                            className='flex items-center space-x-2 min-w-0'
                          >
                            <Checkbox
                              id={`book-${book.name}`}
                              checked={isSelected}
                              onCheckedChange={() => toggleBookSelection(book)}
                              className='flex-shrink-0'
                            />
                            <Label
                              htmlFor={`book-${book.name}`}
                              className={`text-xs sm:text-sm cursor-pointer min-w-0 flex-1 ${
                                book.testament === 'old'
                                  ? 'text-amber-700'
                                  : 'text-blue-700'
                              } ${isRecentRandom ? 'font-bold' : ''}`}
                            >
                              <span className='truncate block'>
                                {book.name}
                              </span>
                              {isRecentRandom && (
                                <span className='inline-block bg-bible-accent/20 text-xs px-1 py-0.5 rounded mt-1'>
                                  aleatório
                                </span>
                              )}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Seleção de testamentos */}
              <div className='space-y-2'>
                <Label className='text-xs sm:text-sm font-medium'>
                  Ou selecione os testamentos
                </Label>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-start space-x-1.5'>
                    <Checkbox
                      id='oldTestament'
                      checked={includeOldTestament}
                      onCheckedChange={(c) => {
                        setIncludeOldTestament(!!c);
                        if (!!c && selectedBooks.length > 0) {
                          setSelectedBooks([]);
                          setRecentlyAddedBook(null);
                        }
                      }}
                      disabled={selectedBooks.length > 0}
                      className='flex-shrink-0 mt-0.5'
                    />
                    <Label
                      htmlFor='oldTestament'
                      className='cursor-pointer text-xs sm:text-sm leading-relaxed'
                    >
                      Antigo Testamento ({getTestamentChapters('old')}{' '}
                      capítulos, {getTestamentVerses('old').toLocaleString()}{' '}
                      versículos)
                    </Label>
                  </div>
                  <div className='flex items-start space-x-1.5'>
                    <Checkbox
                      id='newTestament'
                      checked={includeNewTestament}
                      onCheckedChange={(c) => {
                        setIncludeNewTestament(!!c);
                        if (!!c && selectedBooks.length > 0) {
                          setSelectedBooks([]);
                          setRecentlyAddedBook(null);
                        }
                      }}
                      disabled={selectedBooks.length > 0}
                      className='flex-shrink-0 mt-0.5'
                    />
                    <Label
                      htmlFor='newTestament'
                      className='cursor-pointer text-xs sm:text-sm leading-relaxed'
                    >
                      Novo Testamento ({getTestamentChapters('new')} capítulos,{' '}
                      {getTestamentVerses('new').toLocaleString()} versículos)
                    </Label>
                  </div>
                </div>
              </div>

              {/* Resumo */}
              <div className='bg-bible-soft-green p-3 rounded-md'>
                <p className='text-xs sm:text-sm text-bible-text leading-relaxed break-words'>
                  {selectedBooks.length > 0
                    ? `Plano para ${
                        selectedBooks.length
                      } livros selecionados: ${getSelectedBooksChapters(
                        selectedBooks
                      )} capítulos, ${getSelectedBooksVerses(
                        selectedBooks
                      ).toLocaleString()} versículos`
                    : includeOldTestament && includeNewTestament
                    ? `Plano para toda a Bíblia: ${getTotalChapters()} capítulos, ${getTotalVerses().toLocaleString()} versículos`
                    : includeOldTestament
                    ? `Plano para o Antigo Testamento: ${getTestamentChapters(
                        'old'
                      )} capítulos, ${getTestamentVerses(
                        'old'
                      ).toLocaleString()} versículos`
                    : includeNewTestament
                    ? `Plano para o Novo Testamento: ${getTestamentChapters(
                        'new'
                      )} capítulos, ${getTestamentVerses(
                        'new'
                      ).toLocaleString()} versículos`
                    : 'Selecione pelo menos um testamento ou livros específicos'}
                </p>
                <p className='text-xs sm:text-sm text-bible-text mt-2 leading-relaxed'>
                  <strong>Estimativa:</strong> aproximadamente{' '}
                  {calculateVersesPerDay()} versículos por dia
                  {planMode === 'chapters' && calculateEstimatedDuration() && (
                    <span className='block mt-1'>
                      <strong>Duração estimada:</strong>{' '}
                      {calculateEstimatedDuration()}
                    </span>
                  )}
                </p>
              </div>

              <Button
                onClick={handleGeneratePlan}
                className='w-full bg-bible-accent hover:bg-bible-accent/90 text-white dark:text-black text-xs sm:text-sm py-2'
              >
                Gerar Plano de Leitura
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Plano gerado à direita no desktop */}
      <div className='lg:col-span-7'>
        {/* Renderização das tabelas */}
        {planType === 'thematic' ? (
          thematicPlan ? (
            <ThematicPlanTable plan={thematicPlan} />
          ) : (
            <Card className='h-full flex items-center justify-center min-h-[400px]'>
              <CardContent className='text-center text-muted-foreground p-6 sm:p-8'>
                <BookOpen className='w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-muted-foreground/50' />
                <h3 className='text-base sm:text-lg font-medium mb-2'>
                  Gere seu plano temático
                </h3>
                <p className='text-sm sm:text-base mb-4'>
                  Selecione um tema à esquerda e clique em "Gerar Plano
                  Temático" para começar
                </p>
              </CardContent>
            </Card>
          )
        ) : readingPlan.length > 0 ? (
          <PlanTable
            plan={readingPlan}
            timeUnit={timeUnit}
            includeOldTestament={includeOldTestament}
            includeNewTestament={includeNewTestament}
            selectedBooks={selectedBooks}
            isChronological={isChronological}
            orderType={orderType}
          />
        ) : (
          <Card className='h-full flex items-center justify-center min-h-[400px]'>
            <CardContent className='text-center text-muted-foreground p-6 sm:p-8'>
              <BookOpen className='w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-muted-foreground/50' />
              <h3 className='text-base sm:text-lg font-medium mb-2'>
                Gere seu plano de leitura
              </h3>
              <p className='text-sm sm:text-base mb-4'>
                Configure suas preferências à esquerda e clique em "Gerar Plano
                de Leitura" para começar
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PlanGenerator;
