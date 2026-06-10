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

const OneYearPlan: React.FC = () => {
  const navigate = useNavigate();
  const plan = generateReadingPlan(12, 'months', true, true, [], false);

  return (
    <>
      <Helmet>
        <title>Plano de Leitura de 1 Ano | Graça e Leitura</title>
        <meta
          name='description'
          content='Plano de leitura bíblica de 1 ano: o plano clássico para ler a Bíblia inteira em 365 dias. Uma jornada completa através das Escrituras, do Gênesis ao Apocalipse.'
        />
        <meta
          name='keywords'
          content='plano bíblico anual, leitura da bíblia em 1 ano, estudo bíblico anual, plano de 365 dias, leitura diária da bíblia, bíblia em um ano'
        />
        <link
          rel='canonical'
          href='https://biblia.gracaeleitura.com/planos/1-ano'
        />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://biblia.gracaeleitura.com/planos/1-ano'
        />
        <meta
          property='og:title'
          content='Plano de Leitura de 1 Ano | Graça e Leitura'
        />
        <meta
          property='og:description'
          content='Plano de leitura bíblica de 1 ano: o plano clássico para ler a Bíblia inteira em 365 dias. Uma jornada completa através das Escrituras, do Gênesis ao Apocalipse.'
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
          content='https://biblia.gracaeleitura.com/planos/1-ano'
        />
        <meta
          name='twitter:title'
          content='Plano de Leitura de 1 Ano | Graça e Leitura'
        />
        <meta
          name='twitter:description'
          content='Plano de leitura bíblica de 1 ano: o plano clássico para ler a Bíblia inteira em 365 dias. Uma jornada completa através das Escrituras, do Gênesis ao Apocalipse.'
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
              Plano de Leitura - 1 Ano
            </h1>
            <p className='text-muted-foreground'>
              O plano clássico para ler a Bíblia inteira em um ano
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

export default OneYearPlan;
