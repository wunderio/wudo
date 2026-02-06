/**
 * @file drawer.js
 * @description Wudo Drawer Component (Web Cmp)
 * @version 1.0.1
 */

class WudoDrawer extends HTMLElement {
  constructor() {
    super();
    this._triggerElement = null;
    this._focusTrap = null;
    this._isOpen = false;
  }

  connectedCallback() {
    /** @listens drawer:open */
    document.addEventListener('drawer:open', (e) => {
      if (e.detail.id === this.id) {
        this._triggerElement = e.detail.trigger || document.activeElement;
        this.open();
      }
    });

    /** @listens drawer:close */
    document.addEventListener('drawer:close', (e) => {
      if (e.detail.id === this.id) this.close();
    });

    /** @listens focusTrap:escape */
    this.addEventListener('focusTrap:escape', () => this.close());
  }

  /**
   * Opens the drawer, activates focus trap and sets background to inert.
   */
  open() {
    if (this._isOpen) return;
    this._isOpen = true;

    this.setAttribute('open', '');
    this.manageFocus(true);

    // FocusTrap activation
    if (window.focusTrapManager) {
      this._focusTrap = window.focusTrapManager.activate(this);
    }

    // Custom event to signal other components (like Portal)
    this.dispatchEvent(new CustomEvent('drawer:after-open', {
      detail: { id: this.id },
      bubbles: true
    }));
  }

  /**
   * Closes the drawer and restores the background state.
   */
  close() {
    if (!this._isOpen) return;
    this._isOpen = false;

    this.removeAttribute('open');
    this.manageFocus(false);

    // Notify portal and other listeners
    document.dispatchEvent(new CustomEvent('drawer:after-close', {
      detail: { id: this.id }
    }));

    if (this._focusTrap && window.focusTrapManager) {
      window.focusTrapManager.deactivate(this._focusTrap);
      this._focusTrap = null;
    }

    if (this._triggerElement) {
      this._triggerElement.focus({ preventScroll: true });
    }
  }

  /**
   * Toggles inert attribute on sibling elements to hide them from assistive tech.
   * @param {boolean} isOpen
   */
  manageFocus(isOpen) {
    const rootElements = Array.from(document.body.children);
    rootElements.forEach(el => {
      // Don't set inert on the drawer itself or scripts/styles
      if (!el.contains(this) && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
        if (isOpen) {
          el.setAttribute('data-drawer-inert', '');
          el.setAttribute('inert', '');
        } else if (el.hasAttribute('data-drawer-inert')) {
          el.removeAttribute('inert');
          el.removeAttribute('data-drawer-inert');
        }
      }
    });
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
}

if (!customElements.get('wudo-drawer')) {
  customElements.define('wudo-drawer', WudoDrawer);
}
