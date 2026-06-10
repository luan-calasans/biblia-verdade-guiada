import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { spiritualTrackingService } from '@/services/spiritualTrackingService';

interface ReadingCalendarProps {
  onDateSelect?: (date: string) => void;
}

const ReadingCalendar: React.FC<ReadingCalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [readingDataCache, setReadingDataCache] = useState<{
    [yearMonth: string]: { [date: string]: number };
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      loadMultipleYears();
    } else {
      loadCurrentMonthData();
    }
  }, [currentDate]);

  const getYearMonthKey = (year: number, month: number) => {
    return `${year}-${month}`;
  };

  const loadMultipleYears = async () => {
    try {
      setIsLoading(true);
      const currentYear = new Date().getFullYear();
      const yearsToLoad = [currentYear - 1, currentYear, currentYear + 1];

      const promises = [];

      // Carrega todos os meses dos 3 anos
      for (const year of yearsToLoad) {
        for (let month = 0; month < 12; month++) {
          promises.push(
            spiritualTrackingService
              .getReadingCalendar(year, month)
              .then((data) => ({ year, month, data }))
              .catch((error) => {
                return { year, month, data: {} };
              })
          );
        }
      }

      const results = await Promise.all(promises);

      // Organiza os dados no cache
      const newCache: { [yearMonth: string]: { [date: string]: number } } = {};
      results.forEach(({ year, month, data }) => {
        const key = getYearMonthKey(year, month);
        newCache[key] = data;
      });

      setReadingDataCache(newCache);
      setIsInitialLoad(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const loadCurrentMonthData = async () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const key = getYearMonthKey(year, month);

    // Se já temos os dados no cache, não precisa carregar
    if (readingDataCache[key]) {
      return;
    }

    try {
      setIsLoading(true);
      const data = await spiritualTrackingService.getReadingCalendar(
        year,
        month
      );

      setReadingDataCache((prev) => ({
        ...prev,
        [key]: data,
      }));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const key = getYearMonthKey(year, month);
    return readingDataCache[key] || {};
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')}`;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }

    // Verifica se precisa carregar dados adicionais
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const key = getYearMonthKey(year, month);

    // Se não temos os dados no cache, vai carregar quando setCurrentDate for chamado
    if (!readingDataCache[key]) {
      setIsLoading(true);
    }

    setCurrentDate(newDate);
  };

  const getIntensityClass = (count: number) => {
    if (count === 0)
      return 'bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80';
    if (count === 1)
      return 'bg-green-200 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700';
    if (count === 2)
      return 'bg-green-400 hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-500';
    return 'bg-green-600 hover:bg-green-700 dark:bg-green-400 dark:hover:bg-green-300';
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const isCurrentMonth =
      today.getFullYear() === year && today.getMonth() === month;

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className='w-8 h-8'></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(year, month, day);
      const readingCount = getCurrentMonthData()[dateKey] || 0;
      const isToday = isCurrentMonth && day === today.getDate();
      const isPastDate = new Date(year, month, day) <= today;

      days.push(
        <div
          key={day}
          className={`
            w-8 h-8 rounded-sm cursor-pointer flex flex-col items-center justify-center text-xs font-medium relative
            transition-colors duration-200
            ${getIntensityClass(readingCount)}
            ${isToday ? 'ring-2 ring-bible-accent' : ''}
            ${!isPastDate ? 'opacity-50' : ''}
          `}
          onClick={() => onDateSelect && onDateSelect(dateKey)}
          title={`${day}/${month + 1}/${year} - ${readingCount} leitura${
            readingCount !== 1 ? 's' : ''
          }`}
        >
          <span
            className={`${
              readingCount > 0
                ? 'text-white dark:text-foreground'
                : 'text-foreground dark:text-foreground'
            }`}
          >
            {day}
          </span>
          {readingCount > 0 && (
            <div className='absolute top-0 right-0 w-2 h-2 bg-background dark:bg-background rounded-full transform translate-x-1 -translate-y-1'>
              <div className='w-full h-full bg-green-800 dark:bg-green-200 rounded-full'></div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => navigateMonth('prev')}
              disabled={isLoading}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <span className='font-medium min-w-[120px] text-center'>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => navigateMonth('next')}
              disabled={isLoading}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='space-y-4'>
            {/* Week day headers skeleton */}
            <div className='grid grid-cols-7 gap-1'>
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className='w-8 h-8 rounded-sm' />
              ))}
            </div>

            {/* Calendar grid skeleton - 6 rows to cover all possible weeks */}
            <div className='grid grid-cols-7 gap-1'>
              {[...Array(42)].map((_, i) => (
                <Skeleton key={i} className='w-8 h-8 rounded-sm' />
              ))}
            </div>

            {/* Legend skeleton */}
            <div className='flex items-center justify-between pt-4 border-t'>
              <Skeleton className='h-3 w-12' />
              <div className='flex items-center gap-1'>
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className='w-3 h-3 rounded-sm' />
                ))}
              </div>
              <Skeleton className='h-3 w-8' />
            </div>
          </div>
        ) : (
          <div
            key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
            className='space-y-4'
          >
            {/* Week day headers */}
            <div className='grid grid-cols-7 gap-1'>
              {weekDays.map((day) => (
                <div
                  key={day}
                  className='w-8 h-8 flex items-center justify-center text-xs font-medium text-muted-foreground'
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className='grid grid-cols-7 gap-1'>{renderCalendar()}</div>

            {/* Legend */}
            <div className='flex items-center justify-between text-xs text-muted-foreground pt-4 border-t'>
              <span>Menos</span>
              <div className='flex items-center gap-1'>
                <div className='w-3 h-3 rounded-sm bg-muted'></div>
                <div className='w-3 h-3 rounded-sm bg-green-200 dark:bg-green-800'></div>
                <div className='w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600'></div>
                <div className='w-3 h-3 rounded-sm bg-green-600 dark:bg-green-400'></div>
              </div>
              <span>Mais</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReadingCalendar;
