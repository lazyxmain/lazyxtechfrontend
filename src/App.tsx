import { lazy, Suspense, useEffect, useState } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Cursor from './components/Cursor';
import MouseGlow from './components/MouseGlow';
import { SmoothScroll, Loader } from './components/ScrollProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { scrollToId } from './components/ScrollProvider';

const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Why = lazy(() => import('./components/Why'));
const Process = lazy(() => import('./components/Process'));
const Work = lazy(() => import('./components/Work'));
const TechEcosystem = lazy(() => import('./components/TechEcosystem'));
const About = lazy(() => import('./components/About'));
const CTA = lazy(() => import('./components/CTA'));
const Contact = lazy(() => import('./components/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Why />
      <Process />
      <Work />
      <TechEcosystem />
      <About />
      <CTA />
      <Contact />
    </main>
  );
}

/* Page transition wrapper */
function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/blog" element={<Page><Blog /></Page>} />
        <Route path="/blog/:slug" element={<Page><BlogPost /></Page>} />
        <Route path="/privacy" element={<Page><Privacy /></Page>} />
        <Route path="/terms" element={<Page><Terms /></Page>} />
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Routes>
    </AnimatePresence>
  );
}

function Shell() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{!loaded && <Loader key="loader" />}</AnimatePresence>
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('home');
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-lime-electric focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Cursor />
      <MouseGlow />
      <Navbar />
      <Suspense fallback={null}>
        <AppRoutes />
      </Suspense>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollManager />
        <SmoothScroll />
        <Shell />
      </HashRouter>
    </ThemeProvider>
  );
}
