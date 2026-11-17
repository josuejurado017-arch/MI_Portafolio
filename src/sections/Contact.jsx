import { useRef, useState } from 'react';
import { FiArrowUpRight, FiCheckCircle, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { usePreferences } from '../hooks/usePreferences';
import { profile } from '../utils/content';
import { validateContact } from '../utils/validation';
import { sendContact } from '../services/api';
import { ExternalLink, Reveal } from '../components/UI';
import { SocialLinks } from '../components/Layout';

const initial = { name: '', email: '', subject: '', message: '', website: '' };
export default function Contact() {
  const { t, language } = usePreferences();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const form = useRef(null);
  async function submit(event) {
    event.preventDefault();
    if (status === 'sending') return;
    const next = validateContact(values, language);
    setErrors(next);
    if (Object.keys(next).length) { form.current.elements.namedItem(Object.keys(next)[0]).focus(); return; }
    if (values.website) return;
    if (!profile.contactEndpoint) {
      if (profile.email) { window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(`${values.name} <${values.email}>\n\n${values.message}`)}`; setStatus('mail'); } else setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    try { await sendContact(values); setStatus('success'); setValues(initial); } catch { setStatus('error'); }
  }
  const whatsappHref = profile.whatsapp ? `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(t('Hola Josué, vi tu portafolio y me gustaría conversar sobre un proyecto u oportunidad laboral.', 'Hi Josué, I saw your portfolio and would like to discuss a project or job opportunity.'))}` : '';
  return <section id="contacto" className="section container contact-section"><div className="contact-grid"><Reveal className="contact-copy"><span className="eyebrow"><span />{t('EL SIGUIENTE PASO', 'THE NEXT STEP')}</span><h2>{t('¿Listo para impulsar', 'Ready to launch')}<br /><span className="gradient-text">{t('tu próximo sistema?', 'your next system?')}</span><FiArrowUpRight /></h2><p>{t('Estoy disponible para contrataciones, desarrollo de sistemas a medida (ERP, CRM, acreditación QR, inventario) y colaboraciones remotas o en Tarija.', 'I’m available for full-time roles, custom system development (ERP, CRM, QR accreditation, inventory) and remote or on-site collaborations in Tarija.')}</p><div className="contact-info">{profile.whatsapp && <ExternalLink href={whatsappHref}><FaWhatsapp /><span>+591 75143758 · {t('WhatsApp directo', 'Direct WhatsApp')}</span><FiArrowUpRight /></ExternalLink>}{profile.email && <a href={`mailto:${profile.email}`}><FiMail /><span>{profile.email}</span><FiArrowUpRight /></a>}<span><FiMapPin />Tarija, Bolivia · UTC−4</span></div><SocialLinks /><div className="contact-status"><span className="status-dot" />{t('Respuesta rápida por WhatsApp o correo electrónico', 'Fast response via WhatsApp or email')}</div></Reveal><Reveal className="contact-form-wrap" delay={0.1}><form ref={form} onSubmit={submit} noValidate><h3>{t('Cuéntame sobre tu proyecto', 'Tell me about your project')}<span>↗</span></h3><div className="form-grid">{[['name', t('Nombre', 'Name'), t('Tu nombre', 'Your name'), 'text', 80], ['email', t('Correo electrónico', 'Email address'), 'tu@email.com', 'email', 254], ['subject', t('Asunto', 'Subject'), t('¿En qué puedo ayudarte?', 'How can I help?'), 'text', 120], ['message', t('Mensaje', 'Message'), t('Un poco sobre tu idea, proyecto u oportunidad…', 'A little about your idea, project or opportunity…'), 'textarea', 5000]].map(([name, label, placeholder, type, max]) => <div className={`field ${name === 'subject' || name === 'message' ? 'field-full' : ''}`} key={name}><label htmlFor={name}>{label}<span> *</span></label>{type === 'textarea' ? <textarea id={name} name={name} required rows={5} maxLength={max} placeholder={placeholder} value={values[name]} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} onChange={e => setValues({ ...values, [name]: e.target.value })} /> : <input id={name} name={name} type={type} required autoComplete={name === 'name' || name === 'email' ? name : 'off'} maxLength={max} placeholder={placeholder} value={values[name]} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} onChange={e => setValues({ ...values, [name]: e.target.value })} />}{errors[name] && <span className="field-error" id={`${name}-error`}>{errors[name]}</span>}</div>)}</div><div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" value={values.website} onChange={e => setValues({ ...values, website: e.target.value })} tabIndex={-1} autoComplete="off" /></div><button className="button button-primary submit-button" disabled={status === 'sending'} type="submit">{status === 'sending' ? t('Enviando…', 'Sending…') : t('Enviar mensaje', 'Send message')}{status === 'sending' ? <span className="spinner" /> : <FiSend />}</button><div className={`form-status ${status}`} role="status">{status === 'success' && <><FiCheckCircle />{t('¡Mensaje enviado! Gracias por ponerte en contacto.', 'Message sent! Thanks for getting in touch.')}</>}{status === 'error' && t('No se pudo enviar el mensaje. Inténtalo otra vez o utiliza el correo directo.', 'Could not send the message. Please retry or use the direct email link.')}{status === 'mail' && t('Se solicitó abrir tu aplicación de correo. Completa el envío allí.', 'Your email app was requested to open. Complete sending there.')}{status === 'unconfigured' && t('El canal de contacto todavía no está configurado. El mensaje no se ha enviado.', 'The contact channel is not configured yet. Your message has not been sent.')}</div><p className="form-note">{profile.contactEndpoint ? t('Tus datos se utilizan únicamente para responder tu consulta.', 'Your details are used only to respond to your inquiry.') : profile.email ? t('El envío se completará en tu aplicación de correo.', 'Sending will be completed in your email app.') : t('Canal de envío pendiente de configuración.', 'Delivery channel pending configuration.')}</p></form></Reveal></div></section>;
}
