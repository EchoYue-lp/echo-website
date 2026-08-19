import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const root = document.getElementById('root');
if (root) {
  // Static HTML is the crawlable no-JS projection. The interactive app owns a
  // different loading lifecycle, so replace it explicitly instead of claiming
  // hydration compatibility and emitting mismatch warnings.
  root.replaceChildren();
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
