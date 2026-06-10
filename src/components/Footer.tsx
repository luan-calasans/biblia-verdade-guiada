import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Heart,
  Shield,
  Mail,
  Calendar,
  Brain,
  Trophy,
  Users,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

const Footer = () => {
  return (
    <footer className='bg-bible-white border-t border-bible-gray mt-auto'>
      <div className='container mx-auto px-2 sm:px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6'>
          {/* Logo e Descrição - Ocupa 2 colunas no desktop */}
          <div className='space-y-4 lg:col-span-2 text-center md:text-left'>
            <div className='flex items-center gap-2 justify-center md:justify-start'>
              <BookOpen className='w-6 h-6 text-bible-accent' />
              <span className='text-lg font-bold text-bible-text'>
                Graça e Leitura
              </span>
            </div>
            <p className='text-sm text-bible-text/70 leading-relaxed max-w-md mx-auto md:mx-0'>
              Plataforma gratuita para estudo organizado da Bíblia com planos de
              leitura personalizados, quizzes interativos e ferramentas de
              memorização baseadas em repetição espaçada.
            </p>
            <div className='flex flex-wrap gap-4 text-xs text-bible-text/60 justify-center md:justify-start'>
              <div className='flex items-center gap-1'>
                <Calendar className='w-3 h-3' />
                Planos Personalizados
              </div>
              <div className='flex items-center gap-1'>
                <Brain className='w-3 h-3' />
                Memorização Inteligente
              </div>
              <div className='flex items-center gap-1'>
                <Trophy className='w-3 h-3' />
                Quizzes Interativos
              </div>
            </div>
          </div>

          {/* Recursos */}
          <div className='space-y-3 text-center md:text-left'>
            <h3 className='text-sm font-semibold text-bible-text'>Recursos</h3>
            <div className='flex flex-col space-y-2'>
              <Link
                to={ROUTES.plans}
                className='text-sm text-bible-text/70 hover:text-bible-accent transition-colors'
              >
                Planos de Leitura
              </Link>
              <Link
                to={ROUTES.memorization}
                className='text-sm text-bible-text/70 hover:text-bible-accent transition-colors'
              >
                Memorização
              </Link>
              <Link
                to={ROUTES.quiz}
                className='text-sm text-bible-text/70 hover:text-bible-accent transition-colors'
              >
                Quizzes Bíblicos
              </Link>
              <Link
                to={ROUTES.verseOfTheDay}
                className='text-sm text-bible-text/70 hover:text-bible-accent transition-colors'
              >
                Versículo do Dia
              </Link>
            </div>
          </div>

          {/* Links Úteis */}
          <div className='space-y-3 text-center md:text-left'>
            <h3 className='text-sm font-semibold text-bible-text'>
              Links Úteis
            </h3>
            <div className='flex flex-col space-y-2'>
              <Link
                to={ROUTES.whyStudy}
                className='text-sm text-bible-text/70 hover:text-bible-accent transition-colors'
              >
                Sobre o Projeto
              </Link>
              <Link
                to={ROUTES.donation}
                className='text-sm text-bible-text/70 hover:text-bible-accent transition-colors flex items-center gap-1 justify-center md:justify-start'
              >
                <Heart className='w-3 h-3' />
                Apoie o Projeto
              </Link>
              <Link
                to={ROUTES.privacy}
                className='text-sm text-bible-text/70 hover:text-bible-accent transition-colors flex items-center gap-1 justify-center md:justify-start'
              >
                <Shield className='w-3 h-3' />
                Política de Privacidade
              </Link>
            </div>
          </div>

          {/* Contato e Comunidade */}
          <div className='space-y-3 text-center md:text-left'>
            <h3 className='text-sm font-semibold text-bible-text'>Contato</h3>
            <div className='flex flex-col space-y-2'>
              <a
                href='mailto:luancalasans.site@gmail.com'
                className='text-sm text-bible-text/70 hover:text-bible-accent transition-colors flex items-center gap-1 justify-center md:justify-start'
              >
                <Mail className='w-3 h-3' />
                Fale Conosco
              </a>
              <a
                href='https://github.com/luan-calasans'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-bible-text/70 hover:text-bible-accent transition-colors'
              >
                GitHub
              </a>
              <div className='flex items-center gap-1 text-sm text-bible-text/60 justify-center md:justify-start'>
                <Users className='w-3 h-3' />
                Comunidade Ativa
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-bible-gray/50 mt-8 pt-6'>
          <div className='text-center'>
            <div>
              <p className='text-sm text-bible-text/60'>
                © {new Date().getFullYear()} Graça e Leitura. Desenvolvido por{' '}
                <a
                  href='https://github.com/luan-calasans'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-bible-accent hover:underline'
                >
                  Luan Calasans
                </a>
                .
                <br />
                Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
