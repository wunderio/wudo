class WudoThemeToggler extends HTMLElement {
  connectedCallback() {
    this.btn = this.querySelector('button');
    this.text = this.querySelector('.theme-toggler__text');

    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    this.currentTheme = savedTheme || systemTheme;

    this.applyTheme(this.currentTheme);

    this.btn.addEventListener('click', () => {
      const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });

    window.addEventListener('storage', (e) => {
      if (e.key === 'theme') this.applyTheme(e.newValue);
    });
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    this.text.innerText = theme === 'light' ? this.dataset.darkLabel || 'Dark' : this.dataset.lightLabel || 'Light';

    this.dispatchEvent(new CustomEvent('theme:changed', { detail: { theme }, bubbles: true }));
  }
}

if (!customElements.get('wudo-theme-toggler')) {
  customElements.define('wudo-theme-toggler', WudoThemeToggler);
}
