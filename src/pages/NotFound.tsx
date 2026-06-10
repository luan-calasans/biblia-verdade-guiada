import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  BookOpen, 
  Search, 
  Heart, 
  ArrowLeft,
  AlertTriangle
} from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Página não encontrada | Graça e Leitura</title>
        <meta
          name='description'
          content='A página que você está procurando não foi encontrada. Explore nossa plataforma de estudos bíblicos com planos personalizados, quiz interativo e muito mais.'
        />
        <meta name='robots' content='noindex, nofollow' />
        <link rel='canonical' href='https://biblia.gracaeleitura.com/' />
      </Helmet>

      <div className='min-h-[70vh] flex flex-col items-center justify-center px-4'>
        <div className='max-w-2xl mx-auto text-center space-y-8'>
          {/* Ícone de Erro */}
          <div className='flex justify-center'>
            <div className='relative'>
              <div className='w-24 h-24 bg-bible-soft-green rounded-full flex items-center justify-center'>
                <AlertTriangle className='w-12 h-12 text-bible-accent' />
              </div>
              <div className='absolute -top-2 -right-2 w-8 h-8 bg-bible-accent rounded-full flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>404</span>
              </div>
            </div>
          </div>

          {/* Título e Descrição */}
          <div className='space-y-4'>
            <h1 className='text-3xl sm:text-4xl font-bold text-bible-accent'>
              Página não encontrada
            </h1>
            <p className='text-bible-text/70 text-lg sm:text-xl max-w-lg mx-auto'>
              A página que você está procurando não existe ou foi movida. 
              Que tal explorar nossos recursos disponíveis?
            </p>
          </div>

          {/* Botões de Ação */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link to={ROUTES.home}>
              <Button className='bg-bible-accent hover:bg-bible-accent/90 text-white flex items-center gap-2'>
                <Home className='w-4 h-4' />
                Página Inicial
              </Button>
            </Link>
            <Link to={ROUTES.plans}>
              <Button variant='outline' className='flex items-center gap-2'>
                <BookOpen className='w-4 h-4' />
                Criar Plano de Leitura
              </Button>
            </Link>
          </div>

          {/* Recursos Populares */}
          <Card className='mt-12'>
            <CardHeader>
              <CardTitle className='text-bible-accent text-center'>
                Recursos Populares
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <Link 
                  to={ROUTES.verseOfTheDay}
                  className='p-4 rounded-lg border hover:bg-bible-soft-green transition-colors text-center group'
                >
                  <Heart className='w-6 h-6 mx-auto mb-2 text-bible-accent group-hover:scale-110 transition-transform' />
                  <h3 className='font-medium text-bible-text'>Versículo do Dia</h3>
                  <p className='text-sm text-bible-text/60 mt-1'>Inspiração diária</p>
                </Link>

                <Link 
                  to={ROUTES.quiz}
                  className='p-4 rounded-lg border hover:bg-bible-soft-green transition-colors text-center group'
                >
                  <BookOpen className='w-6 h-6 mx-auto mb-2 text-bible-accent group-hover:scale-110 transition-transform' />
                  <h3 className='font-medium text-bible-text'>Quiz Bíblico</h3>
                  <p className='text-sm text-bible-text/60 mt-1'>Teste seus conhecimentos</p>
                </Link>

                <Link 
                  to={ROUTES.search}
                  className='p-4 rounded-lg border hover:bg-bible-soft-green transition-colors text-center group'
                >
                  <Search className='w-6 h-6 mx-auto mb-2 text-bible-accent group-hover:scale-110 transition-transform' />
                  <h3 className='font-medium text-bible-text'>Busca Avançada</h3>
                  <p className='text-sm text-bible-text/60 mt-1'>Encontre versículos</p>
                </Link>

                <Link 
                  to={ROUTES.memorization}
                  className='p-4 rounded-lg border hover:bg-bible-soft-green transition-colors text-center group'
                >
                  <BookOpen className='w-6 h-6 mx-auto mb-2 text-bible-accent group-hover:scale-110 transition-transform' />
                  <h3 className='font-medium text-bible-text'>Memorização</h3>
                  <p className='text-sm text-bible-text/60 mt-1'>Decore versículos</p>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Link de Voltar */}
          <div className='pt-8'>
            <Button 
              variant='ghost' 
              onClick={() => window.history.back()}
              className='text-bible-text/70 hover:text-bible-accent flex items-center gap-2'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar à página anterior
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
