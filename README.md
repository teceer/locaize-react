# Locaize - React Library

> **Note**: Locaize has not been officially released yet. This README is a placeholder for future releases. Stay tuned for future updates.

## Introduction

Locaize simplifies internationalization (i18n) and localization (l10n) in React applications. It automatically generates translations during both development and production, offering seamless multilingual support with minimal developer effort.

Translations are stored in Locaize's Redis-based storage and are served dynamically on request. A web platform for manually editing translations will be available soon.

## Features

- **Automatic Translations**: Content is translated dynamically without manual intervention.
- **Wide Language Support**: Multiple languages available out of the box.
- **Optimized for Developer Experience**: Seamless integration and easy-to-use API.
- **Efficient Storage**: Translations are cached and served via Redis for fast access.
- **Dynamic Value Support (Coming Soon)**: Anonymized parameter translation (support for non-anonymized parameters coming soon!).
- **Web Platform (Coming Soon)**: Manual translation editing for greater control.

## Installation

Install Locaize React using your preferred package manager:

```bash
npm install @locaize/react
```

```bash
yarn add @locaize/react
```

```bash
pnpm add @locaize/react
```

## Usage

### Initializing Locaize

```typescript
// utils.ts
import { createLocaizeClient } from "@locaize/react";

const locaize = createLocaizeClient({ apiKey: "YOUR_API_KEY" });
export const slc = locaize.serverSide();
export const clc = locaize.clientSide();
```

### Wrapping Your App

```tsx
import { LanguageProvider } from "@locaize/react";

<LanguageProvider language="en-US">
  <App />
</LanguageProvider>;
```

### Using Translations in Components

```tsx
import { SelectLanguage } from "@locaize/react";
import { clc } from "@/lib/utils";

<main>
  <SelectLanguage />
  <h1>{clc`Hello, ${user.name}!`}</h1>
</main>;
```

## Roadmap

### Upcoming Features:

- **Web-based Translation Management**: Manual editing of translations.
- **Non-Anonymized Parameter Support**: Translate dynamic values directly.
- **Improved SSR Support**: Enhancements for SEO and server-side rendering.
- **Custom Storage Options**: Support for alternative storage backends.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your branch.
5. Open a pull request.

## License

Locaize React is licensed under the MIT License.

