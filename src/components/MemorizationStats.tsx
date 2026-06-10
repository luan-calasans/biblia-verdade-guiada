import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Calendar,
  Target,
  Brain,
  Flame,
  BarChart3,
  Award,
  Clock,
} from 'lucide-react';
import { MemorizationStats } from '@/services/memorizationService';

interface MemorizationStatsProps {
  stats: MemorizationStats;
}

const MemorizationStatsComponent: React.FC<MemorizationStatsProps> = ({
  stats,
}) => {
  const getStreakColor = (streak: number) => {
    if (streak >= 30)
      return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
    if (streak >= 14)
      return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
    if (streak >= 7) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (streak >= 3) return 'text-green-500 bg-green-100 dark:bg-green-900/20';
    return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-yellow-600';
    if (accuracy >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressLevel = () => {
    const { totalVerses, masteredVerses } = stats;
    if (totalVerses === 0)
      return { level: 'Iniciante', progress: 0, color: 'bg-gray-500' };

    const masteryPercentage = (masteredVerses / totalVerses) * 100;

    if (masteryPercentage >= 80)
      return {
        level: 'Mestre',
        progress: masteryPercentage,
        color: 'bg-purple-500',
      };
    if (masteryPercentage >= 60)
      return {
        level: 'Avançado',
        progress: masteryPercentage,
        color: 'bg-blue-500',
      };
    if (masteryPercentage >= 40)
      return {
        level: 'Intermediário',
        progress: masteryPercentage,
        color: 'bg-green-500',
      };
    if (masteryPercentage >= 20)
      return {
        level: 'Iniciante+',
        progress: masteryPercentage,
        color: 'bg-yellow-500',
      };
    return {
      level: 'Iniciante',
      progress: masteryPercentage,
      color: 'bg-gray-500',
    };
  };

  const progressLevel = getProgressLevel();

  const maxWeeklyProgress = Math.max(...stats.weeklyProgress, 1);
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const today = new Date();
  const weekStartDate = new Date(today);
  weekStartDate.setDate(today.getDate() - 6);

  return (
    <div className='space-y-6'>
      {/* Estatísticas Principais */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
        <Card>
          <CardContent className='p-3 md:p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-xs md:text-sm text-bible-text/70'>
                  Total de Versículos
                </p>
                <p className='text-lg md:text-2xl font-bold text-bible-text'>
                  {stats.totalVerses}
                </p>
              </div>
              <Brain className='h-6 w-6 md:h-8 md:w-8 text-bible-accent' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-3 md:p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-xs md:text-sm text-bible-text/70'>
                  Para Revisar Hoje
                </p>
                <p className='text-lg md:text-2xl font-bold text-bible-accent'>
                  {stats.dueToday}
                </p>
              </div>
              <Calendar className='h-6 w-6 md:h-8 md:w-8 text-bible-accent' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-3 md:p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-xs md:text-sm text-bible-text/70'>
                  Memorizados
                </p>
                <p className='text-lg md:text-2xl font-bold text-bible-accent'>
                  {stats.masteredVerses}
                </p>
              </div>
              <Award className='h-6 w-6 md:h-8 md:w-8 text-bible-accent' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-3 md:p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-xs md:text-sm text-bible-text/70'>
                  Sequência
                </p>
                <p className='text-lg md:text-2xl font-bold text-bible-text'>
                  {stats.streakDays} dias
                </p>
              </div>
              <Flame className='h-6 w-6 md:h-8 md:w-8 text-bible-accent' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nível de Progresso */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-bible-text'>
            <Target className='h-5 w-5 text-bible-accent' />
            Nível de Progresso
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <Badge className={`${progressLevel.color} text-white`}>
              {progressLevel.level}
            </Badge>
            <span className='text-sm text-muted-foreground'>
              {stats.masteredVerses} de {stats.totalVerses} versículos
              memorizados
            </span>
          </div>
          <Progress value={progressLevel.progress} className='h-3' />
          <p className='text-xs text-muted-foreground'>
            Versículos memorizados são aqueles com intervalo de revisão superior
            a 30 dias
          </p>
        </CardContent>
      </Card>

      {/* Desempenho */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5' />
              Desempenho Geral
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Precisão Geral</span>
                <span
                  className={`font-medium ${getAccuracyColor(stats.accuracy)}`}
                >
                  {stats.accuracy.toFixed(1)}%
                </span>
              </div>
              <Progress value={stats.accuracy} className='h-2' />
            </div>

            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Fator de Facilidade Médio</span>
                <span className='font-medium'>
                  {stats.averageEaseFactor.toFixed(2)}
                </span>
              </div>
              <Progress
                value={((stats.averageEaseFactor - 1.3) / (2.5 - 1.3)) * 100}
                className='h-2'
              />
              <p className='text-xs text-muted-foreground'>
                Valores mais altos indicam maior facilidade na memorização
              </p>
            </div>

            <div className='pt-2 border-t'>
              <div className='flex items-center justify-between text-sm'>
                <span>Total de Revisões</span>
                <span className='font-medium'>{stats.totalReviews}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Flame className='h-5 w-5' />
              Sequência de Dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-center space-y-2'>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getStreakColor(
                  stats.streakDays
                )}`}
              >
                <Flame className='h-5 w-5' />
                <span className='font-bold text-lg'>{stats.streakDays}</span>
                <span className='text-sm'>dias</span>
              </div>

              <div className='space-y-1 text-xs text-muted-foreground'>
                {stats.streakDays === 0 && (
                  <p>Comece sua jornada de memorização!</p>
                )}
                {stats.streakDays >= 1 && stats.streakDays < 3 && (
                  <p>Bom começo! Continue assim.</p>
                )}
                {stats.streakDays >= 3 && stats.streakDays < 7 && (
                  <p>Ótimo progresso! Você está criando o hábito.</p>
                )}
                {stats.streakDays >= 7 && stats.streakDays < 14 && (
                  <p>Excelente! Uma semana de dedicação.</p>
                )}
                {stats.streakDays >= 14 && stats.streakDays < 30 && (
                  <p>Impressionante! Duas semanas de consistência.</p>
                )}
                {stats.streakDays >= 30 && (
                  <p>Incrível! Você é um verdadeiro dedicado à memorização!</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Progresso Semanal */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <BarChart3 className='h-5 w-5' />
            Progresso dos Últimos 7 Dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='grid grid-cols-7 gap-1 md:gap-2'>
              {stats.weeklyProgress.map((count, index) => {
                const date = new Date(weekStartDate);
                date.setDate(weekStartDate.getDate() + index);
                const isToday = date.toDateString() === today.toDateString();

                return (
                  <div
                    key={index}
                    className='text-center space-y-1 md:space-y-2'
                  >
                    <div className='text-xs text-muted-foreground'>
                      {weekDays[date.getDay()]}
                    </div>
                    <div className='relative'>
                      <div
                        className={`w-full bg-blue-500 rounded-sm transition-all duration-300 ${
                          isToday ? 'ring-2 ring-blue-300' : ''
                        }`}
                        style={{
                          height: `${Math.max(
                            4,
                            (count / maxWeeklyProgress) * 60
                          )}px`,
                          opacity: count === 0 ? 0.2 : 1,
                        }}
                      />
                      <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium'>
                        {count}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='text-center pt-4'>
              <p className='text-sm text-muted-foreground'>
                Versículos revisados por dia
              </p>
              <p className='text-xs text-muted-foreground mt-1'>
                Total da semana:{' '}
                {stats.weeklyProgress.reduce((sum, count) => sum + count, 0)}{' '}
                revisões
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metas e Conquistas */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Award className='h-5 w-5' />
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Conquistas baseadas em sequência */}
            <div className='space-y-2'>
              <h4 className='font-medium text-sm'>Sequência de Dias</h4>
              <div className='space-y-1'>
                {[
                  { days: 3, title: 'Primeiro Passo', icon: '🌱' },
                  { days: 7, title: 'Uma Semana', icon: '📅' },
                  { days: 14, title: 'Duas Semanas', icon: '🔥' },
                  { days: 30, title: 'Um Mês', icon: '💪' },
                  { days: 100, title: 'Cem Dias', icon: '👑' },
                ].map(({ days, title, icon }) => (
                  <div
                    key={days}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      stats.streakDays >= days
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-black'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                    }`}
                  >
                    <span className='text-lg'>{icon}</span>
                    <span className='text-sm font-medium'>{title}</span>
                    <span className='text-xs'>({days} dias)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conquistas baseadas em versículos */}
            <div className='space-y-2'>
              <h4 className='font-medium text-sm'>Versículos Memorizados</h4>
              <div className='space-y-1'>
                {[
                  { count: 1, title: 'Primeiro Versículo', icon: '📖' },
                  { count: 10, title: 'Dez Versículos', icon: '📚' },
                  { count: 25, title: 'Vinte e Cinco', icon: '🎯' },
                  { count: 50, title: 'Cinquenta', icon: '🏆' },
                  { count: 100, title: 'Cem Versículos', icon: '🌟' },
                ].map(({ count, title, icon }) => (
                  <div
                    key={count}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      stats.masteredVerses >= count
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                    }`}
                  >
                    <span className='text-lg'>{icon}</span>
                    <span className='text-sm font-medium'>{title}</span>
                    <span className='text-xs'>({count} versículos)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemorizationStatsComponent;
