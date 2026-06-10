import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import {
  Crown,
  Scroll,
  Map,
  Users,
  BookOpen,
  Zap,
  Heart,
  Shield,
  Church,
  Star,
  AlertTriangle,
  Calendar,
  Globe,
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  year: number;
  yearEnd?: number; // For date ranges
  title: string;
  description: string;
  category: string;
  period: string | null;
  bibleRef: string;
  icon: React.ReactNode;
  color: string;
  uncertainty?: 'high' | 'medium' | 'low'; // Uncertainty level
  alternativeDates?: string; // Alternative scholarly dates
  archaeologicalEvidence?: string; // Archaeological confirmation
  scholarlyNotes?: string; // Additional scholarly context
}

const timelineData: TimelineEvent[] = [
  {
    id: '1',
    year: -4004,
    title: 'Criação do Mundo',
    description:
      'Deus cria os céus e a terra em seis dias. No sexto dia, Deus forma o homem do pó da terra e sopra em suas narinas o fôlego de vida. Adão e Eva são criados à imagem de Deus e colocados no Jardim do Éden para cultivá-lo e guardá-lo. Deus estabelece o primeiro mandamento e institui o matrimônio.',
    category: 'Primeval',
    period: 'História Primeva',
    bibleRef: 'Gênesis 1:1-2:25',
    icon: <Star className='w-4 h-4' />,
    color: 'bg-purple-500',
    uncertainty: 'high',
    scholarlyNotes:
      'Data baseada nos cálculos de Bishop Ussher (~4004 a.C.). A Bíblia não fornece data absoluta para a criação; genealogias podem ter lacunas. Modelos alternativos consideram períodos muito mais extensos.',
  },
  {
    id: '1a',
    year: -4004,
    title: 'A Queda do Homem',
    description:
      'Adão e Eva desobedecem a Deus ao comerem do fruto proibido, trazendo o pecado e a morte ao mundo. Deus promete um Redentor (Proto-evangelho) e os expulsa do Éden. Caim mata Abel, o primeiro homicídio da história.',
    category: 'Primeval',
    period: 'História Primeva',
    bibleRef: 'Gênesis 3:1-4:26',
    icon: <Star className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'high',
    scholarlyNotes:
      'Evento teológico fundamental. Datação segue modelo cronológico de Ussher, mas o foco está na realidade histórica do evento, não na data precisa.',
  },
  {
    id: '1b',
    year: -3500,
    yearEnd: -3000,
    title: 'Genealogia de Sete',
    description:
      'A linhagem piedosa de Sete preserva a adoração ao verdadeiro Deus. Enoque caminha com Deus e é trasladado sem ver a morte. Matusalém vive 969 anos, sendo o homem mais longevo registrado. A corrupção humana se intensifica.',
    category: 'Primeval',
    period: 'História Primeva',
    bibleRef: 'Gênesis 5:1-32',
    icon: <Users className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'high',
    scholarlyNotes:
      'Período estimado baseado nas genealogias de Gênesis 5. Possíveis lacunas genealógicas podem estender significativamente este período.',
  },
  {
    id: '2',
    year: -2348,
    title: 'Dilúvio de Noé',
    description:
      'Deus julga a terra corrompida com um dilúvio universal. Noé, homem justo, constrói uma arca conforme as instruções divinas. Animais de toda espécie entram na arca. Chove por 40 dias e 40 noites. Após o dilúvio, Deus estabelece uma aliança com Noé, prometendo nunca mais destruir a terra com água.',
    category: 'Primeval',
    period: 'História Primeva',
    bibleRef: 'Gênesis 6:1-9:29',
    icon: <Zap className='w-4 h-4' />,
    color: 'bg-blue-500',
    uncertainty: 'high',
    scholarlyNotes:
      'Data baseada em Ussher. Modelos da Septuaginta e considerações arqueológicas sugerem datas anteriores. Alguns entendem como narrativa teológica sobre julgamento divino.',
  },
  {
    id: '2a',
    year: -2200,
    title: 'Torre de Babel',
    description:
      'A humanidade se rebela contra Deus construindo uma torre para alcançar os céus. Deus confunde suas línguas e os dispersa pela terra. Surgem as diferentes nações e idiomas. Este evento marca o início da dispersão dos povos.',
    category: 'Primeval',
    period: 'História Primeva',
    bibleRef: 'Gênesis 11:1-9',
    icon: <Globe className='w-4 h-4' />,
    color: 'bg-orange-500',
    uncertainty: 'high',
    scholarlyNotes:
      'Evento pós-diluviano que explica a origem das diferentes línguas e culturas. Datação aproximada baseada no contexto genealógico.',
  },
  {
    id: '3',
    year: -2166,
    title: 'Nascimento de Abraão',
    description:
      'Abraão nasce em Ur dos Caldeus. Deus o chama aos 75 anos para deixar sua terra e parentela, prometendo fazer dele uma grande nação. Abraão obedece pela fé e parte para Canaã. Deus estabelece uma aliança eterna com ele, prometendo a terra e descendência numerosa.',
    category: 'Patriarcas',
    period: 'Patriarcas',
    bibleRef: 'Gênesis 11:27-12:9',
    icon: <Users className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'medium',
    alternativeDates: 'Se Êxodo em 1260 a.C., então ~2000 a.C.',
    scholarlyNotes:
      'Data aceita por cronologias de Merrill, mas depende da datação do Êxodo. Cronologia "data cedo" (1446 a.C.) vs "data tarde" (1260 a.C.) afeta esta datação.',
  },
  {
    id: '3a',
    year: -2080,
    title: 'Aliança Abraâmica',
    description:
      'Deus faz uma aliança formal com Abraão, prometendo que sua descendência seria como as estrelas do céu. Institui a circuncisão como sinal da aliança. Promete que em sua descendência todas as nações da terra serão abençoadas (promessa messiânica).',
    category: 'Patriarcas',
    period: 'Patriarcas',
    bibleRef: 'Gênesis 15:1-17:27',
    icon: <Users className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'medium',
    alternativeDates: 'Se Êxodo em 1260 a.C., então ~2000 a.C.',
    scholarlyNotes:
      'Data aceita por cronologias de Merrill, mas depende da datação do Êxodo. Cronologia "data cedo" (1446 a.C.) vs "data tarde" (1260 a.C.) afeta esta datação.',
  },
  {
    id: '3b',
    year: -2067,
    title: 'Nascimento de Isaque',
    description:
      'Isaque nasce quando Abraão tem 100 anos e Sara 90, cumprindo a promessa divina. Deus testa a fé de Abraão pedindo para sacrificar Isaque no Monte Moriá. Abraão obedece, mas Deus provê um cordeiro substituto, prefigurando o sacrifício de Cristo.',
    category: 'Patriarcas',
    period: 'Patriarcas',
    bibleRef: 'Gênesis 21:1-22:24',
    icon: <Users className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'medium',
    alternativeDates: 'Se Êxodo em 1260 a.C., então ~2000 a.C.',
    scholarlyNotes:
      'Data aceita por cronologias de Merrill, mas depende da datação do Êxodo. Cronologia "data cedo" (1446 a.C.) vs "data tarde" (1260 a.C.) afeta esta datação.',
  },
  {
    id: '3c',
    year: -2007,
    title: 'Nascimento de Jacó e Esaú',
    description:
      'Isaque casa com Rebeca e gera gêmeos: Esaú e Jacó. Deus revela que o mais velho servirá ao mais novo. Jacó compra a primogenitura de Esaú e depois obtém a bênção paterna através de engano. Foge para Harã onde serve a Labão.',
    category: 'Patriarcas',
    period: 'Patriarcas',
    bibleRef: 'Gênesis 25:19-28:22',
    icon: <Users className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'medium',
    alternativeDates: 'Se Êxodo em 1260 a.C., então ~2000 a.C.',
    scholarlyNotes:
      'Data aceita por cronologias de Merrill, mas depende da datação do Êxodo. Cronologia "data cedo" (1446 a.C.) vs "data tarde" (1260 a.C.) afeta esta datação.',
  },
  {
    id: '3d',
    year: -1930,
    title: 'Jacó se torna Israel',
    description:
      'Jacó luta com o Anjo do Senhor no vau de Jaboque e tem seu nome mudado para Israel. Reconcilia-se com Esaú. Gera doze filhos que se tornam as doze tribos de Israel. José é vendido pelos irmãos como escravo para o Egito.',
    category: 'Patriarcas',
    period: 'Patriarcas',
    bibleRef: 'Gênesis 29:1-37:36',
    icon: <Users className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'medium',
    alternativeDates: 'Se Êxodo em 1260 a.C., então ~2000 a.C.',
    scholarlyNotes:
      'Data aceita por cronologias de Merrill, mas depende da datação do Êxodo. Cronologia "data cedo" (1446 a.C.) vs "data tarde" (1260 a.C.) afeta esta datação.',
  },
  {
    id: '3e',
    year: -1898,
    title: 'José no Egito',
    description:
      'José é vendido como escravo, mas Deus o exalta para governador do Egito. Interpreta sonhos do Faraó predizendo sete anos de abundância seguidos de sete anos de fome. Durante a fome, a família de Jacó migra para o Egito, onde se multiplica.',
    category: 'Patriarcas',
    period: 'Patriarcas',
    bibleRef: 'Gênesis 37:1-50:26',
    icon: <Users className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'medium',
    alternativeDates: 'Se Êxodo em 1260 a.C., então ~2000 a.C.',
    scholarlyNotes:
      'Data aceita por cronologias de Merrill, mas depende da datação do Êxodo. Cronologia "data cedo" (1446 a.C.) vs "data tarde" (1260 a.C.) afeta esta datação.',
  },
  {
    id: '4',
    year: -1526,
    title: 'Nascimento de Moisés',
    description:
      'Moisés nasce durante a opressão israelita no Egito. É salvo das águas do Nilo pela filha do Faraó e criado na corte egípcia. Aos 40 anos mata um egípcio e foge para Midiã, onde vive como pastor por 40 anos até o chamado divino.',
    category: 'Êxodo',
    period: 'Êxodo',
    bibleRef: 'Êxodo 1:1-2:25',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '4a',
    year: -1446,
    title: 'Chamado de Moisés e o Êxodo',
    description:
      'Deus aparece a Moisés na sarça ardente no Monte Horebe e o comissiona para libertar Israel do Egito. Revela Seu nome "EU SOU O QUE SOU" (YHWH). Após as dez pragas, Faraó liberta Israel. Deus institui a Páscoa como memorial perpétuo.',
    category: 'Êxodo',
    period: 'Êxodo e Conquista',
    bibleRef: 'Êxodo 3:1-12:36',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '4b',
    year: -1446,
    title: 'As Dez Pragas',
    description:
      'Deus envia dez pragas sobre o Egito para demonstrar Seu poder e libertar Seu povo: água em sangue, rãs, piolhos, moscas, peste no gado, úlceras, chuva de pedras, gafanhotos, trevas e morte dos primogênitos. Faraó finalmente liberta Israel.',
    category: 'Êxodo',
    period: 'Êxodo',
    bibleRef: 'Êxodo 7:1-12:36',
    icon: <Zap className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '4c',
    year: -1446,
    title: 'A Páscoa e o Êxodo',
    description:
      'Deus institui a Páscoa como memorial perpétuo. O cordeiro pascal prefigura Cristo. Israel sai do Egito com aproximadamente 600.000 homens, além de mulheres e crianças. Deus os guia com coluna de nuvem de dia e de fogo à noite.',
    category: 'Êxodo',
    period: 'Êxodo',
    bibleRef: 'Êxodo 12:1-13:22',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '4d',
    year: -1446,
    title: 'Travessia do Mar Vermelho',
    description:
      'Faraó persegue Israel com seu exército. Deus abre o Mar Vermelho, permitindo que Israel passe em terra seca. As águas se fecham sobre o exército egípcio. Israel canta o cântico de Moisés celebrando a vitória divina.',
    category: 'Êxodo',
    period: 'Êxodo',
    bibleRef: 'Êxodo 14:1-15:21',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-blue-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '4e',
    year: -1446,
    title: 'Lei no Monte Sinai',
    description:
      'Deus dá a Lei a Moisés no Monte Sinai, incluindo os Dez Mandamentos. Estabelece a aliança mosaica com Israel. Institui o sacerdócio levítico, o tabernáculo e o sistema sacrificial. Israel aceita a aliança dizendo: "Tudo o que o Senhor falou, faremos".',
    category: 'Êxodo',
    period: 'Êxodo',
    bibleRef: 'Êxodo 19:1-24:18',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '4f',
    year: -1445,
    title: 'O Bezerro de Ouro',
    description:
      'Enquanto Moisés está no monte, Israel faz um bezerro de ouro e o adora. Moisés quebra as tábuas da lei em ira. Deus ameaça destruir o povo, mas Moisés intercede. Três mil homens morrem pela idolatria. Deus renova a aliança.',
    category: 'Êxodo',
    period: 'Êxodo',
    bibleRef: 'Êxodo 32:1-34:35',
    icon: <Zap className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '4g',
    year: -1445,
    title: 'Construção do Tabernáculo',
    description:
      'Israel constrói o tabernáculo conforme o modelo mostrado a Moisés no monte. A glória de Deus enche o tabernáculo. Estabelece-se o sistema de adoração com sacrifícios, festas e cerimônias que apontam para Cristo.',
    category: 'Êxodo',
    period: 'Êxodo',
    bibleRef: 'Êxodo 35:1-40:38',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-purple-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '4h',
    year: -1406,
    title: 'Os Espias e 40 Anos no Deserto',
    description:
      'Doze espias exploram Canaã. Dez trazem relatório negativo, causando rebelião. Apenas Josué e Calebe confiam em Deus. Por incredulidade, Israel vaga 40 anos no deserto até que toda aquela geração morre, exceto Josué e Calebe.',
    category: 'Êxodo',
    period: 'Êxodo',
    bibleRef: 'Números 13:1-14:45',
    icon: <Map className='w-4 h-4' />,
    color: 'bg-yellow-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '5',
    year: -1406,
    title: 'Morte de Moisés',
    description:
      'Moisés morre no Monte Nebo aos 120 anos, após ver a Terra Prometida. Deus o enterra em local desconhecido. Josué é confirmado como sucessor. Moisés é lembrado como o maior profeta que conheceu Deus face a face.',
    category: 'Êxodo',
    period: 'Êxodo',
    bibleRef: 'Deuteronômio 34:1-12',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-gray-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '5a',
    year: -1406,
    title: 'Travessia do Jordão',
    description:
      'Josué lidera Israel na travessia milagrosa do rio Jordão em época de cheia. As águas se detêm, permitindo a passagem em terra seca. Doze pedras são colocadas como memorial. Israel é circuncidado em Gilgal e celebra a Páscoa em Canaã.',
    category: 'Conquista',
    period: 'Conquista',
    bibleRef: 'Josué 3:1-5:12',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-blue-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '5b',
    year: -1406,
    title: 'Conquista de Jericó',
    description:
      'Primeira cidade conquistada em Canaã. Israel marcha ao redor da cidade por sete dias. No sétimo dia, ao som das trombetas e grito do povo, os muros caem. Raabe e sua família são poupadas por terem ajudado os espias.',
    category: 'Conquista',
    period: 'Conquista',
    bibleRef: 'Josué 6:1-27',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-orange-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '5c',
    year: -1400,
    title: 'Conquista de Canaã',
    description:
      'Josué lidera a conquista sistemática da Terra Prometida. Campanhas no sul, norte e centro de Canaã. Vitórias em Ai (após o pecado de Acã), Gabaão, e coalizões cananéias. O sol se detém em Gibeão. Trinta e um reis são derrotados.',
    category: 'Conquista',
    period: 'Conquista',
    bibleRef: 'Josué 7:1-12:24',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-orange-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '5d',
    year: -1400,
    title: 'Divisão da Terra',
    description:
      'A terra é dividida por sortes entre as doze tribos de Israel. Josué recebe Timnate-Sera como herança. Seis cidades de refúgio são estabelecidas. Os levitas recebem 48 cidades. Josué renova a aliança em Siquém antes de morrer.',
    category: 'Conquista',
    period: 'Conquista',
    bibleRef: 'Josué 13:1-24:33',
    icon: <Map className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '5e',
    year: -1380,
    title: 'Período dos Juízes',
    description:
      'Após a morte de Josué, Israel entra num ciclo de apostasia, opressão, clamor e libertação. Deus levanta juízes como libertadores: Otniel, Eúde, Débora, Gideão, Jefté, Sansão e outros. "Cada um fazia o que parecia reto aos seus olhos".',
    category: 'Juízes',
    period: 'Juízes',
    bibleRef: 'Juízes 1:1-21:25',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-amber-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '5f',
    year: -1100,
    title: 'Samuel, o Último Juiz',
    description:
      'Samuel nasce em resposta à oração de Ana. Serve no tabernáculo desde criança. Torna-se profeta, sacerdote e juiz. Estabelece escolas de profetas. Israel pede um rei "como as outras nações". Samuel adverte sobre os perigos da monarquia.',
    category: 'Juízes',
    period: 'Juízes',
    bibleRef: '1 Samuel 1:1-8:22',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '6',
    year: -1050,
    title: 'Saul, Primeiro Rei',
    description:
      'Saul é ungido por Samuel como primeiro rei de Israel. Inicialmente humilde e bem-sucedido, gradualmente se torna orgulhoso e desobediente. Desobedece a Deus ao poupar Agague e os amalequitas. Deus o rejeita como rei e escolhe Davi.',
    category: 'Monarquia',
    period: 'Reino Unido',
    bibleRef: '1 Samuel 9:1-31:13',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-yellow-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data baseada na cronologia de Edwin Thiele. Início da monarquia israelita bem estabelecido por sincronismos históricos.',
    archaeologicalEvidence:
      'Evidências arqueológicas do período do Ferro II confirmam a emergência da monarquia israelita.',
  },
  {
    id: '6a',
    year: -1025,
    title: 'Davi é Ungido',
    description:
      'Samuel unge Davi, o mais novo dos filhos de Jessé, como futuro rei. Davi serve na corte de Saul tocando harpa. Mata Golias com uma pedra, tornando-se herói nacional. Saul fica com ciúmes e persegue Davi, que foge para o deserto.',
    category: 'Reinados',
    period: 'Reino Unido',
    bibleRef: '1 Samuel 16:1-27:12',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-yellow-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '7',
    year: -1010,
    title: 'Davi, Rei de Israel',
    description:
      'Após a morte de Saul, Davi reina primeiro sobre Judá (7 anos) e depois sobre todo Israel (33 anos). Conquista Jerusalém e a torna capital. Traz a arca da aliança para Jerusalém. Deus faz aliança eterna com Davi sobre o trono messiânico.',
    category: 'Monarquia',
    period: 'Reino Unido',
    bibleRef: '2 Samuel 1:1-24:25',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-yellow-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada pela cronologia de Edwin Thiele e sincronismos com registros egípcios e assírios. Reinado de 40 anos bem documentado.',
    archaeologicalEvidence:
      'Evidências arqueológicas em Jerusalém confirmam a expansão da cidade durante o período davídico.',
  },
  {
    id: '7a',
    year: -995,
    title: 'Aliança Davídica',
    description:
      'Deus promete a Davi que seu trono será estabelecido para sempre. Seus descendentes reinarão perpetuamente. Esta aliança aponta para o Messias, que será chamado "Filho de Davi". Davi deseja construir um templo, mas Deus reserva esta honra para Salomão.',
    category: 'Reinados',
    period: 'Reino Unido',
    bibleRef: '2 Samuel 7:1-29',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-yellow-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '7b',
    year: -985,
    title: 'Pecado de Davi',
    description:
      'Davi comete adultério com Bate-Seba e manda matar Urias. O profeta Natã o confronta com a parábola do cordeiro. Davi se arrepende genuinamente (Salmo 51). Deus o perdoa, mas consequências seguem: morte do bebê, rebelião de Absalão.',
    category: 'Reinados',
    period: 'Reino Unido',
    bibleRef: '2 Samuel 11:1-12:25',
    icon: <Heart className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '8',
    year: -970,
    title: 'Salomão, Rei Sábio',
    description:
      'Salomão sucede Davi como rei. Deus lhe oferece qualquer coisa, e ele pede sabedoria. Torna-se o homem mais sábio do mundo. Constrói o Templo em Jerusalém, cumprindo o sonho de Davi. Reina em paz e prosperidade por 40 anos.',
    category: 'Monarquia',
    period: 'Reino Unido',
    bibleRef: '1 Reis 1:1-11:43',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-yellow-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada pela cronologia de Edwin Thiele. Referência em 1 Rs 6:1 estabelece marco cronológico importante para o período monárquico.',
    archaeologicalEvidence:
      'Evidências arqueológicas do período salomônico incluem estruturas monumentais em Jerusalém, Hazor, Megido e Gezer.',
  },
  {
    id: '8a',
    year: -966,
    title: 'Construção do Templo',
    description:
      'Salomão constrói o Templo do Senhor em Jerusalém, usando os melhores materiais e artesãos. A construção leva sete anos. Na dedicação, a glória de Deus enche o templo. Salomão ora pedindo que Deus ouça as orações feitas em direção ao templo.',
    category: 'Reinados',
    period: 'Reino Unido',
    bibleRef: '1 Reis 6:1-8:66',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-purple-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '8b',
    year: -950,
    title: 'Apostasia de Salomão',
    description:
      'Na velhice, Salomão se desvia do Senhor influenciado por suas muitas esposas estrangeiras. Constrói altares para deuses pagãos. Deus se ira e promete dividir o reino, mas por amor a Davi, isso só acontecerá após a morte de Salomão.',
    category: 'Reinados',
    period: 'Reino Unido',
    bibleRef: '1 Reis 11:1-13',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '9',
    year: -930,
    title: 'Divisão do Reino',
    description:
      'Após a morte de Salomão, seu filho Roboão recusa aliviar os impostos pesados. Dez tribos se rebelam sob liderança de Jeroboão, formando o Reino do Norte (Israel). Judá e Benjamim permanecem fiéis à casa de Davi, formando o Reino do Sul (Judá).',
    category: 'Monarquia',
    period: 'Reino Dividido',
    bibleRef: '1 Reis 12:1-24',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-amber-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data bem estabelecida pela cronologia de Edwin Thiele, confirmada por sincronismos com registros assírios e egípcios.',
    archaeologicalEvidence:
      'Confirmada por evidências arqueológicas e registros históricos contemporâneos.',
  },
  {
    id: '9a',
    year: -930,
    title: 'Jeroboão e os Bezerros de Ouro',
    description:
      'Jeroboão, temendo que o povo retorne a Jerusalém para adorar, estabelece centros de adoração alternativos em Dã e Betel com bezerros de ouro. Institui sacerdotes não-levitas e altera as festas. Este pecado leva Israel à idolatria persistente.',
    category: 'Reinados',
    period: 'Reino Dividido',
    bibleRef: '1 Reis 12:25-13:34',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '9b',
    year: -913,
    title: 'Asa, Rei de Judá',
    description:
      'Asa reina em Judá por 41 anos, fazendo o que é reto aos olhos do Senhor. Remove os ídolos e altares estrangeiros. Renova a aliança com Deus. Seu coração é perfeito para com o Senhor todos os seus dias, trazendo paz ao reino.',
    category: 'Reinados',
    period: 'Reino Dividido',
    bibleRef: '1 Reis 15:9-24',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '9c',
    year: -885,
    title: 'Omri e Acabe',
    description:
      'Omri estabelece Samaria como capital de Israel e faz aliança com Sídon. Seu filho Acabe casa com Jezabel, trazendo o culto a Baal para Israel. Acabe é descrito como o rei que mais fez mal aos olhos do Senhor que todos os seus antecessores.',
    category: 'Reinados',
    period: 'Reino Dividido',
    bibleRef: '1 Reis 16:15-34',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '10',
    year: -870,
    title: 'Ministério de Elias',
    description:
      'Elias confronta Acabe e Jezabel, profetizando seca de três anos e meio. É alimentado por corvos e pela viúva de Sarepta. No Monte Carmelo, desafia 450 profetas de Baal. Deus responde com fogo, e o povo reconhece que "O Senhor é Deus". Elias mata os profetas de Baal.',
    category: 'Profetas',
    period: 'Reino Dividido',
    bibleRef: '1 Reis 17:1-18:46',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '10a',
    year: -848,
    title: 'Eliseu Sucede Elias',
    description:
      'Elias é arrebatado ao céu num redemoinho, deixando seu manto para Eliseu. Eliseu recebe porção dobrada do espírito de Elias e realiza muitos milagres: cura as águas de Jericó, multiplica o azeite da viúva, ressuscita o filho da sunamita, e cura Naamã da lepra.',
    category: 'Profetas',
    period: 'Reino Dividido',
    bibleRef: '2 Reis 2:1-13:21',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '10b',
    year: -841,
    title: 'Jeú Extermina Baal',
    description:
      'Jeú é ungido rei de Israel por um profeta enviado por Eliseu. Mata Jorão (rei de Israel) e Acazias (rei de Judá). Extermina toda a casa de Acabe e todos os adoradores de Baal. Cumpre a profecia de Elias, mas não remove os bezerros de ouro.',
    category: 'Reinados',
    period: 'Reino Dividido',
    bibleRef: '2 Reis 9:1-10:36',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-orange-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '10c',
    year: -835,
    title: 'Joás e Renovação do Templo',
    description:
      'Joás torna-se rei de Judá aos 7 anos, salvo por Joiada da matança de Atalia. Sob orientação do sacerdote Joiada, remove a idolatria e renova o templo. Reina 40 anos fazendo o que é reto, mas após a morte de Joiada, volta-se para a idolatria.',
    category: 'Reinados',
    period: 'Reino Dividido',
    bibleRef: '2 Reis 11:1-12:21',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '10d',
    year: -790,
    title: 'Uzias, Rei de Judá',
    description:
      'Uzias reina 52 anos em Judá, fazendo o que é reto aos olhos do Senhor. Deus o prospera em guerras e construções. Torna-se orgulhoso e entra no templo para queimar incenso, função exclusiva dos sacerdotes. É ferido com lepra e morre isolado.',
    category: 'Reinados',
    period: 'Reino Dividido',
    bibleRef: '2 Reis 15:1-7, 2 Crônicas 26:1-23',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-yellow-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '11',
    year: -740,
    title: 'Chamado de Isaías',
    description:
      'Isaías tem uma visão do Senhor no templo, sentado num trono alto e sublime. Serafins clamam "Santo, Santo, Santo". Isaías se sente indigno, mas um serafim purifica seus lábios com brasa do altar. Deus o comissiona: "Vai e dize a este povo". Profetiza por 60 anos.',
    category: 'Profetas',
    period: 'Reino Dividido',
    bibleRef: 'Isaías 6:1-13',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '11a',
    year: -735,
    title: 'Profecias Messiânicas de Isaías',
    description:
      'Isaías profetiza sobre o Messias vindouro: nascimento virginal (7:14), governo do Príncipe da Paz (9:6-7), raiz de Jessé (11:1-10), Servo Sofredor (52:13-53:12). Suas profecias são as mais detalhadas sobre Cristo no Antigo Testamento.',
    category: 'Profetas',
    period: 'Reino Dividido',
    bibleRef: 'Isaías 7:14, 9:6-7, 11:1-10, 53:1-12',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '11b',
    year: -730,
    title: 'Profetas Oséias e Amós',
    description:
      'Oséias profetiza para Israel usando sua própria vida como parábola do amor fiel de Deus por um povo infiel. Amós, pastor de Tecoa, denuncia a injustiça social e religiosa. Ambos advertem sobre o julgamento vindouro se não houver arrependimento.',
    category: 'Profetas',
    period: 'Reino Dividido',
    bibleRef: 'Oséias 1:1-14:9, Amós 1:1-9:15',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '11c',
    year: -725,
    title: 'Ezequias, Rei Reformador',
    description:
      'Ezequias reina 29 anos em Judá, fazendo o que é reto aos olhos do Senhor. Remove os altos, quebra as colunas, corta os bosques e destrói a serpente de bronze que Moisés fizera. Celebra a Páscoa com grande alegria. Confia no Senhor como nenhum rei antes ou depois dele.',
    category: 'Reinados',
    period: 'Reino Dividido',
    bibleRef: '2 Reis 18:1-20:21',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '12',
    year: -722,
    title: 'Queda de Samaria',
    description:
      'Salmaneser V e depois Sargão II da Assíria conquistam Samaria após três anos de cerco. Fim do Reino do Norte (Israel). Cerca de 27.290 israelitas são deportados para a Assíria. Povos estrangeiros são trazidos para repovoar a terra, originando os samaritanos.',
    category: 'Monarquia',
    period: 'Reino Dividido',
    bibleRef: '2 Reis 17:1-41',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-red-600',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada pelos anais de Sargão II da Assíria. Registro histórico bem documentado.',
    archaeologicalEvidence:
      'Confirmada por inscrições assírias e evidências arqueológicas em Samaria.',
  },
  {
    id: '12a',
    year: -701,
    title: 'Senaqueribe Invade Judá',
    description:
      'Senaqueribe, rei da Assíria, invade Judá e cerca Jerusalém. Rabsaqué blasfema contra Deus. Ezequias ora no templo, e Isaías profetiza libertação. O anjo do Senhor mata 185.000 assírios numa noite. Senaqueribe retorna humilhado para Nínive.',
    category: 'Reinados',
    period: 'Reino Dividido',
    bibleRef: '2 Reis 18:13-19:37',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-blue-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '12b',
    year: -697,
    title: 'Manassés, Rei Ímpio',
    description:
      'Manassés reina 55 anos, fazendo o que é mau aos olhos do Senhor. Reconstrói os altos, levanta altares a Baal, faz passar seu filho pelo fogo, pratica feitiçaria. Derrama muito sangue inocente. Mais tarde se arrepende no cativeiro babilônico.',
    category: 'Reinados',
    period: 'Reino Dividido',
    bibleRef: '2 Reis 21:1-18',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '12c',
    year: -640,
    title: 'Josias, o Grande Reformador',
    description:
      'Josias torna-se rei aos 8 anos e reina 31 anos. Aos 16 anos busca a Deus, aos 20 purifica Judá da idolatria. Aos 26 anos, durante reformas no templo, encontra o Livro da Lei. Promove a maior reforma religiosa da história de Judá, celebrando a Páscoa como nunca antes.',
    category: 'Reinados',
    period: 'Reino Dividido',
    bibleRef: '2 Reis 22:1-23:30',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-green-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '13',
    year: -627,
    title: 'Chamado de Jeremias',
    description:
      'Jeremias é chamado ainda jovem para ser profeta às nações. Deus o santifica desde o ventre materno. Recebe visões da vara de amendoeira e da panela fervente. Profetiza por 40 anos sobre o cativeiro babilônico, a nova aliança e a restauração futura.',
    category: 'Profetas',
    period: 'Reino Dividido',
    bibleRef: 'Jeremias 1:1-19',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '13a',
    year: -612,
    title: 'Profetas Naum e Sofonias',
    description:
      'Naum profetiza a queda de Nínive, capital assíria, que se cumpre em 612 AC. Sofonias profetiza durante o reinado de Josias sobre o "Dia do Senhor" - um julgamento vindouro, mas também esperança de restauração para o remanescente fiel.',
    category: 'Profetas',
    period: 'Reino Dividido',
    bibleRef: 'Naum 1:1-3:19, Sofonias 1:1-3:20',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '13b',
    year: -609,
    title: 'Morte de Josias',
    description:
      'Josias morre na batalha de Megido tentando impedir que Faraó Neco ajude a Assíria contra Babilônia. Sua morte marca o fim da reforma religiosa. Seus sucessores - Jeoacaz, Jeoaquim e Zedequias - fazem o mal aos olhos do Senhor.',
    category: 'Reinados',
    period: 'Reino Dividido',
    bibleRef: '2 Reis 23:28-30',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '13c',
    year: -605,
    title: 'Primeira Deportação',
    description:
      'Nabucodonosor invade Judá e leva cativos para Babilônia, incluindo Daniel e seus amigos. Jeoaquim torna-se vassalo de Babilônia. Esta é a primeira de três deportações que culminarão na destruição total de Jerusalém.',
    category: 'Exílio',
    period: 'Exílio',
    bibleRef: '2 Reis 24:1-7, Daniel 1:1-7',
    icon: <Map className='w-4 h-4' />,
    color: 'bg-orange-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '13d',
    year: -597,
    title: 'Segunda Deportação',
    description:
      'Nabucodonosor cerca Jerusalém. Jeoaquim morre e seu filho Joaquim reina apenas 3 meses antes de se render. 10.000 pessoas são deportadas, incluindo Ezequiel e artesãos. Zedequias é colocado como rei fantoche.',
    category: 'Exílio',
    period: 'Exílio',
    bibleRef: '2 Reis 24:8-17',
    icon: <Map className='w-4 h-4' />,
    color: 'bg-orange-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '13e',
    year: -593,
    title: 'Ezequiel no Exílio',
    description:
      'Ezequiel, sacerdote deportado, recebe visões extraordinárias junto ao rio Quebar. Vê a glória de Deus, rodas dentro de rodas, e querubins. Profetiza sobre a responsabilidade individual, a restauração de Israel e o novo templo. Usa parábolas e ações simbólicas.',
    category: 'Profetas',
    period: 'Exílio',
    bibleRef: 'Ezequiel 1:1-3:27',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '13f',
    year: -588,
    title: 'Cerco Final de Jerusalém',
    description:
      'Nabucodonosor inicia o cerco final de Jerusalém. Jeremias é preso por "profetizar falsamente" sobre a derrota. Ezequiel, no exílio, profetiza simultaneamente sobre a destruição. A fome e peste assolam a cidade sitiada por 30 meses.',
    category: 'Exílio',
    period: 'Exílio',
    bibleRef: 'Jeremias 52:4-11, Ezequiel 24:1-14',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '14',
    year: -586,
    title: 'Destruição de Jerusalém',
    description:
      'Jerusalém cai após 30 meses de cerco. O templo de Salomão é destruído, os muros derrubados, casas queimadas. Zedequias foge mas é capturado, seus filhos mortos diante dele, e seus olhos vazados. A terceira deportação leva os últimos habitantes, exceto os mais pobres.',
    category: 'Exílio',
    period: 'Exílio',
    bibleRef: '2 Reis 25:1-21, Jeremias 52:12-27',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-red-600',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '15',
    year: -605,
    title: 'Daniel na Corte Babilônica',
    description:
      'Daniel e seus amigos (Ananias, Misael e Azarias) são levados cativos para Babilônia. Recebem nomes babilônicos mas mantêm sua fé. Daniel interpreta sonhos de Nabucodonosor sobre a estátua e a árvore. Seus amigos são lançados na fornalha ardente mas são protegidos pelo quarto homem.',
    category: 'Profetas',
    period: 'Exílio',
    bibleRef: 'Daniel 1:1-3:30',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '15a',
    year: -553,
    title: 'Visões Proféticas de Daniel',
    description:
      'Daniel recebe visões sobre os quatro impérios mundiais (leão, urso, leopardo, besta terrível) e sobre as setenta semanas. Vê o Ancião de Dias e o Filho do Homem recebendo domínio eterno. Suas profecias abrangem desde o exílio até o fim dos tempos.',
    category: 'Profetas',
    period: 'Exílio',
    bibleRef: 'Daniel 7:1-12:13',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '15b',
    year: -539,
    title: 'Daniel na Cova dos Leões',
    description:
      'Sob o reino de Dario, o Medo, Daniel continua fiel em suas orações mesmo quando proibido. É lançado na cova dos leões, mas Deus fecha a boca dos leões. Dario reconhece o poder do Deus de Daniel e decreta que todos temam e tremam diante dEle.',
    category: 'Profetas',
    period: 'Exílio',
    bibleRef: 'Daniel 6:1-28',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '16',
    year: -539,
    title: 'Queda de Babilônia',
    description:
      'Ciro, rei da Pérsia, conquista Babilônia numa única noite, cumprindo as profecias de Isaías e Jeremias. Daniel interpreta a escrita na parede durante o banquete de Belsazar. O império babilônico termina e inicia-se o período persa.',
    category: 'Exílio',
    period: 'Exílio',
    bibleRef: 'Daniel 5:1-31',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-purple-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '17',
    year: -538,
    title: 'Decreto de Ciro',
    description:
      'Ciro emite decreto permitindo que os judeus retornem à Judá e reconstruam o templo. Devolve os utensílios sagrados saqueados por Nabucodonosor. Cerca de 50.000 judeus retornam sob liderança de Zorobabel e Jesua. Cumpre-se a profecia de Jeremias sobre os 70 anos.',
    category: 'Retorno',
    period: 'Exílio e Retorno',
    bibleRef: 'Esdras 1:1-2:70',
    icon: <BookOpen className='w-4 h-4' />,
    color: 'bg-teal-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada pelo Cilindro de Ciro, descoberto em 1879. Política persa de tolerância religiosa bem documentada.',
    archaeologicalEvidence:
      'Confirmada pelo Cilindro de Ciro e outros registros persas contemporâneos.',
  },
  {
    id: '17a',
    year: -536,
    title: 'Reconstrução do Altar',
    description:
      'Os repatriados constroem primeiro o altar dos holocaustos e restauram os sacrifícios diários. Celebram a Festa dos Tabernáculos. Lançam os fundamentos do segundo templo com grande alegria, mas alguns dos anciãos que viram o primeiro templo choram.',
    category: 'Retorno',
    period: 'Exílio e Retorno',
    bibleRef: 'Esdras 3:1-13',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-teal-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada pelo Cilindro de Ciro, descoberto em 1879. Política persa de tolerância religiosa bem documentada.',
    archaeologicalEvidence:
      'Confirmada pelo Cilindro de Ciro e outros registros persas contemporâneos.',
  },
  {
    id: '17b',
    year: -530,
    title: 'Oposição à Reconstrução',
    description:
      'Os samaritanos e outros povos se opõem à reconstrução, oferecendo ajuda falsa e depois causando problemas. Escrevem cartas acusatórias aos reis persas. A obra do templo é interrompida por cerca de 15 anos devido à oposição e desânimo.',
    category: 'Retorno',
    period: 'Exílio e Retorno',
    bibleRef: 'Esdras 4:1-24',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-orange-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada pelo Cilindro de Ciro, descoberto em 1879. Política persa de tolerância religiosa bem documentada.',
    archaeologicalEvidence:
      'Confirmada pelo Cilindro de Ciro e outros registros persas contemporâneos.',
  },
  {
    id: '18',
    year: -520,
    title: 'Ageu e Zacarias Encorajam',
    description:
      'Os profetas Ageu e Zacarias encorajam o povo a retomar a construção do templo. Ageu repreende a negligência: "É tempo de habitardes em casas apaineladas, enquanto esta casa permanece em ruínas?". Zacarias traz visões de esperança e encorajamento.',
    category: 'Profetas',
    period: 'Pós-Exílio',
    bibleRef: 'Ageu 1:1-2:23, Zacarias 1:1-8:23',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '18a',
    year: -516,
    title: 'Conclusão do Segundo Templo',
    description:
      'O segundo templo é terminado no sexto ano do rei Dario. Embora menor que o templo de Salomão, é dedicado com grande alegria. Sacerdotes e levitas são organizados para o serviço. A Páscoa é celebrada com regozijo pelos repatriados.',
    category: 'Retorno',
    period: 'Exílio e Retorno',
    bibleRef: 'Esdras 6:13-22',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-purple-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada por registros persas e pela cronologia de Dario I. Profetas Ageu e Zacarias datam suas profecias em relação a este período.',
    archaeologicalEvidence:
      'Evidências arqueológicas do período persa em Jerusalém confirmam a reconstrução.',
  },
  {
    id: '18b',
    year: -483,
    title: 'Ester Salva os Judeus',
    description:
      'Durante o reinado de Assuero (Xerxes), Hamã planeja exterminar todos os judeus do império persa. Ester, rainha judia, revela sua identidade e intercede por seu povo. Hamã é enforcado e os judeus são salvos. A festa de Purim é instituída para comemorar a libertação.',
    category: 'Retorno',
    period: 'Exílio e Retorno',
    bibleRef: 'Ester 1:1-10:3',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada pelo Cilindro de Ciro, descoberto em 1879. Política persa de tolerância religiosa bem documentada.',
    archaeologicalEvidence:
      'Confirmada pelo Cilindro de Ciro e outros registros persas contemporâneos.',
  },
  {
    id: '18c',
    year: -458,
    title: 'Esdras Retorna',
    description:
      'Esdras, escriba versado na Lei de Moisés, retorna a Jerusalém com cerca de 1.800 homens. Traz autorização do rei Artaxerxes para ensinar a Lei e estabelecer magistrados. Enfrenta o problema dos casamentos mistos e promove reforma espiritual.',
    category: 'Retorno',
    period: 'Exílio e Retorno',
    bibleRef: 'Esdras 7:1-10:44',
    icon: <BookOpen className='w-4 h-4' />,
    color: 'bg-teal-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada pelo Cilindro de Ciro, descoberto em 1879. Política persa de tolerância religiosa bem documentada.',
    archaeologicalEvidence:
      'Confirmada pelo Cilindro de Ciro e outros registros persas contemporâneos.',
  },
  {
    id: '18d',
    year: -445,
    title: 'Neemias Reconstrói os Muros',
    description:
      'Neemias, copeiro do rei Artaxerxes, recebe permissão para reconstruir os muros de Jerusalém. Apesar da forte oposição de Sambalate e Tobias, completa a obra em 52 dias. Organiza a defesa da cidade e promove reformas sociais e espirituais.',
    category: 'Retorno',
    period: 'Exílio e Retorno',
    bibleRef: 'Neemias 1:1-13:31',
    icon: <Shield className='w-4 h-4' />,
    color: 'bg-teal-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada pelo Cilindro de Ciro, descoberto em 1879. Política persa de tolerância religiosa bem documentada.',
    archaeologicalEvidence:
      'Confirmada pelo Cilindro de Ciro e outros registros persas contemporâneos.',
  },
  {
    id: '19',
    year: -430,
    title: 'Malaquias, Último Profeta',
    description:
      'Malaquias profetiza sobre a corrupção dos sacerdotes, casamentos mistos e negligência dos dízimos. Promete a vinda do "mensageiro da aliança" e de Elias antes do "grande e terrível dia do Senhor". É o último profeta do Antigo Testamento, iniciando-se os 400 anos de silêncio.',
    category: 'Profetas',
    period: 'Pós-Exílio',
    bibleRef: 'Malaquias 1:1-4:6',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '19a',
    year: -6,
    title: 'Nascimento de João Batista',
    description:
      'João Batista nasce de Zacarias e Isabel, cumprindo a profecia do anjo Gabriel. Será o precursor do Messias, preparando o caminho do Senhor. Nasce seis meses antes de Jesus, conforme anunciado pelo anjo.',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'Lucas 1:57-80',
    icon: <Star className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '20',
    year: -5,
    title: 'Nascimento de Jesus',
    description:
      'Jesus nasce em Belém de uma virgem, Maria, cumprindo as profecias de Isaías e Miquéias. Anjos anunciam aos pastores. Magos do oriente vêm adorá-lo. Herodes mata os meninos de Belém, mas Jesus escapa para o Egito. É o cumprimento da promessa feita a Abraão.',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'Mateus 1:18-2:23, Lucas 2:1-20',
    icon: <Star className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '20a',
    year: 8,
    title: 'Jesus no Templo',
    description:
      'Aos 12 anos, Jesus fica no templo conversando com os doutores, que se admiram de sua inteligência. Quando encontrado por seus pais, diz: "Não sabíeis que me convinha tratar dos negócios de meu Pai?". Cresce em sabedoria, estatura e graça.',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'Lucas 2:41-52',
    icon: <Star className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '20b',
    year: 26,
    title: 'Ministério de João Batista',
    description:
      'João Batista inicia seu ministério no deserto, pregando arrependimento e batizando no rio Jordão. Cumpre a profecia de Isaías como "voz que clama no deserto". Prepara o caminho para Jesus, chamando-se de "voz" e Jesus de "Verbo".',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'Mateus 3:1-12, João 1:19-28',
    icon: <Scroll className='w-4 h-4' />,
    color: 'bg-indigo-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '21',
    year: 27,
    title: 'Batismo e Tentação de Jesus',
    description:
      'Jesus é batizado por João no Jordão. O Espírito Santo desce como pomba e o Pai declara: "Este é o meu Filho amado". Jesus jejua 40 dias no deserto e é tentado por Satanás, vencendo cada tentação com a Palavra de Deus.',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'Mateus 3:13-4:11',
    icon: <Heart className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '21a',
    year: 27,
    title: 'Início do Ministério',
    description:
      'Jesus inicia Seu ministério público aos 30 anos, pregando "o Reino dos céus está próximo". Chama os primeiros discípulos: Pedro, André, Tiago e João. Realiza o primeiro milagre em Caná, transformando água em vinho. Purifica o templo pela primeira vez.',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'João 2:1-25, Mateus 4:12-25',
    icon: <Heart className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '21b',
    year: 28,
    title: 'Sermão da Montanha',
    description:
      'Jesus prega o Sermão da Montanha, estabelecendo os princípios do Reino: bem-aventuranças, sal e luz, lei do amor, oração do Pai Nosso, regra áurea. Ensina sobre o verdadeiro discipulado e a justiça que excede a dos escribas e fariseus.',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'Mateus 5:1-7:29',
    icon: <Heart className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '21c',
    year: 29,
    title: 'Parábolas e Milagres',
    description:
      'Jesus ensina por parábolas sobre o Reino dos céus: semeador, joio, mostarda, pérola, rede. Realiza milagres notáveis: acalma a tempestade, multiplica pães e peixes, anda sobre as águas, ressuscita a filha de Jairo. Confessa ser o Cristo, o Filho do Deus vivo.',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'Mateus 13:1-16:20',
    icon: <Heart className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '21d',
    year: 30,
    title: 'Transfiguração',
    description:
      'Jesus é transfigurado diante de Pedro, Tiago e João no monte alto. Seu rosto resplandece como o sol e suas vestes ficam brancas como a luz. Moisés e Elias aparecem conversando com Ele. O Pai declara: "Este é o meu Filho amado, a ele ouvi".',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'Mateus 17:1-13',
    icon: <Heart className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '21e',
    year: 30,
    title: 'Entrada Triunfal',
    description:
      'Jesus entra em Jerusalém montado num jumentinho, cumprindo a profecia de Zacarias. Multidões O aclamam como "Filho de Davi" e "Rei de Israel", estendendo mantos e ramos pelo caminho. Purifica o templo pela segunda vez, expulsando os comerciantes.',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'Mateus 21:1-17',
    icon: <Heart className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '22',
    year: 30,
    title: 'Crucificação e Ressurreição',
    description:
      'Jesus é traído por Judas, julgado por Pilatos e crucificado no Gólgota. Morre às 15h após 6 horas na cruz, expiando os pecados da humanidade. Ressuscita ao terceiro dia, aparecendo primeiro a Maria Madalena e depois aos discípulos. Vence a morte e oferece vida eterna.',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'Mateus 26:1-28:20',
    icon: <Heart className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '22a',
    year: 30,
    title: 'Ascensão de Jesus',
    description:
      'Após 40 dias aparecendo aos discípulos e ensinando sobre o Reino de Deus, Jesus ascende ao céu do Monte das Oliveiras. Promete enviar o Espírito Santo e comissiona os discípulos a pregar o evangelho até aos confins da terra.',
    category: 'Novo Testamento',
    period: 'Novo Testamento',
    bibleRef: 'Atos 1:1-11',
    icon: <Heart className='w-4 h-4' />,
    color: 'bg-pink-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '23',
    year: 30,
    title: 'Pentecostes',
    description:
      'Cinquenta dias após a ressurreição, o Espírito Santo desce sobre os 120 discípulos reunidos no cenáculo. Aparecem línguas como de fogo e todos falam em outras línguas. Pedro prega e 3.000 pessoas se convertem. Nasce a Igreja cristã.',
    category: 'Novo Testamento',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 2:1-47',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-violet-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '23a',
    year: 31,
    title: 'Igreja Primitiva Cresce',
    description:
      'A igreja cresce rapidamente através de milagres, sinais e maravilhas. Pedro e João curam o coxo na porta Formosa. Enfrentam perseguição do Sinédrio mas continuam pregando. Ananias e Safira morrem por mentir ao Espírito Santo. Cinco mil homens se convertem.',
    category: 'Novo Testamento',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 3:1-5:42',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-violet-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '23b',
    year: 33,
    title: 'Martírio de Estêvão',
    description:
      'Estêvão, um dos sete diáconos, é apedrejado até a morte por pregar sobre Jesus. Torna-se o primeiro mártir cristão. Sua morte desencadeia grande perseguição, dispersando os cristãos por toda Judéia e Samaria. Saulo de Tarso consente na morte de Estêvão.',
    category: 'Novo Testamento',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 6:1-8:3',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '23c',
    year: 34,
    title: 'Filipe em Samaria',
    description:
      'Filipe prega em Samaria com grande sucesso, realizando milagres e batizando muitos. Simão, o mágico, se converte mas tenta comprar o poder do Espírito Santo. Pedro e João vêm de Jerusalém e impõem as mãos sobre os samaritanos, que recebem o Espírito Santo.',
    category: 'Novo Testamento',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 8:4-25',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-violet-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '24',
    year: 35,
    title: 'Conversão de Paulo',
    description:
      'Saulo de Tarso, perseguidor da igreja, encontra Jesus ressuscitado no caminho para Damasco. Fica cego por três dias até Ananias orar por ele. Converte-se dramaticamente e torna-se o maior missionário da história. Muda seu nome para Paulo.',
    category: 'Viagens Missionárias',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 9:1-31',
    icon: <Map className='w-4 h-4' />,
    color: 'bg-cyan-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '24a',
    year: 40,
    title: 'Conversão de Cornélio',
    description:
      'Pedro recebe visão de animais impuros e vai à casa de Cornélio, centurião romano. O Espírito Santo cai sobre os gentios enquanto Pedro prega. Marca o início da evangelização dos gentios e a universalidade do evangelho.',
    category: 'Novo Testamento',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 10:1-48',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-violet-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '24b',
    year: 44,
    title: 'Morte de Tiago e Prisão de Pedro',
    description:
      'Herodes Agripa I mata Tiago, irmão de João, à espada. Prende Pedro, mas um anjo o liberta miraculosamente da prisão. Herodes morre comido de vermes por não dar glória a Deus. A palavra de Deus cresce e se multiplica.',
    category: 'Novo Testamento',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 12:1-25',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-orange-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '25',
    year: 47,
    title: 'Primeira Viagem Missionária',
    description:
      'Paulo e Barnabé são enviados pela igreja de Antioquia. Evangelizam Chipre, onde convertem o procônsul Sérgio Paulo. Na Ásia Menor, pregam em Antioquia da Pisídia, Icônio, Listra e Derbe. Enfrentam oposição judaica mas estabelecem igrejas e ordenam presbíteros.',
    category: 'Viagens Missionárias',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 13:1-14:28',
    icon: <Map className='w-4 h-4' />,
    color: 'bg-cyan-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '26',
    year: 49,
    title: 'Concílio de Jerusalém',
    description:
      'Surge controvérsia sobre a circuncisão dos gentios convertidos. Paulo e Barnabé sobem a Jerusalém para consultar os apóstolos. Pedro, Tiago e João decidem que os gentios não precisam ser circuncidados, apenas abster-se de coisas sacrificadas aos ídolos, sangue e fornicação.',
    category: 'Novo Testamento',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 15:1-35',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-violet-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '27',
    year: 50,
    title: 'Segunda Viagem Missionária',
    description:
      'Paulo parte com Silas, visitando as igrejas da primeira viagem. Em Listra, junta-se Timóteo. O Espírito os dirige para a Macedônia. Pregam em Filipos, Tessalônica, Beréia, Atenas e Corinto. O evangelho chega à Europa. Permanece 18 meses em Corinto.',
    category: 'Viagens Missionárias',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 15:36-18:22',
    icon: <Map className='w-4 h-4' />,
    color: 'bg-cyan-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '28',
    year: 53,
    title: 'Terceira Viagem Missionária',
    description:
      'Paulo ministra três anos em Éfeso, onde ocorre grande avivamento. Artesãos de Diana causam tumulto. Escreve 1 Coríntios. Visita Macedônia e Grécia, permanecendo três meses em Corinto onde escreve Romanos. Retorna a Jerusalém via Trôade, onde ressuscita Êutico.',
    category: 'Viagens Missionárias',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 18:23-21:17',
    icon: <Map className='w-4 h-4' />,
    color: 'bg-cyan-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '29',
    year: 57,
    title: 'Prisão de Paulo',
    description:
      'Paulo é preso no templo de Jerusalém por judeus da Ásia. Defende-se diante do Sinédrio, do governador Félix e de Festo. Apela para César. Durante tempestade no mar, o navio naufraga em Malta. Finalmente chega a Roma como prisioneiro.',
    category: 'Viagens Missionárias',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 21:18-28:31',
    icon: <Map className='w-4 h-4' />,
    color: 'bg-orange-500',
    uncertainty: 'medium',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '29a',
    year: 60,
    title: 'Paulo em Roma',
    description:
      'Paulo permanece dois anos em prisão domiciliar em Roma, pregando livremente a todos que o visitam. Escreve as epístolas da prisão: Efésios, Filipenses, Colossenses e Filemom. O evangelho se espalha até na casa de César.',
    category: 'Viagens Missionárias',
    period: 'Igreja Primitiva',
    bibleRef: 'Atos 28:16-31',
    icon: <Map className='w-4 h-4' />,
    color: 'bg-cyan-500',
    uncertainty: 'low',
    alternativeDates: 'Data tarde: ~1260 a.C. (Ramessés II)',
    scholarlyNotes:
      'Duas escolas principais: "data cedo" (1446 a.C.) baseada em 1 Rs 6:1, e "data tarde" (1260 a.C.) baseada em evidências arqueológicas. Ambas têm argumentos válidos.',
    archaeologicalEvidence:
      'Evidências arqueológicas apoiam ambas as datas dependendo da interpretação dos dados de destruição em Canaã.',
  },
  {
    id: '29b',
    year: 64,
    title: 'Perseguição de Nero',
    description:
      'Nero culpa os cristãos pelo incêndio de Roma e inicia terrível perseguição. Paulo e Pedro são martirizados. Paulo é decapitado e Pedro crucificado de cabeça para baixo. Muitos cristãos são queimados vivos como tochas humanas nos jardins de Nero.',
    category: 'Novo Testamento',
    period: 'Igreja Primitiva',
    bibleRef: '2 Timóteo 4:6-8',
    icon: <Church className='w-4 h-4' />,
    color: 'bg-red-500',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada por Tácito nos Anais. Primeira perseguição imperial sistemática aos cristãos.',
    archaeologicalEvidence:
      'Confirmada por Tácito e outras fontes históricas romanas contemporâneas.',
  },
  {
    id: '29c',
    year: 70,
    title: 'Destruição de Jerusalém',
    description:
      'Jerusalém é destruída pelo general romano Tito após três anos de guerra. O templo é queimado, mais de um milhão de judeus morrem, e os sobreviventes são dispersos. Cumpre-se a profecia de Jesus sobre a destruição do templo.',
    category: 'Novo Testamento',
    period: 'Igreja Primitiva',
    bibleRef: 'Mateus 24:1-2, Lucas 21:20-24',
    icon: <Crown className='w-4 h-4' />,
    color: 'bg-red-600',
    uncertainty: 'low',
    scholarlyNotes:
      'Data confirmada por Josefo, Tácito e evidências arqueológicas. Evento bem documentado na história romana.',
    archaeologicalEvidence:
      'Confirmada por evidências arqueológicas extensas em Jerusalém e registros históricos romanos.',
  },
  {
    id: '30',
    year: 95,
    title: 'Apocalipse de João',
    description:
      'João, o último apóstolo vivo, recebe a revelação de Jesus Cristo na ilha de Patmos durante o exílio. Vê visões do Cristo glorificado, das sete igrejas da Ásia, dos juízos finais e da Nova Jerusalém. Escreve o último livro da Bíblia, encerrando o cânon sagrado.',
    category: 'Novo Testamento',
    period: 'Igreja Primitiva',
    bibleRef: 'Apocalipse 1:1-22:21',
    icon: <BookOpen className='w-4 h-4' />,
    color: 'bg-purple-600',
    uncertainty: 'low',
    alternativeDates: 'Minoria de estudiosos propõe 68-70 d.C. sob Nero',
    scholarlyNotes:
      'Data tradicional sob Domiciano (95 d.C.) é majoritária. Alguns propõem data anterior sob Nero, mas evidências internas favorecem a data posterior.',
    archaeologicalEvidence:
      'Evidências do exílio de cristãos para Patmos durante o período de Domiciano.',
  },
];

