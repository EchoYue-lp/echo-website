interface FooterItem {
  label: string;
  href: string;
}

interface FooterProps {
  product: 'echo-agent' | 'eko';
  description: string;
  links: Record<string, string>;
  items: Record<string, FooterItem[]>;
  githubUrl: string;
  copyright: string;
}

export default function Footer({ product, description, links, items, githubUrl, copyright }: FooterProps) {
  const linkKeys = Object.keys(links);

  return (
    <footer aria-label="Site footer" className="relative bg-zinc-950 border-t border-zinc-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top section */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              {product === 'echo-agent' ? 'echo-agent' : 'EKO'}
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Link columns */}
          {linkKeys.map((key) => (
            <div key={key}>
              <h4 className="font-bold text-white mb-4">{links[key]}</h4>
              <ul className="space-y-2">
                {(items[key] || []).map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-zinc-500">{copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
