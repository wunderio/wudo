import { LitElement, html, css } from 'lit';

class WudoFavoriteCounter extends LitElement {
  static properties = {
    count: { type: Number },
    drawerId: { type: String, attribute: 'drawer-id' }
  };

  static styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
      position: relative;
      pointer-events: none;
    }

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .badge {
      position: absolute;
      top: 0;
      right: 0;
      background: var(--wudo-fav-badge-bg, #f43f5e);
      color: var(--wudo-fav-badge-text, #ffffff);
      border: 2px solid var(--wudo-fav-badge-border, #ffffff);

      font-size: var(--wudo-fav-badge-font-size, 11px);
      font-weight: bold;
      min-width: 18px;
      height: 18px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      transform: translate(35%, -35%);
      box-sizing: border-box;
      line-height: 1;
    }
  `;

  constructor() {
    super();
    this.count = 0;

    // Binding methods
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleStorageChange = this._handleStorageChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateCountFromStorage();

    // Listening for favorite updates
    window.addEventListener('favorite-updated', this._handleUpdate);

    // Listening for storage changes (from other buttons)
    window.addEventListener('storage', this._handleStorageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('favorite-updated', this._handleUpdate);
    window.removeEventListener('storage', this._handleStorageChange);
  }

  get storageKey() {
    return `wudo_favs_${this.drawerId || 'favorite-drawer'}`;
  }

  _updateCountFromStorage() {
    const favs = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    this.count = favs.length;
  }

  _handleUpdate(e) {
    if (e.detail && e.detail.drawerId === this.drawerId) {
      setTimeout(() => this._updateCountFromStorage(), 10);
    }
  }

  _handleStorageChange(e) {
    if (e.key === this.storageKey) {
      this._updateCountFromStorage();
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <slot></slot>
        ${this.count > 0 ? html`<div class="badge">${this.count}</div>` : ''}
      </div>
    `;
  }
}

if (!customElements.get('wudo-favorite-counter')) {
  customElements.define('wudo-favorite-counter', WudoFavoriteCounter);
}
