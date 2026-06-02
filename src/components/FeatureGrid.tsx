import { featuresZh } from '../content/features.zh';
import { featuresEn } from '../content/features.en';
import ScrollReveal from './ScrollReveal';

interface FeatureGridProps {
  language: 'zh' | 'en';
}

export default function FeatureGrid({ language }: FeatureGridProps) {
  const content = language === 'zh' ? featuresZh : featuresEn;

  return (
    <section aria-labelledby="features-heading" className="relative py-24 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {content.title}
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 80} direction={index % 3 === 0 ? 'left' : index % 3 === 2 ? 'right' : 'up'}>
              <div className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-300 h-full hover:-translate-y-1">
                {/* Glow effect */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />

                {/* Icon */}
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>

                {/* Description */}
                <p className="text-zinc-400 mb-4 leading-relaxed">{feature.description}</p>

                {/* Highlight badge */}
                <div className="inline-block px-3 py-1 text-xs font-medium bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300">
                  {feature.highlight}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
