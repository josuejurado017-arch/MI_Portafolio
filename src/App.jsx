import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AmbientEffects, Footer, Header } from './components/Layout';
import { usePreferences } from './hooks/usePreferences';
import { projects } from './utils/content';
import Home from './pages/Home';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const { pathname, hash } = useLocation();
  const { t, language } = usePreferences();
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hash) {
      const timer = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }), 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  useEffect(() => {
    const project = projects.find(p => pathname === `/proyectos/${p.id}`);
    document.title = project ? `${project.title[language === 'es' ? 0 : 1]} · Edgar Josué Jurado` : 'Edgar Josué Jurado · Full Stack Developer';
    document.querySelector('meta[name="description"]').content = language === 'es' ? 'Edgar Josué Jurado. Desarrollador Full Stack y estudiante de Ingeniería de Sistemas en Tarija, Bolivia. Proyectos, tecnologías y experiencia.' : 'Edgar Josué Jurado. Full Stack Developer and Systems Engineering student in Tarija, Bolivia. Projects, technologies and experience.';
  }, [pathname, language]);
  return <><a className="skip-link" href="#main-content">{t('Saltar al contenido', 'Skip to content')}</a><Header /><main id="main-content"><Suspense fallback={<div className="route-loading" role="status">{t('Cargando…', 'Loading…')}</div>}><Routes><Route path="/" element={<Home />} /><Route path="/proyectos/:slug" element={<ProjectDetail />} /><Route path="*" element={<NotFound />} /></Routes></Suspense></main><Footer /><AmbientEffects /></>;
}
