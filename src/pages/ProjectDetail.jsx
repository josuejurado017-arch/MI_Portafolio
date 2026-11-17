import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiCheck, FiGithub, FiLock, FiShield } from 'react-icons/fi';
import { profile, projects } from '../utils/content';
import { usePreferences } from '../hooks/usePreferences';
import { ExternalLink, ProjectArchitecture } from '../components/UI';
import NotFound from './NotFound';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, language } = usePreferences();
  const project = projects.find(item => item.id === slug);
  if (!project) return <NotFound />;
  const index = language === 'es' ? 0 : 1;
  return <article className="container project-detail"><Link className="text-link" to="/#proyectos"><FiArrowLeft />{t('Volver a proyectos', 'Back to projects')}</Link><span className="eyebrow">{project.label[index]}</span><h1>{project.title[index]}</h1><p className="detail-description">{project.description[index]}</p><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><ProjectArchitecture project={project} /><div className="detail-columns"><div><h2>{t('Funcionalidades principales', 'Key features')}</h2><ul className="feature-list">{project.features.map(feature => <li key={feature}><FiCheck />{t(...feature.split('|'))}</li>)}</ul></div><aside className="detail-aside">{project.institution && <div className="aside-institution"><img src={profile.cbaLogo} alt={project.institution} width="110" height="32" /><span>{t('Sistema Institucional en Producción', 'Institutional System in Production')}</span></div>}<h3>{t('Explora el proyecto', 'Explore the project')}</h3>{project.github ? <ExternalLink className="button button-secondary" href={project.github}><FiGithub />{t('Ver repositorio en GitHub', 'View GitHub repository')}</ExternalLink> : project.privateRepo ? <p className="private-notice"><FiLock /><span>{t('Confidencialidad institucional: este sistema fue desarrollado trabajando en el Centro Boliviano Americano (CBA Tarija). Por seguridad y protección de datos, no se publican capturas con información real ni el repositorio fuente.', 'Institutional confidentiality: this system was built while working at Centro Boliviano Americano (CBA Tarija). For security and data protection, real-data screenshots and source code are private.')}</span></p> : <p>{t('Repositorio pendiente de publicación.', 'Repository awaiting publication.')}</p>}{project.demo ? <ExternalLink className="button button-primary" href={project.demo}>Demo<FiArrowUpRight /></ExternalLink> : <p><FiShield /> {t('Puedo explicarte la arquitectura técnica o realizar una demostración funcional en entorno local con datos de prueba.', 'I can walk you through the technical architecture or run a local demo using synthetic test data.')}</p>}<Link className="button button-primary" to="/#contacto">{t('Cotizar un sistema similar', 'Quote a similar system')}<FiArrowUpRight /></Link></aside></div></article>;
}
