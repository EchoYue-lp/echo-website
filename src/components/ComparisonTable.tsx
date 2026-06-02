import ScrollReveal from './ScrollReveal';

interface ComparisonTableProps {
  title: string;
  subtitle: string;
  headers: string[];
  rows: string[][];
  advantages: { icon: string; title: string; description: string }[];
}

export default function ComparisonTable({ title, subtitle, headers, rows, advantages }: ComparisonTableProps) {
  return (
    <section aria-labelledby="comparison-heading" className="relative py-24 px-4 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 id="comparison-heading" className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-lg text-zinc-400">{subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Table */}
        <ScrollReveal delay={100}>
          <div className="overflow-x-auto">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors duration-300">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-800/50 border-b border-zinc-700">
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className={`px-6 py-4 text-left text-sm font-bold ${
                          index === 1 ? 'text-blue-400' : 'text-zinc-300'
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors duration-200"
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`px-6 py-4 text-sm transition-colors duration-200 ${
                            cellIndex === 0
                              ? 'font-medium text-zinc-300'
                              : cellIndex === 1
                              ? 'text-blue-300 font-medium'
                              : 'text-zinc-400'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        {/* Key advantages */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {advantages.map((adv, i) => (
            <ScrollReveal key={adv.title} delay={200 + i * 100}>
              <div className="group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 h-full hover:-translate-y-1">
                <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">{adv.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{adv.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{adv.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
