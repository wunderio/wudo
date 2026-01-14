class WudoCountdown extends HTMLElement {
  connectedCallback() {
    this.endDate = new Date(this.dataset.end).getTime();
    this.display = {
      days: this.querySelector('[data-days]'),
      hours: this.querySelector('[data-hours]'),
      minutes: this.querySelector('[data-minutes]'),
      seconds: this.querySelector('[data-seconds]')
    };

    this.run();
    this.timer = setInterval(() => this.run(), 1000);
  }

  run() {
    const now = new Date().getTime();
    const distance = this.endDate - now;

    if (distance < 0) {
      clearInterval(this.timer);
      this.innerHTML = "Pasākums ir sācies!";
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    this.display.days.innerText = d.toString().padStart(2, '0');
    this.display.hours.innerText = h.toString().padStart(2, '0');
    this.display.minutes.innerText = m.toString().padStart(2, '0');
    this.display.seconds.innerText = s.toString().padStart(2, '0');
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }
}

if (!customElements.get('wudo-countdown')) {
  customElements.define('wudo-countdown', WudoCountdown);
}
