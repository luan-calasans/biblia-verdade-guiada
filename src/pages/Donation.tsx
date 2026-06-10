import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, Heart, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Donation = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const pixKey = '0bef4914-763d-4964-bf65-d52dd91cd0a2';
  const pixCopyPaste =
    '00020126580014BR.GOV.BCB.PIX01360bef4914-763d-4964-bf65-d52dd91cd0a25204000053039865802BR5901N6001C62150511PLANOBIBLIA6304D5F2';

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
  };

  const handleCopyPixCopyPaste = () => {
    navigator.clipboard.writeText(pixCopyPaste);
  };

  return (
    <>
      <Helmet>
        <title>Apoie o Projeto | Graça e Leitura</title>
        <meta
          name='description'
          content='Ajude a manter este projeto de estudo bíblico gratuito no ar. Sua doação via PIX garante que milhares de pessoas continuem tendo acesso a ferramentas gratuitas para estudo organizado da Bíblia. Contribua para o crescimento espiritual de mais pessoas.'
        />
        <meta
          name='keywords'
          content='doação bíblica, apoio projeto bíblico, doação estudo bíblia, pix bíblico, contribuição bíblica'
        />
        <link rel='canonical' href='https://biblia.gracaeleitura.com/doacao' />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://biblia.gracaeleitura.com/doacao'
        />
        <meta property='og:title' content='Apoie o Projeto | Graça e Leitura' />
        <meta
          property='og:description'
          content='Apoie o desenvolvimento deste projeto de estudo bíblico gratuito através de uma doação via PIX. Ajude a manter o site no ar e acessível a todos.'
        />
        <meta
          property='og:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta
          property='og:image:alt'
          content='Apoie o Projeto - Descubra a Palavra com Planos de Leitura e Quizzes Bíblicos'
        />
        <meta property='og:image:type' content='image/png' />
        <meta
          property='og:image:secure_url'
          content='https://biblia.gracaeleitura.com/seo.png'
        />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:url'
          content='https://biblia.gracaeleitura.com/doacao'
        />
        <meta
          name='twitter:title'
          content='Apoie o Projeto | Graça e Leitura'
        />
        <meta
          name='twitter:description'
          content='Apoie o desenvolvimento deste projeto de estudo bíblico gratuito através de uma doação via PIX. Ajude a manter o site no ar e acessível a todos.'
        />
        <meta
          name='twitter:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
        <meta
          name='twitter:image:alt'
          content='Apoie o Projeto - Descubra a Palavra com Planos de Leitura e Quizzes Bíblicos'
        />

        {/* Structured Data */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Apoie o Projeto | Graça e Leitura',
            description:
              'Apoie o desenvolvimento deste projeto de estudo bíblico gratuito através de uma doação via PIX.',
            url: 'https://biblia.gracaeleitura.com/doacao',
            publisher: {
              '@type': 'Person',
              name: 'Luan Calasans',
              url: 'https://github.com/luan-calasans',
            },
          })}
        </script>
      </Helmet>

      <div className='min-h-screen flex flex-col w-full'>
        <main className='flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
          <header className='text-center mb-6 animate-fade-in'>
            <div className='flex items-center justify-center gap-2 mb-4'>
              <Heart className='w-6 h-6 text-bible-accent' aria-hidden='true' />
              <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-bible-accent'>
                Apoie o Projeto
              </h1>
            </div>
            <p className='text-bible-text/70 text-sm sm:text-base'>
              Ajude a manter este projeto gratuito e acessível para todos
            </p>
          </header>

          <div className='max-w-2xl mx-auto animate-slide-up'>
            <Card className='shadow-lg border-bible-gray/20'>
              <CardHeader className='text-center bg-bible-soft-green'>
                <CardTitle className='flex items-center justify-center gap-2 text-bible-text text-base sm:text-lg'>
                  Faça uma Doação
                </CardTitle>
              </CardHeader>

              <CardContent className='p-6 sm:p-8'>
                <div className='text-center space-y-6'>
                  <p className='text-bible-text text-sm sm:text-base leading-relaxed'>
                    Este projeto é oferecido de forma inteiramente gratuita para
                    auxiliar no estudo organizado da Bíblia. Sua contribuição é
                    fundamental para manter o site no ar e acessível a todos.
                  </p>

                  <div className='space-y-6'>
                    {/* Opção 1: Chave PIX */}
                    <div className='bg-bible-soft-green/50 p-4 rounded-lg'>
                      <p className='text-sm sm:text-base text-bible-text/80 mb-2'>
                        Opção 1: Chave PIX
                      </p>
                      <div className='flex items-center justify-center gap-2'>
                        <code className='bg-bible-white px-3 py-2 rounded text-bible-accent font-mono'>
                          {pixKey}
                        </code>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={handleCopyPixKey}
                          className='hover:bg-bible-soft-green'
                        >
                          <Copy className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>

                    {/* Opção 2: PIX Copia e Cola */}
                    <div className='bg-bible-soft-green/50 p-4 rounded-lg'>
                      <p className='text-sm sm:text-base text-bible-text/80 mb-2'>
                        Opção 2: PIX Copia e Cola
                      </p>
                      <div className='flex items-center justify-center gap-2'>
                        <code className='bg-bible-white px-3 py-2 rounded text-bible-accent font-mono text-xs sm:text-sm break-all'>
                          {pixCopyPaste}
                        </code>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={handleCopyPixCopyPaste}
                          className='hover:bg-bible-soft-green'
                        >
                          <Copy className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowQRCode(!showQRCode)}
                    className='bg-bible-accent text-white dark:text-black hover:bg-bible-accent/90'
                  >
                    <QrCode className='mr-2 h-4 w-4' />
                    {showQRCode ? 'Ocultar QR Code' : 'Mostrar QR Code'}
                  </Button>

                  {showQRCode && (
                    <div className='mt-4 p-4 bg-bible-white rounded-lg'>
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                          pixCopyPaste
                        )}`}
                        alt='QR Code PIX'
                        className='mx-auto'
                      />
                    </div>
                  )}

                  <p className='text-sm sm:text-base text-bible-text/60 mt-4'>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default Donation;
