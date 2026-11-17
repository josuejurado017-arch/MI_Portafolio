import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiGithub, FiStar, FiGitBranch, FiActivity, FiRefreshCw } from 'react-icons/fi';
import { usePreferences } from '../hooks/usePreferences';
import { fetchGithub } from '../services/api';
import { profile } from '../utils/content';
import { ExternalLink, Reveal, SectionHeading } from '../components/UI';

export default function Github() {
  const { t, language } = usePreferences();
  const [state, setState] = useState({ loading: Boolean(profile.github), data: null, error: '' });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!profile.github) return;
    const controller = new AbortController();
    setState({ loading: true, data: null, error: '' });
    fetchGithub(profile.github, controller.signal).then(data => setState({ loading: false, data, error: '' })).catch(error => { if (!controller.signal.aborted) setState({ loading: false, data: null, error: error.response?.status === 403 || error.response?.status === 429 ? 'limit' : 'network' }); });
    return () => controller.abort();
  }, [attempt]);
  const data = state.data;
  const pushes = data?.events.filter(e => e.type === 'PushEvent') || [];
  return <section id="github" className="section github-section"><div className="container"><Reveal><SectionHeading eyebrow="OPEN SOURCE & GITHUB" title={t('El código también', 'The code also')} accent={t('cuenta mi historia.', 'tells my story.')} description={t('Repositorios, experimentos y aprendizaje en público.', 'Repositories, experiments and learning in public.')} >{profile.github && <ExternalLink href={`https://github.com/${profile.github}`} className="button button-secondary"><FiGithub />GitHub<FiArrowUpRight /></ExternalLink>}</SectionHeading></Reveal>
    {!profile.github ? <div className="github-empty"><div className="github-orbit"><FiGithub /></div><div><h3>{t('Siempre hay algo nuevo por construir.', 'There’s always something new to build.')}</h3><p>{t('Mi actividad y repositorios públicos estarán disponibles aquí al conectar mi perfil de GitHub.', 'My public activity and repositories will appear here once my GitHub profile is connected.')}</p><span className="code-label">git commit -m "never stop learning"<span className="typing-caret" /></span></div><FiGitBranch className="github-branch" /></div> : <div aria-live="polite" aria-busy={state.loading}>{state.loading && <div className="loading-state"><span className="spinner" />{t('Cargando actividad de GitHub…', 'Loading GitHub activity…')}</div>}{state.error && <div className="error-state"><p>{state.error === 'limit' ? t('GitHub ha limitado las consultas. Intenta de nuevo más tarde.', 'GitHub has rate-limited requests. Try again later.') : t('No se pudo cargar GitHub. Revisa la conexión o el usuario configurado.', 'Could not load GitHub. Check your connection or configured username.')}</p><button className="button button-secondary" onClick={() => setAttempt(a => a + 1)}><FiRefreshCw />{t('Reintentar', 'Retry')}</button></div>}{data && <><div className="github-summary"><span><FiGithub />{data.account.public_repos} {t('repositorios públicos', 'public repositories')}</span><span><FiCodeLanguages />{[...new Set(data.repos.map(r => r.language).filter(Boolean))].join(' · ') || t('Sin lenguajes detectados', 'No languages detected')}</span><span><FiActivity />{pushes.length} {t('eventos de push recientes', 'recent push events')}</span></div><div className="repo-grid">{data.repos.map(repo => <ExternalLink className="repo-card" href={repo.html_url} key={repo.id}><div><FiGithub /><FiArrowUpRight /></div><h3>{repo.name}</h3><p>{repo.description || t('Explora el código de este repositorio.', 'Explore the code in this repository.')}</p><span>{repo.language || '—'}<span><FiStar />{repo.stargazers_count}</span></span></ExternalLink>)}</div>{!data.repos.length && <p>{t('Este perfil aún no tiene repositorios públicos.', 'This profile has no public repositories yet.')}</p>}<div className="activity-list"><h3>{t('Actividad y commits recientes', 'Recent activity & commits')}</h3>{pushes.length ? pushes.slice(0, 4).map(event => <ExternalLink key={event.id} href={`https://github.com/${event.repo.name}/commits`}><FiGitBranch /><span>{event.repo.name}<small>{t('Ver commits del repositorio', 'View repository commits')}</small></span><time>{new Date(event.created_at).toLocaleDateString(language)}</time><FiArrowUpRight /></ExternalLink>) : <p>{t('No hay eventos de push en la actividad pública reciente.', 'No push events in recent public activity.')}</p>}</div><p className="stack-note">{t('Hasta 6 repositorios y 30 eventos públicos recientes. La API pública no ofrece un total histórico de commits.', 'Up to 6 repositories and 30 recent public events. The public API does not provide an all-time commit count.')}</p></>}</div>}
  </div></section>;
}

function FiCodeLanguages() { return <span aria-hidden="true">&lt;/&gt;</span>; }
