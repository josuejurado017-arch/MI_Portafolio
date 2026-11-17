import { motion } from 'framer-motion';
import { FiArrowDown, FiArrowUpRight, FiDownload, FiMapPin, FiTerminal } from 'react-icons/fi';
import { SiReact, SiLaravel, SiVuedotjs, SiTypescript, SiPostgresql, SiDocker, SiDotnet } from 'react-icons/si';
import { usePreferences } from '../hooks/usePreferences';
import { profile } from '../utils/content';
import { SocialLinks } from '../components/Layout';

export default function Hero() {
  const { t, language } = usePreferences();
  const cvUrl = language === 'es' ? profile.cv : (profile.cvEn || profile.cv);
  const cvName = language === 'es' ? 'CV_Edgar_Josue_Jurado_FullStack_ES.pdf' : 'CV_Edgar_Josue_Jurado_FullStack_EN.pdf';
  return <section id="inicio" className="hero"><div className="hero-grid" aria-hidden="true" /><div className="hero-orb" aria-hidden="true" /><div className="particles" aria-hidden="true">{Array.from({ length: 15 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, top: `${(i * 19) % 100}%`, animationDelay: `${i * 0.7}s` }} />)}</div>
    <div className="container hero-content"><motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      <div className="availability"><span className="status-dot" />{t('Abierto a nuevas oportunidades y proyectos', 'Open to new opportunities and projects')}<span className="availability-line" /><span>2026</span></div>
      <p className="hero-greeting">{t('Hola, soy', 'Hello, I’m')} <span>Edgar Josué Jurado</span><span className="greeting-wave">✳</span></p>
      <h1>{t('Transformo ideas', 'Turning ideas')}<br />{t('en', 'into')} <span className="gradient-text">{t('soluciones', 'meaningful')}<br className="desktop-break" />{t(' digitales.', ' software.')}</span></h1>
      <div className="hero-role"><span className="role-line" /><span>{t('Desarrollador Full Stack', 'Full Stack Developer')}</span><span className="typing-caret" /></div>
      <p className="hero-description">{t('Desarrollador Full Stack con sistemas reales en producción (CBA Tarija, ERPs e IoT). Especializado en Laravel 12, React 19, Vue 3, TypeScript, .NET y PostgreSQL.', 'Full Stack Developer with real systems in production (CBA Tarija, ERPs & IoT). Specialized in Laravel 12, React 19, Vue 3, TypeScript, .NET and PostgreSQL.')}</p>
      <div className="hero-buttons"><a className="button button-primary" href="#proyectos">{t('Explorar proyectos', 'Explore projects')}<FiArrowUpRight /></a>{cvUrl ? <a className="button button-secondary" href={cvUrl} download={cvName}>{t('Descargar CV', 'Download CV')}<FiDownload /></a> : <a className="button button-secondary" href="#contacto">{t('Solicitar CV', 'Request CV')}<FiDownload /></a>}<a className="hero-contact text-link" href="#contacto">{t('Contactar', 'Contact')}<FiArrowUpRight /></a></div>
      <div className="hero-social"><SocialLinks /><span className="vertical-separator" /><span><FiMapPin />Tarija, Bolivia</span></div>
    </motion.div>
    <motion.div className="hero-visual" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
      <div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="floating-tech floating-react"><SiReact /></span><span className="floating-tech floating-docker"><SiLaravel /></span>
      <div className="code-window"><div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>developer.js</span><FiTerminal /></div>
        <div className="code-body"><div className="code-comment">// {t('Arquitectura y desarrollo en producción', 'Production architecture & development')}</div><div><span className="syntax-purple">const</span> <span className="syntax-blue">developer</span> = {'{'}</div><div className="indent">name: <span className="syntax-green">'Edgar Josué Jurado'</span>,</div><div className="indent">role: <span className="syntax-green">'Full Stack Developer'</span>,</div><div className="indent">location: <span className="syntax-green">'Tarija, Bolivia 🇧🇴'</span>,</div><div className="indent">stack: [</div><div className="indent-two"><span className="syntax-green">'Laravel 12'</span>, <span className="syntax-green">'React 19'</span>, <span className="syntax-green">'Vue 3'</span>,</div><div className="indent-two"><span className="syntax-green">'TypeScript'</span>, <span className="syntax-green">'.NET 8'</span>, <span className="syntax-green">'PostgreSQL'</span></div><div className="indent">],</div><div className="indent">productionSystems: <span className="syntax-orange">6</span>,</div><div className="indent">availableForHire: <span className="syntax-orange">true</span></div><div>{'}'};</div><div className="code-spacer" /><div><span className="syntax-purple">export default</span> <span className="syntax-blue">developer</span>;</div></div>
        <div className="window-bottom"><span><span className="status-dot" />{t('Listo para el siguiente desafío', 'Ready for the next challenge')}</span><span>UTF-8</span></div>
      </div>
      <div className="developer-card"><div className="profile-placeholder"><img className="profile-avatar-img" src={profile.photo} alt="Edgar Josué Jurado" width="42" height="42" /><span /></div><div><strong>Edgar Josué Jurado</strong><span>{t('Sistemas web, ERPs, QR/WhatsApp & IoT.', 'Web systems, ERPs, QR/WhatsApp & IoT.')}</span></div><span className="verified-code">&lt;/&gt;</span></div>
      <div className="visual-caption"><span />{t('Código limpio. Sistemas en producción.', 'Clean code. Production systems.')}</div>
    </motion.div></div>
    <div className="container hero-bottom"><a href="#proyectos"><span className="scroll-mouse" />{t('Desliza para descubrir', 'Scroll to discover')}<FiArrowDown /></a><span>{t('DEL CONCEPTO AL DESPLIEGUE', 'FROM CONCEPT TO DEPLOYMENT')}<span className="tiny-cross">+</span></span></div>
    <div className="tech-ribbon"><div className="container tech-ribbon-inner"><span>{t('TECNOLOGÍAS CON LAS QUE CONSTRUYO', 'TECHNOLOGIES I BUILD WITH')}</span><div>{[[SiLaravel, 'Laravel'], [SiReact, 'React'], [SiVuedotjs, 'Vue 3'], [SiTypescript, 'TypeScript'], [SiDotnet, '.NET 8'], [SiPostgresql, 'PostgreSQL'], [SiDocker, 'Docker']].map(([Icon, name]) => <span key={name}><Icon />{name}</span>)}</div></div></div>
  </section>;
}
