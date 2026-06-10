import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  Brain,
  Heart,
  Calendar,
  Target,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Clock,
  Award,
  MessageCircle,
  Search,
  Eye,
  Trophy,
  Lightbulb,
  BookMarked,
  Sparkles,
  Home,
  Plus,
  Minus,
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recursos');

  const features = [
    {
      icon: <BookOpen className='h-8 w-8' />,
      title: 'Plano de Leitura Personalizado',
      description:
        'Gere planos de leitura bíblica personalizados baseados em seus objetivos, tempo disponível e preferências.',
      benefits: [
        'Planos por data específica',
        'Planos temáticos',
        'Ajuste de velocidade de leitura',
        'Lembretes personalizados',
      ],
    },
    {
      icon: <Brain className='h-8 w-8' />,
      title: 'Sistema de Memorização',
      description:
        'Memorize versículos bíblicos com técnicas comprovadas e quizzes interativos.',
      benefits: [
        'Técnica de repetição espaçada',
        'Quiz de memorização',
        'Progresso visual',
        'Versículos favoritos',
      ],
    },
    {
      icon: <Search className='h-8 w-8' />,
      title: 'Pesquisa Avançada',
      description:
        'Encontre qualquer versículo, palavra ou tema na Bíblia com busca inteligente.',
      benefits: [
        'Busca por palavras-chave',
        'Filtros por livro/capítulo',
        'Histórico de pesquisas',
        'Resultados instantâneos',
      ],
    },
    {
      icon: <Eye className='h-8 w-8' />,
      title: 'Realidade Aumentada',
      description:
        'Explore a Bíblia de forma inovadora com recursos de realidade aumentada.',
      benefits: [
        'Visualização 3D',
        'Experiência imersiva',
        'Conteúdo interativo',
        'Tecnologia moderna',
      ],
    },
    {
      icon: <Calendar className='h-8 w-8' />,
      title: 'Versículo do Dia',
      description:
        'Receba inspiração diária com versículos selecionados e reflexões.',
      benefits: [
        'Versículos diários',
        'Reflexões inspiradoras',
        'Compartilhamento fácil',
        'Histórico completo',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Graça e Leitura - Revolucione Seu Estudo Bíblico</title>
        <meta
          name='description'
          content='Descubra como o Graça e Leitura pode transformar sua jornada espiritual com planos personalizados, memorização inteligente, quiz interativo e muito mais.'
        />
        <meta
          name='keywords'
          content='graça e leitura, estudo bíblico, memorização, quiz bíblico, plano de leitura, realidade aumentada, aplicativo bíblico'
        />
        <meta
          property='og:title'
          content='Graça e Leitura - Revolucione Seu Estudo Bíblico'
        />
        <meta
          property='og:description'
          content='Transforme sua jornada espiritual com tecnologia moderna e conteúdo bíblico de qualidade.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={window.location.href} />
        <meta
          property='og:image'
          content={`${window.location.origin}/seo.png`}
        />
      </Helmet>

      <div className='min-h-screen bg-bible-white dark:bg-bible-white'>
        {/* Hero Section */}
        <section className='relative overflow-hidden'>
          <div className='container mx-auto px-4 py-20'>
            <div className='text-center max-w-4xl mx-auto'>
              <Badge className='mb-6 bg-bible-accent/10 text-bible-accent border-bible-accent/20'>
                <Sparkles className='h-4 w-4 mr-2' />
                Revolucione Seu Estudo Bíblico
              </Badge>

              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-bible-text mb-6 leading-tight'>
                Graça e Leitura
                <span className='block text-bible-accent'>
                  Transforme Sua Jornada Espiritual
                </span>
              </h1>

              <p className='text-base sm:text-lg md:text-xl text-bible-text/70 mb-8 max-w-2xl mx-auto px-4'>
                Descubra como a tecnologia moderna pode aprofundar sua relação
                com Deus através de planos personalizados, memorização
                inteligente e recursos interativos.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center px-4'>
                <Link to={ROUTES.plans} className='w-full sm:w-auto'>
                  <Button
                    size='lg'
                    className='bg-bible-accent hover:bg-bible-accent/90 text-white dark:text-black px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto'
                  >
                    <Play className='h-4 w-4 sm:h-5 sm:w-5 mr-2' />
                    Começar Agora
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-16 sm:py-20'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12 sm:mb-16'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-bible-text mb-4'>
                Funcionalidades Revolucionárias
              </h2>
              <p className='text-base sm:text-lg md:text-xl text-bible-text/70 max-w-2xl mx-auto px-4'>
                Descubra como cada recurso foi desenvolvido para maximizar seu
                crescimento espiritual
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className='group hover:shadow-lg transition-all duration-300 border-bible-accent/20 hover:border-bible-accent/40'
                >
                  <CardHeader>
                    <div className='w-16 h-16 bg-bible-accent/10 rounded-lg flex items-center justify-center text-bible-accent mb-4 group-hover:bg-bible-accent/20 transition-colors'>
                      {feature.icon}
                    </div>
                    <CardTitle className='text-xl text-bible-text'>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-bible-text/70 mb-4'>
                      {feature.description}
                    </p>
                    <ul className='space-y-2'>
                      {feature.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className='flex items-center text-sm text-bible-text/80'
                        >
                          <CheckCircle className='h-4 w-4 text-bible-accent mr-2 flex-shrink-0' />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className='py-16 sm:py-20 bg-bible-white dark:bg-bible-white'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12 sm:mb-16'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-bible-text mb-4'>
                Como Funciona
              </h2>
              <p className='text-base sm:text-lg md:text-xl text-bible-text/70 max-w-2xl mx-auto px-4'>
                Em apenas 3 passos simples, você estará no caminho para uma
                jornada espiritual mais profunda
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8'>
              <div className='text-center'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 bg-bible-accent rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6'>
                  1
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-bible-text mb-3 sm:mb-4'>
                  Acesse o Site
                </h3>
                <p className='text-sm sm:text-base text-bible-text/70'>
                  Acesse o Graça e Leitura gratuitamente, sem necessidade de
                  cadastro ou login.
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 bg-bible-accent rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6'>
                  2
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-bible-text mb-3 sm:mb-4'>
                  Escolha Seu Plano
                </h3>
                <p className='text-sm sm:text-base text-bible-text/70'>
                  Selecione um plano de leitura personalizado ou crie um baseado
                  em seus objetivos e tempo disponível.
                </p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 bg-bible-accent rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6'>
                  3
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-bible-text mb-3 sm:mb-4'>
                  Cresça Espiritualmente
                </h3>
                <p className='text-sm sm:text-base text-bible-text/70'>
                  Acompanhe seu progresso, memorize versículos e participe de
                  quizzes para fortalecer sua fé.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Free Access Section */}
        <section className='py-16 sm:py-20 bg-bible-white dark:bg-bible-white'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12 sm:mb-16'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-bible-text mb-4'>
                Acesso Totalmente Gratuito
              </h2>
              <p className='text-base sm:text-lg md:text-xl text-bible-text/70 max-w-2xl mx-auto px-4'>
                Todas as funcionalidades estão disponíveis gratuitamente para
                você aprofundar sua jornada espiritual
              </p>
            </div>

            <div className='max-w-4xl mx-auto'>
              <Card className='p-6 sm:p-8 border-bible-accent/20 bg-bible-accent/5'>
                <div className='text-center mb-6 sm:mb-8'>
                  <div className='w-16 h-16 sm:w-20 sm:h-20 bg-bible-accent rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-6'>
                    <Heart className='h-8 w-8 sm:h-10 sm:w-10' />
                  </div>
                  <h3 className='text-2xl sm:text-3xl font-bold text-bible-text mb-2'>
                    100% Gratuito
                  </h3>
                  <p className='text-base sm:text-lg md:text-xl text-bible-text/70 mb-4 sm:mb-6'>
                    Sem custos, sem limitações, sem surpresas
                  </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8'>
                  <div>
                    <h4 className='text-lg font-semibold text-bible-text mb-4'>
                      ✅ O que você tem acesso:
                    </h4>
                    <ul className='space-y-3'>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Planos de leitura personalizados
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Sistema completo de memorização
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Quiz bíblico interativo
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Acompanhamento espiritual
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Pesquisa avançada na Bíblia
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Sistema de notas ilimitado
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Realidade aumentada
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Versículo do dia
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold text-bible-text mb-4'>
                      🎁 Benefícios exclusivos:
                    </h4>
                    <ul className='space-y-3'>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>Sem anúncios</span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Sem limitações de uso
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Atualizações gratuitas
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Suporte da comunidade
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Múltiplas versões da Bíblia
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Sincronização em nuvem
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Exportação de dados
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-bible-accent mr-3 flex-shrink-0' />
                        <span className='text-bible-text/80'>
                          Acesso offline
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='text-center'>
                  <Link to={ROUTES.plans} className='inline-block w-full sm:w-auto'>
                    <Button
                      size='lg'
                      className='bg-bible-accent hover:bg-bible-accent/90 text-white dark:text-black px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto'
                    >
                      <Play className='h-4 w-4 sm:h-5 sm:w-5 mr-2' />
                      Começar Gratuitamente
                    </Button>
                  </Link>
                  <p className='text-xs sm:text-sm text-bible-text/60 mt-3'>
                    Não é necessário cartão de crédito • Comece agora mesmo
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-16 sm:py-20 bg-bible-accent dark:bg-bible-accent'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4'>
              Pronto para Transformar Sua Jornada Espiritual?
            </h2>
            <p className='text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4'>
              Junte-se a milhares de pessoas que já estão experimentando uma
              nova forma de estudar a Bíblia - 100% gratuito!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center px-4'>
              <Link to={ROUTES.plans} className='w-full sm:w-auto'>
                <Button
                  size='lg'
                  className='bg-white text-bible-accent hover:bg-white/90 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto'
                >
                  <Play className='h-4 w-4 sm:h-5 sm:w-5 mr-2' />
                  Começar Gratuitamente
                </Button>
              </Link>
            </div>
            <p className='text-white/80 mt-4 text-xs sm:text-sm px-4'>
              Não é necessário cartão de crédito • Acesso imediato • Sem
              limitações
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='py-16 sm:py-20 bg-bible-white dark:bg-bible-white'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12 sm:mb-16'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-bible-text mb-4'>
                Perguntas Frequentes
              </h2>
              <p className='text-base sm:text-lg md:text-xl text-bible-text/70 max-w-2xl mx-auto px-4'>
                Tire suas dúvidas sobre o Graça e Leitura
              </p>
            </div>

            <div className='max-w-3xl mx-auto space-y-4 sm:space-y-6'>
              <Card className='p-4 sm:p-6'>
                <h3 className='text-lg font-semibold text-bible-text mb-2'>
                  O Graça e Leitura é realmente gratuito?
                </h3>
                <p className='text-bible-text/70'>
                  Sim! Todas as funcionalidades estão disponíveis gratuitamente,
                  sem limitações ou custos ocultos.
                </p>
              </Card>

              <Card className='p-4 sm:p-6'>
                <h3 className='text-lg font-semibold text-bible-text mb-2'>
                  Quais versões da Bíblia estão disponíveis?
                </h3>
                <p className='text-bible-text/70'>
                  Oferecemos múltiplas versões da Bíblia, incluindo NVI, ACF,
                  ARA e outras traduções.
                </p>
              </Card>

              <Card className='p-4 sm:p-6'>
                <h3 className='text-lg font-semibold text-bible-text mb-2'>
                  Como funciona o sistema de memorização?
                </h3>
                <p className='text-bible-text/70'>
                  Utilizamos técnicas científicas de repetição espaçada para
                  ajudar você a memorizar versículos de forma eficiente.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
