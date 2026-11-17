import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCode, FiGrid, FiUsers, FiBarChart2, FiSettings } from 'react-icons/fi';
import { usePreferences } from '../hooks/usePreferences';
import { profile } from '../utils/content';

export function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55, delay }}>{children}</motion.div>;
}

export function SectionHeading({ eyebrow, title, accent, description, children }) {
  return <div className="section-heading"><div><span className="eyebrow"><span />{eyebrow}</span><h2>{title} <span className="muted-heading">{accent}</span></h2>{description && <p>{description}</p>}</div>{children}</div>;
}

export function ExternalLink({ href, children, className = '', ...props }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

export function ProjectPreview({ variant = 'purple', large = false, project = null }) {
  const { t } = usePreferences();
  const domain = project?.previewMeta?.domain || (variant === 'purple' ? 'remime.erp / producción' : variant === 'blue' ? 'citiwide.cba / check-in' : 'vitiscan.iot / telemetría');
  const stats = project?.previewMeta?.stats || (variant === 'purple' ? ['22', '32', '94%'] : variant === 'blue' ? ['380+', '86', '98%'] : ['20', '12', '99%']);
  const isCba = Boolean(project?.institution);

  return <div className={`project-preview ${variant} ${large ? 'preview-large' : ''}`} role="img" aria-label={t('Vista conceptual de la arquitectura del sistema', 'Conceptual system architecture preview')}>
    <div className="preview-glow" />
    {isCba && <span className="cba-preview-badge"><img src={profile.cbaLogo} alt="CBA Tarija" width="76" height="22" /></span>}
    <div className="mini-app" aria-hidden="true">
      <div className="mini-sidebar"><div className="mini-brand"><FiCode /></div><FiGrid /><FiUsers /><FiBarChart2 /><FiSettings /><span className="mini-avatar" /></div>
      <div className="mini-main"><div className="mini-top"><span>{domain}</span><span className="mini-avatar" /></div>
        <div className="mini-welcome"><strong>{t('Panel operativo', 'Operational dashboard')}</strong><span>···</span></div>
        <div className="mini-metrics">{[0, 1, 2].map((n) => <div key={n}><span className="skeleton short" /><strong>{stats[n]}</strong><span className="mini-trend">↗ {n + 8}.4%</span></div>)}</div>
        <div className="mini-charts"><div className="mini-chart"><span className="skeleton short" /><div className="bars">{[35, 55, 43, 75, 60, 86, 72, 95, 80, 100, 88, 115].map((h, i) => <i key={i} style={{ height: `${h / 1.5}%` }} />)}</div></div><div className="mini-donut"><div /><span className="skeleton" /></div></div>
        <div className="mini-table">{[1, 2, 3].map(n => <div key={n}><span className="mini-avatar" /><span className="skeleton" /><span className="skeleton short" /><span className="mini-pill" /></div>)}</div>
      </div>
    </div>
    <span className="preview-caption">{isCba ? t('SISTEMA INSTITUCIONAL · CBA TARIJA', 'INSTITUTIONAL SYSTEM · CBA TARIJA') : t('ARQUITECTURA DE INTERFAZ', 'INTERFACE ARCHITECTURE')} <FiArrowUpRight /></span>
  </div>;
}