export default function BiblicalTimeline() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUncertainty, setShowUncertainty] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(timelineData.map((event) => event.category))
    );
    return ['Todos', ...uniqueCategories.sort()];
  }, []);

  const filteredEvents = useMemo(() => {
    return timelineData.filter((event) => {
      const matchesCategory =
        selectedCategory === 'Todos' || event.category === selectedCategory;
      const matchesSearch =
        searchTerm === '' ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.bibleRef.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const formatYear = (year: number) => {
    return year < 0 ? `${Math.abs(year)} a.C.` : `${year} d.C.`;
  };

  const formatDateRange = (event: TimelineEvent) => {
    if (event.yearEnd) {
      return `${formatYear(event.year)} - ${formatYear(event.yearEnd)}`;
    }
    return formatYear(event.year);
  };

  const getUncertaintyColor = (uncertainty?: string) => {
    switch (uncertainty) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-black';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getUncertaintyIcon = (uncertainty?: string) => {
    switch (uncertainty) {
      case 'high':
        return <AlertTriangle className='w-3 h-3' />;
      case 'medium':
        return <Calendar className='w-3 h-3' />;
      case 'low':
        return <Shield className='w-3 h-3' />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Linha do Tempo Bíblica Interativa | Graça e Leitura</title>
        <meta
          name='description'
          content='Explore uma cronologia bíblica detalhada e academicamente fundamentada, desde a História Primeva até o Apocalipse. Mais de 80 eventos históricos com análise crítica, referências arqueológicas e diferentes perspectivas cronológicas.'
        />
        <meta
          name='keywords'
          content='linha do tempo bíblica, cronologia bíblica, história bíblica, eventos bíblicos, história primeva, patriarcas, êxodo, reino de israel, profetas, jesus cristo, igreja primitiva, apocalipse, arqueologia bíblica, estudo bíblico, edwin thiele, bishop ussher, cronologia acadêmica'
        />
        <link
          rel='canonical'
          href='https://biblia.gracaeleitura.com/linha-do-tempo'
        />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://biblia.gracaeleitura.com/linha-do-tempo'
        />
        <meta
          property='og:title'
          content='Linha do Tempo Bíblica Interativa | Graça e Leitura'
        />
        <meta
          property='og:description'
          content='Explore uma cronologia bíblica academicamente fundamentada desde a História Primeva até o Apocalipse. Análise crítica com referências arqueológicas e diferentes perspectivas cronológicas.'
        />
        <meta
          property='og:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta
          property='og:image:alt'
          content='Linha do Tempo Bíblica Interativa - Cronologia Academicamente Fundamentada'
        />
        <meta property='og:site_name' content='Graça e Leitura' />
        <meta property='og:locale' content='pt_BR' />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:url'
          content='https://biblia.gracaeleitura.com/linha-do-tempo'
        />
        <meta
          name='twitter:title'
          content='Linha do Tempo Bíblica Interativa | Graça e Leitura'
        />
        <meta
          name='twitter:description'
          content='Explore uma cronologia bíblica academicamente fundamentada desde a História Primeva até o Apocalipse. Análise crítica com referências arqueológicas.'
        />
        <meta
          name='twitter:image'
          content='https://biblia.gracaeleitura.com/seo.png'
        />
        <meta
          name='twitter:image:alt'
          content='Linha do Tempo Bíblica Interativa - Cronologia Academicamente Fundamentada'
        />

        {/* Structured Data */}
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Linha do Tempo Bíblica Interativa | Graça e Leitura',
            description:
              'Explore uma cronologia bíblica detalhada e academicamente fundamentada, desde a História Primeva até o Apocalipse. Mais de 80 eventos históricos com análise crítica, referências arqueológicas e diferentes perspectivas cronológicas.',
            url: 'https://biblia.gracaeleitura.com/linha-do-tempo',
            image: 'https://biblia.gracaeleitura.com/seo.png',
            author: {
              '@type': 'Organization',
              name: 'Graça e Leitura',
              url: 'https://biblia.gracaeleitura.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Graça e Leitura',
              url: 'https://biblia.gracaeleitura.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://biblia.gracaeleitura.com/seo.png',
              },
            },
            mainEntity: {
              '@type': 'CreativeWork',
              '@id': 'https://biblia.gracaeleitura.com/linha-do-tempo#timeline',
              name: 'Cronologia Bíblica Academicamente Fundamentada',
              description:
                'Linha do tempo interativa cobrindo mais de 80 eventos bíblicos com análise crítica e referências arqueológicas',
              about: [
                {
                  '@type': 'Thing',
                  name: 'História Bíblica',
                  sameAs:
                    'https://pt.wikipedia.org/wiki/Cronologia_b%C3%ADblica',
                },
                {
                  '@type': 'Thing',
                  name: 'Arqueologia Bíblica',
                  sameAs:
                    'https://pt.wikipedia.org/wiki/Arqueologia_b%C3%ADblica',
                },
                {
                  '@type': 'Thing',
                  name: 'Edwin Thiele',
                  sameAs: 'https://en.wikipedia.org/wiki/Edwin_Thiele',
                },
              ],
              educationalLevel: 'Intermediário a Avançado',
              inLanguage: 'pt-BR',
              learningResourceType: 'Timeline',
              audience: {
                '@type': 'EducationalAudience',
                educationalRole: ['student', 'teacher', 'pastor', 'scholar'],
              },
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Início',
                  item: 'https://biblia.gracaeleitura.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Linha do Tempo Bíblica',
                  item: 'https://biblia.gracaeleitura.com/linha-do-tempo',
                },
              ],
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate:
                  'https://biblia.gracaeleitura.com/linha-do-tempo?search={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          })}
        </script>
      </Helmet>

      <div className='min-h-screen p-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-bible-accent mb-4'>
              Linha do Tempo Bíblica Interativa
            </h1>
            <p className='text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
              Explore uma cronologia bíblica academicamente fundamentada, desde
              a História Primeva até o Apocalipse, com análise crítica e
              referências arqueológicas.
            </p>
          </div>

          {/* Controls */}
          <div className='bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2'>
                  Filtrar por Categoria
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2'>
                  Buscar Eventos
                </label>
                <Input
                  placeholder='Digite para buscar...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className='flex items-end'>
                <Button
                  variant={showUncertainty ? 'default' : 'outline'}
                  onClick={() => setShowUncertainty(!showUncertainty)}
                  className='w-full'
                >
                  <AlertTriangle className='w-4 h-4 mr-2' />
                  {showUncertainty ? 'Ocultar' : 'Mostrar'} Incertezas
                </Button>
              </div>
            </div>

            <div className='text-sm text-slate-600 dark:text-slate-400'>
              Mostrando {filteredEvents.length} de {timelineData.length} eventos
            </div>
          </div>

          {/* Timeline */}
          <div className='relative'>
            {/* Timeline line */}
            <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-600'></div>

            <div className='space-y-6'>
              {filteredEvents.map((event, index) => (
                <div key={event.id} className='relative flex items-start'>
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-6 w-4 h-4 rounded-full ${event.color} border-2 border-white dark:border-slate-800 z-10`}
                  >
                    <div className='absolute inset-0 flex items-center justify-center text-white text-xs'>
                      {event.icon}
                    </div>
                  </div>

                  {/* Event card */}
                  <div className='ml-16 flex-1'>
                    <Card className='hover:shadow-lg transition-shadow duration-300'>
                      <CardHeader className='pb-3'>
                        <div>
                          <CardTitle className='text-base font-semibold text-slate-800 dark:text-white mb-2'>
                            {event.title}
                          </CardTitle>
                          <div className='flex gap-2 flex-wrap'>
                            <Badge variant='secondary' className='text-xs'>
                              {formatDateRange(event)}
                            </Badge>
                            <Badge variant='outline' className='text-xs'>
                              {event.category}
                            </Badge>
                            {event.period &&
                              event.category !== event.period && (
                                <Badge variant='outline' className='text-xs'>
                                  {event.period}
                                </Badge>
                              )}
                            {showUncertainty && event.uncertainty && (
                              <Badge
                                className={`text-xs ${getUncertaintyColor(
                                  event.uncertainty
                                )}`}
                              >
                                {getUncertaintyIcon(event.uncertainty)}
                                <span className='ml-1 capitalize'>
                                  {event.uncertainty}
                                </span>
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className='text-sm text-slate-600 dark:text-slate-300 mb-3'>
                          {event.description}
                        </p>

                        {event.alternativeDates && (
                          <div className='mb-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-400'>
                            <p className='text-xs text-yellow-800 dark:text-yellow-200'>
                              <strong>Datação alternativa:</strong>{' '}
                              {event.alternativeDates}
                            </p>
                          </div>
                        )}

                        {event.archaeologicalEvidence && (
                          <div className='mb-3 p-2 bg-green-50 dark:bg-green-900/20 rounded border-l-4 border-green-400'>
                            <p className='text-xs text-green-800 dark:text-green-200'>
                              <strong>Evidência arqueológica:</strong>{' '}
                              {event.archaeologicalEvidence}
                            </p>
                          </div>
                        )}

                        {event.scholarlyNotes && (
                          <div className='mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400'>
                            <p className='text-xs text-blue-800 dark:text-blue-200'>
                              <strong>Notas acadêmicas:</strong>{' '}
                              {event.scholarlyNotes}
                            </p>
                          </div>
                        )}

                        <div className='flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400'>
                          <BookOpen className='w-4 h-4' />
                          <span className='font-medium'>{event.bibleRef}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Legend and Methodology */}
          <div className='mt-12 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6'>
            <h3 className='text-base font-semibold text-slate-800 dark:text-white mb-4'>
              Metodologia Cronológica e Fontes Acadêmicas
            </h3>

            {/* Chronological Layers */}
            <div className='mb-6'>
              <h4 className='text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3'>
                Camadas Cronológicas
              </h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-3 bg-purple-50 dark:bg-purple-900/20 rounded'>
                  <h5 className='font-medium text-purple-800 dark:text-purple-200 mb-1'>
                    História Primeva (Gn 1-11)
                  </h5>
                  <p className='text-xs text-purple-700 dark:text-purple-300'>
                    Datas derivadas de Bishop Ussher (~4004 a.C.). Genealogias
                    podem ter lacunas; foco na realidade histórica, não na
                    precisão cronológica.
                  </p>
                </div>
                <div className='p-3 bg-green-50 dark:bg-green-900/20 rounded'>
                  <h5 className='font-medium text-green-800 dark:text-green-200 mb-1'>
                    Patriarcas (Abraão-José)
                  </h5>
                  <p className='text-xs text-green-700 dark:text-green-300'>
                    Datas dependem da cronologia do Êxodo. Intervalos de
                    incerteza refletem debates acadêmicos sobre "data cedo" vs
                    "data tarde".
                  </p>
                </div>
                <div className='p-3 bg-blue-50 dark:bg-blue-900/20 rounded'>
                  <h5 className='font-medium text-blue-800 dark:text-blue-200 mb-1'>
                    Período Histórico (Moisés-Apocalipse)
                  </h5>
                  <p className='text-xs text-blue-700 dark:text-blue-300'>
                    Datas confirmadas por arqueologia e registros extrabíblicos.
                    Cronologia de Edwin Thiele para os reis de Israel e Judá.
                  </p>
                </div>
                <div className='p-3 bg-amber-50 dark:bg-amber-900/20 rounded'>
                  <h5 className='font-medium text-amber-800 dark:text-amber-200 mb-1'>
                    Níveis de Incerteza
                  </h5>
                  <p className='text-xs text-amber-700 dark:text-amber-300'>
                    Alto: Período primevo; Médio: Patriarcas/Êxodo; Baixo:
                    Monarquia em diante, com confirmação arqueológica.
                  </p>
                </div>
              </div>
            </div>

            {/* Category Legend */}
            <div className='mb-6'>
              <h4 className='text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3'>
                Categorias e Ícones
              </h4>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='flex items-center gap-2'>
                  <Star className='w-4 h-4 text-purple-500' />
                  <span className='text-sm'>História Primeva</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='w-4 h-4 text-green-500' />
                  <span className='text-sm'>Patriarcas</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Crown className='w-4 h-4 text-yellow-500' />
                  <span className='text-sm'>Monarquia</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Scroll className='w-4 h-4 text-indigo-500' />
                  <span className='text-sm'>Profetas</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Map className='w-4 h-4 text-cyan-500' />
                  <span className='text-sm'>Exílio/Retorno</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Church className='w-4 h-4 text-violet-500' />
                  <span className='text-sm'>Igreja Primitiva</span>
                </div>
                <div className='flex items-center gap-2'>
                  <AlertTriangle className='w-4 h-4 text-red-500' />
                  <span className='text-sm'>Alta Incerteza</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 text-yellow-500' />
                  <span className='text-sm'>Média Incerteza</span>
                </div>
              </div>
            </div>

            <Separator className='my-4' />

            {/* Academic Sources */}
            <div className='text-sm text-slate-600 dark:text-slate-400'>
              <p className='mb-2'>
                <strong>Principais Fontes Acadêmicas:</strong> Edwin Thiele
                (cronologia dos reis), Eugene Merrill (história do AT), F.F.
                Bruce (NT), Kenneth Kitchen (arqueologia), Gleason Archer
                (questões cronológicas), John Bright (história de Israel).
              </p>
              <p className='mb-2'>
                <strong>Evidências Arqueológicas:</strong> Cilindro de Ciro (538
                a.C.), Crônicas Babilônicas (605-586 a.C.), Anais de Sargão II
                (722 a.C.), Estela de Merneptah (menção de Israel ~1208 a.C.),
                registros assírios e egípcios.
              </p>
              <p className='mb-2'>
                <strong>Metodologia de Datação:</strong> Sincronismos bíblicos,
                registros extrabíblicos contemporâneos, evidências
                arqueológicas, análise textual das genealogias, correlações
                astronômicas (eclipses, conjunções).
              </p>
              <p>
                <strong>Debates Cronológicos:</strong> Êxodo - data cedo (1446
                a.C.) vs data tarde (1260 a.C.); Nascimento de Jesus (6-4 a.C.);
                Apocalipse - Domiciano (95 d.C.) vs Nero (68-70 d.C.).
                Apresentamos a posição majoritária com notas sobre alternativas
                acadêmicas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
