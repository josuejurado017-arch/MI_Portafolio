import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowUp, FiArrowUpRight, FiCode, FiGithub, FiLinkedin, FiMail, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { usePreferences } from '../hooks/usePreferences';
import { profile } from '../utils/content';
import { ExternalLink } from './UI';

export function Header() {
  const { t, theme, setTheme, language, setLanguage } = usePreferences();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const location = useLocation();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const close = event => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  const nav = [['inicio', 'Inicio', 'Home'], ['sobre-mi', 'Sobre mí', 'About'], ['stack', 'Stack', 'Stack'], ['proyectos', 'Proyectos', 'Projects'], ['experiencia', 'Experiencia', 'Experience']];
  return <header className="site-header"><div className="container header-inner">
    <Link className="brand" to="/" aria-label={t('Ir al inicio', 'Go home')}><span className="brand-symbol"><FiCode /></span>ejurado<span className="brand-dot">.</span><span className="brand-dev">dev</span></Link>
    <nav id="main-nav" className={open ? 'nav-links is-open' : 'nav-links'} aria-label={t('Navegación principal', 'Main navigation')}>{nav.map(([id, es, en]) => <Link key={id} to={`/#${id}`} onClick={() => setOpen(false)} className={active === id && location.pathname === '/' ? 'active' : ''}>{t(es, en)}</Link>)}</nav>
    <div className="header-actions"><button className="language-button" onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} aria-label={t('Switch to English', 'Cambiar a español')}>{language.toUpperCase()}<span>⌄</span></button><span className="header-divider" /><button className="icon-button theme-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={t('Cambiar tema', 'Toggle theme')}>{theme === 'dark' ? <FiSun /> : <FiMoon />}</button><Link className="button button-small header-contact" to="/#contacto">{t('Hablemos', 'Let’s talk')}<FiArrowUpRight /></Link><button className="icon-button menu-button" aria-expanded={open} aria-controls="main-nav" aria-label={t('Abrir menú', 'Open menu')} onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button></div>
  </div></header>;
}

export function SocialLinks() {
  const { t } = usePreferences();
  const links = [ [profile.github && `https://github.com/${profile.github}`, FiGithub, 'GitHub'], [profile.linkedin, FiLinkedin, 'LinkedIn'], [profile.email && `mailto:${profile.email}`, FiMail, t('Correo', 'Email')], [profile.whatsapp && `https://wa.me/${profile.whatsapp}`, FaWhatsapp, 'WhatsApp'] ];
  return <div className="social-links">{links.map(([url, Icon, label]) => url ? <ExternalLink key={label} href={url} aria-label={label}><Icon /></ExternalLink> : <span key={label} className="social-unconfigured" title={t(`${label}: próximamente`, `${label}: coming soon`)} aria-label={t(`${label}: pendiente de configurar`, `${label}: not configured yet`)}><Icon /></span>)}</div>;
}

export function Footer() {
  const { t } = usePreferences();
  return <footer className="site-footer container"><div><Link className="brand" to="/"><FiCode /> ejurado<span className="brand-dot">.</span><span className="brand-dev">dev</span></Link><p>{t('Ideas claras. Código con propósito.', 'Clear ideas. Purposeful code.')}</p></div><span className="copyright">© {new Date().getFullYear()} Edgar Josué Jurado<br />{t('Hecho con React, café y atención al detalle.', 'Built with React, coffee and attention to detail.')}</span><SocialLinks /></footer>;
}

export function AmbientEffects() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const scroll = () => setVisible(window.scrollY > 650);
    window.addEventListener('scroll', scroll, { passive: true });
    const media = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const move = e => { document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`); document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`); };
    if (media.matches) window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('scroll', scroll); window.removeEventListener('pointermove', move); };
  }, []);
  const { t } = usePreferences();
  return <><div className="cursor-glow" aria-hidden="true" />{visible && <button className="back-top icon-button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })} aria-label={t('Volver arriba', 'Back to top')}><FiArrowUp /></button>}</>;
}
