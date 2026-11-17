import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import App from './App';
import { PreferencesProvider } from './hooks/usePreferences';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PreferencesProvider>
        <MotionConfig reducedMotion="user"><App /></MotionConfig>
      </PreferencesProvider>
    </BrowserRouter>
  </StrictMode>,
);
