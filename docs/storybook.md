# Storybook Setup and Configuration
This guide outlines the steps required to integrate and configure Storybook for isolated component development and documentation, utilizing Vite as the build tool.

## 1. Installation
We'll use the official Storybook Command Line Interface (CLI) tool to automatically set up the necessary dependencies and initial configuration for your project.

Execute this command in your project's root directory (where your package.json file is located).
```bash
npx storybook@latest init
```
The CLI tool will automatically detect your project uses Vite and will install the required builder and framework dependencies (e.g., @storybook/builder-vite, @storybook/web-components-vite, etc.).

A `.storybook` configuration folder will be created, and start/build scripts will be added to your `package.json` file.

Ensure the following scripts are present in your `package.json`:

```bash
// package.json
"scripts": {
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  // ... other scripts
}
```

## 2. Configuration (SDC / SCSS)

To ensure Storybook can locate your Single Directory Components (SDC) and correctly load your global SCSS styles, we need to adjust two files inside the `.storybook` folder.

### 2.1. Configure Story Paths (.storybook/main.js)

You must tell Storybook where to find your .stories.* files within your SDC folder structure.

Open `.storybook/main.js` and ensure the stories property is configured to look inside your components folder:

```js
// .storybook/main.js

module.exports = {
  // Configures Storybook to search for *.stories.* files recursively inside the "components" folder.
  stories: [
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)", 
  ],
  
  // Ensure the correct framework/builder is set (usually done by init)
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  
  // ... other settings (e.g., viteFinal)
};
```

### 2.2. Load Global Styles (.storybook/preview.js)

To ensure your components are styled correctly (with your CSS Variables, Base and Layout styles), you must import your main SCSS manifest into the Storybook environment.

Create or update the file `.storybook/preview.js`:

```js
// .storybook/preview.js

// Import your main SCSS manifest. This is crucial for loading your :root{} variables,
// global resets, and base typography/spacing definitions.
import '../scss/style.scss'; 

// Optional: Add global parameters for controls, actions, and viewports.
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
```

## 3. Running and Development

With the setup complete, you can now start developing and documenting your components.

### 3.1. Start Storybook (Development Mode)
Run the Storybook server, which utilizes Vite's Hot Module Replacement (HMR) for fast updates:

```bash
npm run storybook
```

Storybook will typically be available at http://localhost:6006.

### 3.2. Build for Production

To create a static build of your component library for hosting (e.g., on Netlify or GitHub Pages):
```bash
npm run build-storybook
```
The final, static output will be generated in the storybook-static folder.
