# Echo Website

Showcase website for the Echo Agent ecosystem, built with React + Vite + Tailwind CSS.

## Features

- 🌙 Dark theme with gradient backgrounds and subtle animations
- 🌍 Bilingual support (Chinese/English) with language toggle
- 📱 Responsive design for all screen sizes
- 🎨 Modern, clean UI showcasing two products:
  - **echo-agent**: Rust AI Agent development framework
  - **EKO**: Production CLI agent built on echo-agent

## Sections

1. **Hero**: Landing section with two product cards
2. **Feature Grid**: 6-card grid showing framework features
3. **Architecture**: Architecture diagram with layered components
4. **Comparison Table**: Feature comparison vs LangGraph/CrewAI/AutoGen
5. **Ecosystem**: Shows relationship between framework and product
6. **Footer**: Links to GitHub repos and documentation

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework

## Project Structure

```
echo-website/
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── Architecture.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── EcosystemSection.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitch.tsx
│   ├── content/             # Bilingual content
│   │   ├── features.zh.ts   # Chinese content
│   │   └── features.en.ts   # English content
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles with Tailwind
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Language Support

The website supports bilingual content with Chinese as the primary language. Use the language toggle button in the top-right corner to switch between Chinese and English.

Content is organized in `src/content/`:
- `features.zh.ts` - Chinese content for all sections
- `features.en.ts` - English content for all sections

## License

MIT
