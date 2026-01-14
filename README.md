# wudo
Drupal 11 base theme (SDC).

Wudo, derived from the Wunder and the Japanese Dō (Path).

## Why This Stack?
* **Single Directory Components (SDC)** keep markup, styles, metadata, and logic together, making components clear, reusable, and Drupal-native.
* **Vite** is chosen for speed, simplicity, and modern ESM workflows.
* **Storybook** is isolated by design to enforce clean, native, CMS-agnostic components.

This combination ensures:
* fast development
* predictable behavior
* long-term maintainability
* clear component ownership and structure

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
## Theme Renaming
This theme includes a migration script to safely change the theme's machine name. This is particularly useful when using this repository as a starter kit.
### What the script does:
* **Folder Migration:** Moves all files to a new directory named after your new theme.
* **File Renaming:** Automatically renames core Drupal files (`.info.yml`, `.libraries.yml`, `.theme`, etc.).
* **SDC Namespace Update:** Updates all Single Directory Component (SDC) references (e.g., changing `old_theme:component` to `new_theme:component`).
* **Path Correction:** Replaces hardcoded theme paths in `.scss`, `.js`, and `.yml` files.
* **Safe Processing:** Uses `:` as a delimiter to safely handle file paths and ignores `node_modules`, `dist`, and `.git` folders.

### How to use:
Open your terminal and navigate to the scripts directory:
```bash
cd themes/custom/your_current_theme/scripts
```
Make sure the script is executable:
```bash
chmod +x rename.sh
```
Run the script:
```bash
./rename.sh
```
Enter your new theme machine name (e.g., `my_awesome_theme`) when prompted.
## Component Inventory

### Atoms
Fundamental building blocks that cannot be broken down further.

| Component                                    | Status       | Description                    |
|:---------------------------------------------|:-------------|:-------------------------------|
| [Button](./components/01-atoms/button)       | stable       | Primary, secondary button styles. |
| [Link](./components/01-atoms/link)           | experimental | Styled links and action triggers. |
| [Paragraph](./components/01-atoms/paragraph) | stable       | The foundational typography atom for body text                               |
| [Icon](./components/01-atoms/icon)           | stable       | A foundational SVG icon component.                                                                             |

### Molecules
| Component                                          | Status        | Description                                                            |
|:---------------------------------------------------|:--------------|:-----------------------------------------------------------------------|
| [Accordion](./components/02-molecules/accordion)   | stable        | Collapsible content sections.                                          |
| [Tabs](./components/02-molecules/tabs)             | experimental  | Accessible Tabbed Interface to organize content into logical sections. |
| [Pagination](./components/02-molecules/pagination) | stable        | Pager component.                                                       |
## Documentation

* **UI Library / Storybook:** [Setup and Usage Guide](./docs/storybook.md)
* **Drupal / SDC:** [Using Single-Directory Components](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components)
