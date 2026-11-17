import { Link } from 'react-router-dom';
import { usePreferences } from '../hooks/usePreferences';
export default function NotFound() {
  const { t } = usePreferences();
  return <div className="not-found container"><span className="gradient-text">404</span><h1>{t('Esta página aún no tiene código.', 'This page has no code yet.')}</h1><p>{t('La ruta que buscas no existe. Volvamos al inicio.', 'The route you’re looking for does not exist. Let’s go home.')}</p><Link className="button button-primary" to="/">{t('Volver al inicio', 'Back home')} ↗</Link></div>;
}
