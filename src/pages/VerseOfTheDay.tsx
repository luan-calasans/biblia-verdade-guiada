import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Share2, MessageCircle, Copy, BookOpen } from 'lucide-react';
import { bibliaApiService, BibleVersion } from '@/services/bibliaApiService';
import {
  formatVersionName,
  getVersionFullName,
} from '@/utils/bibleVersionsMap';
import { useCache } from '@/contexts/ThemeContext';

// Interface para o versículo normalizado
interface Verse {
  book: {
    abbrev: {
      pt: string;
      en: string;
    };
    name: string;
    author: string;
    group: string;
    version: string;
  };
  chapter: number;
  number: number;
  text: string;
}

const VerseOfTheDay = () => {
  const {
    cache,
    updateVerseOfTheDayCache,
    invalidateVerseOfTheDayCache,
    isVerseOfTheDayValid,
  } = useCache();

  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [bibleVersions, setBibleVersions] = useState<BibleVersion[]>([]);
  const [hasTriedToLoad, setHasTriedToLoad] = useState(false);

  // Normalizar dados do versículo da API
  const normalizeVerse = (data: any): Verse => {
    return {
      book: {
        abbrev: {
          pt: data.book?.abbrev?.pt || data.book?.abbrev || '',
          en: data.book?.abbrev?.en || data.book?.abbrev || '',
        },
        name: data.book?.name || '',
        author: data.book?.author || '',
        group: data.book?.group || '',
        version: data.book?.version || selectedVersion,
      },
      chapter: data.chapter || 0,
      number: data.number || 0,
      text: data.text || '',
    };
  };

  // Buscar versões disponíveis
  const fetchVersions = async () => {
    setLoadingVersions(true);
    try {
      const versions = await bibliaApiService.getVersions();

      if (!Array.isArray(versions) || versions.length === 0) {
        throw new Error('Nenhuma versão disponível na resposta');
      }

      setBibleVersions(versions);

      // Se não há versão selecionada, usar a primeira disponível
      if (!selectedVersion && versions.length > 0) {
        setSelectedVersion(versions[0].version);
      }
    } catch (error) {
    } finally {
      setLoadingVersions(false);
    }
  };

  // Inicializar componente
  useEffect(() => {
    const init = async () => {
      await fetchVersions();
    };

    init();
  }, []);

  // Buscar versículo do dia (primeiro verifica cache, depois API)
  const getVerseOfTheDay = async (forceNew: boolean = false) => {
    if (!selectedVersion) {
      return;
    }

    // Se não forçar novo versículo, tentar carregar do cache primeiro (sem loading)
    if (!forceNew && isVerseOfTheDayValid(selectedVersion)) {
      const cachedVerse = cache.verseOfTheDay?.verse;
      if (cachedVerse) {
        setVerse(cachedVerse);
        return;
      }
    }

    // Só mostrar loading se não há cache ou forçar novo versículo
    setLoading(true);
    try {
      // Buscar da API
      const data = await bibliaApiService.getRandomVerse(selectedVersion);
      const normalizedVerse = normalizeVerse(data);

      setVerse(normalizedVerse);

      // Salvar no cache
      updateVerseOfTheDayCache(normalizedVerse, selectedVersion);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Função para gerar um novo versículo (forçar busca da API)
  const getNewVerse = () => {
    getVerseOfTheDay(true);
  };

  // Carregar versículo do cache quando a versão for definida
  useEffect(() => {
    if (selectedVersion && !hasTriedToLoad) {
      // Verificar se há cache válido primeiro
      if (isVerseOfTheDayValid(selectedVersion)) {
        const cachedVerse = cache.verseOfTheDay?.verse;
        if (cachedVerse) {
          setVerse(cachedVerse);
          setHasTriedToLoad(true);
          return;
        }
      }

      // Se não há cache válido, buscar da API
      if (!loadingVersions && !loading) {
        setHasTriedToLoad(true);
        getVerseOfTheDay();
      }
    }
  }, [
    selectedVersion,
    loadingVersions,
    loading,
    hasTriedToLoad,
    cache.verseOfTheDay,
  ]);

  const handleShareVerse = async () => {
    if (!verse) return;

    const verseText = `"${verse.text}"\n${verse.book.name} ${verse.chapter}:${
      verse.number
    } (${verse.book.version.toUpperCase()})`;

    try {
      if (navigator.share) {
        await navigator.share({
          text: verseText,
        });
      } else {
        // Fallback para copiar para clipboard
        await navigator.clipboard.writeText(verseText);
      }
    } catch (error) {}
  };

  const handleShareWhatsApp = () => {
    if (!verse) return;

    const verseText = `"${verse.text}"\n${verse.book.name} ${verse.chapter}:${
      verse.number
    } (${verse.book.version.toUpperCase()})`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(verseText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyVerse = async () => {
    if (!verse) return;

    const verseText = `"${verse.text}"\n${verse.book.name} ${verse.chapter}:${
      verse.number
    } (${verse.book.version.toUpperCase()})`;

    try {
      await navigator.clipboard.writeText(verseText);
    } catch (error) {}
  };

  // Formata a data atual em "segunda-feira, 1 de janeiro de 2023"
  const formatDate = () => {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleVersionChange = (newVersion: string) => {
    setSelectedVersion(newVersion);
    setHasTriedToLoad(false); // Permitir nova tentativa

    // Tentar carregar versículo do cache para a nova versão (sem loading)
    if (isVerseOfTheDayValid(newVersion)) {
      const cachedVerse = cache.verseOfTheDay?.verse;
      if (cachedVerse) {
        setVerse(cachedVerse);
        setHasTriedToLoad(true);
        return;
      }
    }

    // Se não há cache, limpar versículo atual
    setVerse(null);
  };

  return (
    <>
      <Helmet>
        <title>Versículo do Dia | Graça e Leitura</title>
        <meta
          name='description'
          content='Receba um versículo bíblico inspirador diariamente em diferentes versões em português. Escolha entre ACF, NVI, NTLH e outras traduções. Compartilhe a palavra de Deus e fortaleça sua fé com reflexões diárias.'
        />
        <meta
          name='keywords'
          content='versículo do dia, bíblia online, palavra de Deus, versículos bíblicos, estudo bíblico, versículo diário, reflexão bíblica'
        />
        <link
          rel='canonical'
          href='https://biblia.gracaeleitura.com/versiculo-do-dia'
        />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://biblia.gracaeleitura.com/versiculo-do-dia'
        />
        <meta
          property='og:title'
          content='Versículo do Dia | Graça e Leitura'
        />
        <meta
          property='og:description'
          content='Receba um versículo bíblico inspirador diariamente. Escolha entre diferentes versões da Bíblia em português e compartilhe a palavra de Deus.'
        />
        <meta
          property='og:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta
          property='og:image:alt'
          content='Versículo do Dia - Descubra a Palavra com Planos de Leitura e Quizzes Bíblicos'
        />
        <meta property='og:image:type' content='image/png' />
        <meta
          property='og:image:secure_url'
          content='https://biblia.gracaeleitura.com/seo.png'
        />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:url'
          content='https://biblia.gracaeleitura.com/versiculo-do-dia'
        />
        <meta
          name='twitter:title'
          content='Versículo do Dia | Graça e Leitura'
        />
        <meta
          name='twitter:description'
          content='Receba um versículo bíblico inspirador diariamente. Escolha entre diferentes versões da Bíblia em português.'
        />
        <meta
          name='twitter:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
        <meta
          name='twitter:image:alt'
          content='Versículo do Dia - Descubra a Palavra com Planos de Leitura e Quizzes Bíblicos'
        />

        {/* WhatsApp / Telegram */}
        <meta property='og:image:type' content='image/png' />
        <meta
          property='og:image:secure_url'
          content='https://biblia.gracaeleitura.com/seo.png'
        />

        {/* Structured Data */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Versículo do Dia | Graça e Leitura',
            description:
              'Receba um versículo bíblico inspirador diariamente em diferentes versões em português.',
            url: 'https://biblia.gracaeleitura.com/versiculo-do-dia',
            publisher: {
              '@type': 'Person',
              name: 'Luan Calasans',
              url: 'https://github.com/luan-calasans',
            },
            mainEntity: {
              '@type': 'Article',
              headline: verse
                ? `${verse.book.name} ${verse.chapter}:${verse.number}`
                : 'Versículo do Dia',
              text: verse?.text || 'Versículo bíblico inspirador',
              author: {
                '@type': 'Person',
                name: verse?.book.author || 'Escritor Bíblico',
              },
              datePublished: new Date().toISOString().split('T')[0],
              dateModified: new Date().toISOString(),
            },
          })}
        </script>
      </Helmet>

      <div className='min-h-screen flex flex-col'>
        <div className='bible-container max-w-3xl'>
          {/* Header com título */}
          <header className='text-center mb-6 animate-fade-in'>
            <div className='flex items-center justify-center gap-2 mb-4'>
              <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-bible-accent'>
                Versículo do Dia
              </h1>
            </div>
            <p className='text-bible-text/70 text-sm sm:text-base'>
              {formatDate()}
            </p>
          </header>

          {/* Seleção de versão */}
          <section
            aria-label='Seleção de versão da Bíblia'
            className='flex justify-center mb-6 animate-slide-up'
          >
            <Card className='w-full max-w-md shadow-sm border-bible-gray/20'>
              <CardContent className='p-4'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-2 justify-center'>
                    <BookOpen className='h-4 w-4 text-bible-accent' />
                    <label className='text-xs sm:text-sm font-medium text-bible-text'>
                      Versão da Bíblia
                    </label>
                  </div>

                  {loadingVersions ? (
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-32' />
                      <Skeleton className='h-10 w-full' />
                    </div>
                  ) : (
                    <Select
                      value={selectedVersion}
                      onValueChange={handleVersionChange}
                      disabled={loadingVersions}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Selecione uma versão' />
                      </SelectTrigger>
                      <SelectContent>
                        {bibleVersions.map((version) => (
                          <SelectItem
                            key={version.version}
                            value={version.version}
                          >
                            {formatVersionName(version.version)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {/* Botão para novo versículo */}
                  {!loadingVersions && selectedVersion && (
                    <Button
                      onClick={getNewVerse}
                      disabled={loading || loadingVersions || !selectedVersion}
                      className='bg-bible-accent hover:bg-bible-accent/90 w-full'
                    >
                      <RefreshCw
                        className={`h-4 w-4 mr-2 ${
                          loading ? 'animate-spin' : ''
                        }`}
                      />
                      Novo Versículo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Versículo */}
          <Card className='mb-6'>
            <CardContent className='p-6 sm:p-8'>
              {loading || loadingVersions ? (
                <div className='space-y-4'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-5/6' />
                  <Skeleton className='h-4 w-4/6' />
                  <Skeleton className='h-6 w-2/6 mt-6' />
                </div>
              ) : verse ? (
                <div className='text-center space-y-6'>
                  <blockquote className='text-lg sm:text-xl md:text-2xl leading-relaxed text-bible-text italic'>
                    "{verse.text}"
                  </blockquote>
                  <div className='space-y-2'>
                    <cite className='text-bible-accent font-semibold text-lg sm:text-xl not-italic'>
                      {verse.book.name} {verse.chapter}:{verse.number}
                    </cite>
                    <div className='flex justify-center'>
                      <Badge variant='secondary' className='text-sm'>
                        {getVersionFullName(verse.book.version)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='text-center text-bible-text/60 py-8'>
                  <p className='text-lg mb-4'>
                    Selecione uma versão para ver o versículo do dia
                  </p>
                  {!loadingVersions && bibleVersions.length === 0 && (
                    <p className='text-sm'>
                      Não foi possível carregar as versões da Bíblia
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          {verse && (
            <Card>
              <CardContent className='p-4 sm:p-6'>
                <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                  <Button
                    onClick={handleShareVerse}
                    variant='outline'
                    className='flex-1 sm:flex-none'
                  >
                    <Share2 className='h-4 w-4 mr-2' />
                    Compartilhar
                  </Button>
                  <Button
                    onClick={handleShareWhatsApp}
                    variant='outline'
                    className='flex-1 sm:flex-none bg-green-50 hover:bg-green-100 text-green-700 border-green-200 dark:bg-green-600 dark:hover:bg-green-700 dark:text-black dark:border-green-600'
                  >
                    <MessageCircle className='h-4 w-4 mr-2' />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={handleCopyVerse}
                    variant='outline'
                    className='flex-1 sm:flex-none'
                  >
                    <Copy className='h-4 w-4 mr-2' />
                    Copiar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default VerseOfTheDay;
