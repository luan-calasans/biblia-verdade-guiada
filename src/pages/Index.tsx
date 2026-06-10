import React from 'react';
import { Helmet } from 'react-helmet-async';
import PlanGenerator from '@/components/PlanGenerator';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>
          Descubra a Palavra com Planos de Leitura e Quizzes Bíblicos!
        </title>
        <meta
          name='description'
          content='Aprofunde sua fé com um plano de leitura bíblica! Descubra a Palavra com planos de leitura personalizados e quizzes bíblicos interativos. Ferramenta completa para estudo organizado da Bíblia.'
        />
        <meta
          name='keywords'
          content='plano bíblico, leitura da bíblia, estudo bíblico, quiz bíblico, cronograma de leitura, antigo testamento, novo testamento, plano de estudo bíblico, leitura diária da bíblia, estudo organizado da bíblia, quiz versículos, teste bíblico'
        />
        <link rel='canonical' href='https://biblia.gracaeleitura.com' />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://biblia.gracaeleitura.com' />
        <meta
          property='og:title'
          content='Descubra a Palavra com Planos de Leitura e Quizzes Bíblicos!'
        />
        <meta
          property='og:description'
          content='Aprofunde sua fé com um plano de leitura bíblica! Descubra a Palavra com planos de leitura personalizados e quizzes bíblicos interativos.'
        />
        <meta
          property='og:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta
          property='og:image:alt'
          content='Descubra a Palavra com Planos de Leitura e Quizzes Bíblicos - Aprofunde sua fé com um plano de leitura bíblica'
        />
        <meta property='og:site_name' content='Graça e Leitura' />
        <meta property='og:locale' content='pt_BR' />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:url' content='https://biblia.gracaeleitura.com' />
        <meta
          name='twitter:title'
          content='Descubra a Palavra com Planos de Leitura e Quizzes Bíblicos!'
        />
        <meta
          name='twitter:description'
          content='Aprofunde sua fé com um plano de leitura bíblica! Descubra a Palavra com planos de leitura personalizados e quizzes bíblicos interativos.'
        />
        <meta
          name='twitter:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
        <meta
          name='twitter:image:alt'
          content='Descubra a Palavra com Planos de Leitura e Quizzes Bíblicos - Aprofunde sua fé com um plano de leitura bíblica'
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

        {/* Structured Data */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Graça e Leitura',
            description:
              'Aprofunde sua fé com um plano de leitura bíblica! Descubra a Palavra com planos de leitura personalizados e quizzes bíblicos interativos.',
            url: 'https://biblia.gracaeleitura.com',
            image: 'https://biblia.gracaeleitura.com/seo.png',
            applicationCategory: 'EducationalApplication',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            operatingSystem: 'Any',
            author: {
              '@type': 'Person',
              name: 'Luan Calasans',
              url: 'https://github.com/luan-calasans',
            },
          })}
        </script>
      </Helmet>

      <div className='min-h-screen flex flex-col w-full bg-bible-background'>
        <main className='flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col items-center'>
          <div className='text-center mb-6 animate-fade-in'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-bible-accent'>
              Plano de Leitura Bíblica
            </h1>
            <p className='text-bible-text text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4'>
              Crie seu plano personalizado escolhendo o período e quais partes
              da Bíblia você deseja estudar. Baixe o PDF para acompanhar seu
              progresso.
            </p>
          </div>

          <div className='w-full flex flex-col items-center gap-8'>
            <div className='w-full max-w-xl'>
              <PlanGenerator />
            </div>
          </div>

          <footer className='mt-16 pt-6 border-t border-bible-gray text-center text-xs sm:text-sm text-bible-text/70 animate-fade-in w-full'>
            <p className='px-4'>
              Desenvolvido por{' '}
              <a
                href='https://github.com/luan-calasans'
                target='_blank'
                rel='noopener noreferrer'
                className='text-bible-accent hover:underline'
              >
                Luan Calasans
              </a>
            </p>
          </footer>
        </main>
      </div>
    </>
  );
};

export default Index;
