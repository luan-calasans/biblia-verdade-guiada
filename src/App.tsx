import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider, CacheProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import VerseOfTheDay from '@/pages/VerseOfTheDay';
import WhyStudy from '@/pages/WhyStudy';
import Donation from '@/pages/Donation';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Imagens from '@/pages/Imagens';
import SearchPage from '@/pages/SearchPage';
import BibleReader from '@/pages/BibleReader';
import BiblicalChatbot from '@/pages/BiblicalChatbot';
import BiblicalTimeline from '@/pages/BiblicalTimeline';
import Models3D from '@/pages/Models3D';
import Model3DViewer from '@/pages/Model3DViewer';
import LandingPage from '@/pages/LandingPage';
import NotFound from '@/pages/NotFound';
import AccessibilityMenu from '@/components/AccessibilityMenu';
import Footer from '@/components/Footer';
import { ROUTES } from '@/lib/routes';

// Reading Plan Pages
import ReadingPlans from '@/pages/ReadingPlans';
import OneMonthPlan from '@/pages/ReadingPlans/OneMonthPlan';
import ThreeMonthPlan from '@/pages/ReadingPlans/ThreeMonthPlan';
import SixMonthPlan from '@/pages/ReadingPlans/SixMonthPlan';
import OneYearPlan from '@/pages/ReadingPlans/OneYearPlan';
import { CarouselProvider } from '@/contexts/CarouselContext';

const LegacyModelRedirect = () => {
  const { modelId } = useParams();
  return <Navigate to={ROUTES.model3d(modelId ?? '')} replace />;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme='light'>
      <CacheProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <SonnerToaster position='top-center' />
            <BrowserRouter
              basename={import.meta.env.BASE_URL.replace(/\/$/, '')}
            >
              <CarouselProvider>
                <div className='min-h-screen bg-background flex flex-col'>
                  <Navbar />
                  <main className='container mx-auto px-2 sm:px-4 py-4 sm:py-8 flex-1'>
                    <Routes>
                      <Route path={ROUTES.home} element={<LandingPage />} />
                      <Route path={ROUTES.plans} element={<Home />} />
                      <Route
                        path={ROUTES.plansPreset}
                        element={<ReadingPlans />}
                      />
                      <Route
                        path={ROUTES.plans1Month}
                        element={<OneMonthPlan />}
                      />
                      <Route
                        path={ROUTES.plans3Months}
                        element={<ThreeMonthPlan />}
                      />
                      <Route
                        path={ROUTES.plans6Months}
                        element={<SixMonthPlan />}
                      />
                      <Route
                        path={ROUTES.plans1Year}
                        element={<OneYearPlan />}
                      />
                      <Route
                        path='/plan'
                        element={<Navigate to={ROUTES.plans} replace />}
                      />
                      <Route
                        path={ROUTES.verseOfTheDay}
                        element={<VerseOfTheDay />}
                      />
                      <Route
                        path='/about'
                        element={<Navigate to={ROUTES.whyStudy} replace />}
                      />
                      <Route path={ROUTES.whyStudy} element={<WhyStudy />} />
                      <Route path={ROUTES.donation} element={<Donation />} />
                      <Route path={ROUTES.images} element={<Imagens />} />
                      <Route path={ROUTES.search} element={<SearchPage />} />
                      <Route path={ROUTES.reading} element={<BibleReader />} />
                      <Route path={ROUTES.chatbot} element={<BiblicalChatbot />} />
                      <Route
                        path={ROUTES.timeline}
                        element={<BiblicalTimeline />}
                      />
                      <Route path={ROUTES.models3d} element={<Models3D />} />
                      <Route
                        path={`${ROUTES.models3d}/:modelId`}
                        element={<Model3DViewer />}
                      />
                      <Route path={ROUTES.privacy} element={<PrivacyPolicy />} />

                      {/* Redirecionamentos das rotas antigas em português */}
                      <Route
                        path='/planos'
                        element={<Navigate to={ROUTES.plans} replace />}
                      />
                      <Route
                        path='/planos/pre-prontos'
                        element={<Navigate to={ROUTES.plansPreset} replace />}
                      />
                      <Route
                        path='/planos/1-mes'
                        element={<Navigate to={ROUTES.plans1Month} replace />}
                      />
                      <Route
                        path='/planos/3-meses'
                        element={<Navigate to={ROUTES.plans3Months} replace />}
                      />
                      <Route
                        path='/planos/6-meses'
                        element={<Navigate to={ROUTES.plans6Months} replace />}
                      />
                      <Route
                        path='/planos/1-ano'
                        element={<Navigate to={ROUTES.plans1Year} replace />}
                      />
                      <Route
                        path='/plano'
                        element={<Navigate to={ROUTES.plans} replace />}
                      />
                      <Route
                        path='/versiculo-do-dia'
                        element={<Navigate to={ROUTES.verseOfTheDay} replace />}
                      />
                      <Route
                        path='/sobre'
                        element={<Navigate to={ROUTES.whyStudy} replace />}
                      />
                      <Route
                        path='/por-que-estudar'
                        element={<Navigate to={ROUTES.whyStudy} replace />}
                      />
                      <Route
                        path='/doacao'
                        element={<Navigate to={ROUTES.donation} replace />}
                      />
                      <Route
                        path='/imagens'
                        element={<Navigate to={ROUTES.images} replace />}
                      />
                      <Route
                        path='/pesquisa'
                        element={<Navigate to={ROUTES.search} replace />}
                      />
                      <Route
                        path='/leitura'
                        element={<Navigate to={ROUTES.reading} replace />}
                      />
                      <Route
                        path='/linha-do-tempo'
                        element={<Navigate to={ROUTES.timeline} replace />}
                      />
                      <Route
                        path='/modelos-3d'
                        element={<Navigate to={ROUTES.models3d} replace />}
                      />
                      <Route
                        path='/modelos-3d/:modelId'
                        element={<LegacyModelRedirect />}
                      />
                      <Route
                        path='/privacidade'
                        element={<Navigate to={ROUTES.privacy} replace />}
                      />

                      <Route path='*' element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <AccessibilityMenu />
                </div>
              </CarouselProvider>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </CacheProvider>
    </ThemeProvider>
  );
};

export default App;
