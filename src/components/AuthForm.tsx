import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, User, Eye, EyeOff, Brain, Shield } from 'lucide-react';
import { authService } from '@/services/authService';
import { ROUTES } from '@/lib/routes';
import { toast } from 'sonner';

interface AuthFormProps {
  onSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(''); // Limpa erro ao digitar
  };

  const validateEmailLocal = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const validatePasswordLocal = (password: string) => {
    return password.length >= 6;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (!validateEmailLocal(formData.email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    setIsLoading(true);

    try {
      await authService.signInWithEmail(formData.email, formData.password);
      toast.success('Login realizado com sucesso!');
      onSuccess();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro ao fazer login. Tente novamente.';
      if (message.includes('Invalid login credentials')) {
        setError('Email ou senha incorretos');
      } else if (message.includes('Email not confirmed')) {
        setError('Verifique seu email para confirmar a conta');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (!validateEmailLocal(formData.email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    if (!validatePasswordLocal(formData.password)) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Iniciando processo de registro...');
      await authService.signUpWithEmail(
        formData.email,
        formData.password,
        formData.name
      );
      console.log('Registro concluído com sucesso');

      toast.success(
        'Conta criada com sucesso! Verifique seu email para confirmar e faça login.',
        {
          duration: 5000,
        }
      );

      // Reset form and redirect to login tab
      resetForm();
      setActiveTab('login');
    } catch (error: unknown) {
      console.error('Erro durante o registro:', error);
      const message = error instanceof Error ? error.message : '';

      if (message.includes('User already registered')) {
        setError('Este email já está cadastrado. Tente fazer login.');
      } else if (message.includes('Password should be at least 6 characters')) {
        setError('A senha deve ter pelo menos 6 caracteres');
      } else if (message.includes('rate limit')) {
        setError(
          'Muitas tentativas. Por favor, aguarde alguns minutos e tente novamente.'
        );
      } else if (message.includes('Invalid email')) {
        setError('Email inválido. Por favor, verifique e tente novamente.');
      } else if (message.includes('network')) {
        setError('Erro de conexão. Verifique sua internet e tente novamente.');
      } else {
        setError(`Erro ao criar conta: ${message || 'Tente novamente.'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    resetForm();
  };

  return (
    <div className='container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-4xl'>
      {/* Formulários de Autenticação */}
      <div className='max-w-md mx-auto'>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className='w-full'
        >
          <TabsList className='grid w-full grid-cols-2 mb-6'>
            <TabsTrigger value='login'>Entrar</TabsTrigger>
            <TabsTrigger value='register'>Criar Conta</TabsTrigger>
          </TabsList>

          {/* Formulário de Login */}
          <TabsContent value='login'>
            <Card>
              <CardHeader className='text-center'>
                <CardTitle>Entrar na sua conta</CardTitle>
                <CardDescription>
                  Digite suas credenciais para acessar seus versículos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='login-email'>Email</Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='login-email'
                        type='email'
                        placeholder='seu@email.com'
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        className='pl-10'
                        disabled={isLoading}
                        autoComplete='email'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='login-password'>Senha</Label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='login-password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Sua senha'
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange('password', e.target.value)
                        }
                        className='pl-10 pr-10'
                        disabled={isLoading}
                        autoComplete='current-password'
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                    <div className='text-right'>
                      <Link
                        to={ROUTES.forgotPassword}
                        className='text-sm text-bible-accent hover:underline'
                      >
                        Esqueci minha senha
                      </Link>
                    </div>
                  </div>

                  {error && (
                    <Alert variant='destructive'>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type='submit'
                    className='w-full bg-[#8bc34b] hover:bg-[#7cb342] text-white'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                        Entrando...
                      </>
                    ) : (
                      'Entrar'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Formulário de Registro */}
          <TabsContent value='register'>
            <Card>
              <CardHeader className='text-center'>
                <CardTitle>Criar nova conta</CardTitle>
                <CardDescription>
                  Crie sua conta para começar a memorizar versículos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='register-name'>Nome completo</Label>
                    <div className='relative'>
                      <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='register-name'
                        type='text'
                        placeholder='Seu nome completo'
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        className='pl-10'
                        disabled={isLoading}
                        autoComplete='name'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='register-email'>Email</Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='register-email'
                        type='email'
                        placeholder='seu@email.com'
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        className='pl-10'
                        disabled={isLoading}
                        autoComplete='email'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='register-password'>Senha</Label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='register-password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Mínimo 6 caracteres'
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange('password', e.target.value)
                        }
                        className='pl-10 pr-10'
                        disabled={isLoading}
                        autoComplete='new-password'
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='register-confirm-password'>
                      Confirmar senha
                    </Label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='register-confirm-password'
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Digite a senha novamente'
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange('confirmPassword', e.target.value)
                        }
                        className='pl-10 pr-10'
                        disabled={isLoading}
                        autoComplete='new-password'
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='register-username'>Nome de usuário</Label>
                    <div className='relative'>
                      <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='register-username'
                        type='text'
                        placeholder='ex: joaosilva'
                        value={formData.username || ''}
                        onChange={(e) =>
                          handleInputChange(
                            'username',
                            e.target.value.replace(/\s/g, '')
                          )
                        }
                        className='pl-10'
                        disabled={isLoading}
                        autoComplete='username'
                        minLength={3}
                        maxLength={20}
                        pattern='[a-zA-Z0-9]+'
                        title='Use apenas letras e números'
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert variant='destructive'>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type='submit'
                    className='w-full bg-[#8bc34b] hover:bg-[#7cb342] text-white'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                        Criando conta...
                      </>
                    ) : (
                      'Criar conta'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className='text-center mt-8 text-sm text-muted-foreground'>
        <p>
          Ao criar uma conta, você concorda com nossos termos de uso e{' '}
          <Link
            to={ROUTES.privacy}
            className='text-bible-accent hover:underline'
          >
            política de privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
