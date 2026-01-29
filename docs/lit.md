# Design System Components with Lit & SDC
This theme uses a hybrid approach for UI components, combining Drupal **SDC (Single Directory Components)** with **Lit** for high-performance, reactive Web Components.

## 1. Why Lit?
We use Lit specifically for inter-component communication and complex state management.
* **Lightweight:** At only ~5KB, it provides reactivity without the overhead of heavy frameworks like React or Vue.
* **Encapsulation:** Uses Shadow DOM to ensure styles from the theme don't leak into components and vice versa.
* **Standard-based:** Lit components are native Custom Elements, making them future-proof and compatible with any HTML environment.

## 2. Smart Implementation: Import Maps
Our implementation is designed to be "smart" by decoupling the library from the components. Instead of bundling everything into one giant file, we use Import Maps.

* **No Redundancy:** Lit is loaded exactly once, regardless of how many components use it in a single page.
* **Zero-Build SDC:** Your SDC JavaScript files in `/components` are served as native ES Modules. You can edit them and see changes instantly without running a watcher.
* **Selective Loading:** If a page doesn't use any Lit components, the Lit library is never downloaded by the browser.
* **Self-Hosted:** We don't rely on CDNs. Vite bundles Lit into a local file for better performance, security (CSP compliance), and offline reliability.

## 3. How to use Lit in a Component
To create or update a component using Lit, follow these steps:

### Step 1: The JavaScript (`your-component.js`)
Simply import from `'lit'`. The browser will know where to find it thanks to our Import Map.
```javascript
import { LitElement, html, css } from 'lit';

class MyComponent extends LitElement {
  static properties = {
    title: { type: String }
  };

  render() {
    return html`<div>${this.title}</div>`;
  }
}
customElements.define('my-component', MyComponent);
```
### Step 2: The Metadata (`your-component.component.yml`)
Ensure your component depends on the `import-map` library defined in the theme.

```yaml
name: My Component
props:
  type: object
  properties:
    title:
      type: string

libraryOverrides:
  dependencies:
    - wudo/import-map
  js:
    my-component.js: { attributes: { type: module } }
```
## 4. Maintenance Commands
Build the Lit Library
If you update the Lit version via NPM, you must rebuild the core bundle:
```bash
npm run build:lit
```
This generates `dist/lit-core.bundle.js` which is used by the Import Map.

For testing Lit you can place in the html template right after <head>:
```html
<script type="importmap">
{
  "imports": {
    "lit": "https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js",
    "lit/directives/unsafe-html.js": "https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js"
  }
}
</script>
```
