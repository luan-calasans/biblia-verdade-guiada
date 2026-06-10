import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PlanTable from '@/components/PlanTable';
import { generateReadingPlan } from '@/utils/bibleData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { ArrowLeft } from 'lucide-react';

const OneMonthPlan: React.FC = () => {
  const navigate = useNavigate();
  const plan = generateReadingPlan(1, 'months', true, true, [], false);

  return (
    <>
      <Helmet>
        <title>Plano de Leitura de 1 Mês | Graça e Leitura</title>
        <meta
          name='description'
          content='Plano de leitura bíblica de 1 mês: um plano equilibrado para ler partes selecionadas da Bíblia em 30 dias. Ideal para iniciar sua jornada de leitura bíblica.'
        />
        <meta
          name='keywords'
          content='plano bíblico mensal, leitura da bíblia em 1 mês, estudo bíblico mensal, plano de 30 dias, leitura diária da bíblia'
        />
        <link
          rel='canonical'
          href='https://biblia.gracaeleitura.com/planos/1-mes'
        />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://biblia.gracaeleitura.com/planos/1-mes'
        />
        <meta
          property='og:title'
          content='Plano de Leitura de 1 Mês | Graça e Leitura'
        />
        <meta
          property='og:description'
          content='Plano de leitura bíblica de 1 mês: um plano equilibrado para ler partes selecionadas da Bíblia em 30 dias. Ideal para iniciar sua jornada de leitura bíblica.'
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
          content='https://biblia.gracaeleitura.com/planos/1-mes'
        />
        <meta
          name='twitter:title'
          content='Plano de Leitura de 1 Mês | Graça e Leitura'
        />
        <meta
          name='twitter:description'
          content='Plano de leitura bíblica de 1 mês: um plano equilibrado para ler partes selecionadas da Bíblia em 30 dias. Ideal para iniciar sua jornada de leitura bíblica.'
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
          Voltar para Planos
        </Button>

        <div>
          <div className='mb-6'>
            <h1 className='text-3xl font-bold mb-2'>
              Plano de Leitura - 1 Mês
            </h1>
            <p className='text-muted-foreground'>
              Um plano equilibrado para ler partes selecionadas da Bíblia em um
              mês
            </p>
          </div>
          <PlanTable
            plan={plan}
            timeUnit='months'
            includeOldTestament={true}
            includeNewTestament={true}
            selectedBooks={[]}
            orderType='traditional'
            isChronological={false}
          />
        </div>
      </div>
    </>
  );
};

export default OneMonthPlan;
