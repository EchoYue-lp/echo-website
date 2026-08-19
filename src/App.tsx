import { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import {
  getDocsBasePath,
  getHomePath,
  getRouteContext,
  languageFromPath,
  stripLanguagePrefix,
  withLanguage,
  type Language,
  type Product,
} from './routing';
import { applyNotFoundMetadata, applyPageMetadata } from './seo';

const DocsPage = lazy(() => import('./components/DocsPage'));

function DocsRoute({ language, product }: { language: Language; product: Product }) {
  const { slug } = useParams<{ slug?: string }>();
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0b0d0c] pt-28 text-center text-zinc-400" role="status">
          {language === 'zh' ? '正在加载文档...' : 'Loading documentation...'}
        </main>
      }
    >
      <DocsPage language={language} product={product} initialSlug={slug} />
    </Suspense>
  );
}

function NotFound({ language }: { language: Language }) {
  useEffect(() => {
    applyNotFoundMetadata(language);
  }, [language]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0d0c] px-5 pt-20">
      <div className="max-w-lg text-center">
        <p className="font-mono text-sm font-semibold text-amber-300">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          {language === 'zh' ? '页面不存在' : 'Page not found'}
        </h1>
        <p className="mt-3 text-zinc-400">
          {language === 'zh' ? '这个地址没有对应的页面。' : 'There is no page at this address.'}
        </p>
        <a
          className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md bg-emerald-300 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-200"
          href={withLanguage('/', language)}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          {language === 'zh' ? '返回首页' : 'Back home'}
        </a>
      </div>
    </main>
  );
}

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const language = languageFromPath(location.pathname);
  const route = getRouteContext(location.pathname);
  const localizedPath = stripLanguagePrefix(location.pathname);
  const knownHome = localizedPath === '/' || localizedPath === '/eko';

  useEffect(() => {
    const legacyLanguage = new URLSearchParams(location.search).get('lang');
    if (legacyLanguage === 'en' && language !== 'en') {
      navigate(withLanguage(`${location.pathname}${location.search}${location.hash}`, 'en'), {
        replace: true,
      });
    }
  }, [language, location.hash, location.pathname, location.search, navigate]);

  useEffect(() => {
    if (knownHome || route.isDocs) {
      applyPageMetadata(route.product, route.isDocs ? 'docs' : 'home', language, location.pathname);
    }
  }, [knownHome, language, location.pathname, route.isDocs, route.product]);

  const toggleLanguage = () => {
    const nextLanguage: Language = language === 'zh' ? 'en' : 'zh';
    navigate(withLanguage(`${location.pathname}${location.search}${location.hash}`, nextLanguage), {
      replace: true,
    });
  };

  const handleSwitchView = (view: 'home' | 'docs') => {
    const path = view === 'docs' ? getDocsBasePath(route.product) : getHomePath(route.product);
    navigate(withLanguage(path, language));
    window.scrollTo(0, 0);
  };

  const handleSwitchProduct = (product: Product) => {
    const path = route.isDocs ? getDocsBasePath(product) : getHomePath(product);
    navigate(withLanguage(path, language));
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#0b0d0c]">
      <Navbar
        language={language}
        product={route.product}
        view={route.isDocs ? 'docs' : 'home'}
        onToggleLanguage={toggleLanguage}
        onSwitchProduct={handleSwitchProduct}
        onSwitchView={handleSwitchView}
      />
      <Routes>
        <Route path="/" element={<HomePage language="zh" product="echo-agent" />} />
        <Route path="/en" element={<HomePage language="en" product="echo-agent" />} />
        <Route path="/eko" element={<HomePage language="zh" product="eko" />} />
        <Route path="/en/eko" element={<HomePage language="en" product="eko" />} />
        <Route path="/docs/:slug?" element={<DocsRoute language="zh" product="echo-agent" />} />
        <Route path="/en/docs/:slug?" element={<DocsRoute language="en" product="echo-agent" />} />
        <Route path="/eko/docs/:slug?" element={<DocsRoute language="zh" product="eko" />} />
        <Route path="/en/eko/docs/:slug?" element={<DocsRoute language="en" product="eko" />} />
        <Route path="*" element={<NotFound language={language} />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
