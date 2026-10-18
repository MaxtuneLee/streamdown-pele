# @maxtune/streamdown-pele

A [Streamdown](https://streamdown.ai) plugin that renders `mermaid` code blocks with [Pele](https://pele.run).

This package is a adapter for Steamdown. All parsing, layout, and SVG output come from [Pele](https://github.com/obsidianmd/pele) by [kepano](https://github.com/kepano).

## Comparison

Streamdown's default `@streamdown/mermaid` plugin runs Mermaid.js. Pele is much smaller and renders synchronously. In our measurements in Chromium (gzip, diagrams loaded on demand):

|                                                   | `@streamdown/mermaid` | `@maxtune/streamdown-pele` |
| ------------------------------------------------- | --------------------- | ----------------- |
| First load                                        | about 160 kB          | about 10 kB       |
| Flowchart, sequence, class, state, and pie loaded | about 419 kB          | about 91 kB       |
| Every diagram type loaded                         | about 863 kB          | about 270 kB      |
| Flowchart render, repeated                        | about 37 ms           | about 1.2 ms      |

## Install

```sh
pnpm add @maxtune/streamdown-pele streamdown
npm install @maxtune/streamdown-pele streamdown
yarn add @maxtune/streamdown-pele streamdown
bun add @maxtune/streamdown-pele streamdown
```

## Usage

```tsx
import { Streamdown } from "streamdown";
import { pele } from "@maxtune/streamdown-pele";

export function Message({ children }: { children: string }) {
  return <Streamdown plugins={{ mermaid: pele }}>{children}</Streamdown>;
}
```

To pass Pele render options, create the plugin yourself:

```ts
import { createPelePlugin } from "@maxtune/streamdown-pele";

const mermaid = createPelePlugin({
  options: { fontSize: 14, responsive: true },
});
```

See Pele's [API reference](https://pele.run/api) for the available options.

## Theming

Pele reads its colors and fonts from CSS variables, so diagrams follow your theme without rendering again. Set them on `.pele` or any ancestor:

```css
.streamdown {
  --pele-bg: transparent;
  --pele-fg: #1f2328;
  --pele-muted: #59636e;
  --pele-line: #8c959f;
  --pele-surface: #f6f8fa;
  --pele-surface-alt: #eaeef2;
  --pele-border: #d1d9e0;
  --pele-accent: #0969da;
}
```

Charts also use `--pele-series-1` through `--pele-series-8`.

## License

MIT.
