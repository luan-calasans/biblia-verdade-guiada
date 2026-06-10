import React from 'react';
import {
  BookOpen,
  Calendar,
  Brain,
  Heart,
  Target,
  Users,
  TrendingUp,
  MessageCircle,
  Palette,
  Accessibility,
  Languages,
  Copy,
  Search,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';

const WhyStudy = () => {
  return (
    <>
      <Helmet>
        <title>Sobre | Graça e Leitura</title>
        <meta
          name='description'
          content='Descubra nossa plataforma completa de estudos bíblicos: planos personalizados, quiz interativo, leitura com formatação avançada, busca inteligente, VLibras e ferramentas de acessibilidade. Tudo gratuito e acessível.'
        />
        <meta
          name='keywords'
          content='sobre, plano de leitura bíblica, quiz bíblico, versículo do dia, memorização versículos, acompanhamento espiritual, estudo bíblico, vlibras, libras, acessibilidade, formatação versículos, busca bíblica, color picker, plataforma cristã, ferramentas bíblicas, crescimento espiritual'
        />
        <link rel='canonical' href='https://biblia.gracaeleitura.com/por-que-estudar' />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://biblia.gracaeleitura.com' />
        <meta
          property='og:title'
          content='Descubra nossa plataforma completa | Graça e Leitura'
        />
        <meta
          property='og:description'
          content='Conheça nossa plataforma completa de estudos bíblicos com planos personalizados, leitura interativa, VLibras, busca avançada e ferramentas de acessibilidade. Tudo gratuito para fortalecer sua fé.'
        />
        <meta
          property='og:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:url' content='https://biblia.gracaeleitura.com' />
        <meta
          name='twitter:title'
          content='Descubra nossa plataforma completa | Graça e Leitura'
        />
        <meta
          name='twitter:description'
          content='Conheça nossa plataforma completa de estudos bíblicos com planos personalizados, leitura interativa, VLibras, busca avançada e ferramentas de acessibilidade. Tudo gratuito para fortalecer sua fé.'
        />
        <meta
          name='twitter:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />

        {/* Structured Data */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Descubra nossa plataforma completa | Graça e Leitura',
            description:
              'Conheça nossa plataforma completa de estudos bíblicos com planos personalizados, leitura interativa com formatação, VLibras para acessibilidade, busca avançada e ferramentas completas.',
            url: 'https://biblia.gracaeleitura.com',
            image: 'https://biblia.gracaeleitura.com/seo.png',
            author: {
              '@type': 'Person',
              name: 'Luan Calasans',
              url: 'https://github.com/luan-calasans',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Graça e Leitura',
              url: 'https://biblia.gracaeleitura.com',
            },
          })}
        </script>
      </Helmet>

      <div className='min-h-screen flex flex-col bg-background'>
        <div className='max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 animate-fade-in'>
          <header className='text-center mb-4 sm:mb-6'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-bible-accent'>
            Graça e Leitura
            </h1>
            <p className='text-bible-text/70 text-sm sm:text-base mt-2'>
              Descubra todas as ferramentas para fortalecer sua jornada
              espiritual
            </p>
          </header>

          <div className='space-y-6 sm:space-y-8'>
            {/* Introdução */}
            <div className='bg-bible-soft-green p-4 sm:p-6 rounded-lg animate-slide-up'>
              <p className='text-bible-text text-center text-sm sm:text-base lg:text-lg'>
                Nossa plataforma foi criada para apoiar sua caminhada espiritual
                com ferramentas práticas e conteúdo inspirador. Oferecemos recursos
                avançados de acessibilidade, incluindo VLibras para tradução em LIBRAS,
                ferramentas de formatação e busca inteligente. Tudo
                completamente gratuito e acessível para fortalecer sua fé e
                conhecimento bíblico.
              </p>
            </div>

            {/* Recursos Principais */}
            <section>
              <h2 className='text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-bible-accent text-center'>
                Nossos Recursos
              </h2>
              <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6'>
                <Card className='hover-scale'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-bible-accent text-base sm:text-lg'>
                      <Calendar className='w-4 h-4 sm:w-5 sm:h-5' />
                      Planos de Leitura Personalizados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-bible-text mb-3 text-sm sm:text-base'>
                      Crie planos de leitura adaptados ao seu ritmo e
                      necessidades. Escolha entre:
                    </p>
                    <ul className='space-y-1.5 text-bible-text text-sm sm:text-base'>
                      <li>
                        • <strong>Planos por Data:</strong> Defina período
                        específico para completar sua leitura
                      </li>
                      <li>
                        • <strong>Planos Temáticos:</strong> Explore temas como
                        Fé, Amor, Esperança e Sabedoria
                      </li>
                      <li>
                        • <strong>Flexibilidade Total:</strong> Ajuste conforme
                        sua disponibilidade
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className='hover-scale'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-bible-accent text-base sm:text-lg'>
                      <Brain className='w-4 h-4 sm:w-5 sm:h-5' />
                      Quiz Bíblico Interativo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-bible-text mb-3 text-sm sm:text-base'>
                      Teste e aprofunde seu conhecimento bíblico com nosso quiz
                      dinâmico:
                    </p>
                    <ul className='space-y-1.5 text-bible-text text-sm sm:text-base'>
                      <li>
                        • <strong>Versículos Aleatórios:</strong> Sempre novos
                        desafios
                      </li>
                      <li>
                        • <strong>Sistema de Dicas:</strong> 2 dicas diárias +
                        bônus por sequência
                      </li>
                      <li>
                        • <strong>Múltiplas Versões:</strong> Escolha sua
                        tradução preferida
                      </li>
                      <li>
                        • <strong>Gamificação:</strong> XP, sequências e
                        conquistas
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className='hover-scale'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-bible-accent text-base sm:text-lg'>
                      <Heart className='w-4 h-4 sm:w-5 sm:h-5' />
                      Versículo do Dia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-bible-text mb-3 text-sm sm:text-base'>
                      Comece cada dia com uma palavra de inspiração:
                    </p>
                    <ul className='space-y-1.5 text-bible-text text-sm sm:text-base'>
                      <li>
                        • <strong>Versículo Diário:</strong> Renovado
                        automaticamente
                      </li>
                      <li>
                        • <strong>Múltiplas Versões:</strong> Compare diferentes
                        traduções
                      </li>
                      <li>
                        • <strong>Compartilhamento WhatsApp:</strong> Espalhe a
                        palavra facilmente nas redes sociais
                      </li>
                      <li>
                        • <strong>Reflexão Diária:</strong> Momento de meditação
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className='hover-scale'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-bible-accent text-base sm:text-lg'>
                      <Brain className='w-4 h-4 sm:w-5 sm:h-5' />
                      Memorização de Versículos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-bible-text mb-3 text-sm sm:text-base'>
                      Sistema avançado para memorizar versículos bíblicos:
                    </p>
                    <ul className='space-y-1.5 text-bible-text text-sm sm:text-base'>
                      <li>
                        • <strong>Repetição Espaçada:</strong> Algoritmo
                        científico para memorização eficaz
                      </li>
                      <li>
                        • <strong>Quiz Interativo:</strong> Teste seus
                        conhecimentos com exercícios práticos
                      </li>
                      <li>
                        • <strong>Progresso Visual:</strong> Acompanhe sua
                        evolução com estatísticas detalhadas
                      </li>
                      <li>
                        • <strong>Categorização:</strong> Organize versículos
                        por temas e tags personalizadas
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className='hover-scale'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-bible-accent text-base sm:text-lg'>
                      <TrendingUp className='w-4 h-4 sm:w-5 sm:h-5' />
                      Acompanhamento Espiritual
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-bible-text mb-3 text-sm sm:text-base'>
                      Monitore e registre seu crescimento espiritual:
                    </p>
                    <ul className='space-y-1.5 text-bible-text text-sm sm:text-base'>
                      <li>
                        • <strong>Registro de Salvações:</strong> Documente
                        vidas transformadas pelo evangelho
                      </li>
                      <li>
                        • <strong>Batismos no Espírito:</strong> Acompanhe
                        experiências espirituais especiais
                      </li>
                      <li>
                        • <strong>Sessões de Leitura:</strong> Registre tempo e
                        reflexões de estudo
                      </li>
                      <li>
                        • <strong>Check-in Diário:</strong> Mantenha
                        consistência nas práticas espirituais
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className='hover-scale'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-bible-accent text-base sm:text-lg'>
                      <BookOpen className='w-4 h-4 sm:w-5 sm:h-5' />
                      Leitura Interativa de Versículos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-bible-text mb-3 text-sm sm:text-base'>
                      Leia e estude com ferramentas avançadas de formatação:
                    </p>
                    <ul className='space-y-1.5 text-bible-text text-sm sm:text-base'>
                      <li>
                        • <strong>Formatação Completa:</strong> Negrito, itálico 
                        e sublinhado para destacar passagens
                      </li>
                      <li>
                        • <strong>Sistema de Cores:</strong> Paleta de cores 
                        pré-definidas + color picker personalizado
                      </li>
                      <li>
                        • <strong>Cópia Inteligente:</strong> Adiciona "[...]" 
                        automaticamente em versículos parciais
                      </li>
                      <li>
                        • <strong>Busca Avançada:</strong> Encontre versículos 
                        com destaque visual dos resultados
                      </li>
                      <li>
                        • <strong>Múltiplas Versões:</strong> ACF, NVI e outras 
                        traduções disponíveis
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className='hover-scale'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-bible-accent text-base sm:text-lg'>
                      <Accessibility className='w-4 h-4 sm:w-5 sm:h-5' />
                      Acessibilidade Avançada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-bible-text mb-3 text-sm sm:text-base'>
                      Totalmente acessível para todos os usuários:
                    </p>
                    <ul className='space-y-1.5 text-bible-text text-sm sm:text-base'>
                      <li>
                        • <strong>VLibras Integrado:</strong> Tradutor oficial 
                        do governo para LIBRAS
                      </li>
                      <li>
                        • <strong>Controle de Fonte:</strong> Aumentar/diminuir 
                        tamanho do texto
                      </li>
                      <li>
                        • <strong>Alto Contraste:</strong> Melhor visibilidade 
                        para baixa visão
                      </li>
                      <li>
                        • <strong>Escala de Cinza:</strong> Reduz distrações 
                        visuais para foco na leitura
                      </li>
                      <li>
                        • <strong>Menu Flutuante:</strong> Acesso rápido a 
                        todas as opções de acessibilidade
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className='hover-scale'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-bible-accent text-base sm:text-lg'>
                      <Search className='w-4 h-4 sm:w-5 sm:h-5' />
                      Busca Avançada de Versículos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-bible-text mb-3 text-sm sm:text-base'>
                      Encontre rapidamente qualquer passagem bíblica:
                    </p>
                    <ul className='space-y-1.5 text-bible-text text-sm sm:text-base'>
                      <li>
                        • <strong>Busca por Palavras:</strong> Procure termos 
                        específicos em toda a Bíblia
                      </li>
                      <li>
                        • <strong>Filtros Avançados:</strong> Por testamento, 
                        livros e autores
                      </li>
                      <li>
                        • <strong>Resultados Destacados:</strong> Termos 
                        pesquisados ficam em destaque
                      </li>
                      <li>
                        • <strong>Cópia Rápida:</strong> Copie versículos 
                        com referência completa
                      </li>
                      <li>
                        • <strong>Interface Responsiva:</strong> Funciona 
                        perfeitamente em mobile e desktop
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className='hover-scale'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-bible-accent text-base sm:text-lg'>
                      <Target className='w-4 h-4 sm:w-5 sm:h-5' />
                      Ferramentas de Organização
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-bible-text mb-3 text-sm sm:text-base'>
                      Mantenha-se organizado em sua jornada de estudos:
                    </p>
                    <ul className='space-y-1.5 text-bible-text text-sm sm:text-base'>
                      <li>
                        • <strong>Geração de PDF:</strong> Imprima seus planos
                        para estudo offline
                      </li>
                      <li>
                        • <strong>Tabelas Organizadas:</strong> Visualize seu
                        progresso claramente
                      </li>
                      <li>
                        • <strong>Temas Estruturados:</strong> Conteúdo
                        categorizado por assunto
                      </li>
                      <li>
                        • <strong>Interface Intuitiva:</strong> Fácil navegação
                        e uso
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Missão */}
            <section className='bg-bible-soft-green p-4 sm:p-6 rounded-lg'>
              <h2 className='text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-bible-accent text-center'>
                Nossa Missão
              </h2>
              <p className='text-bible-text text-center text-sm sm:text-base'>
                Facilitar o acesso às Escrituras Sagradas através de ferramentas
                modernas e práticas, promovendo o crescimento espiritual e o
                conhecimento bíblico de forma acessível e gratuita para todos.
              </p>
            </section>

            {/* Versões Bíblicas */}
            <section>
              <h2 className='text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-bible-accent text-center'>
                Versões Bíblicas Disponíveis
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto'>
                <div className='p-3 sm:p-4 bg-bible-gray rounded-lg text-center'>
                  <p className='font-medium text-bible-text text-sm sm:text-base'>
                    Almeida Corrigida Fiel
                  </p>
                  <p className='text-bible-text/60 text-xs sm:text-sm mt-1'>
                    ACF
                  </p>
                </div>
                <div className='p-3 sm:p-4 bg-bible-gray rounded-lg text-center'>
                  <p className='font-medium text-bible-text text-sm sm:text-base'>
                    Almeida Pastoral e Educativa
                  </p>
                  <p className='text-bible-text/60 text-xs sm:text-sm mt-1'>
                    APEE
                  </p>
                </div>
                <div className='p-3 sm:p-4 bg-bible-gray rounded-lg text-center'>
                  <p className='font-medium text-bible-text text-sm sm:text-base'>
                    Bible in Basic English
                  </p>
                  <p className='text-bible-text/60 text-xs sm:text-sm mt-1'>
                    BBE
                  </p>
                </div>
                <div className='p-3 sm:p-4 bg-bible-gray rounded-lg text-center'>
                  <p className='font-medium text-bible-text text-sm sm:text-base'>
                    King James Version
                  </p>
                  <p className='text-bible-text/60 text-xs sm:text-sm mt-1'>
                    KJV
                  </p>
                </div>
                <div className='p-3 sm:p-4 bg-bible-gray rounded-lg text-center'>
                  <p className='font-medium text-bible-text text-sm sm:text-base'>
                    Nova Versão Internacional
                  </p>
                  <p className='text-bible-text/60 text-xs sm:text-sm mt-1'>
                    NVI
                  </p>
                </div>
                <div className='p-3 sm:p-4 bg-bible-gray rounded-lg text-center'>
                  <p className='font-medium text-bible-text text-sm sm:text-base'>
                    Revista e Atualizada
                  </p>
                  <p className='text-bible-text/60 text-xs sm:text-sm mt-1'>
                    RA
                  </p>
                </div>
                <div className='p-3 sm:p-4 bg-bible-gray rounded-lg text-center'>
                  <p className='font-medium text-bible-text text-sm sm:text-base'>
                    Reina-Valera Revisada
                  </p>
                  <p className='text-bible-text/60 text-xs sm:text-sm mt-1'>
                    RVR
                  </p>
                </div>
              </div>
              <p className='text-center text-bible-text/70 text-sm sm:text-base mt-4 sm:mt-6'>
                Múltiplas traduções para uma compreensão mais completa das Escrituras
              </p>
            </section>

            {/* Call to Action */}
            <div className='text-center mt-8'>
              <Link to={ROUTES.plans}>
                <Button className='bg-bible-accent hover:bg-bible-accent/90 text-white'>
                  Começar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyStudy;
