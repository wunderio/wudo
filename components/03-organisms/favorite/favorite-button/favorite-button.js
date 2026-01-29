import { LitElement, html, css } from 'lit';

class WudoFavoriteButton extends LitElement {
  static properties = {
    contentId: { type: String, attribute: 'content-id' },
    drawerId: { type: String, attribute: 'drawer-id' },
    label: { type: String },
    active: { type: Boolean, reflect: true },
    labelAdd: { type: String, attribute: 'label-add' },
    labelRemove: { type: String, attribute: 'label-remove' }
  };

  static styles = css`
    :host {
      display: inline-block;
      line-height: 0;

      --btn-size: var(--wudo-fav-btn-size, 44px);
      --btn-bg: var(--wudo-fav-btn-bg, #ffffff);
      --btn-border: var(--wudo-fav-btn-border, #e2e8f0);
      --btn-color: var(--wudo-fav-btn-color, #64748b);

      --btn-active-bg: var(--wudo-fav-btn-active-bg, #f43f5e);
      --btn-active-color: var(--wudo-fav-btn-active-color, #ffffff);

      --btn-hover-border: var(--wudo-fav-btn-hover-border, #f43f5e);
      --btn-hover-color: var(--wudo-fav-btn-hover-color, #f43f5e);
    }

    button {
      background: var(--btn-bg);
      border: 2px solid var(--btn-border);
      border-radius: var(--wudo-fav-btn-radius, 50%);
      width: var(--btn-size);
      height: var(--btn-size);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-in-out;
      color: var(--btn-color);
      padding: 0;
      outline: none;
    }

    button:hover, button:focus-visible {
      border-color: var(--btn-hover-border);
      color: var(--btn-hover-color);
      transform: scale(1.05);
    }

    button:focus-visible {
      box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.4);
    }

    button.active {
      background: var(--btn-active-bg);
      border-color: var(--btn-active-bg);
      color: var(--btn-active-color);
    }

    svg {
      width: var(--wudo-fav-btn-icon-size, 22px);
      height: var(--wudo-fav-btn-icon-size, 22px);
      fill: currentColor;
    }
  `;

  constructor() {
    super();
    this.active = false;
    this.labelAdd = 'Add to favorites';
    this.labelRemove = 'Remove from favorites';
  }

  // Run when component is added to the DOM
  connectedCallback() {
    super.connectedCallback();
    this._checkStatus();

    window.addEventListener('favorite-updated', (e) => {
      const targetDrawerId = e.detail.drawerId || 'favorite-drawer';
      const myDrawerId = this.drawerId || 'favorite-drawer';

      if (targetDrawerId === myDrawerId) {
        if (e.detail.id === this.contentId) {
          this.active = e.detail.active;
        } else {
          this._checkStatus();
        }
      }
    });

    window.addEventListener('storage', (e) => {
      if (e.key === this.storageKey) {
        this._checkStatus();
      }
    });
  }

  get storageKey() {
    return `wudo_favs_${this.drawerId || 'favorite-drawer'}`;
  }

  _checkStatus() {
    const favs = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    this.active = favs.some(item => item.id === this.contentId);
  }

  _toggle(e) {
    e.preventDefault();
    this.active = !this.active;

    let favs = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    if (this.active) {
      if (!favs.some(item => item.id === this.contentId)) {
        favs.push({
          id: this.contentId,
          label: this.label,
          timestamp: new Date().getTime()
        });
      }
    } else {
      favs = favs.filter(item => item.id !== this.contentId);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(favs));

    window.dispatchEvent(new CustomEvent('favorite-updated', {
      detail: {
        id: this.contentId,
        drawerId: this.drawerId || 'favorite-drawer',
        active: this.active,
        label: this.label
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const currentLabel = this.active ? this.labelRemove : this.labelAdd;

    return html`
      <button
        @click="${this._toggle}"
        class="${this.active ? 'active' : ''}"
        aria-label="${currentLabel}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
        </svg>
      </button>
    `;
  }
}

if (!customElements.get('wudo-favorite-button')) {
  customElements.define('wudo-favorite-button', WudoFavoriteButton);
}
