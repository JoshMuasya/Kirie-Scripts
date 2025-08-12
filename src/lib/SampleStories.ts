import { Story } from "./types";

const author = {
    id: "kirie",
    name: "Kirie",
    avatarUrl: undefined,
    bio: "Engineer writing scripts, systems, and stories.",
};

export const sampleStories: Story[] = [
  {
    id: "1",
    title: "Designing Dark UIs that Feel Effortless",
    slug: "designing-dark-uis",
    excerpt: "Guidelines and techniques to build readable, elegant dark interfaces without sacrificing contrast.",
    content: `# Designing Dark UIs

Dark themes are more than inverted colors. In this post we explore:

- Contrast and readability
- Elevation without heavy shadows
- Accents that guide attention

## Tokens First
Define semantic tokens, then compose components.

> Good design systems make dark effortless.

### Sample Code

\`\`\`ts
const tokens = {
  background: '0 0% 2%',
  primary: '280 78% 23%',
};
\`\`\`
`,
    author,
    publishedAt: new Date().toISOString(),
    tags: ["design", "dark-mode", "ui"],
    featured: true,
    images: [
      { url: "/images/kirie-hero.jpg", width: 1280, height: 768, alt: "Dark minimal hero with purple accents", caption: "Kirie Scripts aesthetic" },
      { url: "/images/kirie-ui-1.jpg", width: 1280, height: 768, alt: "Dark UI mock with cards", caption: "Layered elevation" },
    ],
    ogImage: "/images/kirie-hero.jpg",
  },
  {
    id: "2",
    title: "Small Animations, Big Perceived Performance",
    slug: "micro-interactions-framer-motion",
    excerpt: "Using Framer Motion to add polish: page transitions, card reveals, and hover states.",
    content: `# Micro-interactions with Motion

Subtle animations create flow. We'll use Framer Motion to:

1. Reveal cards as they enter the viewport
2. Add graceful page transitions
3. Animate galleries and dialogs

> Motion should support content, not distract from it.`,
    author,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ["animation", "framer-motion"],
    images: [
      { url: "/images/kirie-graph-1.jpg", width: 1280, height: 768, alt: "Network nodes with glow", caption: "Flow and continuity" },
      { url: "/images/kirie-dark-1.jpg", width: 1280, height: 768, alt: "Dark gradient wallpaper", caption: "Understated motion" },
    ],
    ogImage: "/images/kirie-graph-1.jpg",
  },
  {
    id: "3",
    title: "Readable Code Snippets in Dark Themes",
    slug: "readable-code-snippets",
    excerpt: "Tips for typography, spacing, and contrast that make code shine in dark mode.",
    content: `# Code Snippets in Dark

Typography choices matter. Prefer font sizes that breathe and avoid low-contrast colors.

- Use semantic tokens
- Highlight important lines
- Keep backgrounds calm`,
    author,
    publishedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    tags: ["typography", "code"],
    images: [
      { url: "/images/kirie-code-1.jpg", width: 1280, height: 768, alt: "Abstract code lines on dark", caption: "Calm contrast" },
      { url: "/images/kirie-code-2.jpg", width: 1280, height: 768, alt: "Terminal-like code window", caption: "Focus on content" },
    ],
    ogImage: "/images/kirie-code-1.jpg",
  },
];