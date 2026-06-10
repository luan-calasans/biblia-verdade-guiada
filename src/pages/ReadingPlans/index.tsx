import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { ArrowLeft, Calendar, BookOpen } from 'lucide-react';

const ReadingPlans: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    {
      title: 'Plano de 1 Mês',
      description:
        'Um plano equilibrado para ler partes selecionadas da Bíblia em um mês',
      path: ROUTES.plans1Month,
      duration: '30 dias',
    },
    {
      title: 'Plano de 3 Meses',
      description: 'Um plano abrangente para ler a Bíblia em três meses',
      path: ROUTES.plans3Months,
      duration: '90 dias',
    },
    {
      title: 'Plano de 6 Meses',
      description: 'Um plano detalhado para estudar a Bíblia em seis meses',
      path: ROUTES.plans6Months,
      duration: '180 dias',
    },
    {
      title: 'Plano de 1 Ano',
      description: 'O plano clássico para ler a Bíblia inteira em um ano',
      path: ROUTES.plans1Year,
      duration: '365 dias',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Planos de Leitura Pré-prontos | Graça e Leitura</title>
        <meta
          name='description'
          content='Escolha entre nossos planos de leitura bíblica pré-prontos: 1 mês, 3 meses, 6 meses ou 1 ano. Planos cuidadosamente elaborados para sua jornada espiritual.'
        />
        <meta
          name='keywords'
          content='plano bíblico, leitura da bíblia, plano mensal, plano trimestral, plano semestral, plano anual, estudo bíblico, cronograma de leitura'
        />
        <link
          rel='canonical'
          href='https://biblia.gracaeleitura.com/planos/pre-prontos'
        />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://biblia.gracaeleitura.com/planos/pre-prontos'
        />
        <meta
          property='og:title'
          content='Planos de Leitura Pré-prontos | Graça e Leitura'
        />
        <meta
          property='og:description'
          content='Escolha entre nossos planos de leitura bíblica pré-prontos: 1 mês, 3 meses, 6 meses ou 1 ano. Planos cuidadosamente elaborados para sua jornada espiritual.'
        />
        <meta
          property='og:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:site_name' content='Graça e Leitura' />
        <meta property='og:locale' content='pt_BR' />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:url'
          content='https://biblia.gracaeleitura.com/planos/pre-prontos'
        />
        <meta
          name='twitter:title'
          content='Planos de Leitura Pré-prontos | Graça e Leitura'
        />
        <meta
          name='twitter:description'
          content='Escolha entre nossos planos de leitura bíblica pré-prontos: 1 mês, 3 meses, 6 meses ou 1 ano. Planos cuidadosamente elaborados para sua jornada espiritual.'
        />
        <meta
          name='twitter:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
      </Helmet>

      <div className='max-w-7xl mx-auto px-2 sm:px-4 py-8'>
        <Button
          variant='ghost'
          className='mb-4'
          onClick={() => navigate(ROUTES.plans)}
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Voltar para Gerador de Planos
        </Button>

        <div className='mb-8'>
          <h1 className='text-3xl font-bold mb-2'>
            Planos de Leitura Pré-definidos
          </h1>
          <p className='text-muted-foreground'>
            Escolha um dos nossos planos de leitura cuidadosamente elaborados
            para sua jornada espiritual
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {plans.map((plan) => (
            <Card key={plan.path} className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <BookOpen className='h-5 w-5' />
                  {plan.title}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center text-sm text-muted-foreground'>
                    <Calendar className='mr-2 h-4 w-4' />
                    {plan.duration}
                  </div>
                  <Button onClick={() => navigate(plan.path)}>Ver Plano</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReadingPlans;
