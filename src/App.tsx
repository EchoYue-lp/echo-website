import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import Architecture from './components/Architecture';
import ComparisonTable from './components/ComparisonTable';
import EchoCoWorkFeatures from './components/EchoCoWorkFeatures';
import EchoCoWorkUseCases from './components/EchoCoWorkUseCases';
import DocsPage from './components/DocsPage';
import Footer from './components/Footer';

import {
  frameworkHeroZh, productHeroZh,
  comparisonZh,
  echocoworkFeaturesZh, echocoworkUseCasesZh,
  footerZh,
} from './content/features.zh';

import {
  frameworkHeroEn, productHeroEn,
  comparisonEn,
  echocoworkFeaturesEn, echocoworkUseCasesEn,
  footerEn,
} from './content/features.en';

type Language = 'zh' | 'en';
type Product = 'echo-agent' | 'echocowork';

const pageTitles: Record<string, Record<Language, string>> = {
  'echo-agent-home': {
    zh: 'echo-agent — 高性能 Rust AI Agent 框架 | 从零到一新手友好',
    en: 'echo-agent — High-Performance Rust AI Agent Framework | Beginner Friendly',
  },
  'echocowork-home': {
    zh: 'EchoCoWork — 编码·学术研究·数据分析·医学研究 AI Agent',
    en: 'EchoCoWork — Coding · Academic Research · Data Analysis · Medical Research AI Agent',
  },
  'docs': {
    zh: '文档 — echo-agent 高性能 AI Agent 框架',
    en: 'Docs — echo-agent High-Performance AI Agent Framework',
  },
};

const pageDescriptions: Record<string, Record<Language, string>> = {
  'echo-agent-home': {
    zh: 'echo-agent 是基于 Rust 的高性能 AI Agent 开发框架，从零到一新手友好。提供 ReAct 引擎、DAG 任务编排、67+ 内置工具（MCP/LSP/Web/Data/Git）、多 Agent 编排和自检改进化循环。性能比 Python 框架快 10-100 倍，内存安全无数据竞争。',
    en: 'echo-agent is a high-performance Rust AI Agent framework, beginner-friendly from zero to one. Features ReAct engine, DAG task orchestration, 67+ built-in tools (MCP/LSP/Web/Data/Git), multi-agent orchestration, and self-improvement loop. 10-100x faster than Python frameworks with memory safety.',
  },
  'echocowork-home': {
    zh: 'EchoCoWork 是基于 echo-agent 构建的生产级 Agent，简单易用、功能完备。专注于编码（代码生成、审查、重构）、学术研究（文献检索、论文写作）、数据处理与分析（统计、可视化）、医学研究（PubMed、临床试验）四大核心场景。',
    en: 'EchoCoWork is a production-grade agent built on echo-agent, simple and feature-complete. Focused on four core scenarios: coding (generation, review, refactoring), academic research (literature search, paper writing), data analysis (statistics, visualization), and medical research (PubMed, clinical trials).',
  },
  'docs': {
    zh: 'echo-agent 完整文档 — 快速开始、核心概念、ReAct 引擎、工具系统、记忆管理、DAG 任务编排、多 Agent、MCP 协议、LSP 集成、插件系统、安全模型。',
    en: 'echo-agent complete documentation — quick start, core concepts, ReAct engine, tool system, memory management, DAG task orchestration, multi-agent, MCP protocol, LSP integration, plugin system, security model.',
  },
};

// ── Page Components ──────────────────────────────────────────────────────────

