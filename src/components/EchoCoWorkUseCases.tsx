import ScrollReveal from './ScrollReveal';

interface UseCase {
  icon: string;
  title: string;
  tagline?: string;
  description: string;
  highlights: string[];
  color: string;
}

interface QuickStart {
  title: string;
  steps: { cmd: string; desc: string }[];
}

interface EchoCoWorkUseCasesProps {
  title: string;
  subtitle: string;
  cases: UseCase[];
  quickStart: QuickStart;
}

export default function EchoCoWorkUseCases({ title, subtitle, cases, quickStart }: EchoCoWorkUseCasesProps) {
  return (
    <section aria-labelledby="echocowork-usecases-heading" className="py-24 px-4 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 id="echocowork-usecases-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-zinc-400 text-lg">{subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Use case cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
          {cases.map((c, index) => (
            <ScrollReveal key={c.title} delay={index * 150}>
              <div className="group relative bg-zinc-950/60 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-600 transition-all duration-300 h-full hover:-translate-y-1">
                {/* Glow */}
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />

                {/* Icon + title */}
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{c.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-1">{c.title}</h3>
                {c.tagline && (
                  <p className={`text-sm font-medium bg-gradient-to-r ${c.color} bg-clip-text text-transparent mb-3`}>
                    {c.tagline}
                  </p>
                )}
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{c.description}</p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${c.color} flex-shrink-0`} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Quick Start */}
        <ScrollReveal>
          <h3 className="text-2xl font-bold text-white text-center mb-8">{quickStart.title}</h3>
        </ScrollReveal>
        <div className="max-w-3xl mx-auto space-y-4">
          {quickStart.steps.map((step, index) => (
            <ScrollReveal key={step.cmd} delay={index * 100} direction="left">
              <div className="group flex items-center gap-4 bg-zinc-950/60 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-0.5">
                {/* Step number */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110">
                  {index + 1}
                </div>
                {/* Command */}
                <code className="text-sm text-cyan-400 font-mono flex-1 truncate">{step.cmd}</code>
                {/* Description */}
                <span className="text-sm text-zinc-500 flex-shrink-0">{step.desc}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
