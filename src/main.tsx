import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';
import { SiteContentProvider } from './context/SiteContentContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteContentProvider>
      <App />
    </SiteContentProvider>
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
);
