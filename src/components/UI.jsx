import { motion } from 'framer-motion';
import { FiCpu, FiLayers, FiShield } from 'react-icons/fi';
import { usePreferences } from '../hooks/usePreferences';

export function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55, delay }}>{children}</motion.div>;
}

export function SectionHeading({ eyebrow, title, accent, description, children }) {
  return <div className="section-heading"><div><span className="eyebrow"><span />{eyebrow}</span><h2>{title} <span className="muted-heading">{accent}</span></h2>{description && <p>{description}</p>}</div>{children}</div>;
}

export function ExternalLink({ href, children, className = '', ...props }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

export function ProjectArchitecture({ project }) {
  const { t } = usePreferences();
  const stats = project?.previewMeta?.stats || [];
  const domain = project?.previewMeta?.domain || '';
  const isCba = Boolean(project?.institution);

  return <div className={`detail-arch-card ${project?.color || 'purple'}`}>
    <div className="detail-arch-header">
      <span><FiCpu /> {domain}</span>
      <span><FiShield /> {isCba ? t('Entorno Institucional Privado · CBA Tarija', 'Private Institutional Environment · CBA Tarija') : t('Arquitectura Verificada', 'Verified Architecture')}</span>
    </div>
    <div className="detail-arch-stats">
      {stats.map((stat, i) => (
        <div key={stat} className="detail-arch-stat">
          <small>0{i + 1} · {i === 0 ? t('ESCALA / ALCANCE', 'SCALE / SCOPE') : i === 1 ? t('MÓDULO CLAVE', 'CORE MODULE') : t('OPERACIÓN', 'OPERATION')}</small>
          <strong>{stat}</strong>
        </div>
      ))}
      <div className="detail-arch-stat">
        <small><FiLayers /> STACK</small>
        <strong>{project?.stack?.slice(0, 2).join(' + ')}</strong>
      </div>
    </div>
  </div>;
}
