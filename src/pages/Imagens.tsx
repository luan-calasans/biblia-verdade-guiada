import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@/contexts/ThemeContext';
import { useCarousel } from '@/contexts/CarouselContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  Info,
  X,
  Play,
  BookOpen,
  MapPin,
  Clock,
  Star,
  Users,
  Eye,
  Heart,
  Share2,
  Video,
} from 'lucide-react';

// Hook para detectar dispositivo móvel
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar imediatamente
    checkIsMobile();

    // Adicionar listener para mudanças de tamanho
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

interface BiblicalEvent {
  id: string;
  title: string;
  description: string;
  images: string[];
  videoUrl: string;
  videos?: { title: string; url: string }[];
  biblicalReference: string;
  period: string;
  location: string;
  significance: string;
  details: string;
}

const Imagens: React.FC = () => {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const { setIsCarouselOpen } = useCarousel();

  // Fallback para tema claro se theme for undefined
  const currentTheme = theme || 'light';

  // Add CSS animation for image transitions
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [selectedEvent, setSelectedEvent] = useState<BiblicalEvent | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const [biblicalEvents, setBiblicalEvents] = useState<BiblicalEvent[]>([]);

  // Função para obter as imagens baseadas no tipo de dispositivo
  const getImagesForDevice = (
    isMobileDevice: boolean,
    eventType:
      | 'babel'
      | 'noah'
      | 'mene'
      | 'jesus'
      | 'nabucodonosor'
      | 'tabernaculo'
      | 'templo_salomao_fora'
      | 'templo_salomao_dentro'
  ) => {
    if (eventType === 'babel') {
      return isMobileDevice
        ? [
            '/imgs/babel/01_FB_BS_Tower_Babel_Thumbnail.jpg',
            '/imgs/babel/02_FB_BS_Tower_Babel_Thumbnail.jpg',
            '/imgs/babel/03_FB_BS_Tower_Babel_Thumbnail.jpg',
            '/imgs/babel/04_FB_BS_Tower_Babel_Thumbnail.jpg',
            '/imgs/babel/05_FB_BS_Tower_Babel_Thumbnail.jpg',
            '/imgs/babel/06_FB_BS_Tower_Babel_Thumbnail.jpg',
            '/imgs/babel/07_FB_BS_Tower_Babel_Thumbnail.jpg',
            '/imgs/babel/08_FB_BS_Tower_Babel_Thumbnail.jpg',
            '/imgs/babel/09_FB_BS_Tower_Babel_Thumbnail.jpg',
          ]
        : [
            '/imgs/babel/01_FB_BS_Tower_Babel_1920.jpg',
            '/imgs/babel/02_FB_BS_Tower_Babel_1920.jpg',
            '/imgs/babel/03_FB_BS_Tower_Babel_1920.jpg',
            '/imgs/babel/04_FB_BS_Tower_Babel_1920.jpg',
            '/imgs/babel/05_FB_BS_Tower_Babel_1920.jpg',
            '/imgs/babel/06_FB_BS_Tower_Babel_1920.jpg',
            '/imgs/babel/07_FB_BS_Tower_Babel_1920.jpg',
            '/imgs/babel/08_FB_BS_Tower_Babel_1920.jpg',
            '/imgs/babel/09_FB_BS_Tower_Babel_1920.jpg',
          ];
    } else if (eventType === 'noah') {
      return isMobileDevice
        ? [
            '/imgs/arca_noe/01_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/02_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/03_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/04_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/05_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/06_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/07_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/08_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/09_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/10_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/11_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/12_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/13_FB_BS_Noah_Ark_1024.jpg',
            '/imgs/arca_noe/14_FB_BS_Noah_Ark_1024.jpg',
          ]
        : [
            '/imgs/arca_noe/01_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/02_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/03_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/04_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/05_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/06_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/07_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/08_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/09_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/10_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/11_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/12_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/13_FB_BS_Noah_Ark_1920.jpg',
            '/imgs/arca_noe/14_FB_BS_Noah_Ark_1920.jpg',
          ];
    } else if (eventType === 'mene') {
      return isMobileDevice
        ? [
            '/imgs/mene_mene/01_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/02_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/03_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/04_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/05_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/06_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/07_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/08_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/09_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/10_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/11_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/12_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/13_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/14_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/15_FB_BS_Writing_Wall_1024.jpg',
            '/imgs/mene_mene/16_FB_BS_Writing_Wall_1024.jpg',
          ]
        : [
            '/imgs/mene_mene/01_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/02_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/03_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/04_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/05_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/06_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/07_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/08_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/09_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/10_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/11_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/12_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/13_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/14_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/15_FB_BS_Writing_Wall_1920.jpg',
            '/imgs/mene_mene/16_FB_BS_Writing_Wall_1920.jpg',
          ];
    } else if (eventType === 'jesus') {
      return isMobileDevice
        ? [
            '/imgs/jesus/01_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/02_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/03_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/04_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/05_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/06_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/07_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/08_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/09_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/10_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/11_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/12_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/13_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/14_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/15_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/16_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/17_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/18_FB_BS_Jesus_Crucified_1024.jpg',
            '/imgs/jesus/19_FB_BS_Jesus_Crucified_1024.jpg',
          ]
        : [
            '/imgs/jesus/01_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/02_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/03_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/04_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/05_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/06_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/07_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/08_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/09_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/10_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/11_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/12_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/13_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/14_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/15_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/16_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/17_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/18_FB_BS_Jesus_Crucified_1920.jpg',
            '/imgs/jesus/19_FB_BS_Jesus_Crucified_1920.jpg',
          ];
    } else if (eventType === 'nabucodonosor') {
      return isMobileDevice
        ? [
            '/imgs/nabucodonosor/01_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/02_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/03_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/04_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/05_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/06_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/07_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/08_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/09_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/10_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/11_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/12_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/13_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/14_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
            '/imgs/nabucodonosor/15_FB_BS_Nebuchadnezzar_Statue_1024.jpg',
          ]
        : [
            '/imgs/nabucodonosor/01_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/02_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/03_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/04_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/05_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/06_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/07_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/08_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/09_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/10_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/11_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/12_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/13_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/14_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
            '/imgs/nabucodonosor/15_FB_BS_Nebuchadnezzar_Statue_1920.jpg',
          ];
    } else if (eventType === 'tabernaculo') {
      return isMobileDevice
        ? [
            '/imgs/tabernaculo/01_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/02_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/03_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/04_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/05_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/06_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/07_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/08_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/09_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/10_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/11_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/12_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/13_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/14_FB_BS_Tabernacle_Walkthrough_1024.jpg',
            '/imgs/tabernaculo/15_FB_BS_Tabernacle_Walkthrough_1024.jpg',
          ]
        : [
            '/imgs/tabernaculo/01_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/02_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/03_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/04_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/05_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/06_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/07_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/08_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/09_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/10_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/11_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/12_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/13_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/14_FB_BS_Tabernacle_Walkthrough_1920.jpg',
            '/imgs/tabernaculo/15_FB_BS_Tabernacle_Walkthrough_1920.jpg',
          ];
    } else if (eventType === 'templo_salomao_fora') {
      return isMobileDevice
        ? [
            '/imgs/templo_salomao_fora/01_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/02_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/03_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/04_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/05_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/06_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/07_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/08_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/09_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/10_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/11_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/12_FB_BS_Solomon_Temple_Outer_1024.jpg',
            '/imgs/templo_salomao_fora/13_FB_BS_Solomon_Temple_Outer_1024.jpg',
          ]
        : [
            '/imgs/templo_salomao_fora/01_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/02_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/03_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/04_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/05_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/06_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/07_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/08_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/09_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/10_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/11_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/12_FB_BS_Solomon_Temple_Outer_1920.jpg',
            '/imgs/templo_salomao_fora/13_FB_BS_Solomon_Temple_Outer_1920.jpg',
          ];
    } else if (eventType === 'templo_salomao_dentro') {
      return isMobileDevice
        ? [
            '/imgs/templo_salomao_dentro/01_FB_BS_Solomon_Temple_Inner_1024.jpg',
            '/imgs/templo_salomao_dentro/02_FB_BS_Solomon_Temple_Inner_1024.jpg',
            '/imgs/templo_salomao_dentro/03_FB_BS_Solomon_Temple_Inner_1024.jpg',
            '/imgs/templo_salomao_dentro/04_FB_BS_Solomon_Temple_Inner_1024.jpg',
            '/imgs/templo_salomao_dentro/05_FB_BS_Solomon_Temple_Inner_1024.jpg',
            '/imgs/templo_salomao_dentro/06_FB_BS_Solomon_Temple_Inner_1024.jpg',
            '/imgs/templo_salomao_dentro/07_FB_BS_Solomon_Temple_Inner_1024.jpg',
            '/imgs/templo_salomao_dentro/08_FB_BS_Solomon_Temple_Inner_1024.jpg',
            '/imgs/templo_salomao_dentro/09_FB_BS_Solomon_Temple_Inner_1024.jpg',
            '/imgs/templo_salomao_dentro/10_FB_BS_Solomon_Temple_Inner_1024.jpg',
            '/imgs/templo_salomao_dentro/11_FB_BS_Solomon_Temple_Inner_1024.jpg',
          ]
        : [
            '/imgs/templo_salomao_dentro/01_FB_BS_Solomon_Temple_Inner_1920.jpg',
            '/imgs/templo_salomao_dentro/02_FB_BS_Solomon_Temple_Inner_1920.jpg',
            '/imgs/templo_salomao_dentro/03_FB_BS_Solomon_Temple_Inner_1920.jpg',
            '/imgs/templo_salomao_dentro/04_FB_BS_Solomon_Temple_Inner_1920.jpg',
            '/imgs/templo_salomao_dentro/05_FB_BS_Solomon_Temple_Inner_1920.jpg',
            '/imgs/templo_salomao_dentro/06_FB_BS_Solomon_Temple_Inner_1920.jpg',
            '/imgs/templo_salomao_dentro/07_FB_BS_Solomon_Temple_Inner_1920.jpg',
            '/imgs/templo_salomao_dentro/08_FB_BS_Solomon_Temple_Inner_1920.jpg',
            '/imgs/templo_salomao_dentro/09_FB_BS_Solomon_Temple_Inner_1920.jpg',
            '/imgs/templo_salomao_dentro/10_FB_BS_Solomon_Temple_Inner_1920.jpg',
            '/imgs/templo_salomao_dentro/11_FB_BS_Solomon_Temple_Inner_1920.jpg',
          ];
    }
    return [];
  };

  // useEffect para atualizar as imagens quando o dispositivo mudar
  useEffect(() => {
    const events = [
      {
        id: 'tower-of-babel',
        title: 'Torre de Babel',
        description: 'A construção da torre que levou à confusão das línguas',
        images: getImagesForDevice(isMobile, 'babel'),
        videoUrl: '/video/01-TOB-Mountain-Pass-SD.mp4',
        videos: [
          {
            title: 'Mountain Pass',
            url: '/video/01-TOB-Mountain-Pass-SD.mp4',
          },
          {
            title: 'Close',
            url: '/video/07-TOB-Close-SD.mp4',
          },
        ],
        biblicalReference: 'Gênesis 11:1-9',
        period: 'Antes de 2000 a.C.',
        location: 'Babilônia (atual Iraque)',
        significance: 'Dispersão da humanidade e origem das diferentes línguas',
        details:
          'Após o dilúvio, os descendentes de Noé se mudaram para o leste e se estabeleceram na planície de Sinar. Ninrode, o Caçador, era um líder entre os homens e um construtor de cidades, incluindo Babel e Nínive. Ele era um bisneto de Noé, mas não estava à altura das virtudes e padrões que Deus havia encontrado em Noé.\n\nDurante o tempo de Ninrode, a maldade do povo aumentou tremendamente. Deus instruiu claramente Noé e seus filhos a "Serem fecundos e multiplicar-se, e encher a terra". (Gênesis 9:1,7)\n\nOs descendentes de Noé deram ouvidos a Deus? Eles disseram: "Vamos construir uma cidade, com uma torre que alcance os céus. Assim nosso nome será famoso e não seremos espalhados pela face da terra".\n\nEstas imagens são representações artísticas da Torre de Babel criadas em software 3D. Não sabemos como ela era, mas sabemos que um zigurate posterior construído na Babilônia para o deus pagão Marduk, que tinha 91m de altura sobre uma base de 91x91m e acredita-se que tinha 7 camadas.\n\nOs descendentes de Noé falavam todos um mesmo idioma. Eles queriam que a torre fosse um monumento de orgulho para si mesmos e um símbolo que os mantivesse unidos como um povo poderoso.\n\nAssim, eles fizeram grandes pilhas de tijolos queimados e coletaram betume para usar como argamassa.\n\nA Bíblia diz que Deus viu este ato de rebeldia. O Senhor disse: "Eles são um só povo e falam uma só língua, e começaram a construir isso. Em breve nada poderá impedir o que planejam fazer. Venham, desçamos e confundamos a língua que falam, para que não entendam mais uns aos outros".\n\nCom esta ordem, cerca de 70 nações do mundo foram divididas. (Estas nações estão listadas no capítulo anterior de Gênesis 10.) Assim, Deus as espalhou por toda a terra; e isso acabou com a construção da cidade e da torre.\n\nBabel era o nome hebraico para Babilônia, que significa "porta de Deus". Mas era semelhante à palavra hebraica "balal" que significava "confundir". A Bíblia explica: "Por isso foi chamada Babel, porque ali o Senhor confundiu a língua de todo o mundo. Dali o Senhor os espalhou por toda a terra." (Gênesis 11:9).',
      },
      {
        id: 'noah-ark',
        title: 'Arca de Noé',
        description:
          'A construção da arca que salvou Noé, sua família e os animais',
        images: getImagesForDevice(isMobile, 'noah'),
        videoUrl: '/video/Noahs-Ark-Assembly-SD.mp4',
        videos: [
          {
            title: 'Assembly',
            url: '/video/Noahs-Ark-Assembly-SD.mp4',
          },
          {
            title: "Noah's Ark",
            url: '/video/Noahs-Ark-SD.mp4',
          },
        ],
        biblicalReference: 'Gênesis 6:1-9:17',
        period: 'Antes de 2500 a.C.',
        location: 'Região da Mesopotâmia',
        significance:
          'Salvação da humanidade e dos animais através da obediência a Deus',
        details:
          'Quando Deus observou que toda a humanidade era perversa e depravada, Ele decidiu enviar um dilúvio para destruí-los. Noé era o único homem verdadeiramente justo que vivia na Terra naquela época, então Deus o instruiu a construir uma Arca, para salvá-lo, sua família e a população animal.\n\nA palavra bíblica para Arca é "tebah". Ela é usada 28 vezes no AT e é usada apenas para a Arca de Noé e para o recipiente no qual Moisés estava escondido entre os juncos. Como uma palavra egípcia semelhante significa "caixa", a Arca não era como um barco aerodinâmico projetado para deslizar facilmente sobre a da água. Nesta foto, o tamanho da "Arca" mostrado ao lado de um campo de futebol.\n\nDeus instruiu Noé a construir a Arca de 300 côvados de comprimento por 50 côvados de largura e 30 côvados de altura. Um côvado é a distância do cotovelo do homem até a ponta do dedo médio, normalmente entre 45-54 cm 1(18-21 polegadas) que faz com que a Arca tenha cerca de 135m de comprimento, 22,5m de largura e 13,5m de altura.\n\nA Arca deveria ser construída de "madeira de gopher". "Gopher" é uma palavra hebraica cujo significado é desconhecido, por isso foi deixada sem tradução. A NVI a traduz como "madeira de cipreste", pois esta madeira é altamente resistente ao apodrecimento. Outras traduções a descrevem como \'madeira resinosa\'. Gopher poderia ter sido uma madeira prédiluviana, com a qual não estamos familiarizados.\n\nA Arca tinha três andares com apenas uma porta.\n\nCom 300 côvados de comprimento, 50 côvados de largura e 30 côvados de altura, o volume da arca é estimado em cerca de 42.475 mil metros cúbicos, o que representa cerca de um terço do volume do Titanic.\n\nA Arca tinha uma proporção (comprimento x largura x altura) de 30 x 5 x 3. Segundo os construtores navais, esta proporção representa um conhecimento avançado da construção naval, pois é o projeto ideal para a estabilidade em mares agitados. A Arca, como projetada por Deus, era praticamente impossível de virar! Ela teria que ter sido inclinada mais de 90 graus para virar.\n\nA Arca deveria ser revestida por dentro e por fora com betume para torná-la impermeável.\n\nA Arca tinha um teto com uma pequena abertura, um côvado de altura, abaixo dele - mas sem leme. Ela foi feita para flutuar, e Deus dirigia a arca conforme Sua vontade.\n\nO interior da Arca tinha um espaço que podia caber cerca de 1.300 dos contêineres marítimos padrão de 7m (20 pés) que você vê nos navios de carga. Havia mais de 9.290 metros quadrados de espaço de chão.\n\nA Arca deveria conter dois de cada "tipo" de animal terrestre. A "espécie" bíblica é um nível de "família" de classificação. Estudos recentes estimam que o número total de "tipos" de animais terrestres vivos e extintos e de criaturas voadoras é de cerca de 1.500.\n\nIsto significaria que Noé cuidou de aproximadamente 7.000 animais. (Fonte: website Ark encounter). Havia espaço na Arca para 40.000 animais com o tamanho médio de uma ovelha.\n\nNoé obedeceu às instruções de Deus na construção da Arca. Deus fechou a porta quando todos os que deviam ser salvos estavam a bordo e os protegeu durante o dilúvio.\n\nNoé e sua família ficaram a bordo da Arca durante um ano e dez dias.',
      },
      {
        id: 'jesus-crucifixion',
        title: 'A Crucificação de Jesus',
        description: 'O sacrifício supremo de Jesus Cristo na cruz',
        images: getImagesForDevice(isMobile, 'jesus'),
        videoUrl: '/video/The Crucifixion - Isaiah 53.mp4',
        videos: [
          {
            title: 'A Crucificação - Isaías 53',
            url: '/video/The Crucifixion - Isaiah 53.mp4',
          },
        ],
        biblicalReference:
          'Isaías 53:1-12, Mateus 27:32-56, Marcos 15:21-41, Lucas 23:26-49, João 19:17-37',
        period: '30 d.C.',
        location: 'Gólgota (Colina do Calvário), Jerusalém',
        significance:
          'O sacrifício expiatório de Jesus Cristo pela salvação da humanidade',
        details:
          'A crucificação de Jesus Cristo é o evento central da fé cristã, o momento em que o Filho de Deus ofereceu Sua vida como sacrifício pelos pecados da humanidade. Este evento foi profetizado séculos antes pelo profeta Isaías, que descreveu detalhadamente o sofrimento do Servo do Senhor.\n\nIsaías 53 nos revela que o Messias seria "desprezado e rejeitado pelos homens, homem de dores e experiente em sofrimento". Ele seria "traspassado por nossas transgressões" e "esmagado por nossas iniquidades". O castigo que nos traz a paz estaria sobre Ele, e pelas Suas feridas seríamos sarados.\n\nJesus foi levado ao Gólgota (que significa "lugar da caveira") carregando Sua própria cruz. Ali, junto com dois criminosos, foi crucificado. Durante seis horas, das nove da manhã às três da tarde, Jesus suportou o sofrimento físico extremo da crucificação, além da agonia espiritual de carregar os pecados de toda a humanidade.\n\nNas palavras finais de Jesus na cruz, vemos Sua compaixão e perdão: "Pai, perdoa-lhes, porque não sabem o que fazem" (Lucas 23:34). Ele também prometeu ao ladrão arrependido: "Em verdade te digo que hoje estarás comigo no paraíso" (Lucas 23:43).\n\nÀs três da tarde, Jesus clamou: "Deus meu, Deus meu, por que me desamparaste?" (Mateus 27:46), cumprindo a profecia do Salmo 22. Suas últimas palavras foram: "Está consumado!" (João 19:30) e "Pai, nas tuas mãos entrego o meu espírito" (Lucas 23:46).\n\nNo momento da morte de Jesus, o véu do templo se rasgou de alto a baixo, simbolizando que o caminho para Deus estava agora aberto através do sacrifício de Cristo. A terra tremeu, rochas se partiram e muitos santos ressuscitaram, testemunhando a vitória de Jesus sobre a morte.\n\nA crucificação não foi apenas um evento histórico, mas o cumprimento perfeito do plano de Deus para a redenção da humanidade. Através da morte de Jesus na cruz, todos os que creem nEle recebem perdão dos pecados e vida eterna.\n\nComo declarou o apóstolo Paulo: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna" (João 3:16).',
      },
      {
        id: 'nebuchadnezzar-statue',
        title: 'A Estátua de Nabucodonosor',
        description: 'O sonho profético da estátua de metais diferentes',
        images: getImagesForDevice(isMobile, 'nabucodonosor'),
        videoUrl: '/video/Daniel-Statue-Part1-SD.mp4',
        videos: [
          {
            title: 'Daniel - Estátua Parte 1',
            url: '/video/Daniel-Statue-Part1-SD.mp4',
          },
          {
            title: 'Daniel - Estátua Parte 2',
            url: '/video/Daniel-Statue-Part-2-540p.mp4',
          },
        ],
        biblicalReference: 'Daniel 2:1-49',
        period: '603 a.C.',
        location: 'Babilônia (atual Iraque)',
        significance: 'Profecia dos reinos mundiais e do reino eterno de Deus',
        details:
          'No segundo ano em que Nabucodonosor era rei da Babilônia, ele teve um sonho perturbador. O rei pediu a seus astrólogos que lhe dissessem o que ele havia sonhado e explicassem o significado, mas eles não conseguiram.\n\nDaniel e seus amigos pediram a Deus que lhes mostrasse o sonho e seu significado e, durante a noite, Deus revelou o mistério a Daniel. Na manhã seguinte, ele foi levado diante do rei Nabucodonosor.\n\n"Nenhum homem sábio, encantador, mágico ou adivinho pode explicar este mistério", disse Daniel, "mas há um Deus no céu que mostrou ao rei Nabucodonosor o que vai acontecer no futuro. Em seu sonho, diante de você estava uma estátua enorme e deslumbrante, com uma aparência impressionante.\n\nA cabeça da estátua era feita de ouro puro". Daniel explicou que isto representava o poderoso reino do rei Nabucodonosor e do Império Babilônico (605 a.C - 539 a.C).\n\nO peito e os braços da estátua eram feitos de prata. Daniel explicou que isto representava o reino que se levantaria depois dos babilônios e seria inferior. (A maioria atribui isto ao Império dos medos e persas, 539 a.C - 331 a.C).\n\nA barriga e as coxas da estátua eram feitas de bronze. Daniel explicou que isto representava um terceiro reino que governaria sobre toda a terra. (A maioria pensa que este era o Império Grego, 331 a.C - 168 a.C).\n\nA estátua tinha pernas de ferro. Haverá um quarto reino, forte como o ferro, que esmagará e quebrará todos os outros", explicou Daniel. (A maioria atribui isto ao Império Romano, 168 a.C - 476 d.C).\n\nOs pés da estátua eram feitos em parte de ferro e em parte de barro cozido. Este reino será em parte forte e em parte frágil. Seu povo será uma mistura e não permanecerá unido, assim como o ferro se mistura com a argila (os cristãos diferem em sua interpretação deste reino, mas muitos acreditam que ele ainda está por vir e o ligam ao reino final do anticristo - Apocalipse 17:12-14).\n\nDaniel continuou a explicar o sonho do Rei.\n\n"Enquanto você observava, uma pedra foi cortada, mas não por mãos humanas".\n\n"... e atingiu a estátua em seus pés de ferro e barro...\n\n...e esmagou a estátua!"\n\nO ferro, o barro, o bronze, a prata e o ouro foram todos quebrados em pedaços e se tornaram como palha em uma eira no verão.\n\n"O vento os varreu sem deixar rastros. Mas a rocha que atingiu a estátua tornou-se uma enorme montanha e encheu toda a terra".\n\nEntão Daniel declarou: "Nestes tempos, Deus estabelecerá um reino que nunca será destruído". Ele esmagará todos esses reinos e acabará com eles, mas ele mesmo irá permanecer para sempre".',
      },
      {
        id: 'tabernaculo',
        title: 'O Tabernáculo',
        description: 'O santuário portátil de Deus no deserto',
        images: getImagesForDevice(isMobile, 'tabernaculo'),
        videoUrl: '/video/10-WalkThrough-SD-Master.mp4',
        videos: [
          {
            title: 'Tabernacle Walkthrough',
            url: '/video/10-WalkThrough-SD-Master.mp4',
          },
        ],
        biblicalReference: 'Êxodo 25-40, Levítico 1-27',
        period: '1446-1406 a.C.',
        location: 'Deserto do Sinai',
        significance:
          'O primeiro santuário de Deus e símbolo da presença divina',
        details:
          'O Tabernáculo foi montado em direção ao leste, a posição em que o sol nasce. Havia somente uma entrada para o tabernáculo chamada "Portão da Corte".\n\nAs cores dos fios das cortinas dos portões eram simbólicos. O azul representava a divindade, significando que a corte era um lugar de Deus. A cor púrpura, uma tintura difícil e cara de se produzir, era um símbolo da realeza. O vermelho simbolizava o sangue, a cor do sacrifício. O branco significava a santidade. A cerca do pátio, feita de linho branco, envolvia o solo sagrado, e os sacerdotes vestiam roupas brancas de linho.\n\nDiretamente da entrada de fora do pátio você poderia ver o altar de bronze (também chamado de altar das ofertas queimadas). Os israelitas faziam sacrifícios diários a Deus neste altar para expiação dos seus pecados (Êxodo 29:38).\n\nAssim que os primeiros sacerdotes começavam seus serviços no tabernáculo, o fogo da presença do Senhor consumia o sacrifício (Levítico 9:24). Este fogo do altar deveria ser mantido aceso o tempo todo. Os chifres do altar eram cobertos com sangue na consagração dos sacerdotes.\n\nEntre o altar e a entrada do Santo Lugar havia um lavatório chamado "pia". Este era o lugar onde os sacerdotes se lavavam cerimonialmente para serem consagrados ou separados para o ministério.\n\nUma cortina cobria a entrada do Santo Lugar. Somente os sacerdotes poderiam entrar no Lugar Santo onde havia três itens. À direita estava a Mesa dos Pães da Proposição e à frente estava o Altar do Incenso. À esquerda estava o Candelabro de Ouro.\n\nO Candelabro de Ouro tinha um formato de uma árvore com a base e o eixo central representando o tronco e com três "galhos" de cada lado. A lâmpada deveria ser cuidada por Arão e seus filhos para que a luz nunca se apagasse.\n\nNo começo de cada semana os sacerdotes colocavam 12 pães frescos na Mesa dos Pães da Proposição – um para cada uma das 12 tribos. Isto servia como um memorial de oferta de alimento ao Senhor.\n\nArão era instruído a queimar incenso no altar a cada manhã e ao meio-dia, todos os dias, como uma oferta constante ao Senhor. Nas Escrituras, o incenso era comumente associado à oração.\n\nSomente o Sumo Sacerdote poderia atravessar a cortina do Santo dos Santos. Isto era permitido somente uma vez ao ano no Dia da Expiação. Dentro estava a Arca da Aliança.\n\nEsta tampa da Arca da Aliança com os dois querubins colocados em cima era conhecida como o propiciatório. Deus é descrito como estando entronizado entre os querubins sobre a arca (1 Samuel 4:4, Salmo 18:10). Uma vez por ano, o Sumo Sacerdote aspergia o sangue de um touro e um bode no propiciatório para fazer expiação pelo seu próprio pecado e pelo pecado do povo.\n\nEmbora o tabernáculo fosse pesado e tivesse muitas partes, era surpreendentemente portátil. Os sacerdotes carregavam a Arca e os altares nos ombros, mas o resto era transportado em carros puxados por bois.',
      },
      {
        id: 'writing-on-wall',
        title: 'A Escrita na Parede',
        description:
          'Mene, Mene, Tekel, Upharsin - O julgamento divino sobre Belsazar',
        images: getImagesForDevice(isMobile, 'mene'),
        videoUrl: '/video/Aramaic_Establish-SD.mp4',
        videos: [
          {
            title: 'Aramaic Establish',
            url: '/video/Aramaic_Establish-SD.mp4',
          },
          {
            title: 'Aramaic Mid',
            url: '/video/Aramaic_Mid-SD.mp4',
          },
          {
            title: 'Western Mid',
            url: '/video/Western_Mid-SD.mp4',
          },
        ],
        biblicalReference: 'Daniel 5:1-31',
        period: '539 a.C.',
        location: 'Babilônia (atual Iraque)',
        significance: 'Julgamento divino e queda do império babilônico',
        details:
          'O rei Belsazar deu um grande banquete para mil de seus oficiais. Enquanto Belsazar bebia o vinho, ordenou aos seus servos que trouxessem as taças de ouro e de prata que seu avô Nabucodonosor havia tirado do Templo de Jerusalém.\n\nAssim, trouxeram as taças de ouro que haviam sido retiradas do Templo de Deus em Jerusalém, e o rei, seus oficiais, suas mulheres e suas concubinas beberam nelas.\n\nEnquanto bebiam, proclamavam louvor aos seus deuses de ouro, de prata, de bronze, de ferro, de madeira e de pedra.\n\nDe repente, apareceu uma mão humana e começou a escrever, riscando palavras no reboco da parede, junto ao castiçal do palácio real. O rei observava a mão que escrevia.\n\nEntão o rei ficou muito assustado; seu rosto empalideceu, seus joelhos tremeram e se chocaram, e ele não pôde mais ficar de pé, porque suas pernas fraquejaram.\n\nAs palavras escritas eram: "MENE, MENE..."\n\n"...TEKEL..."\n\n"...UPHARSIN."\n\nBelsazar chamou todos os seus sábios para que interpretassem a escrita, mas ninguém conseguiu ler ou explicar o significado daqueles caracteres.\n\nEntão a rainha, comparsa de Nabucodonosor, sugeriu ao rei que chamasse Daniel, o profeta de Deus, a fim de que ele interpretasse a mensagem. Ofereceram-lhe roupas de linho fino e um colar de ouro, e o tornaram o terceiro governador do reino, caso decifrasse o enigma.\n\nDaniel recusou os presentes, mas aceitou explicar o texto.\n\nEle declarou: "Ó rei, os teus presentes sejam para ti, e tua recompensa para teus servos, mas eu interpretarei as palavras ao rei e te revelarei o significado.\n\n\'MENE\' significa: Deus contou os teus dias e determinou o fim do teu reinado.\n\n\'TEKEL\' significa: foste pesado na balança e foste achado em falta.\n\n\'UPHARSIN\' (que se pronuncia \'Peres\') significa: teu reino foi dividido e entregue aos medos e persas."\n\nNaquela mesma noite, os medos e persas invadiram Babilônia; Belsazar, rei dos babilônios, foi morto, e Dario, o Medo, passou a reinar.\n\nAs palavras escritas estavam em aramaico:\n\n"MENE" vem de "mina", peso de metal;\n\n"TEKEL" deriva de "shequel" (siclo), outra unidade de peso;\n\n"PERES" significa "dividir" e também faz alusão a "Persas".',
      },
      {
        id: 'templo-salomao-fora',
        title: 'Templo de Salomão (Fora)',
        description: 'A construção majestosa do primeiro templo de Jerusalém',
        images: getImagesForDevice(isMobile, 'templo_salomao_fora'),
        videoUrl: '/video/01-Wide-Pan-SD.mp4',
        videos: [
          {
            title: 'Vista Geral',
            url: '/video/01-Wide-Pan-SD.mp4',
          },
          {
            title: 'Altar de Bronze',
            url: '/video/02-Brazen-Altar-SD.mp4',
          },
          {
            title: 'Mar de Bronze',
            url: '/video/03-Bronze-Sea-SD.mp4',
          },
          {
            title: 'Pias de Bronze',
            url: '/video/04-Bronze-Water-Bowls-SD.mp4',
          },
          {
            title: 'Frente do Templo',
            url: '/video/05-Temple-Front-SD.mp4',
          },
        ],
        biblicalReference: '1 Reis 6-7, 2 Crônicas 3-4',
        period: '966-959 a.C.',
        location: 'Monte Moriá, Jerusalém',
        significance:
          'O primeiro templo permanente de Deus e centro de adoração',
        details:
          'A construção do templo começou no 4º ano do reinado de Salomão e levou 7 anos para ser concluída. O local do Templo ficava ao leste das duas colinas sobre as quais Jerusalém foi construída - conhecido como Monte Moriá. Salomão não poupou na construção. Ele encomendou grandes quantidades de madeira de cedro do rei Hirão, de Tiro, e tinha enormes blocos da pedra seletas da pedreira. Mais de 1.086 talentos (34 toneladas) de ouro de Ofir foram utilizados juntamente com 1.017.000 talentos de prata (34.600 toneladas). Salomão tinha 70.000 transportadores e 80.000 cortadores de pedra nas colinas, assim como 3.300 supervisores supervisionando o projeto e dirigindo os operários.\n\nDois átrios cercavam o Templo. O Pátio Interno era separado do outro espaço por um muro de três cursos de pedra talhada, encimado por vigas de cedro. Ele continha o altar de holocausto, a pia do Mar Fundido e outras dez pias. O grande Pátio rodeava todo o Templo. Era aqui que as pessoas se reuniam para adorar (Jeremias 19:14; 26:2).\n\nUma grande parte das pedras calcárias com as quais o templo foi construído veio da pedreira exatamente ao lado de Jerusalém. As pedras eram cortadas, talhadas e polidas nas pedreiras, de forma que nenhum som de martelos, machados ou ferramentas metálicas era ouvido na casa enquanto ela era construída.\n\nO Tempo era virado para o leste. Internamente as dimensões eram, em comprimento e largura, o dobro daquelas do tabernáculo: 60 côvados (30m) de comprimento por 20 côvados (10m) de largura. O Templo tinha 30 côvados (15m) de altura, três vezes a altura do tabernáculo. Um côvado era aproximadamente 46cm, assim sendo essas medidas são estimativas aproximadas. Ao redor do Tempo, em seus dois lados e atrás, havia três andares de câmaras, cada andar tendo 5 côvados de altura. A porta de entrada para essas câmaras ficavam no meio do lado direito da casa, e escadas circulares levavam a esses três andares.\n\nO pórtico tinha 20 côvados (10m) de largura e 10 côvados de profundidade. Sua altura era de 120 côvados (60m). Duas colunas de bronze ficavam na frente do pórtico. Elas possuíam 18 côvados (9m) de altura e 12 côvados (6m) de circunferência. Essas colunas eram belamente ornadas com formas de romãs, lírios e malhas de corrente.\n\nNa entrada do Templo havia portas dobráveis cobertas com ouro, suas vergas tinham 5 côvados (2,3m) de largura. Todas as portas tinham dobradiças de ouro.\n\nHavia 10 pias de bronze no pátio interior, 5 do lado sul e 5 ao norte do templo. Elas eram usadas para lavar os sacrifícios.\n\nEssas pias de bronze ficavam sobre bases quadradas às quais eram firmadas rodas. Os lados eram decorados com figuras de leões, touros e querubins, com coberturas trabalhadas por baixo.\n\nAlgo novo no canto sudeste do pátio interno – substituindo a "pia" do tabernáculo – era uma imensa pia de bronze chamada de "mar derretido". Tinha 5 côvados (2,3m) de altura, 10 côvados (5m) de diâmetro em sua borda e 30 côvados (15m) de circunferência, apoiando-se sobre 12 touros de bronze. Os touros viravam-se para os quatro pontos cardinais da bússola – três bois virados para cada lado.\n\nOs touros de bronze viravam-se para os quatro pontos cardinais da bússola – três bois virados para cada lado. O "mar derretido", assim como a pia, supria a água para a lavagem das mãos e pés dos sacerdotes.\n\nO objeto mais destacado do pátio do Templo era o altar do holocausto, ou altar de bronze. Ele tinha 20 côvados (10m) quadrados com degraus até seu topo.\n\nO altar foi construído no lugar da eira que Davi comprou de Araúna (2 Samuel 2:18–25). Este altar no pátio era usado para os muitos sacrifícios animais que eram trazidos ao Templo.\n\nQuando finalizado, o Templo foi dedicada a Deus em oração por Salomão, e a adoração foi liderada por corais e músicos. O Templo foi cheio da "glória do Senhor". Essa celebração foi seguida por generosos sacrifícios e festivais que duraram duas semanas.',
      },
      {
        id: 'templo-salomao-dentro',
        title: 'Templo de Salomão (Dentro)',
        description: 'O interior sagrado do templo e suas câmaras santas',
        images: getImagesForDevice(isMobile, 'templo_salomao_dentro'),
        videoUrl: '/video/Solomons-Temple-Holy-Place-Pan-01-HD.mp4',
        videos: [
          {
            title: 'Santo Lugar - Panorama 1',
            url: '/video/Solomons-Temple-Holy-Place-Pan-01-HD.mp4',
          },
          {
            title: 'Santo Lugar - Panorama 2',
            url: '/video/Solomons-Temple-Holy-Place-Pan-02-HD.mp4',
          },
          {
            title: 'Santo Lugar - Panorama 3',
            url: '/video/Solomons-Temple-Holy-Place-Pan-03-SD.mp4',
          },
          {
            title: 'Santo Lugar - Panorama 4',
            url: '/video/Solomons-Temple-Holy-Place-Pan-04-SD.mp4',
          },
          {
            title: 'Santo Lugar',
            url: '/video/Solomons-Temple-Holy-Place-SD.mp4',
          },
        ],
        biblicalReference: '1 Reis 6:14-38, 2 Crônicas 3:1-17',
        period: '966-959 a.C.',
        location: 'Monte Moriá, Jerusalém',
        significance: 'O lugar mais sagrado da adoração israelita',
        details:
          'Todos os israelitas poderiam entrar no pátio do templo para levar sacrifícios ao altar, mas isso é o mais perto que eles poderiam ir. Somente os sacerdotes podiam passar pelas portas douradas do templo para o Santo Lugar e somente o sumo sacerdote podia entrar no Santo dos Santos uma vez por ano, no Dia da Expiação. Ele só poderia entrar após oferecer um sacrifício por seus próprios pecados e depois levar ali o sangue expiatório pelos pecados do povo.\n\nO Santo Lugar tinha 40 côvados de comprimento (aproximadamente 20m). Um côvado sendo a medida do cotovelo de um homem até a ponta de seu dedo médio - cerca de 45 cm (18 polegadas). Sua largura era de 20 côvados (10m).\n\nO Santo Lugar tinha 30 côvados (15m) de altura, com janelas no lado leste acima da entrada.\n\nNa parte de trás do templo, na extremidade oeste, em um piso elevado, escondido da vista, havia uma sala de 20 côvados de comprimento, 20 de largura e 20 de altura (aproximadamente 10m²). Era conhecido como o "Lugar Santíssimo" ou "Santo dos Santos". Não tinha janelas. À frente desta sala elevada havia degraus revestidos com ouro. O Santo dos Santos era pavimentado e revestido com cedro do Líbano que eram revestidos com 20 toneladas métricas de ouro.\n\nAs portas de entrada de duas folhas para o Santo Lugar e Santo dos Santos foram feitas de madeira de oliveira esculpida com querubins, palmeiras e flores, revestidas com ouro.\n\nAs paredes do Santo Lugar foram forradas com cedro, sobre as quais foram esculpidas figuras de querubins, palmeiras e flores abertas, todas revestidas com ouro.\n\nNo tabernáculo havia uma peça de 7 velas ramificadas, conhecida como "menorá". No Templo de Salomão havia 5 de cada lado do Santo Lugar, perfazendo 10 no total.\n\nNo lado oeste do Santo Lugar estava a mesa para o Pão da Proposição (também chamado de Pão de Exposição). A mesa era feita de ouro e sobre ela havia doze pães, um para cada tribo de Israel. Pães frescos eram colocados na mesa todo sábado em duas pilhas de seis.\n\nDe pé diante do Santo dos Santos estava um altar dourado usado para ofertas de incenso. A fumaça do incenso queimado simbolizava as orações que se elevavam para Deus.\n\nAlém da porta dourada (1 Reis 6:31-32) entre o Santo Lugar e o Santo dos Santos o sumo sacerdote precisava passar por um véu grosso (Crônicas 3:14 ) feito de tecidos azuis, púrpura e carmesim e linho finamente torcido, com querubins habilmente trabalhados nele.\n\nDentro do Santo dos Santos estava a Arca da Aliança. (Para mais detalhes, veja o conjunto de imagens 3D na Arca da Aliança).',
      },
    ];
    setBiblicalEvents(events);
  }, [isMobile]);

  // useEffect separado para atualizar o selectedEvent quando o dispositivo mudar
  useEffect(() => {
    if (selectedEvent && biblicalEvents.length > 0) {
      const updatedEvent = biblicalEvents.find(
        (event) => event.id === selectedEvent.id
      );
      if (updatedEvent) {
        setSelectedEvent(updatedEvent);
        setCurrentImageIndex(0);
      }
    }
  }, [biblicalEvents, selectedEvent?.id]);

  const openCarousel = (event: BiblicalEvent) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
    setCurrentVideoIndex(0);
    setShowInfo(false);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
    setShowInfo(false);
    setShowVideo(false);
    setCurrentVideoIndex(0);
    setIsCarouselOpen(false);
  };

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) =>
        prev === selectedEvent.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedEvent.images.length - 1 : prev - 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedEvent) return;

      switch (event.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeCarousel();
          break;
        case 'i':
        case 'I':
          setShowInfo(!showInfo);
          break;
      }
    };

    if (selectedEvent) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent, showInfo]);

  return (
    <>
      <Helmet>
        <title>Acontecimentos Bíblicos - Galeria Interativa</title>
        <meta
          name='description'
          content='Explore os principais acontecimentos bíblicos através de imagens interativas. Navegue por eventos históricos como a Torre de Babel, Arca de Noé, Êxodo e muito mais.'
        />
        <meta
          name='keywords'
          content='acontecimentos bíblicos, história bíblica, galeria bíblica, eventos bíblicos, imagens bíblicas, carrossel bíblico'
        />
      </Helmet>

      <div className='min-h-screen'>
        <div className='w-full px-6 py-12'>
          {/* Hero Section */}
          <div className='text-center mb-16'>
            <header className='text-center mb-6 animate-fade-in'>
              <div className='flex items-center justify-center gap-2 mb-4'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-bible-accent'>
                  Imagens
                </h1>
              </div>
              <p className='text-sm md:text-base text-bible-text/70'>
                Imagens bíblicas para você explorar e entender a história
                bíblica
              </p>
            </header>
          </div>

          {/* Events Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-16'>
            {biblicalEvents.length > 0 &&
              biblicalEvents.map((event) => (
                <Card
                  key={event.id}
                  className={`group hover:shadow-xl transition-all duration-300 border cursor-pointer transform hover:scale-105 hover:border-green-200 ${
                    currentTheme === 'dark'
                      ? 'border-gray-700 bg-gray-800'
                      : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => openCarousel(event)}
                >
                  <div className='relative overflow-hidden rounded-t-lg'>
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className='w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>
                    <div className='absolute bottom-6 left-6 right-6'>
                      <h3 className='text-white text-2xl font-light mb-2'>
                        {event.title}
                      </h3>
                      <p className='text-white/90 text-base leading-relaxed'>
                        {event.description}
                      </p>
                    </div>
                  </div>
                  <CardContent className='p-6'>
                    <div
                      className={`flex items-center justify-between text-sm mb-4 ${
                        currentTheme === 'dark'
                          ? 'text-gray-300'
                          : 'text-gray-600'
                      }`}
                    >
                      <div className='flex items-center'>
                        <MapPin className='h-4 w-4 mr-2' />
                        <span className='font-light'>{event.location}</span>
                      </div>
                      <div className='flex items-center'>
                        <Clock className='h-4 w-4 mr-2' />
                        <span className='font-light'>{event.period}</span>
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <Badge
                        variant='outline'
                        className='text-sm font-light border-green-200 text-green-700'
                      >
                        {event.biblicalReference}
                      </Badge>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='opacity-0 group-hover:opacity-100 transition-opacity text-green-600 hover:text-green-700'
                      >
                        <Eye className='h-5 w-5' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Info Section */}
          <div className='text-center'>
            <Card
              className={`border shadow-sm ${
                currentTheme === 'dark'
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <CardContent className='p-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  <div className='flex flex-col items-center space-y-3'>
                    <div
                      className={`p-3 rounded-full ${
                        currentTheme === 'dark' ? 'bg-green-900' : 'bg-green-50'
                      }`}
                    >
                      <Eye className='h-6 w-6 text-green-600' />
                    </div>
                    <span
                      className={`font-light ${
                        currentTheme === 'dark'
                          ? 'text-gray-300'
                          : 'text-gray-600'
                      }`}
                    >
                      Clique para abrir o carrossel
                    </span>
                  </div>
                  <div className='flex flex-col items-center space-y-3'>
                    <div
                      className={`p-3 rounded-full ${
                        currentTheme === 'dark' ? 'bg-green-900' : 'bg-green-50'
                      }`}
                    >
                      <ChevronLeft className='h-6 w-6 text-green-600' />
                    </div>
                    <span
                      className={`font-light ${
                        currentTheme === 'dark'
                          ? 'text-gray-300'
                          : 'text-gray-600'
                      }`}
                    >
                      Navegue entre as imagens
                    </span>
                  </div>
                  <div className='flex flex-col items-center space-y-3'>
                    <div
                      className={`p-3 rounded-full ${
                        currentTheme === 'dark' ? 'bg-green-900' : 'bg-green-50'
                      }`}
                    >
                      <Info className='h-6 w-6 text-green-600' />
                    </div>
                    <span
                      className={`font-light ${
                        currentTheme === 'dark'
                          ? 'text-gray-300'
                          : 'text-gray-600'
                      }`}
                    >
                      Veja detalhes históricos
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Copyright Attribution */}
          <div className='text-center mt-8'>
            <Card
              className={`border shadow-sm ${
                currentTheme === 'dark'
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <CardContent className='p-6'>
                <p
                  className={`text-sm font-light leading-relaxed ${
                    currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  As imagens desta galeria são cortesia de{' '}
                  <a
                    href='https://www.freebibleimages.org/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-green-600 hover:text-green-700 underline'
                  >
                    FreeBibleimages.org
                  </a>
                  , uma organização cristã que disponibiliza gratuitamente mais
                  de 1500 conjuntos de imagens de histórias bíblicas para ensino
                  e uso não comercial.
                </p>
                <p
                  className={`text-xs font-light mt-2 ${
                    currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Todas as imagens são gratuitas para uso em ensino e streaming
                  não comercial, conforme os termos de uso do FreeBibleimages.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full Screen Carousel */}
        {selectedEvent && (
          <div className='fixed inset-0 bg-black z-50 flex items-center justify-center'>
            {/* Close Button */}
            <Button
              variant='ghost'
              size='icon'
              className='absolute top-6 right-6 z-10 text-white hover:text-white/80 hover:bg-transparent'
              onClick={closeCarousel}
            >
              <X className='h-6 w-6' />
            </Button>

            {/* Video Button */}
            <Button
              variant='ghost'
              className='absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 flex items-center gap-2'
              onClick={() => setShowVideo(!showVideo)}
            >
              <Video className='h-5 w-5' />
              <span className='text-sm font-medium'>(visualizar vídeo)</span>
            </Button>

            {/* Info Button */}
            <Button
              variant='ghost'
              size='icon'
              className='absolute bottom-6 right-6 z-10 text-white hover:text-white/80 hover:bg-transparent'
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className='h-6 w-6' />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant='ghost'
              size='icon'
              className='absolute left-6 z-10 bg-white hover:bg-gray-100 text-black rounded-full shadow-lg'
              onClick={prevImage}
            >
              <ChevronLeft className='h-8 w-8' />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              className='absolute right-6 z-10 bg-white hover:bg-gray-100 text-black rounded-full shadow-lg'
              onClick={nextImage}
            >
              <ChevronRight className='h-8 w-8' />
            </Button>

            {/* Main Image */}
            <div className='relative w-full h-full flex items-center justify-center'>
              <img
                src={selectedEvent.images[currentImageIndex]}
                alt={`${selectedEvent.title} - Imagem ${currentImageIndex + 1}`}
                className='w-full h-full object-contain transition-opacity duration-700 ease-in-out'
                style={{
                  animation: 'fadeIn 0.7s ease-in-out',
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />

              {/* Progress Dots */}
              <div className='absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-3'>
                {selectedEvent.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-green-500 ${
                      index === currentImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Info Panel */}
            {showInfo && (
              <div className='absolute inset-0 bg-black/80 flex items-center justify-center p-8 z-[60]'>
                <div className='bg-white rounded-lg p-8 max-w-3xl max-h-[85vh] overflow-y-auto'>
                  <div className='flex justify-between items-start mb-6'>
                    <h2 className='text-3xl font-light text-gray-800'>
                      {selectedEvent.title}
                    </h2>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => setShowInfo(false)}
                      className='text-gray-600 hover:text-gray-800'
                    >
                      <X className='h-6 w-6' />
                    </Button>
                  </div>

                  <div className='space-y-6'>
                    <div>
                      <h3 className='font-light text-gray-800 mb-2 text-lg'>
                        Referência Bíblica
                      </h3>
                      <p className='text-gray-600 leading-relaxed font-light'>
                        {selectedEvent.biblicalReference}
                      </p>
                    </div>

                    <div>
                      <h3 className='font-light text-gray-800 mb-2 text-lg'>
                        Período
                      </h3>
                      <p className='text-gray-600 leading-relaxed font-light'>
                        {selectedEvent.period}
                      </p>
                    </div>

                    <div>
                      <h3 className='font-light text-gray-800 mb-2 text-lg'>
                        Localização
                      </h3>
                      <p className='text-gray-600 leading-relaxed font-light'>
                        {selectedEvent.location}
                      </p>
                    </div>

                    <div>
                      <h3 className='font-light text-gray-800 mb-2 text-lg'>
                        Significado
                      </h3>
                      <p className='text-gray-600 leading-relaxed font-light'>
                        {selectedEvent.significance}
                      </p>
                    </div>

                    <div>
                      <h3 className='font-light text-gray-800 mb-2 text-lg'>
                        Detalhes Históricos
                      </h3>
                      <div className='text-gray-600 leading-relaxed space-y-4'>
                        {selectedEvent.details
                          .split('\n\n')
                          .map((paragraph, index) => (
                            <p
                              key={index}
                              className='text-gray-600 leading-relaxed font-light'
                            >
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Video Panel */}
            {showVideo && (
              <div className='absolute inset-0 bg-black/80 flex items-center justify-center p-8 z-[60]'>
                <div className='bg-white rounded-lg p-8 max-w-4xl max-h-[90vh] overflow-hidden'>
                  <div className='flex justify-between items-start mb-6'>
                    <h2 className='text-3xl font-light text-gray-800'>
                      Vídeo - {selectedEvent.title}
                    </h2>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => setShowVideo(false)}
                      className='text-gray-600 hover:text-gray-800'
                    >
                      <X className='h-6 w-6' />
                    </Button>
                  </div>

                  {/* Video Selection */}
                  {selectedEvent.videos && selectedEvent.videos.length > 1 && (
                    <div className='mb-4'>
                      <div className='flex gap-2 flex-wrap'>
                        {selectedEvent.videos.map((video, index) => (
                          <Button
                            key={index}
                            variant={
                              currentVideoIndex === index
                                ? 'default'
                                : 'outline'
                            }
                            size='sm'
                            onClick={() => setCurrentVideoIndex(index)}
                            className='text-sm'
                          >
                            {index + 1}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className='relative w-full aspect-video bg-black rounded-lg overflow-hidden'>
                    <video
                      src={
                        selectedEvent.videos
                          ? selectedEvent.videos[currentVideoIndex].url
                          : selectedEvent.videoUrl
                      }
                      controls
                      className='w-full h-full'
                      autoPlay
                      key={
                        selectedEvent.videos
                          ? selectedEvent.videos[currentVideoIndex].url
                          : selectedEvent.videoUrl
                      }
                    >
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Imagens;
