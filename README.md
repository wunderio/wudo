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

## Theme Management

This project implements a flexible theme system with native Dark Mode support.

### 1. Native System Support (Default)
The theme is **Auto-first** by design. Even without the toggler component, the site automatically inherits the user's OS preference via `prefers-color-scheme`. Dark mode CSS variables are active by default to ensure a seamless experience from the first visit.

### 2. Manual Theme Toggler
The `<wudo-theme-toggler>` Web Component allows users to manually override system settings.
* **Tri-state Logic:** Cycles through **Auto** (System), **Dark**, and **Light** modes.
* **Zero Flicker:** Applies `data-theme` to the `<html>` element instantly to prevent Layout Shift.
* **Fully Localized:** All labels and ARIA attributes are passed from Drupal/Twig, making the component 100% translatable.
## Component Inventory

### Atoms
Fundamental building blocks that cannot be broken down further.

| Component                                             | Status          | Description                                                           |
|:------------------------------------------------------|:----------------|:----------------------------------------------------------------------|
| [Button](./components/01-atoms/button)                | stable          | **SDC** - button                                                      |
| [Link](./components/01-atoms/link)                    | experimental    | **SDC** - link                                                        |
| [Paragraph](./components/01-atoms/paragraph)          | stable          | **SDC** - paragraph                                                   |
| [Icon](./components/01-atoms/icon)                    | stable          | **SDC** - SVG icon component                                          |
| [Theme Toggler](./components/01-atoms/theme-toggler)  | stable          | **SDC + Web Component** - manages Light/Dark mode for the entire site |
| [Quantity Input](./components/01-atoms/form/quantity) | stable          | **SDC + Web Component** - numerical input                             |
| [Back To Top](./components/01-atoms/back-to-top)      | experimental    | **SDC + Web Component**                                                                      |

### Molecules
| Component                                                  | Status        | Description                                         |
|:-----------------------------------------------------------|:--------------|:----------------------------------------------------|
| [Accordion](./components/02-molecules/accordion)           | stable        | **SDC** - collapsible content sections              |
| [Article card](./components/02-molecules/article-card)     | experimental  | **SDC** - publication card with image               |
| [Tabs](./components/02-molecules/tabs)                     | experimental  | **SDC** - accessible tabs                           |
| [Pagination](./components/02-molecules/pagination)         | stable        | **SDC** - pager component                           |
| [Countdown](./components/02-molecules/countdown)           | experimental  | **SDC + Web Component** - countdown                 |
| [Stat Card](./components/02-molecules/stat-card)           | experimental  | **SDC + Web Component** - card with animated number |
| [Toast Messages](./components/02-molecules/toast-messages) | experimental  | **SDC + Web Component** - notifications             |
| [Attribute List](./components/02-molecules/attribute-list) | stable        | **SDC** - definition list                           |

### Organisms
| Component                                      | Status       | Description                                                                                                                         |
|:-----------------------------------------------|:-------------|:------------------------------------------------------------------------------------------------------------------------------------|
| [Header](./components/03-organisms/header)     | stable       | **SDC** - header component                                                                                                          |
| [Drawer](./components/03-organisms/drawer)     | experimental | **SDC + Web Component** - container component that functions as both off-canvas sidebars (menus, carts) and centered modal dialogs. |
| [Carousel](./components/03-organisms/carousel) | experimental | **SDC + Web Component** - a lightweight and accessible content slider                                                               |
| [Favorite](./components/03-organisms/favorite) | experimental | **SDC + Web Component + Lit** - Save to list (watchlist, favorites, etc.)                                                           |

### Utilities
| Component                                                         | Status       | Description                                                                                 |
|:------------------------------------------------------------------|:-------------|:--------------------------------------------------------------------------------------------|
| [Link Manager](./components/00-base/01-primitives/link-manager)   | experimental | **SDC + Web Component** - automatically manages external links                              |
| [Sticky Header](./components/00-base/01-primitives/sticky-header) | experimental | **SDC + Web Component** - adds "Smart Sticky" functionality to any header or navigation bar |
| [Reveal](./components/00-base/01-primitives/reveal)               | experimental | **SDC + Web Component** - provides a "reveal on scroll" animation for its content           |
| [Focus Trap](./components/00-base/01-primitives/focus-trap)       | stable       | JS only component used by Drawer, Menu toggle                                               |


## Documentation

* **UI Library / Storybook:** [Setup and Usage Guide](./docs/storybook.md)
* **Drupal / SDC:** [Using Single-Directory Components](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components)
* **Lit:** [Setup and Usage Guide](./docs/lit.md)
