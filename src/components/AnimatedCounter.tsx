import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  labelZh: string;
  language: 'zh' | 'en';
  color: string;
}

export default function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  label,
  labelZh,
  language,
  color,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return (
    <div
      className="text-center cursor-default group"
      ref={(el) => {
        if (el && !started) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setStarted(true);
                observer.disconnect();
              }
            },
            { threshold: 0.3 }
          );
          observer.observe(el);
        }
      }}
    >
      <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${color} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110`}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm text-zinc-400">
        {language === 'zh' ? labelZh : label}
      </div>
    </div>
  );
}
