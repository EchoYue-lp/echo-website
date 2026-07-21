import ScrollReveal from './ScrollReveal';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface EKOFeaturesProps {
  title: string;
  subtitle: string;
  features: Feature[];
}

export default function EKOFeatures({ title, subtitle, features }: EKOFeaturesProps) {
  return (
    <section aria-labelledby="eko-features-heading" className="py-24 px-4 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 id="eko-features-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-zinc-400 text-lg">{subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 80} direction={index % 3 === 0 ? 'left' : index % 3 === 2 ? 'right' : 'up'}>
              <div className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 h-full hover:-translate-y-1">
                {/* Glow */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none" />

                {/* Icon */}
                <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110">{feature.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
