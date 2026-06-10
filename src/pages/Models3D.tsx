import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';
import { ExternalLink, Info, Eye, Box, BookOpen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Model3D {
  id: string;
  title: string;
  description: string;
  category: string;
  sketchfabUrl: string;
  embedUrl: string;
  author: string;
  tags: string[];
  biblicalReference: string;
}

const models3D: Model3D[] = [
  {
    id: 'tabernacle',
    title: 'Tabernáculo',
    description:
      'O Tabernáculo era uma tenda portátil que servia como local de adoração para os israelitas durante sua jornada pelo deserto. Era o centro da vida religiosa e espiritual do povo de Deus.',
    category: 'Construções Sagradas',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/tabernacle-57e4cd4ad59a45c78c8e1b81c7c23d9b',
    embedUrl:
      'https://sketchfab.com/models/57e4cd4ad59a45c78c8e1b81c7c23d9b/embed',
    author: 'bibel-in-3d.de',
    tags: ['Tabernáculo', 'Êxodo', 'Construção Sagrada'],
    biblicalReference: 'Êxodo 25-40',
  },
  {
    id: 'solomons-temple',
    title: 'Templo de Salomão',
    description:
      'O Templo de Salomão foi o primeiro templo permanente construído em Jerusalém. Era uma estrutura magnífica que servia como centro de adoração e símbolo da presença de Deus entre seu povo.',
    category: 'Construções Sagradas',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/solomons-temple-ca7304c57de84d0b85148a245de08452',
    embedUrl:
      'https://sketchfab.com/models/ca7304c57de84d0b85148a245de08452/embed',
    author: 'bibel-in-3d.de',
    tags: ['Templo', 'Salomão', 'Jerusalém'],
    biblicalReference: '1 Reis 6-8',
  },
  {
    id: 'jesus-resurrection',
    title: 'Ressurreição de Jesus',
    description:
      'A ressurreição de Jesus Cristo é o evento central da fé cristã. Este modelo 3D representa o momento glorioso quando Jesus ressuscitou dos mortos, cumprindo as profecias e demonstrando seu poder sobre a morte.',
    category: 'Eventos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/jesus-resurrection-319fbee72f7a44458d6258b4a5c0b60f',
    embedUrl:
      'https://sketchfab.com/models/319fbee72f7a44458d6258b4a5c0b60f/embed',
    author: 'bibel-in-3d.de',
    tags: ['Jesus', 'Ressurreição', 'Páscoa'],
    biblicalReference: 'Mateus 28, Marcos 16, Lucas 24, João 20',
  },
  {
    id: 'tower-babel',
    title: 'Torre de Babel',
    description:
      'A Torre de Babel representa a tentativa humana de alcançar o céu e desafiar a autoridade de Deus. Este evento resultou na confusão das línguas e na dispersão da humanidade.',
    category: 'Eventos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/the-tower-of-babel-96a1c909f3fa45938efda58f6496aa62',
    embedUrl:
      'https://sketchfab.com/models/96a1c909f3fa45938efda58f6496aa62/embed',
    author: 'bibel-in-3d.de',
    tags: ['Babel', 'Torre', 'Confusão de Línguas'],
    biblicalReference: 'Gênesis 11:1-9',
  },
  {
    id: 'golden-calf',
    title: 'Bezerro de Ouro',
    description:
      'O Bezerro de Ouro foi um ídolo criado pelos israelitas enquanto Moisés estava no Monte Sinai recebendo os Dez Mandamentos. Representa a idolatria e a infidelidade do povo.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/das-goldene-stierbild-39764b824f294a85bb3a9529a43ac426',
    embedUrl:
      'https://sketchfab.com/models/39764b824f294a85bb3a9529a43ac426/embed',
    author: 'bibel-in-3d.de',
    tags: ['Ídolo', 'Ouro', 'Idolatria'],
    biblicalReference: 'Êxodo 32',
  },
  {
    id: 'eden',
    title: 'Jardim do Éden',
    description:
      'O Jardim do Éden era o paraíso original criado por Deus para Adão e Eva. Era um lugar de perfeição e comunhão com Deus, até que o pecado entrou no mundo através da desobediência.',
    category: 'Lugares Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/der-sundenfall-be7d11265528467b8a4d6bbe02d5e90d',
    embedUrl:
      'https://sketchfab.com/models/be7d11265528467b8a4d6bbe02d5e90d/embed',
    author: 'bibel-in-3d.de',
    tags: ['Éden', 'Paraíso', 'Adão e Eva'],
    biblicalReference: 'Gênesis 2-3',
  },
  {
    id: 'bronze-serpent',
    title: 'Serpente de Bronze',
    description:
      'A Serpente de Bronze foi criada por Moisés por ordem de Deus para curar os israelitas que foram picados por serpentes venenosas. Aqueles que olhavam para ela eram curados.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/eherne-schlange-144856674c284a06bd571625aea9267b',
    embedUrl:
      'https://sketchfab.com/models/144856674c284a06bd571625aea9267b/embed',
    author: 'bibel-in-3d.de',
    tags: ['Serpente', 'Cura', 'Moisés'],
    biblicalReference: 'Números 21:4-9',
  },
  {
    id: 'baptist-church',
    title: 'Igreja Batista Contemporânea',
    description:
      'Uma representação moderna de uma igreja batista, mostrando a arquitetura contemporânea de locais de adoração cristã. Este modelo demonstra como as igrejas evoluíram ao longo do tempo.',
    category: 'Construções Sagradas',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/gospel-baptist-church-579664662ca54efa8bfb2ba7856fe867',
    embedUrl:
      'https://sketchfab.com/models/579664662ca54efa8bfb2ba7856fe867/embed',
    author: "𝐁𝐈𝐆 𝐅𝐀𝐍 𝟑𝐃 '𝟗𝟐 ＮＩＣＥ ＭＯＤＥＬＳ",
    tags: ['Igreja', 'Batista', 'Contemporânea'],
    biblicalReference: 'Atos 2:42-47, Hebreus 10:25',
  },
  {
    id: 'bronze-sea',
    title: 'Mar de Fundição',
    description:
      'O Mar de Fundição era uma grande bacia de bronze usada pelos sacerdotes para se lavarem antes de entrar no templo. Era uma peça impressionante de artesanato bíblico.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/ehernes-meer-fbe073513a6d4866ba1c12584bc4770a',
    embedUrl:
      'https://sketchfab.com/models/fbe073513a6d4866ba1c12584bc4770a/embed',
    author: 'bibel-in-3d.de',
    tags: ['Mar de Fundição', 'Bronze', 'Templo'],
    biblicalReference: '1 Reis 7:23-26, 2 Crônicas 4:2-5',
  },
  {
    id: 'bronze-cart',
    title: 'Carro de Bronze',
    description:
      'O Carro de Bronze era usado para transportar objetos sagrados do templo. Esta peça demonstra a habilidade artesanal dos israelitas e a importância dos utensílios do templo.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/bronze-cart-1d1d548fd53d4389b248104d04a1305d',
    embedUrl:
      'https://sketchfab.com/models/1d1d548fd53d4389b248104d04a1305d/embed',
    author: 'bibel-in-3d.de',
    tags: ['Carro', 'Bronze', 'Transporte'],
    biblicalReference: '1 Reis 7:27-37',
  },
  {
    id: 'house-on-rock',
    title: 'Construção sobre a Rocha',
    description:
      'Este modelo ilustra a parábola de Jesus sobre a casa construída sobre a rocha versus a casa construída sobre a areia. Representa a importância de construir nossa vida sobre fundamentos sólidos.',
    category: 'Eventos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/from-building-a-house-d1e716c5fdf647ee90fc592ab900cc22',
    embedUrl:
      'https://sketchfab.com/models/d1e716c5fdf647ee90fc592ab900cc22/embed',
    author: 'bibel-in-3d.de',
    tags: ['Parábola', 'Rocha', 'Fundamento'],
    biblicalReference: 'Mateus 7:24-29',
  },
  {
    id: 'high-priest',
    title: 'Sumo Sacerdote',
    description:
      'O Sumo Sacerdote era o líder religioso mais importante do povo de Israel. Ele tinha a responsabilidade única de entrar no Santo dos Santos uma vez por ano, no Dia da Expiação, para fazer expiação pelos pecados do povo.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/high-priest-173a94b82478415bb56124e137dfa30c',
    embedUrl:
      'https://sketchfab.com/models/173a94b82478415bb56124e137dfa30c/embed',
    author: 'bibel-in-3d.de',
    tags: ['Sumo Sacerdote', 'Sacerdócio', 'Templo'],
    biblicalReference: 'Levítico 16, Hebreus 4-5',
  },
  {
    id: 'open-bible',
    title: 'Bíblia',
    description:
      'A Bíblia Sagrada é a Palavra de Deus, contendo 66 livros divididos em Antigo e Novo Testamento. É o livro mais importante da fé cristã, revelando a história da salvação e os ensinamentos de Deus.',
    category: 'Objetos Bíblicos',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/holy-bible-091e139f26554be4844712ab50f8ad2a',
    embedUrl:
      'https://sketchfab.com/models/091e139f26554be4844712ab50f8ad2a/embed',
    author: 'VHM777',
    tags: ['Bíblia', 'Palavra de Deus', 'Escrituras'],
    biblicalReference: '2 Timóteo 3:16-17, Salmos 119:105',
  },
  {
    id: 'jesus-carrying-cross',
    title: 'Jesus Carregando sua Cruz',
    description:
      'Jesus carregando a cruz representa o caminho doloroso que Ele percorreu até o Calvário. Esta cena mostra o momento em que Jesus, após ser flagelado e coroado com espinhos, carrega a cruz onde seria crucificado, demonstrando seu amor e sacrifício pela humanidade.',
    category: 'Cenas Bíblicas',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/jesus-nazareno-32684fc45b004c6a8ccec99c3c0ead93',
    embedUrl:
      'https://sketchfab.com/models/32684fc45b004c6a8ccec99c3c0ead93/embed',
    author: 'DavidMarcos',
    tags: ['Jesus', 'Cruz', 'Paixão', 'Sacrifício'],
    biblicalReference: 'João 19:17, Lucas 23:26-32',
  },
  {
    id: 'jesus-crucified',
    title: 'Jesus Crucificado',
    description:
      'A crucificação de Jesus Cristo é o evento central da fé cristã. Jesus foi pregado na cruz, onde sofreu e morreu pelos pecados da humanidade. Este sacrifício representa o amor supremo de Deus e a redenção oferecida a todos que creem.',
    category: 'Cenas Bíblicas',
    sketchfabUrl:
      'https://sketchfab.com/3d-models/jesus-am-kreuz-98608aa89de34123867633a8ced4dc26',
    embedUrl:
      'https://sketchfab.com/models/98608aa89de34123867633a8ced4dc26/embed',
    author: 'noe-3d.at',
    tags: ['Jesus', 'Crucificação', 'Paixão', 'Redenção'],
    biblicalReference: 'João 19:17-30, Mateus 27:32-56',
  },
];

const categories = [
  'Todos',
  'Construções Sagradas',
  'Eventos Bíblicos',
  'Objetos Bíblicos',
  'Lugares Bíblicos',
];

const Models3D: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const navigate = useNavigate();

  const filteredModels =
    selectedCategory === 'Todos'
      ? models3D
      : models3D.filter((model) => model.category === selectedCategory);

  return (
    <div className='w-full px-4 py-8'>
      <header className='text-center mb-6 animate-fade-in'>
        <div className='flex items-center justify-center gap-2 mb-4'>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-bible-accent'>
            Modelos 3D
          </h1>
        </div>
        <p className='text-bible-text/70 text-sm sm:text-base'>
          Explore os locais, objetos e eventos bíblicos através de modelos 3D
          interativos. Cada modelo foi criado com base nas descrições bíblicas e
          pesquisas arqueológicas.
        </p>
      </header>

      <Tabs
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className='w-full'
      >
        <TabsContent value={selectedCategory} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredModels.map((model) => (
              <Card
                key={model.id}
                className='overflow-hidden hover:shadow-lg transition-shadow'
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <CardTitle className='text-lg font-semibold text-bible-text'>
                        {model.title}
                      </CardTitle>
                      <CardDescription className='text-sm text-bible-text/60 mt-1'>
                        {model.category}
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0'
                        >
                          <Info className='h-4 w-4' />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                          <DialogTitle>{model.title}</DialogTitle>
                          <DialogDescription>
                            <div className='space-y-4 mt-4'>
                              <div>
                                <h4 className='font-semibold text-bible-text mb-2'>
                                  Descrição:
                                </h4>
                                <p className='text-bible-text/80'>
                                  {model.description}
                                </p>
                              </div>
                              <div>
                                <h4 className='font-semibold text-bible-text mb-2'>
                                  Referência Bíblica:
                                </h4>
                                <p className='text-bible-accent font-medium'>
                                  {model.biblicalReference}
                                </p>
                              </div>
                              <div>
                                <h4 className='font-semibold text-bible-text mb-2'>
                                  Tags:
                                </h4>
                                <div className='flex flex-wrap gap-2'>
                                  {model.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant='secondary'
                                      className='text-xs'
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className='font-semibold text-bible-text mb-2'>
                                  Autor:
                                </h4>
                                <p className='text-bible-text/80'>
                                  {model.author}
                                </p>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>

                <CardContent className='pt-0'>
                  <div className='aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 relative'>
                    <iframe
                      title={model.title}
                      src={model.embedUrl}
                      frameBorder='0'
                      allowFullScreen
                      allow='autoplay; fullscreen; xr-spatial-tracking'
                      className='w-full h-full absolute inset-0'
                    />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex flex-wrap gap-1'>
                      {model.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant='outline' className='text-xs'>
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => navigate(ROUTES.model3d(model.id))}
                        className='text-xs'
                      >
                        <Eye className='h-3 w-3 mr-1' />
                        Ver
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        asChild
                        className='text-xs'
                      >
                        <a
                          href={model.sketchfabUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <ExternalLink className='h-3 w-3 mr-1' />
                          Sketchfab
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Seção de Créditos dos Autores */}
      <div className='mt-12'>
        <Card className='w-full'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>Créditos dos Autores</CardTitle>
            <CardDescription>
              Conheça os artistas e criadores responsáveis pelos modelos 3D
              bíblicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-8'>
              {/* bibel-in-3d.de */}
              <div className='border-b border-gray-200 pb-6'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0'>
                    <div className='w-16 h-16 bg-bible-accent/10 rounded-full flex items-center justify-center'>
                      <BookOpen className='w-8 h-8 text-bible-accent' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-bible-text mb-2'>
                      <a
                        href='https://sketchfab.com/gbraendlein'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-bible-accent hover:underline'
                      >
                        bibel-in-3d.de
                      </a>
                    </h3>
                    <p className='text-bible-text/70 mb-4'>
                      Iniciativa dedicada à recriação digital de locais e
                      objetos bíblicos com base em pesquisas arqueológicas e
                      descrições bíblicas detalhadas. Especializada em modelos
                      históricos e educacionais.
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {models3D
                        .filter((model) => model.author === 'bibel-in-3d.de')
                        .map((model) => (
                          <div
                            key={model.id}
                            className='flex items-center gap-2 p-2 bg-card border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer'
                            onClick={() => navigate(ROUTES.model3d(model.id))}
                          >
                            <div className='w-8 h-8 bg-bible-accent/20 rounded flex items-center justify-center'>
                              <Box className='w-4 h-4 text-bible-accent' />
                            </div>
                            <span className='text-sm font-medium'>
                              {model.title}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 𝐁𝐈𝐆 𝐅𝐀𝐍 𝟑𝐃 '𝟗𝟐 ＮＩＣＥ ＭＯＤＥＬＳ */}
              <div className='border-b border-gray-200 pb-6'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0'>
                    <div className='w-16 h-16 bg-bible-accent/10 rounded-full flex items-center justify-center'>
                      <BookOpen className='w-8 h-8 text-bible-accent' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-bible-text mb-2'>
                      <a
                        href='https://sketchfab.com/Number1FanGuy98'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-bible-accent hover:underline'
                      >
                        𝐁𝐈𝐆 𝐅𝐀𝐍 𝟑𝐃 '𝟗𝟐 ＮＩＣＥ ＭＯＤＥＬＳ
                      </a>
                    </h3>
                    <p className='text-bible-text/70 mb-4'>
                      Criador especializado em modelos 3D contemporâneos e
                      arquitetura moderna. Contribui com representações de
                      locais de adoração atuais e estruturas religiosas
                      modernas.
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {models3D
                        .filter(
                          (model) =>
                            model.author ===
                            "𝐁𝐈𝐆 𝐅𝐀𝐍 𝟑𝐃 '𝟗𝟐 ＮＩＣＥ ＭＯＤＥＬＳ"
                        )
                        .map((model) => (
                          <div
                            key={model.id}
                            className='flex items-center gap-2 p-2 bg-card border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer'
                            onClick={() => navigate(ROUTES.model3d(model.id))}
                          >
                            <div className='w-8 h-8 bg-bible-accent/20 rounded flex items-center justify-center'>
                              <Box className='w-4 h-4 text-bible-accent' />
                            </div>
                            <span className='text-sm font-medium'>
                              {model.title}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* VHM777 */}
              <div className='border-b border-gray-200 pb-6'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0'>
                    <div className='w-16 h-16 bg-bible-accent/10 rounded-full flex items-center justify-center'>
                      <BookOpen className='w-8 h-8 text-bible-accent' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-bible-text mb-2'>
                      <a
                        href='https://sketchfab.com/gizacorp01'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-bible-accent hover:underline'
                      >
                        VHM777
                      </a>
                    </h3>
                    <p className='text-bible-text/70 mb-4'>
                      Criador especializado em objetos religiosos e símbolos da
                      fé cristã. Contribui com modelos detalhados que
                      representam elementos fundamentais da espiritualidade.
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {models3D
                        .filter((model) => model.author === 'VHM777')
                        .map((model) => (
                          <div
                            key={model.id}
                            className='flex items-center gap-2 p-2 bg-card border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer'
                            onClick={() => navigate(ROUTES.model3d(model.id))}
                          >
                            <div className='w-8 h-8 bg-bible-accent/20 rounded flex items-center justify-center'>
                              <Box className='w-4 h-4 text-bible-accent' />
                            </div>
                            <span className='text-sm font-medium'>
                              {model.title}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* DavidMarcos */}
              <div className='border-b border-gray-200 pb-6'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0'>
                    <div className='w-16 h-16 bg-bible-accent/10 rounded-full flex items-center justify-center'>
                      <BookOpen className='w-8 h-8 text-bible-accent' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-bible-text mb-2'>
                      <a
                        href='https://sketchfab.com/DavidMarcos'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-bible-accent hover:underline'
                      >
                        DavidMarcos
                      </a>
                    </h3>
                    <p className='text-bible-text/70 mb-4'>
                      Artista especializado em representações artísticas de
                      cenas bíblicas e figuras religiosas. Suas criações
                      capturam a essência emocional e espiritual dos momentos
                      mais significativos da fé cristã.
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {models3D
                        .filter((model) => model.author === 'DavidMarcos')
                        .map((model) => (
                          <div
                            key={model.id}
                            className='flex items-center gap-2 p-2 bg-card border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer'
                            onClick={() => navigate(ROUTES.model3d(model.id))}
                          >
                            <div className='w-8 h-8 bg-bible-accent/20 rounded flex items-center justify-center'>
                              <Box className='w-4 h-4 text-bible-accent' />
                            </div>
                            <span className='text-sm font-medium'>
                              {model.title}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* noe-3d.at */}
              <div className='border-b border-gray-200 pb-6'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0'>
                    <div className='w-16 h-16 bg-bible-accent/10 rounded-full flex items-center justify-center'>
                      <BookOpen className='w-8 h-8 text-bible-accent' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-bible-text mb-2'>
                      <a
                        href='https://sketchfab.com/www.noe-3d.at'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-bible-accent hover:underline'
                      >
                        noe-3d.at
                      </a>
                    </h3>
                    <p className='text-bible-text/70 mb-4'>
                      Criador dedicado à representação artística de momentos
                      cruciais da narrativa bíblica. Especializado em cenas que
                      transmitem a profundidade espiritual e emocional dos
                      eventos sagrados.
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {models3D
                        .filter((model) => model.author === 'noe-3d.at')
                        .map((model) => (
                          <div
                            key={model.id}
                            className='flex items-center gap-2 p-2 bg-card border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer'
                            onClick={() => navigate(ROUTES.model3d(model.id))}
                          >
                            <div className='w-8 h-8 bg-bible-accent/20 rounded flex items-center justify-center'>
                              <Box className='w-4 h-4 text-bible-accent' />
                            </div>
                            <span className='text-sm font-medium'>
                              {model.title}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações adicionais sobre os autores */}
            <div className='mt-8 p-4 bg-bible-accent/5 rounded-lg'>
              <h4 className='font-semibold text-bible-text mb-2'>
                Sobre os Autores
              </h4>
              <p className='text-sm text-bible-text/70'>
                Todos os modelos apresentados são de autoria de criadores
                dedicados que compartilham seus trabalhos através da plataforma
                Sketchfab. Estes artistas contribuem significativamente para a
                compreensão visual e educacional dos contextos bíblicos,
                permitindo que estudantes, pesquisadores e interessados explorem
                a história bíblica de forma interativa e envolvente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Models3D;
