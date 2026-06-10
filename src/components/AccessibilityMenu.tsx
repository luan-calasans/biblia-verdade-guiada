import React, { useState, useRef, useEffect } from 'react';
import {
  Settings,
  ZoomIn,
  ZoomOut,
  Contrast,
  Undo2,
  Barcode,
  Languages,
  Moon,
  Sun,
  Link,
  AlignJustify,
  Minus,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from '@/contexts/ThemeContext';
import { useCarousel } from '@/contexts/CarouselContext';

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [vlibrasVisible, setVlibrasVisible] = useState(false);
  const [linkHighlight, setLinkHighlight] = useState(false);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { isCarouselOpen } = useCarousel();

  // Fecha o menu ao clicar fora
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Funções de acessibilidade
  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2);
      document.documentElement.style.fontSize = `${fontSize + 2}px`;
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
      document.documentElement.style.fontSize = `${fontSize - 2}px`;
    }
  };

  const toggleGrayscale = () => {
    setGrayscale((prev) => {
      if (!prev) {
        document.documentElement.style.filter = 'grayscale(100%)';
      } else {
        document.documentElement.style.filter = '';
      }
      return !prev;
    });
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      if (!prev) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      return !prev;
    });
  };

  const toggleVLibras = () => {
    const vlibrasDiv = document.querySelector('[vw]') as HTMLElement;
    if (vlibrasDiv) {
      setVlibrasVisible((prev) => {
        if (!prev) {
          vlibrasDiv.style.display = 'block';
          vlibrasDiv.classList.add('enabled');
        } else {
          vlibrasDiv.style.display = 'none';
          vlibrasDiv.classList.remove('enabled');
        }
        return !prev;
      });
    }
  };

  const toggleLinkHighlight = () => {
    setLinkHighlight((prev) => {
      if (!prev) {
        document.documentElement.classList.add('link-highlight');
        // Force update styles for dark mode compatibility
        const isDark = document.documentElement.classList.contains('dark');
        const outlineColor = isDark ? '#ffffff' : '#000000';

        // Create or update CSS custom property for dynamic color
        document.documentElement.style.setProperty(
          '--link-highlight-color',
          outlineColor
        );
      } else {
        document.documentElement.classList.remove('link-highlight');
        document.documentElement.style.removeProperty('--link-highlight-color');
      }
      return !prev;
    });
  };

  const increaseLineSpacing = () => {
    if (lineSpacing < 2.5) {
      const newSpacing = lineSpacing + 0.2;
      setLineSpacing(newSpacing);
      document.documentElement.style.setProperty(
        '--line-spacing',
        newSpacing.toString()
      );
      document.documentElement.classList.add('custom-line-spacing');
    }
  };

  const decreaseLineSpacing = () => {
    if (lineSpacing > 1.0) {
      const newSpacing = lineSpacing - 0.2;
      setLineSpacing(newSpacing);
      document.documentElement.style.setProperty(
        '--line-spacing',
        newSpacing.toString()
      );
      document.documentElement.classList.add('custom-line-spacing');
    }
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      // Se for 'system', vamos para light primeiro
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'light') {
      return <Moon className='h-5 w-5' />;
    } else if (theme === 'dark') {
      return <Sun className='h-5 w-5' />;
    } else {
      // Para 'system', mostrar lua (para indicar que vai para dark)
      return <Moon className='h-5 w-5' />;
    }
  };

  const getThemeText = () => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    return isDark ? 'Modo Claro' : 'Modo Escuro';
  };

  const resetAccessibility = () => {
    setHighContrast(false);
    setGrayscale(false);
    setFontSize(16);
    setVlibrasVisible(false);
    setLinkHighlight(false);
    setLineSpacing(1.5);
    setTheme('light'); // Reset tema para claro
    document.documentElement.classList.remove('high-contrast');
    document.documentElement.classList.remove('link-highlight');
    document.documentElement.classList.remove('custom-line-spacing');
    document.documentElement.style.filter = '';
    document.documentElement.style.fontSize = '16px';
    document.documentElement.style.removeProperty('--line-spacing');

    // Ocultar VLibras (estado inicial)
    const vlibrasDiv = document.querySelector('[vw]') as HTMLElement;
    if (vlibrasDiv) {
      vlibrasDiv.style.display = 'none';
      vlibrasDiv.classList.remove('enabled');
    }
  };

  // Hide the accessibility menu when carousel is open
  if (isCarouselOpen) {
    return null;
  }

  return (
    <div
      className='fixed bottom-4 left-4 z-50'
      style={{ isolation: 'isolate' }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen((open) => !open)}
              className='bg-bible-accent hover:bg-bible-accent/90 text-white dark:text-black rounded-full w-12 h-12 p-2 shadow-lg flex items-center justify-center'
              aria-label='Menu de acessibilidade'
              style={{ isolation: 'isolate' }}
            >
              <Settings className='h-10 w-10' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='right'>
            <p>Menu de acessibilidade</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isOpen && (
        <div
          ref={menuRef}
          className='absolute bottom-14 left-0 bg-bible-white dark:bg-bible-gray rounded-lg shadow-lg p-4 space-y-2 w-56 border border-bible-accent'
          style={{ isolation: 'isolate' }}
        >
          <Button
            variant='ghost'
            className={`w-full justify-start gap-2 ${
              fontSize > 16
                ? 'text-bible-accent dark:text-bible-accent font-semibold'
                : 'text-bible-accent dark:text-bible-accent'
            }`}
            onClick={increaseFontSize}
            aria-label='Aumentar texto'
          >
            <ZoomIn className='h-4 w-4' /> Aumentar texto
          </Button>
          <Button
            variant='ghost'
            className={`w-full justify-start gap-2 ${
              fontSize < 16
                ? 'text-bible-accent dark:text-bible-accent font-semibold'
                : 'text-bible-accent dark:text-bible-accent'
            }`}
            onClick={decreaseFontSize}
            aria-label='Diminuir texto'
          >
            <ZoomOut className='h-4 w-4' /> Diminuir texto
          </Button>
          <Button
            variant='ghost'
            className={`w-full justify-start gap-2 ${
              lineSpacing > 1.5
                ? 'text-bible-accent dark:text-bible-accent font-semibold'
                : 'text-bible-accent dark:text-bible-accent'
            }`}
            onClick={increaseLineSpacing}
            aria-label='Aumentar espaçamento entre linhas'
          >
            <Plus className='h-4 w-4' /> Aumentar espaçamento
          </Button>
          <Button
            variant='ghost'
            className={`w-full justify-start gap-2 ${
              lineSpacing < 1.5
                ? 'text-bible-accent dark:text-bible-accent font-semibold'
                : 'text-bible-accent dark:text-bible-accent'
            }`}
            onClick={decreaseLineSpacing}
            aria-label='Diminuir espaçamento entre linhas'
          >
            <Minus className='h-4 w-4' /> Diminuir espaçamento
          </Button>
          <Button
            variant='ghost'
            className={`w-full justify-start gap-2 ${
              grayscale
                ? 'text-bible-accent dark:text-bible-accent font-semibold'
                : 'text-bible-accent dark:text-bible-accent'
            }`}
            onClick={toggleGrayscale}
            aria-label='Alternar escala de cinza'
          >
            <Barcode className='h-4 w-4' /> Escala de cinza
          </Button>
          <Button
            variant='ghost'
            className={`w-full justify-start gap-2 ${
              highContrast
                ? 'text-bible-accent dark:text-bible-accent font-semibold'
                : 'text-bible-accent dark:text-bible-accent'
            }`}
            onClick={toggleHighContrast}
            aria-label='Alternar alto contraste'
          >
            <Contrast className='h-4 w-4' /> Alto contraste
          </Button>
          <Button
            variant='ghost'
            className={`w-full justify-start gap-2 ${
              linkHighlight
                ? 'text-bible-accent dark:text-bible-accent font-semibold'
                : 'text-bible-accent dark:text-bible-accent'
            }`}
            onClick={toggleLinkHighlight}
            aria-label='Alternar destaque de links'
          >
            <Link className='h-4 w-4' /> Destaque de links
          </Button>
          <Button
            variant='ghost'
            className={`w-full justify-start gap-2 ${
              vlibrasVisible
                ? 'text-bible-accent dark:text-bible-accent font-semibold'
                : 'text-bible-accent dark:text-bible-accent'
            }`}
            onClick={toggleVLibras}
            aria-label='Alternar tradutor de Libras'
          >
            <Languages className='h-4 w-4' />
            {vlibrasVisible ? 'Ocultar' : 'Mostrar'} Libras
          </Button>
          <Button
            variant='ghost'
            className='w-full justify-start gap-2 text-bible-accent dark:text-bible-accent'
            onClick={toggleTheme}
            aria-label={
              theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
            }
          >
            {getThemeIcon()} {getThemeText()}
          </Button>
          <Button
            variant='ghost'
            className='w-full justify-start gap-2 text-bible-accent dark:text-bible-accent'
            onClick={resetAccessibility}
            aria-label='Redefinir acessibilidade'
          >
            <Undo2 className='h-4 w-4' /> Redefinir
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu;
