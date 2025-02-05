# Locaize React

Locaize React is a library designed to simplify the process of internationalization and localization in React applications. It provides a set of tools to manage languages, translate content, and adapt your app to different regions and cultures.

## Features

* **Language Management**: Easily switch between languages and manage the language state of your application.
* **Translation**: Utilize the Locaize API to translate your content dynamically, both on the client and server sides.
* **Context API**: Leverage the React Context API to access and manage language state across your application.
* **Server-Side Rendering**: Supports server-side rendering for SEO optimization and faster page loads.

## Installation

To install Locaize React, run the following command in your terminal:
```bash
npm install @locaize/react
```
or
```bash
yarn add @locaize/react
```
## Usage

To get started with Locaize React, import the necessary components and functions from the library:
```typescript
import { LanguageProvider, useLanguage, SelectLanguage } from '@locaize/react';
import { createLocaizeClient } from '@locaize/react';

// Initialize the Locaize client with your API key
const locaizeClient = createLocaizeClient({ apiKey: 'your_api_key_here' });

// Wrap your app with the LanguageProvider
<LanguageProvider language="en-US">
  <App />
</LanguageProvider>
```
For more detailed instructions and examples, please refer to the [Locaize React documentation](https://github.com/teceer/locaize-react#readme).

## Contributing

Contributions are welcome! If you'd like to contribute to Locaize React, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them.
4. Push your branch to your forked repository.
5. Submit a pull request to the original repository.

## License

Locaize React is licensed under the MIT License.
