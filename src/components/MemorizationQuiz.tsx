import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Eye,
  EyeOff,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Star,
} from 'lucide-react';
import {
  MemorizationVerse,
  memorizationService,
} from '@/services/memorizationService';
import { toast } from 'sonner';

interface MemorizationQuizProps {
  verses: MemorizationVerse[];
  onComplete: (results: QuizResult[]) => void;
  onExit: () => void;
}

interface QuizResult {
  verseId: string;
  quality: number;
  timeSpent: number;
  correct: boolean;
}

type QuizMode =
  | 'reference-to-text'
  | 'text-to-reference'
  | 'fill-blanks'
  | 'mixed';

const MemorizationQuiz: React.FC<MemorizationQuizProps> = ({
  verses,
  onComplete,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<QuizMode>('mixed');
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [results, setResults] = useState<QuizResult[]>([]);
  const [sessionStartTime] = useState<Date>(new Date());

  const currentVerse = verses[currentIndex];
  const progress = ((currentIndex + 1) / verses.length) * 100;

  useEffect(() => {
    setStartTime(new Date());
    setUserAnswer('');
    setShowAnswer(false);

    // Define o modo do quiz automaticamente se for 'mixed'
    if (mode === 'mixed') {
      const modes: QuizMode[] = [
        'reference-to-text',
        'text-to-reference',
        'fill-blanks',
      ];
      setMode(modes[Math.floor(Math.random() * modes.length)]);
    }
  }, [currentIndex]);

  const generateQuestion = () => {
    if (!currentVerse)
      return { question: '', expectedAnswer: '', type: 'text' };

    switch (mode) {
      case 'reference-to-text':
        return {
          question: `Qual é o texto do versículo ${currentVerse.reference}?`,
          expectedAnswer: currentVerse.text,
          type: 'text' as const,
        };

      case 'text-to-reference':
        return {
          question: `Qual é a referência deste versículo?\n\n"${currentVerse.text}"`,
          expectedAnswer: currentVerse.reference,
          type: 'reference' as const,
        };

      case 'fill-blanks':
        const words = currentVerse.text.split(' ');
        const blanksCount = Math.min(
          3,
          Math.max(1, Math.floor(words.length / 5))
        );
        const blankIndices = [];
        const expectedWords = [];

        for (let i = 0; i < blanksCount; i++) {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * words.length);
          } while (blankIndices.includes(randomIndex));

          blankIndices.push(randomIndex);
          expectedWords.push(words[randomIndex]);
        }

        const textWithBlanks = words
          .map((word, index) =>
            blankIndices.includes(index) ? '______' : word
          )
          .join(' ');

        return {
          question: `Complete as lacunas:\n\n"${textWithBlanks}"\n\n${currentVerse.reference}`,
          expectedAnswer: expectedWords.join(', '),
          type: 'fill' as const,
        };

      default:
        return {
          question: `Qual é o texto do versículo ${currentVerse.reference}?`,
          expectedAnswer: currentVerse.text,
          type: 'text' as const,
        };
    }
  };

  const { question, expectedAnswer, type } = generateQuestion();

  const calculateSimilarity = (str1: string, str2: string): number => {
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    const normalized1 = normalize(str1);
    const normalized2 = normalize(str2);

    if (normalized1 === normalized2) return 1;

    const words1 = normalized1.split(' ');
    const words2 = normalized2.split(' ');

    const commonWords = words1.filter((word) => words2.includes(word));
    const totalWords = Math.max(words1.length, words2.length);

    return commonWords.length / totalWords;
  };

  const handleSubmitAnswer = async (quality: number) => {
    const timeSpent = (new Date().getTime() - startTime.getTime()) / 1000;
    const similarity = calculateSimilarity(userAnswer, expectedAnswer);
    const correct = similarity >= 0.7 || quality >= 3;

    const result: QuizResult = {
      verseId: currentVerse.id,
      quality,
      timeSpent,
      correct,
    };

    setResults((prev) => [...prev, result]);

    try {
      // Salva a revisão no serviço
      await memorizationService.reviewVerse(currentVerse.id, quality);

      if (currentIndex < verses.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setMode('mixed'); // Reset para mixed mode
      } else {
        // Quiz finalizado
        const sessionTime =
          (new Date().getTime() - sessionStartTime.getTime()) / (1000 * 60);
        const correctAnswers =
          results.filter((r) => r.correct).length + (correct ? 1 : 0);
        const averageQuality =
          (results.reduce((sum, r) => sum + r.quality, 0) + quality) /
          verses.length;

        await memorizationService.saveReviewSession({
          date: new Date(),
          versesReviewed: verses.length,
          correctAnswers,
          averageQuality,
          timeSpent: sessionTime,
        });

        onComplete([...results, result]);
      }
    } catch (error) {
      // Continue with the flow even if saving fails
      if (currentIndex < verses.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setMode('mixed');
      } else {
        onComplete([...results, result]);
      }
    }
  };

  const getDifficultyColor = (quality: number) => {
    if (quality >= 4) return 'text-green-600';
    if (quality >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyText = (quality: number) => {
    if (quality === 5) return 'Muito Fácil';
    if (quality === 4) return 'Fácil';
    if (quality === 3) return 'Normal';
    if (quality === 2) return 'Difícil';
    if (quality === 1) return 'Muito Difícil';
    return 'Não Lembro';
  };

  if (!currentVerse) {
    return (
      <Card className='w-full max-w-2xl mx-auto'>
        <CardContent className='p-6 text-center'>
          <p>Nenhum versículo para revisar.</p>
          <Button onClick={onExit} className='mt-4'>
            Voltar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='w-full max-w-4xl mx-auto space-y-6'>
      {/* Header com progresso */}
      <Card>
        <CardHeader className='pb-3'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2'>
            <CardTitle className='flex items-center gap-2 text-bible-text text-lg md:text-xl'>
              <BookOpen className='h-4 w-4 md:h-5 md:w-5 text-bible-accent' />
              <span className='hidden sm:inline'>Revisão de Versículos</span>
              <span className='sm:hidden'>Revisão</span>
            </CardTitle>
            <div className='flex items-center gap-2 md:gap-4'>
              <span className='text-xs md:text-sm text-muted-foreground'>
                {currentIndex + 1} de {verses.length}
              </span>
              <Button variant='outline' size='sm' onClick={onExit}>
                Sair
              </Button>
            </div>
          </div>
          <Progress value={progress} className='h-2 mt-2' />
        </CardHeader>
      </Card>

      {/* Pergunta */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <Badge variant='secondary' className='mb-2'>
              {mode === 'reference-to-text' && 'Referência → Texto'}
              {mode === 'text-to-reference' && 'Texto → Referência'}
              {mode === 'fill-blanks' && 'Complete as Lacunas'}
            </Badge>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Clock className='h-4 w-4' />
              <span>
                {Math.floor(
                  (new Date().getTime() - startTime.getTime()) / 1000
                )}
                s
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='bg-muted/50 p-4 rounded-lg'>
            <pre className='whitespace-pre-wrap font-medium text-foreground'>
              {question}
            </pre>
          </div>

          {/* Tags do versículo */}
          {currentVerse.tags.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              {currentVerse.tags.map((tag) => (
                <Badge key={tag} variant='outline' className='text-xs'>
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Campo de resposta */}
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Sua resposta:</label>
            {type === 'text' || type === 'fill' ? (
              <Textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder='Digite sua resposta aqui...'
                className='min-h-[100px]'
                disabled={showAnswer}
              />
            ) : (
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder='Digite a referência (ex: João 3:16)'
                disabled={showAnswer}
              />
            )}
          </div>

          {/* Botão para mostrar resposta */}
          {!showAnswer && (
            <div className='flex gap-2'>
              <Button
                variant='outline'
                onClick={() => setShowAnswer(true)}
                className='flex-1'
              >
                <Eye className='h-4 w-4 mr-2' />
                Mostrar Resposta
              </Button>
            </div>
          )}

          {/* Resposta correta */}
          {showAnswer && (
            <div className='space-y-4'>
              <div className='bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800'>
                <div className='flex items-center gap-2 mb-2'>
                  <CheckCircle className='h-4 w-4 text-green-600' />
                  <span className='font-medium text-green-800 dark:text-green-200'>
                    Resposta Correta:
                  </span>
                </div>
                <pre className='whitespace-pre-wrap text-green-700 dark:text-green-300'>
                  {expectedAnswer}
                </pre>
              </div>

              {/* Botões de avaliação */}
              <div className='space-y-3'>
                <p className='text-sm font-medium text-center'>
                  Como foi a dificuldade desta pergunta?
                </p>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
                  {[
                    {
                      quality: 0,
                      label: 'Não Lembro',
                      icon: XCircle,
                      color: 'destructive',
                    },
                    {
                      quality: 1,
                      label: 'Muito Difícil',
                      icon: XCircle,
                      color: 'destructive',
                    },
                    {
                      quality: 2,
                      label: 'Difícil',
                      icon: RotateCcw,
                      color: 'secondary',
                    },
                    {
                      quality: 3,
                      label: 'Normal',
                      icon: CheckCircle,
                      color: 'secondary',
                    },
                    {
                      quality: 4,
                      label: 'Fácil',
                      icon: CheckCircle,
                      color: 'default',
                    },
                    {
                      quality: 5,
                      label: 'Muito Fácil',
                      icon: Star,
                      color: 'default',
                    },
                  ].map(({ quality, label, icon: Icon, color }) => (
                    <Button
                      key={quality}
                      variant={color as any}
                      size='sm'
                      onClick={() => handleSubmitAnswer(quality)}
                      className='flex flex-col items-center p-3 h-auto'
                    >
                      <Icon className='h-4 w-4 mb-1' />
                      <span className='text-xs'>{label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações do versículo atual */}
      <Card>
        <CardContent className='p-4'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs md:text-sm text-muted-foreground'>
            <div className='flex flex-wrap items-center gap-2 md:gap-4'>
              <span>Sequência: {currentVerse.streak}</span>
              <span>Revisões: {currentVerse.totalReviews}</span>
              <span>
                Precisão:{' '}
                {currentVerse.totalReviews > 0
                  ? Math.round(
                      (currentVerse.correctReviews /
                        currentVerse.totalReviews) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span>Próxima revisão em {currentVerse.interval} dia(s)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemorizationQuiz;
