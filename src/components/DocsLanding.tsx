import { BookOpen, ChevronRight } from 'lucide-react';
import { getDocCategories, type Language, type Product } from '../docs/registry';
import { getDocsBasePath, withLanguage } from '../routing';

export default function DocsLanding({
  language,
  product,
  onNavigate,
}: {
  language: Language;
  product: Product;
  onNavigate?: (slug: string) => void;
}) {
  const categories = getDocCategories(product);
  const productName = product === 'eko' ? 'EKO' : 'echo-agent';
  return (
    <main className="max-w-5xl px-4 py-8 lg:px-8 lg:py-10">
      <BookOpen aria-hidden="true" className="size-6 text-emerald-300" />
      <h1 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
        {language === 'zh' ? `${productName} 文档` : `${productName} Documentation`}
      </h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
        {language === 'zh'
          ? '从快速开始进入，再按核心概念、工具、任务与参考主题查阅。框架文档由权威源码同步，EKO 文档只描述应用层产品行为。'
          : 'Start with onboarding, then browse concepts, tools, tasks, and references. Framework documentation is synchronized from its authoritative sources; EKO documentation describes application behavior only.'}
      </p>
      <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
        {categories.map((category) => (
          <section key={category.title.en} className="grid gap-4 py-7 md:grid-cols-[13rem_1fr]">
            <h2 className="text-sm font-semibold text-zinc-200">{category.title[language]}</h2>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {category.docs.map((doc) => (
                <li key={doc.slug}>
                  <a
                    href={withLanguage(`${getDocsBasePath(product)}/${doc.slug}`, language)}
                    className="inline-flex min-h-9 items-center gap-2 py-1 text-sm text-emerald-300 hover:text-emerald-200"
                    onClick={
                      onNavigate
                        ? (event) => {
                            event.preventDefault();
                            onNavigate(doc.slug);
                          }
                        : undefined
                    }
                  >
                    {doc.title[language]}
                    <ChevronRight aria-hidden="true" className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