function HomePage({ language, product }: {
  language: Language;
  product: Product;
}) {
  const isZh = language === 'zh';
  const frameworkHero = isZh ? frameworkHeroZh : frameworkHeroEn;
  const productHero = isZh ? productHeroZh : productHeroEn;

  // Update meta tags
  useEffect(() => {
    const key = `${product}-home`;
    document.title = pageTitles[key]?.[language] ?? 'Echo';
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', pageDescriptions[key]?.[language] ?? '');
    }
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [product, language]);

  return (
    <main>
      <Hero
        language={language}
        product={product}
        frameworkHero={frameworkHero}
        productHero={productHero}
      />
      {product === 'echo-agent' ? (
        <>
          <FeatureGrid language={language} />
          <Architecture language={language} />
          <ComparisonTable
            title={isZh ? comparisonZh.title : comparisonEn.title}
            subtitle={isZh ? comparisonZh.subtitle : comparisonEn.subtitle}
            headers={isZh ? comparisonZh.headers : comparisonEn.headers}
            rows={isZh ? comparisonZh.rows : comparisonEn.rows}
            advantages={isZh ? comparisonZh.advantages : comparisonEn.advantages}
          />
        </>
      ) : (
        <>
          <EchoCoWorkFeatures
            title={isZh ? echocoworkFeaturesZh.title : echocoworkFeaturesEn.title}
            subtitle={isZh ? echocoworkFeaturesZh.subtitle : echocoworkFeaturesEn.subtitle}
            features={isZh ? echocoworkFeaturesZh.features : echocoworkFeaturesEn.features}
          />
          <EchoCoWorkUseCases
            title={isZh ? echocoworkUseCasesZh.title : echocoworkUseCasesEn.title}
            subtitle={isZh ? echocoworkUseCasesZh.subtitle : echocoworkUseCasesEn.subtitle}
            cases={isZh ? echocoworkUseCasesZh.cases : echocoworkUseCasesEn.cases}
            quickStart={isZh ? echocoworkUseCasesZh.quickStart : echocoworkUseCasesEn.quickStart}
          />
        </>
      )}
    </main>
  );
}

function DocsRoute({ language }: { language: Language }) {
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    document.title = pageTitles['docs']?.[language] ?? 'Docs — Echo';
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', pageDescriptions['docs']?.[language] ?? '');
    }
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  return <DocsPage language={language} initialSlug={slug} />;
}

// ── App Shell ────────────────────────────────────────────────────────────────

function AppShell() {
  const [language, setLanguage] = useState<Language>('zh');
  const [product, setProduct] = useState<Product>('echo-agent');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => setLanguage(l => l === 'zh' ? 'en' : 'zh');

  const isDocsView = location.pathname.startsWith('/docs');
  const isEchoCoWork = location.pathname.startsWith('/echocowork');

  // Sync product state with URL
  useEffect(() => {
    if (isEchoCoWork) {
      setProduct('echocowork');
    } else if (!isDocsView) {
      setProduct('echo-agent');
    }
  }, [isEchoCoWork, isDocsView]);

  const handleSwitchView = (view: 'home' | 'docs') => {
    if (view === 'docs') {
      navigate('/docs');
    } else {
      navigate(product === 'echocowork' ? '/echocowork' : '/');
    }
    window.scrollTo(0, 0);
  };

  const handleSwitchProduct = (p: Product) => {
    setProduct(p);
    if (isDocsView) {
      // Stay on docs but could switch to product-specific docs
    } else {
      navigate(p === 'echocowork' ? '/echocowork' : '/');
    }
    window.scrollTo(0, 0);
  };

  const isZh = language === 'zh';
  const footerProduct = isEchoCoWork ? 'echocowork' : 'echo-agent';

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar
        language={language}
        product={product}
        view={isDocsView ? 'docs' : 'home'}
        onToggleLanguage={toggleLanguage}
        onSwitchProduct={handleSwitchProduct}
        onSwitchView={handleSwitchView}
      />

      <Routes>
        <Route path="/" element={
          <HomePage language={language} product={product} />
        } />
        <Route path="/echocowork" element={
          <HomePage language={language} product="echocowork" />
        } />
        <Route path="/docs" element={<DocsRoute language={language} />} />
        <Route path="/docs/:slug" element={<DocsRoute language={language} />} />
        <Route path="/echocowork/docs" element={<DocsRoute language={language} />} />
        <Route path="/echocowork/docs/:slug" element={<DocsRoute language={language} />} />
      </Routes>

      {!isDocsView && (
        <Footer
          product={footerProduct}
          description={isZh ? footerZh.description : footerEn.description}
          links={isZh ? footerZh.links : footerEn.links}
          items={isZh ? footerZh.items : footerEn.items}
          githubUrl={isZh ? footerZh.githubUrl : footerEn.githubUrl}
          copyright={isZh ? footerZh.copyright : footerEn.copyright}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
