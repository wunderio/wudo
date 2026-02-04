class FocusTrapManager {
  constructor() {
    this.stack = [];
  }

  activate(container, options = {}) {
    const trap = new FocusTrap(container, options);
    this.stack.push(trap);
    trap.activate();
    return trap;
  }

  deactivate(trap) {
    const idx = this.stack.indexOf(trap);
    if (idx > -1) {
      trap.deactivate();
      this.stack.splice(idx, 1);
    }

    const lastTrap = this.stack[this.stack.length - 1];
    if (lastTrap) {
      lastTrap.focusFirst();
    }
  }

  get activeTrap() {
    return this.stack[this.stack.length - 1] || null;
  }
}

class FocusTrap {
  constructor(container, { escapeCloses = true, additionalElements = [] } = {}) {
    this.container = container;
    this.additionalElements = additionalElements;
    this.active = false;
    this._focusableElements = [];
    this._first = null;
    this._last = null;
    this._previousFocus = null;
    this.escapeCloses = escapeCloses;
    this._keydownHandler = this._handleKeydown.bind(this);
    this._selectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  }

  _getElements() {
    const containerElements = Array.from(this.container.querySelectorAll(this._selectors))
      .filter(el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)); // Tikai redzamos

    return [...this.additionalElements, ...containerElements];
  }

  activate() {
    if (this.active) return;
    this.active = true;
    this._previousFocus = document.activeElement;

    const containerElements = Array.from(this.container.querySelectorAll(this._selectors));
    this._focusableElements = [...this.additionalElements, ...containerElements];

    this._first = this._focusableElements[0] || this.container;
    this._last = this._focusableElements[this._focusableElements.length - 1] || this.container;

    document.addEventListener('keydown', this._keydownHandler);

    requestAnimationFrame(() => {
      const elements = this._getElements();
      if (elements.length > 0) {
        elements[0].focus({ preventScroll: true });
      }
    });
  }

  deactivate() {
    if (!this.active) return;
    this.active = false;
    document.removeEventListener('keydown', this._keydownHandler);

    if (this._previousFocus && document.body.contains(this._previousFocus)) {
      this._previousFocus.focus({ preventScroll: true });
    }
  }

  focusFirst() {
    if (this._first) this._first.focus({ preventScroll: true });
  }

  _handleKeydown(e) {
    if (e.key === 'Tab') {
      const elements = this._getElements();
      if (elements.length === 0) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === this._first) {
          e.preventDefault();
          this._last.focus();
        }
      } else {
        if (document.activeElement === this._last) {
          e.preventDefault();
          this._first.focus();
        }
      }
    } else if (e.key === 'Escape' && this.escapeCloses) {
      this.container.dispatchEvent(new CustomEvent('focusTrap:escape'));
    }
  }
}

(function (Drupal) {
  Drupal.behaviors.wudoFocusTrap = {
    attach(context, settings) {
      if (!window.focusTrapManager) {
        window.focusTrapManager = new FocusTrapManager();
      }
    }
  };
})(Drupal);
