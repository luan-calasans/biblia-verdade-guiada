import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardSkeleton() {
  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl animate-fade-in'>
      {/* Header de Boas-vindas Skeleton */}
      <div className='mb-8'>
        <Skeleton className='h-8 w-80 mb-2' />
        <Skeleton className='h-6 w-96' />
      </div>

      {/* Estatísticas Rápidas Skeleton */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        {[
          { icon: 'w-4 h-4', label: 'w-12', value: 'w-8' },
          { icon: 'w-4 h-4', label: 'w-16', value: 'w-6' },
          { icon: 'w-4 h-4', label: 'w-14', value: 'w-10' },
          { icon: 'w-4 h-4', label: 'w-18', value: 'w-8' },
        ].map((stat, index) => (
          <Card key={index} className='animate-pulse'>
            <CardContent className='p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Skeleton className={`${stat.icon} rounded-full`} />
                <Skeleton className={`h-4 ${stat.label}`} />
              </div>
              <Skeleton className={`h-8 ${stat.value}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Título da Seção Skeleton */}
      <div className='mb-8'>
        <Skeleton className='h-6 w-48 mb-4' />

        {/* Grid de Serviços Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[...Array(9)].map((_, index) => (
            <Card
              key={index}
              className='h-full hover:shadow-lg transition-all duration-200'
              style={{
                animationDelay: `${index * 50}ms`,
                opacity: 0,
                animation: 'fadeInScale 0.4s ease-out forwards',
              }}
            >
              <CardContent className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <Skeleton className='w-12 h-12 rounded-lg' />
                  {/* Mostrar badge em alguns cards para variar */}
                  {(index === 0 || index === 2) && (
                    <Skeleton className='h-5 w-16 rounded-full' />
                  )}
                </div>
                <Skeleton
                  className={`h-5 mb-2 ${index % 2 === 0 ? 'w-32' : 'w-28'}`}
                />
                <Skeleton className='h-4 w-full mb-1' />
                <Skeleton
                  className={`h-4 mb-4 ${
                    index % 3 === 0
                      ? 'w-3/4'
                      : index % 3 === 1
                      ? 'w-5/6'
                      : 'w-2/3'
                  }`}
                />
                <div className='flex items-center'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='w-4 h-4 ml-1' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
