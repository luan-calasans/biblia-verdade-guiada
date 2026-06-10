import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Menu,
  X,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link
            to={ROUTES.home}
            className='flex items-center gap-2 text-bible-accent'
          >
            <BookOpen className='w-6 h-6' />
            <span className='font-bold text-lg hidden sm:inline'>
              Graça e Leitura
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className='hidden lg:flex items-center gap-6'>
            <Link
              to={ROUTES.plans}
              className={`text-sm font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.plans)
                  ? 'text-bible-accent'
                  : 'text-bible-text/70'
              }`}
            >
              Planos de Leitura
            </Link>
            <Link
              to={ROUTES.verseOfTheDay}
              className={`text-sm font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.verseOfTheDay)
                  ? 'text-bible-accent'
                  : 'text-bible-text/70'
              }`}
            >
              Versículo do Dia
            </Link>
            <Link
              to={ROUTES.reading}
              className={`text-sm font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.reading)
                  ? 'text-bible-accent'
                  : 'text-bible-text/70'
              }`}
            >
              Leitura
            </Link>
            <Link
              to={ROUTES.timeline}
              className={`text-sm font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.timeline)
                  ? 'text-bible-accent'
                  : 'text-bible-text/70'
              }`}
            >
              Linha do Tempo
            </Link>
            <Link
              to={ROUTES.images}
              className={`text-sm font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.images)
                  ? 'text-bible-accent'
                  : 'text-bible-text/70'
              }`}
            >
              Imagens
            </Link>
            <Link
              to={ROUTES.models3d}
              className={`text-sm font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.models3d)
                  ? 'text-bible-accent'
                  : 'text-bible-text/70'
              }`}
            >
              Modelos 3D
            </Link>
            <Link
              to={ROUTES.donation}
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.donation)
                  ? 'text-bible-accent'
                  : 'text-bible-text/70'
              }`}
            >
              <Heart className='w-4 h-4' />
              <span>Doação</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant='ghost'
            size='icon'
            className='lg:hidden'
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='lg:hidden py-4 space-y-4'>
            <Link
              to={ROUTES.plans}
              className={`block py-2 text-lg font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.plans)
                  ? 'text-bible-accent'
                  : 'text-bible-text'
              }`}
              onClick={toggleMobileMenu}
            >
              Planos de Leitura
            </Link>
            <Link
              to={ROUTES.verseOfTheDay}
              className={`block py-2 text-lg font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.verseOfTheDay)
                  ? 'text-bible-accent'
                  : 'text-bible-text'
              }`}
              onClick={toggleMobileMenu}
            >
              Versículo do Dia
            </Link>
            <Link
              to={ROUTES.reading}
              className={`block py-2 text-lg font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.reading)
                  ? 'text-bible-accent'
                  : 'text-bible-text'
              }`}
              onClick={toggleMobileMenu}
            >
              Leitura
            </Link>
            <Link
              to={ROUTES.timeline}
              className={`block py-2 text-lg font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.timeline)
                  ? 'text-bible-accent'
                  : 'text-bible-text'
              }`}
              onClick={toggleMobileMenu}
            >
              Linha do Tempo
            </Link>
            <Link
              to={ROUTES.images}
              className={`block py-2 text-lg font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.images)
                  ? 'text-bible-accent'
                  : 'text-bible-text'
              }`}
              onClick={toggleMobileMenu}
            >
              Imagens
            </Link>
            <Link
              to={ROUTES.models3d}
              className={`block py-2 text-lg font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.models3d)
                  ? 'text-bible-accent'
                  : 'text-bible-text'
              }`}
              onClick={toggleMobileMenu}
            >
              Modelos 3D
            </Link>
            <Link
              to={ROUTES.donation}
              className={`flex items-center gap-2 py-2 text-lg font-medium transition-colors hover:text-bible-accent ${
                isActive(ROUTES.donation)
                  ? 'text-bible-accent'
                  : 'text-bible-text'
              }`}
              onClick={toggleMobileMenu}
            >
              <Heart className='w-5 h-5' />
              <span>Doação</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
