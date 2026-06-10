import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

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

  // Função para determinar qual ícone mostrar
  const getIcon = () => {
    if (theme === 'light') {
      return <Moon className='h-4 w-4' />;
    } else if (theme === 'dark') {
      return <Sun className='h-4 w-4' />;
    } else {
      // Para 'system', mostrar lua (para indicar que vai para dark)
      return <Moon className='h-4 w-4' />;
    }
  };

  const getMobileIcon = () => {
    if (theme === 'light') {
      return <Moon className='h-4 w-4' />;
    } else if (theme === 'dark') {
      return <Sun className='h-4 w-4' />;
    } else {
      // Para 'system', mostrar lua (para indicar que vai para dark)
      return <Moon className='h-4 w-4' />;
    }
  };

  return (
    <>
      {/* Desktop version - similar to navigation links */}
      <button
        onClick={toggleTheme}
        className='hidden md:flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all text-muted-foreground hover:text-foreground'
        aria-label={
          theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
        }
      >
        {getIcon()}
      </button>

      {/* Mobile version - compact button */}
      <Button
        variant='ghost'
        size='sm'
        onClick={toggleTheme}
        className='md:hidden hover:bg-[#8bc34b]/10 hover:text-[#8bc34b]'
        aria-label={
          theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
        }
      >
        {getMobileIcon()}
      </Button>
    </>
  );
};
