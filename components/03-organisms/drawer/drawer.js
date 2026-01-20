/**
 * @file drawer.js
 * @description Wudo Drawer Component
 * @version 1.0.0
 */

class WudoDrawer extends HTMLElement {
  constructor() {
    super();
    this._triggerElement = null;
    this._focusTrap = null;
  }

  connectedCallback() {
    document.addEventListener('drawer:open', (e) => {
      if (e.detail.id === this.id) {
        this._triggerElement = e.detail.trigger || document.activeElement;
        this.open();
      }
    });

    document.addEventListener('drawer:close', (e) => {
      if (e.detail.id === this.id) this.close();
    });

    this.addEventListener('focusTrap:escape', () => this.close());
  }

  open() {
    this.setAttribute('open', '');
    this.manageFocus(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const closeBtn = this.querySelector('.drawer__close');
        const firstFocusable = this.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        (closeBtn || firstFocusable || this).focus({ preventScroll: true });
      });
    });

    this._focusTrap = focusTrapManager.activate(this);
  }

  close() {
    if (!this.hasAttribute('open')) return;

    this.removeAttribute('open');
    this.manageFocus(false);

    document.dispatchEvent(new CustomEvent('drawer:after-close', {
      detail: { id: this.id }
    }));

    document.dispatchEvent(new CustomEvent('drawer:close', {
      detail: { id: this.id }
    }));

    if (this._focusTrap) {
      focusTrapManager.deactivate(this._focusTrap);
      this._focusTrap = null;
    }

    if (this._triggerElement) {
      this._triggerElement.focus({ preventScroll: true });
    }
  }

  manageFocus(isOpen) {
    const rootElements = Array.from(document.body.children);
    rootElements.forEach(el => {
      if (!el.contains(this)) {
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

customElements.define('wudo-drawer', WudoDrawer);
