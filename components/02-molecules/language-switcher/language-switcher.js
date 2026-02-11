/**
 * @file
 * Language switcher using Wudo FocusTrapManager.
 * @version 1.0.0
 */

class LangSelector extends HTMLElement {
  connectedCallback() {
    this.btn = this.querySelector('[data-target="button"]');
    this.list = this.querySelector('[data-target="list"]');
    this.currentTrap = null;

    if (!this.btn || !this.list) return;

    this.btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = this.btn.getAttribute('aria-expanded') === 'true';
      isExpanded ? this.close() : this.open();
    });

    document.addEventListener('click', (e) => {
      if (this.classList.contains('is-open') && !this.contains(e.target)) {
        this.close();
      }
    });
  }

  open() {
    this.btn.setAttribute('aria-expanded', 'true');
    this.list.hidden = false;
    this.classList.add('is-open');

    if (window.focusTrapManager) {
      this.currentTrap = window.focusTrapManager.activate(this.list, {
        additionalElements: [this.btn]
      });

      this.list.addEventListener('focusTrap:escape', () => this.close(), { once: true });
    }
  }

  close() {
    this.btn.setAttribute('aria-expanded', 'false');
    this.list.hidden = true;
    this.classList.remove('is-open');

    if (window.focusTrapManager && this.currentTrap) {
      window.focusTrapManager.deactivate(this.currentTrap);
      this.currentTrap = null;
    }
  }
}

if (!customElements.get('lang-selector')) {
  customElements.define('lang-selector', LangSelector);
}
