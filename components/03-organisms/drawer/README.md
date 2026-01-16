# Universal Drawer & Modal

A highly flexible and accessible container component that functions as both off-canvas sidebars (menus, carts) and centered modal dialogs. It utilizes Web Components logic to encapsulate state management and focus control.

## Features
- **Multi-positional**: A single structure for `left`, `right`, or `center` (modal) layouts.
- **Modern Focus Trap**: Leverages the native `inert` attribute to lock focus within the component, ensuring full WCAG compliance.
- **Event-Driven**: Opening and closing is handled via global Custom Events, allowing triggers to be placed anywhere in the application.

## Metadata (SDC Props)

| Property   | Type      | Default  | Description                                           |
|:-----------|:----------|:---------|:------------------------------------------------------|
| `id`       | `string`  | *Required* | Unique identifier used for event targeting.          |
| `position` | `enum`    | `right`  | Placement: `left`, `right`, or `center` (modal).    |
| `size`     | `string`  | `400px`  | Maximum width or height (e.g., `100%`, `500px`).     |
| `title`    | `string`  | `null`   | Accessible title for screen readers and header.      |

## Slots

| Slot     | Required | Description |
|----------|----------|-------------|
| `content` | Yes | Main drawer content (navigation, cart, form, or any primary interactive content). |
| `footer`  | No  | Optional sticky footer area, typically used for actions such as buttons, summaries, or confirmations. |

---

## Usage Example (Twig)

```twig
{{ include('wudo:drawer', {
  id: 'mobile-menu-drawer',
  position: 'right',
  size: '500px',
  title: 'Menu',
  content: '<div id="mobile-menu-slot"></div>'
}, with_context = false) }}
```
## Trigger Examples (How to Open)

Since the component listens for a global `drawer:open` event, you can trigger it in several ways:

### 1. HTML / Inline JS
The simplest way to trigger a drawer from a standard button in your templates.
```html
<button type="button"
  onclick="document.dispatchEvent(new CustomEvent('drawer:open', { detail: { id: 'newsletter-modal' } }))">
  Open Modal
</button>
```
### 2. From External JavaScript (Auto-popups)
Example: Triggering the modal automatically after 5 seconds.
```javascript
setTimeout(() => {
  document.dispatchEvent(new CustomEvent('drawer:open', {
    detail: { id: 'newsletter-modal' }
  }));
}, 5000);
```
### 3. Exit-Intent Trigger
Opens the drawer when the user's mouse leaves the browser window (suggesting they are about to close the tab).
```javascript
document.addEventListener('mouseleave', (e) => {
  if (e.clientY < 0) {
    document.dispatchEvent(new CustomEvent('drawer:open', {
      detail: { id: 'newsletter-modal' }
    }));
  }
}, { once: true }); // Execute only once per session
```
### 4. Closing via Logic (e.g., AJAX Success)
If you need to close the drawer programmatically after a successful form submission:
```javascript
document.querySelector('#newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // ... your submission logic (fetch/ajax) ...

  // Close the specific drawer
  document.dispatchEvent(new CustomEvent('drawer:close', {
    detail: { id: 'newsletter-modal' }
  }));
});
```
## Accessibility & Focus Management
This component uses the `inert` attribute on the main application container (e.g., `.page-wrapper`). When the drawer is active:

* Keyboard users cannot "tab out" into the background content.
* Screen readers are restricted to the drawer content only.
* Focus is automatically directed to the first interactive element inside the drawer.
* Pressing the `Escape` key automatically closes the active drawer.
