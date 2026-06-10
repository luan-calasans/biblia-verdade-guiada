import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PlanGenerator from '@/components/PlanGenerator';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';
import { BookOpen } from 'lucide-react';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Planos de Leitura Bíblica | Graça e Leitura</title>
        <meta
          name='description'
          content='Crie seu plano de leitura bíblica personalizado! Escolha entre planos temáticos, por data ou por capítulos. Organize seu estudo bíblico de forma eficiente e significativa.'
        />
        <meta
          name='keywords'
          content='plano bíblico, leitura da bíblia, estudo bíblico, cronograma de leitura, antigo testamento, novo testamento, plano de estudo bíblico, leitura diária da bíblia'
        />
        <link rel='canonical' href='https://biblia.gracaeleitura.com/planos' />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://biblia.gracaeleitura.com/planos'
        />
        <meta property='og:title' content='Planos de Leitura Bíblica' />
        <meta
          property='og:description'
          content='Crie seu plano de leitura bíblica personalizado! Escolha entre planos temáticos, por data ou por capítulos. Organize seu estudo bíblico de forma eficiente e significativa.'
        />
        <meta
          property='og:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta
          property='og:image:alt'
          content='Planos de Leitura Bíblica - Crie seu plano de leitura bíblica personalizado'
        />
        <meta property='og:site_name' content='Graça e Leitura' />
        <meta property='og:locale' content='pt_BR' />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:url'
          content='https://biblia.gracaeleitura.com/planos'
        />
        <meta name='twitter:title' content='Planos de Leitura Bíblica' />
        <meta
          name='twitter:description'
          content='Crie seu plano de leitura bíblica personalizado! Escolha entre planos temáticos, por data ou por capítulos. Organize seu estudo bíblico de forma eficiente e significativa.'
        />
        <meta
          name='twitter:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
        <meta
          name='twitter:image:alt'
          content='Planos de Leitura Bíblica - Crie seu plano de leitura bíblica personalizado'
        />

        {/* WhatsApp / Telegram */}
        <meta property='og:image:type' content='image/png' />
        <meta
          property='og:image:secure_url'
          content='https://biblia.gracaeleitura.com/seo.png'
        />

        {/* LinkedIn */}
        <meta name='linkedin:card' content='summary_large_image' />

        {/* Pinterest */}
        <meta name='pinterest-rich-pin' content='true' />
      </Helmet>

      <div className='min-h-screen flex flex-col w-full bg-background'>
        <main className='flex-1 w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6'>
          <div className='text-center mb-4 sm:mb-6 animate-fade-in'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-bible-accent'>
              Planos de Leitura Bíblica
            </h1>
            <p className='text-bible-text text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 mb-4'>
              Crie seu plano personalizado escolhendo o período e quais partes
              da Bíblia você deseja estudar. Organize sua leitura de forma
              eficiente e significativa.
            </p>
            <Link to={ROUTES.plansPreset}>
              <Button variant='outline' className='mb-6'>
                <BookOpen className='w-4 h-4 mr-2' />
                Ver Planos Pré-prontos
              </Button>
            </Link>
          </div>

          <div className='w-full'>
            <PlanGenerator />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
