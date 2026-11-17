export function validateContact(values, language = 'es') {
  const errors = {};
  const t = (es, en) => language === 'es' ? es : en;
  if (values.name.trim().length < 2 || values.name.trim().length > 80) errors.name = t('Escribe un nombre de 2 a 80 caracteres.', 'Enter a name between 2 and 80 characters.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254) errors.email = t('Escribe un correo electrónico válido.', 'Enter a valid email address.');
  if (values.subject.trim().length < 3 || values.subject.trim().length > 120) errors.subject = t('El asunto debe tener de 3 a 120 caracteres.', 'Subject must have 3–120 characters.');
  if (values.message.trim().length < 20 || values.message.trim().length > 5000) errors.message = t('El mensaje debe tener de 20 a 5000 caracteres.', 'Message must have 20–5000 characters.');
  return errors;
}
