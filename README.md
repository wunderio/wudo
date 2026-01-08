# wudo
Drupal 11 base theme (SDC).

Wudo, derived from the Wunder and the Japanese Dō (Path).

## Quick Start

Install all dependencies

```bash
npm install
```

Starts the Vite development server

```bash
npm run dev
```

Build SDC components and main style.css

```bash
npm run build
```

## Component Inventory

### Atoms
Fundamental building blocks that cannot be broken down further.

| Component                              | Status       | Description |
|----------------------------------------|--------------|-------------|
| [Button](./components/01-atoms/button) | stable       | Primary, secondary button styles.      |
| Link                                   | experimental | Styled links and action triggers.      |

### Molecules
| Component | Status       | Description |
|-----------|--------------|-------------|
| Accordion | stable       | Collapsible content sections.          |
## Documentation

* **UI Library / Storybook:** [Setup and Usage Guide](./docs/storybook.md)
* **Drupal / SDC:** [Using Single-Directory Components](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components)
