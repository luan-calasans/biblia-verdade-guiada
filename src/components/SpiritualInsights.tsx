import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  BookOpen,
  Heart,
  Waves,
  Target,
  Award,
  Zap,
  Sun,
  Moon,
  Activity,
} from 'lucide-react';
import {
  SpiritualStats,
  ReadingSession,
} from '@/services/spiritualTrackingService';

interface SpiritualInsightsProps {
  stats: SpiritualStats;
  readingSessions: ReadingSession[];
}

const SpiritualInsights: React.FC<SpiritualInsightsProps> = ({
  stats,
  readingSessions,
}) => {
  // Análise de tendências de leitura
  const getReadingTrend = () => {
    if (readingSessions.length < 2) return null;

    const last7Days = readingSessions.filter((session) => {
      const sessionDate = new Date(session.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sessionDate >= weekAgo;
    }).length;

    const previous7Days = readingSessions.filter((session) => {
      const sessionDate = new Date(session.date);
      const twoWeeksAgo = new Date();
      const weekAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sessionDate >= twoWeeksAgo && sessionDate < weekAgo;
    }).length;

    const change = last7Days - previous7Days;
    const percentChange =
      previous7Days > 0 ? (change / previous7Days) * 100 : 0;

    return {
      current: last7Days,
      previous: previous7Days,
      change,
      percentChange,
      isPositive: change >= 0,
    };
  };

  // Análise de livros mais lidos
  const getMostReadBooks = () => {
    const bookCounts: { [book: string]: number } = {};

    readingSessions.forEach((session) => {
      bookCounts[session.book] = (bookCounts[session.book] || 0) + 1;
    });

    return Object.entries(bookCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([book, count]) => ({ book, count }));
  };

  // Análise de tempo médio de leitura
  const getAverageReadingTime = () => {
    const sessionsWithTime = readingSessions.filter((s) => s.duration_minutes);
    if (sessionsWithTime.length === 0) return 0;

    const totalMinutes = sessionsWithTime.reduce(
      (sum, s) => sum + (s.duration_minutes || 0),
      0
    );
    return Math.round(totalMinutes / sessionsWithTime.length);
  };

  // Análise de consistência
  const getConsistencyScore = () => {
    if (readingSessions.length === 0) return 0;

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const recentSessions = readingSessions.filter(
      (session) => new Date(session.date) >= last30Days
    );

    const uniqueDays = new Set(recentSessions.map((s) => s.date)).size;
    return Math.round((uniqueDays / 30) * 100);
  };

  // Análise de melhor dia da semana
  const getBestDayOfWeek = () => {
    const dayCount: { [key: number]: number } = {};
    const dayNames = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];

    readingSessions.forEach((session) => {
      const day = new Date(session.date).getDay();
      dayCount[day] = (dayCount[day] || 0) + 1;
    });

    const bestDay = Object.entries(dayCount).sort(([, a], [, b]) => b - a)[0];

    return bestDay
      ? {
          day: dayNames[parseInt(bestDay[0])],
          count: bestDay[1],
        }
      : null;
  };

  const readingTrend = getReadingTrend();
  const mostReadBooks = getMostReadBooks();
  const averageTime = getAverageReadingTime();
  const consistencyScore = getConsistencyScore();
  const bestDay = getBestDayOfWeek();

  const getMotivationalMessage = () => {
    if (stats.current_streak >= 30) {
      return '🔥 Incrível! Você está em uma sequência fantástica de leitura!';
    } else if (stats.current_streak >= 7) {
      return '⭐ Parabéns! Você está desenvolvendo um ótimo hábito!';
    } else if (stats.current_streak >= 3) {
      return '🌱 Continue assim! Você está no caminho certo!';
    } else if (stats.salvations > 0) {
      return '❤️ Que benção ver vidas sendo transformadas através de você!';
    } else if (stats.reading_sessions > 0) {
      return '📖 Cada leitura é um passo na sua jornada espiritual!';
    }
    return '🙏 Comece hoje sua jornada de crescimento espiritual!';
  };

  return (
    <div className='space-y-6'>
      {/* Motivational Message */}
      <Card className='bg-gradient-to-r from-bible-accent/10 to-bible-accent/5 border-bible-accent/20'>
        <CardContent className='pt-6'>
          <div className='text-center'>
            <p className='text-lg font-medium text-bible-accent mb-2'>
              {getMotivationalMessage()}
            </p>
            <p className='text-sm text-bible-text/70'>
              Continue firme na sua caminhada espiritual
            </p>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Reading Trend */}
        {readingTrend && (
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium flex items-center gap-2'>
                {readingTrend.isPositive ? (
                  <TrendingUp className='h-4 w-4 text-green-500' />
                ) : (
                  <TrendingDown className='h-4 w-4 text-red-500' />
                )}
                Tendência de Leitura
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-2xl font-bold'>
                    {readingTrend.current}
                  </span>
                  <Badge
                    variant={
                      readingTrend.isPositive ? 'default' : 'destructive'
                    }
                    className='text-xs'
                  >
                    {readingTrend.isPositive ? '+' : ''}
                    {readingTrend.change}
                  </Badge>
                </div>
                <p className='text-xs text-bible-text/70'>
                  leituras nos últimos 7 dias
                </p>
                {readingTrend.percentChange !== 0 && (
                  <p className='text-xs text-bible-text/60'>
                    {readingTrend.percentChange > 0 ? '+' : ''}
                    {readingTrend.percentChange.toFixed(1)}% vs semana anterior
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Consistency Score */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Target className='h-4 w-4 text-blue-500' />
              Consistência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-2xl font-bold'>{consistencyScore}%</span>
                <Activity className='h-5 w-5 text-blue-500' />
              </div>
              <Progress value={consistencyScore} className='h-2' />
              <p className='text-xs text-bible-text/70'>
                dos últimos 30 dias com leitura
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Average Reading Time */}
        {averageTime > 0 && (
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium flex items-center gap-2'>
                <Calendar className='h-4 w-4 text-purple-500' />
                Tempo Médio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-2xl font-bold'>{averageTime}</span>
                  <span className='text-sm text-bible-text/70'>min</span>
                </div>
                <p className='text-xs text-bible-text/70'>
                  por sessão de leitura
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Best Day */}
        {bestDay && (
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm font-medium flex items-center gap-2'>
                <Sun className='h-4 w-4 text-orange-500' />
                Melhor Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-lg font-bold'>{bestDay.day}</span>
                  <Badge variant='outline'>{bestDay.count}x</Badge>
                </div>
                <p className='text-xs text-bible-text/70'>
                  dia com mais leituras
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Total Impact */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Heart className='h-4 w-4 text-red-500' />
              Impacto Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-2xl font-bold'>
                  {stats.salvations + stats.baptisms}
                </span>
                <Zap className='h-5 w-5 text-red-500' />
              </div>
              <p className='text-xs text-bible-text/70'>vidas impactadas</p>
              <div className='flex gap-2 text-xs'>
                <span className='text-bible-text/60'>
                  {stats.salvations} salvações
                </span>
                <span className='text-bible-text/60'>
                  {stats.baptisms} batismos
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak Achievement */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-medium flex items-center gap-2'>
              <Award className='h-4 w-4 text-yellow-500' />
              Recorde
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-2xl font-bold'>
                  {stats.longest_streak}
                </span>
                <span className='text-sm text-bible-text/70'>dias</span>
              </div>
              <p className='text-xs text-bible-text/70'>
                maior sequência de leitura
              </p>
              {stats.current_streak > 0 && (
                <p className='text-xs text-bible-text/60'>
                  Atual: {stats.current_streak} dias
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Read Books */}
      {mostReadBooks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BookOpen className='h-5 w-5' />
              Livros Mais Lidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {mostReadBooks.map(({ book, count }, index) => (
                <div key={book} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <span className='text-sm font-medium text-bible-text/70'>
                      #{index + 1}
                    </span>
                    <span className='font-medium'>{book}</span>
                  </div>
                  <Badge variant='outline'>{count} sessões</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpiritualInsights;
