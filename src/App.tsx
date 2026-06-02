import { useState, useEffect } from 'react';
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
type View = 'home' | 'docs';

const pageTitles: Record<string, Record<Language, string>> = {
  'echo-agent-home': {
    zh: 'echo-agent — Rust AI Agent 开发框架',
    en: 'echo-agent — Rust AI Agent Framework',
  },
  'echocowork-home': {
    zh: 'EchoCoWork — 你的 AI 协作伙伴',
    en: 'EchoCoWork — Your AI Collaboration Partner',
  },
  'docs': {
    zh: '文档 — Echo Agent',
    en: 'Docs — Echo Agent',
  },
};

const pageDescriptions: Record<string, Record<Language, string>> = {
  'echo-agent-home': {
    zh: '基于 Rust 的生产级 AI Agent 开发框架，提供 ReAct 引擎、DAG 任务编排、自检改进化循环、67+ 内置工具（MCP/LSP/Web/Data/Git）和多 Agent 编排。',
    en: 'A production-grade Rust AI Agent development framework with ReAct engine, DAG task orchestration, self-improvement loop, 67+ built-in tools (MCP/LSP/Web/Data/Git), and multi-agent orchestration.',
  },
  'echocowork-home': {
    zh: '基于 echo-agent 构建的生产级 Agent 产品，专注于编码、数据分析、文献检索和学术论文写作四大核心场景，支持 Human-in-the-Loop 交互。',
    en: 'A production-grade agent product built on echo-agent, focused on four core scenarios: coding, data analysis, literature search, and academic paper writing, with human-in-the-loop interaction.',
  },
  'docs': {
    zh: 'Echo Agent 完整文档 — 快速开始、核心概念、框架功能、工具集成和 API 参考。',
    en: 'Complete Echo Agent documentation — quick start, core concepts, framework features, integrations, and API reference.',
  },
};

function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [product, setProduct] = useState<Product>('echo-agent');
  const [view, setView] = useState<View>('home');

  // Parse URL hash for initial docs slug
  useEffect(() => {
    if (window.location.hash === '#docs') {
      setView('docs');
    }
  }, []);

  const toggleLanguage = () => setLanguage(l => l === 'zh' ? 'en' : 'zh');
  const isZh = language === 'zh';

  // Dynamic document title and meta description
  useEffect(() => {
    const key = view === 'docs' ? 'docs' : `${product}-home`;
    document.title = pageTitles[key]?.[language] ?? 'Echo';
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', pageDescriptions[key]?.[language] ?? '');
    }
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [product, language, view]);

  // Select hero data based on product AND language
  const frameworkHero = isZh ? frameworkHeroZh : frameworkHeroEn;
  const productHero = isZh ? productHeroZh : productHeroEn;

  const handleSwitchView = (v: View) => {
    setView(v);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar
        language={language}
        product={product}
        view={view}
        onToggleLanguage={toggleLanguage}
        onSwitchProduct={setProduct}
        onSwitchView={handleSwitchView}
      />

      {view === 'docs' ? (
        <DocsPage language={language} />
      ) : (
        <main>
          {product === 'echo-agent' ? (
            <>
              <Hero
                language={language}
                product={product}
                frameworkHero={frameworkHero}
                productHero={productHero}
              />
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
              <Hero
                language={language}
                product={product}
                frameworkHero={frameworkHero}
                productHero={productHero}
              />
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
      )}

      {view !== 'docs' && (
        <Footer
          product={product}
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

export default App;
