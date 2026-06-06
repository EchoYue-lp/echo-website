import TerminalAnimation from './TerminalAnimation';

type Language = 'zh' | 'en';
type Product = 'echo-agent' | 'echocowork';

interface HeroData {
  title: string;
  tagline: string;
  subtitle: string;
  badges: string[];
  cta: { primary: string; secondary: string };
  ctaUrls: { primary: string; secondary: string };
  stats: { value: string; label: string }[];
}

interface HeroProps {
  language: Language;
  product: Product;
  frameworkHero: HeroData;
  productHero: HeroData;
}

export default function Hero({ language, product, frameworkHero, productHero }: HeroProps) {
  const data = product === 'echo-agent' ? frameworkHero : productHero;

  const gradientClass = product === 'echo-agent'
    ? 'from-blue-400 via-cyan-400 to-purple-400'
    : 'from-purple-400 via-pink-400 to-rose-400';

  const accentBorder = product === 'echo-agent'
    ? 'border-blue-500/30'
    : 'border-purple-500/30';

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content — split layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="text-center lg:text-left">
          {/* Badges */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 animate-fade-in">
            {data.badges.map((badge) => (
              <span
                key={badge}
                className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent border ${accentBorder} rounded-full`}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent animate-fade-in`}>
            {data.title}
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
            {data.tagline}
          </p>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {data.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-10 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <a
              href={data.ctaUrls.primary}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={data.cta.primary}
              className={`px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r ${gradientClass} hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5`}
            >
              {data.cta.primary}
            </a>
            <a
              href={data.ctaUrls.secondary}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={data.cta.secondary}
              className="px-6 py-3 rounded-lg font-medium text-zinc-300 border border-zinc-700 hover:border-zinc-500 hover:text-white transition-all hover:-translate-y-0.5"
            >
              {data.cta.secondary}
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center lg:justify-start gap-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
            {data.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Terminal */}
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <TerminalAnimation product={product} language={language} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-zinc-600 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-zinc-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}
