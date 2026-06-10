import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  User,
  Calendar,
} from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade | Graça e Leitura</title>
        <meta
          name='description'
          content='Política de privacidade do Graça e Leitura. Saiba como coletamos, usamos e protegemos seus dados pessoais em nossa plataforma de estudos bíblicos.'
        />
        <meta
          name='keywords'
          content='política de privacidade, proteção de dados, LGPD, privacidade, dados pessoais, estudo bíblico'
        />
        <link
          rel='canonical'
          href='https://biblia.gracaeleitura.com/privacidade'
        />

        {/* Open Graph */}
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://biblia.gracaeleitura.com/privacidade'
        />
        <meta
          property='og:title'
          content='Política de Privacidade | Graça e Leitura'
        />
        <meta
          property='og:description'
          content='Política de privacidade do Graça e Leitura. Saiba como protegemos seus dados pessoais.'
        />
        <meta
          property='og:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:url'
          content='https://biblia.gracaeleitura.com/privacidade'
        />
        <meta
          name='twitter:title'
          content='Política de Privacidade | Graça e Leitura'
        />
        <meta
          name='twitter:description'
          content='Política de privacidade do Graça e Leitura. Saiba como protegemos seus dados pessoais.'
        />
        <meta
          name='twitter:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
      </Helmet>

      <div className='container mx-auto px-4 py-6 max-w-4xl'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-bible-accent'>
              Política de Privacidade
            </h1>
          </div>
          <p className='text-sm sm:text-base text-bible-text/70 mb-2'>
            Sua privacidade é fundamental para nós
          </p>
          <p className='text-sm sm:text-base text-bible-text/60'>
            Última atualização: 27/06/2025
          </p>
        </div>

        <div className='space-y-6'>
          {/* Introdução */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Eye className='h-5 w-5 text-bible-accent' />
                1. Introdução
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-bible-text leading-relaxed'>
                O <strong>Graça e Leitura</strong> (disponível em{' '}
                <a
                  href='https://biblia.gracaeleitura.com'
                  className='text-bible-accent hover:underline'
                >
                  biblia.gracaeleitura.com
                </a>
                ) é uma plataforma gratuita dedicada ao estudo organizado da
                Bíblia, oferecendo ferramentas como planos de leitura
                personalizados, quizzes bíblicos interativos, memorização de
                versículos e versículo do dia.
              </p>
              <p className='text-bible-text leading-relaxed'>
                Esta Política de Privacidade descreve como coletamos, usamos,
                armazenamos e protegemos suas informações pessoais, em
                conformidade com a Lei Geral de Proteção de Dados (LGPD) e
                outras legislações aplicáveis.
              </p>
              <p className='text-bible-text leading-relaxed'>
                Ao utilizar nossos serviços, você concorda com as práticas
                descritas nesta política.
              </p>
            </CardContent>
          </Card>

          {/* Dados Coletados */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Database className='h-5 w-5 text-bible-accent' />
                2. Dados Que Coletamos
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div>
                <h3 className='font-semibold text-bible-text mb-3 flex items-center gap-2'>
                  <User className='h-4 w-4' />
                  2.1 Dados de Cadastro (Sistema de Memorização)
                </h3>
                <p className='text-bible-text mb-2'>
                  Para utilizar o sistema de memorização de versículos,
                  coletamos:
                </p>
                <ul className='list-disc list-inside space-y-1 text-bible-text ml-4'>
                  <li>
                    <strong>Nome completo:</strong> Para personalização da
                    experiência
                  </li>
                  <li>
                    <strong>Endereço de email:</strong> Para autenticação e
                    comunicação
                  </li>
                  <li>
                    <strong>Senha criptografada:</strong> Para segurança da
                    conta
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='font-semibold text-bible-text mb-3 flex items-center gap-2'>
                  <Calendar className='h-4 w-4' />
                  2.2 Dados de Uso e Progresso
                </h3>
                <p className='text-bible-text mb-2'>
                  Para funcionar adequadamente, nossos serviços armazenam:
                </p>
                <ul className='list-disc list-inside space-y-1 text-bible-text ml-4'>
                  <li>
                    <strong>Versículos memorizados:</strong> Texto, referência e
                    data de adição
                  </li>
                  <li>
                    <strong>Progresso de memorização:</strong> Estatísticas de
                    revisão e desempenho
                  </li>
                  <li>
                    <strong>Histórico de sessões:</strong> Datas e resultados de
                    estudos
                  </li>
                  <li>
                    <strong>Pontuações de quiz:</strong> Histórico de desempenho
                    em quizzes
                  </li>
                  <li>
                    <strong>Planos de leitura:</strong> Planos gerados e
                    progresso (armazenados localmente)
                  </li>
                  <li>
                    <strong>Preferências:</strong> Configurações de tema e
                    acessibilidade
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='font-semibold text-bible-text mb-3'>
                  2.3 Dados Técnicos
                </h3>
                <p className='text-bible-text mb-2'>
                  Automaticamente coletamos informações técnicas básicas:
                </p>
                <ul className='list-disc list-inside space-y-1 text-bible-text ml-4'>
                  <li>
                    <strong>Endereço IP:</strong> Para segurança e estatísticas
                    básicas
                  </li>
                  <li>
                    <strong>Tipo de navegador:</strong> Para compatibilidade
                  </li>
                  <li>
                    <strong>Data e hora de acesso:</strong> Para logs de
                    segurança
                  </li>
                  <li>
                    <strong>Páginas visitadas:</strong> Para melhorar a
                    experiência
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Como Usamos os Dados */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Lock className='h-5 w-5 text-bible-accent' />
                3. Como Usamos Seus Dados
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-bible-text leading-relaxed'>
                Utilizamos suas informações exclusivamente para:
              </p>
              <ul className='list-disc list-inside space-y-2 text-bible-text ml-4'>
                <li>
                  <strong>Fornecer nossos serviços:</strong> Manter
                  funcionalidades de memorização, quizzes e planos de leitura
                </li>
                <li>
                  <strong>Personalizar a experiência:</strong> Adaptar conteúdo
                  e estatísticas ao seu progresso
                </li>
                <li>
                  <strong>Manter a segurança:</strong> Proteger sua conta e
                  prevenir uso indevido
                </li>
                <li>
                  <strong>Melhorar a plataforma:</strong> Analisar uso para
                  aprimoramentos (dados anonimizados)
                </li>
                <li>
                  <strong>Comunicação essencial:</strong> Enviar confirmações de
                  email e informações importantes sobre a conta
                </li>
                <li>
                  <strong>Backup e recuperação:</strong> Garantir que seus dados
                  não sejam perdidos
                </li>
              </ul>
              <div className='bg-bible-soft-green/30 p-4 rounded-lg mt-4'>
                <p className='text-bible-text text-sm sm:text-base font-medium'>
                  ✅ <strong>Importante:</strong> NÃO enviamos emails
                  promocionais, spam ou compartilhamos seus dados com terceiros
                  para marketing.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Armazenamento de Dados */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Database className='h-5 w-5 text-bible-accent' />
                4. Armazenamento e Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h3 className='font-semibold text-bible-text mb-3'>
                  4.1 Onde Armazenamos
                </h3>
                <ul className='list-disc list-inside space-y-1 text-bible-text ml-4'>
                  <li>
                    <strong>Armazenamento Local (localStorage):</strong> Dados de memorização,
                    autenticação e configurações
                  </li>
                  <li>
                    <strong>Armazenamento local:</strong> Planos de leitura,
                    preferências e dados de quiz
                  </li>
                  <li>
                    <strong>Servidores seguros:</strong> Infraestrutura com
                    criptografia e backup
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='font-semibold text-bible-text mb-3'>
                  4.2 Medidas de Segurança
                </h3>
                <ul className='list-disc list-inside space-y-1 text-bible-text ml-4'>
                  <li>
                    <strong>Criptografia:</strong> Senhas criptografadas e
                    conexões HTTPS
                  </li>
                  <li>
                    <strong>Row Level Security (RLS):</strong> Isolamento total
                    de dados entre usuários
                  </li>
                  <li>
                    <strong>Autenticação JWT:</strong> Tokens seguros para
                    acesso
                  </li>
                  <li>
                    <strong>Backups automáticos:</strong> Proteção contra perda
                    de dados
                  </li>
                  <li>
                    <strong>Monitoramento:</strong> Detecção de atividades
                    suspeitas
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='font-semibold text-bible-text mb-3'>
                  4.3 Retenção de Dados
                </h3>
                <p className='text-bible-text'>
                  Mantemos seus dados enquanto sua conta estiver ativa. Após
                  exclusão da conta, os dados são removidos permanentemente em
                  até 30 dias, exceto quando exigido por lei.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Compartilhamento */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5 text-bible-accent' />
                5. Compartilhamento de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-bible-text leading-relaxed'>
                <strong>
                  NÃO vendemos, alugamos ou compartilhamos seus dados pessoais
                  com terceiros
                </strong>{' '}
                para fins comerciais ou de marketing.
              </p>
              <p className='text-bible-text leading-relaxed'>
                Podemos compartilhar dados apenas em situações específicas:
              </p>
              <ul className='list-disc list-inside space-y-1 text-bible-text ml-4'>
                <li>
                  <strong>Obrigação legal:</strong> Quando exigido por
                  autoridades competentes
                </li>
                <li>
                  <strong>Proteção de direitos:</strong> Para proteger nossos
                  direitos legais ou de terceiros
                </li>
                <li>
                  <strong>Segurança:</strong> Para prevenir fraudes ou
                  atividades ilegais
                </li>
                <li>
                  <strong>Prestadores de serviço:</strong> Todos os dados são armazenados
                  localmente no seu navegador. Não compartilhamos seus dados com terceiros.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Direitos do Usuário */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-5 w-5 text-bible-accent' />
                6. Seus Direitos (LGPD)
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-bible-text leading-relaxed'>
                De acordo com a LGPD, você tem os seguintes direitos:
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <h4 className='font-medium text-bible-text'>✅ Acesso</h4>
                  <p className='text-sm text-bible-text/80'>
                    Consultar seus dados pessoais
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-medium text-bible-text'>✏️ Correção</h4>
                  <p className='text-sm text-bible-text/80'>
                    Corrigir dados incompletos ou incorretos
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-medium text-bible-text'>🗑️ Exclusão</h4>
                  <p className='text-sm text-bible-text/80'>
                    Solicitar remoção de seus dados
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-medium text-bible-text'>
                    📋 Portabilidade
                  </h4>
                  <p className='text-sm text-bible-text/80'>
                    Exportar seus dados em formato legível
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-medium text-bible-text'>❌ Oposição</h4>
                  <p className='text-sm text-bible-text/80'>
                    Opor-se ao tratamento de dados
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-medium text-bible-text'>ℹ️ Informação</h4>
                  <p className='text-sm text-bible-text/80'>
                    Obter informações sobre o tratamento
                  </p>
                </div>
              </div>
              <div className='bg-bible-soft-green/30 p-4 rounded-lg mt-4'>
                <p className='text-bible-text'>
                  <strong>Como exercer seus direitos:</strong> Entre em contato
                  conosco através do email{' '}
                  <a
                    href='mailto:luancalasans.site@gmail.com'
                    className='text-bible-accent hover:underline'
                  >
                    luancalasans.site@gmail.com
                  </a>{' '}
                  ou utilize as funcionalidades de exportação/exclusão
                  disponíveis na plataforma.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Eye className='h-5 w-5 text-bible-accent' />
                7. Cookies e Armazenamento Local
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-bible-text leading-relaxed'>
                Utilizamos tecnologias de armazenamento para melhorar sua
                experiência:
              </p>
              <div className='space-y-3'>
                <div>
                  <h4 className='font-medium text-bible-text'>
                    🍪 Cookies Essenciais
                  </h4>
                  <p className='text-sm text-bible-text/80'>
                    Necessários para funcionamento básico (autenticação,
                    preferências)
                  </p>
                </div>
                <div>
                  <h4 className='font-medium text-bible-text'>
                    💾 Local Storage
                  </h4>
                  <p className='text-sm text-bible-text/80'>
                    Planos de leitura, configurações de tema, dados de quiz
                  </p>
                </div>
                <div>
                  <h4 className='font-medium text-bible-text'>
                    🔧 Session Storage
                  </h4>
                  <p className='text-sm text-bible-text/80'>
                    Dados temporários da sessão atual
                  </p>
                </div>
              </div>
              <p className='text-bible-text text-sm'>
                <strong>Nota:</strong> Não utilizamos cookies de rastreamento ou
                publicidade. Você pode limpar os dados locais através das
                configurações do seu navegador.
              </p>
            </CardContent>
          </Card>

          {/* Menores de Idade */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5 text-bible-accent' />
                8. Menores de Idade
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-bible-text leading-relaxed'>
                Nossa plataforma pode ser utilizada por menores de idade sob
                supervisão de pais ou responsáveis. Para menores de 13 anos, é
                necessário consentimento parental para criação de conta no
                sistema de memorização.
              </p>
              <p className='text-bible-text leading-relaxed'>
                Os pais podem solicitar acesso, correção ou exclusão dos dados
                de seus filhos menores através do email de contato.
              </p>
            </CardContent>
          </Card>

          {/* Alterações */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Calendar className='h-5 w-5 text-bible-accent' />
                9. Alterações nesta Política
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-bible-text leading-relaxed'>
                Esta Política de Privacidade pode ser atualizada periodicamente
                para refletir mudanças em nossos serviços ou na legislação.
                Alterações significativas serão comunicadas através:
              </p>
              <ul className='list-disc list-inside space-y-1 text-bible-text ml-4'>
                <li>Aviso na página principal da plataforma</li>
                <li>Email para usuários cadastrados (quando aplicável)</li>
                <li>Atualização da data de "última modificação"</li>
              </ul>
              <p className='text-bible-text leading-relaxed'>
                Recomendamos revisar esta política periodicamente.
              </p>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Mail className='h-5 w-5 text-bible-accent' />
                10. Contato e Encarregado de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-bible-text leading-relaxed'>
                Para questões sobre privacidade, exercício de direitos ou
                dúvidas sobre esta política:
              </p>
              <div className='bg-bible-soft-green/30 p-4 rounded-lg'>
                <div className='space-y-2'>
                  <p className='text-bible-text'>
                    <strong>Encarregado de Proteção de Dados:</strong> Luan
                    Calasans
                  </p>
                  <p className='text-bible-text'>
                    <strong>Email:</strong>{' '}
                    <a
                      href='mailto:luancalasans.site@gmail.com'
                      className='text-bible-accent hover:underline'
                    >
                      luancalasans.site@gmail.com
                    </a>
                  </p>
                  <p className='text-bible-text'>
                    <strong>Website:</strong>{' '}
                    <a
                      href='https://biblia.gracaeleitura.com'
                      className='text-bible-accent hover:underline'
                    >
                      biblia.gracaeleitura.com
                    </a>
                  </p>
                </div>
              </div>
              <p className='text-bible-text text-sm'>
                Responderemos às solicitações em até 15 dias úteis, conforme
                previsto na LGPD.
              </p>
            </CardContent>
          </Card>

          {/* Jurisdição */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5 text-bible-accent' />
                11. Legislação Aplicável
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p className='text-bible-text leading-relaxed'>
                Esta Política de Privacidade é regida pelas leis brasileiras,
                especialmente:
              </p>
              <ul className='list-disc list-inside space-y-1 text-bible-text ml-4'>
                <li>Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)</li>
                <li>Marco Civil da Internet (Lei 12.965/2014)</li>
                <li>Código de Defesa do Consumidor (Lei 8.078/1990)</li>
              </ul>
              <p className='text-bible-text leading-relaxed'>
                Eventuais disputas serão resolvidas no foro da comarca de
                residência do usuário.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className='text-center mt-8 pt-6 border-t border-bible-accent/20'>
          <p className='text-bible-text/60 text-sm'>
            Esta política demonstra nosso compromisso com a transparência e
            proteção dos seus dados pessoais.
          </p>
          <p className='text-bible-text/60 text-sm mt-2'>
            <strong>Graça e Leitura</strong> - Plataforma gratuita para estudo
            organizado da Bíblia
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
