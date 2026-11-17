import { createContext, useContext, useEffect, useState } from 'react';

const Preferences = createContext(null);
const readPreference = (key, fallback) => {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
};

export function PreferencesProvider({ children }) {
  const [language, setLanguage] = useState(() => readPreference('language', 'es') === 'en' ? 'en' : 'es');
  const [theme, setTheme] = useState(() => readPreference('theme', 'dark') === 'light' ? 'light' : 'dark');
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#080b12' : '#f6f8fc';
    try { localStorage.setItem('language', language); localStorage.setItem('theme', theme); } catch { /* Private browsing can restrict storage. */ }
  }, [language, theme]);
  const t = (es, en) => language === 'es' ? es : en;
  return <Preferences.Provider value={{ language, setLanguage, theme, setTheme, t }}>{children}</Preferences.Provider>;
}

// Shared preferences keep every section and project page in the same language.
// eslint-disable-next-line react-refresh/only-export-components
export const usePreferences = () => useContext(Preferences);
