class WudoCarousel extends HTMLElement {
  constructor() {
    super();
    this.currentIndex = 0;
  }

  connectedCallback() {
    this.viewport = this.querySelector('.carousel__viewport');
    this.track = this.querySelector('.carousel__track');
    this.btnPrev = this.querySelector('.carousel__btn--prev');
    this.btnNext = this.querySelector('.carousel__btn--next');
    this.dotsContainer = this.querySelector('.carousel__dots');

    this.slides = Array.from(this.track.children);
    if (this.slides.length === 0) return;

    this.isLoop = this.getAttribute('data-loop') === 'true';

    // Aprēķinām, cik soļi (bumbiņas) mums reāli vajadzīgi
    this.updateConfig();
    this.renderDots();
    this.initEvents();
    this.updateActiveState();

    // Pārrēķinām, ja mainās loga izmērs (responsive)
    window.addEventListener('resize', () => {
      this.updateConfig();
      this.renderDots();
      this.updateActiveState();
    });
  }

  updateConfig() {
    // Izmēram viena slaida platumu pret viewportu
    const slideWidth = this.slides[0].offsetWidth;
    const viewportWidth = this.viewport.offsetWidth;

    // Aprēķinām, cik reāli ielien kadrā (noapaļojot)
    this.itemsPerView = Math.round(viewportWidth / slideWidth);

    // Pārrēķinām maxIndex
    this.maxIndex = Math.max(0, this.slides.length - this.itemsPerView);
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';

    // Bumbiņas zīmējam tikai tik, cik ir reāli "piestātnes" punkti
    for (let i = 0; i <= this.maxIndex; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.classList.add('carousel__dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.scrollToIndex(i));
      this.dotsContainer.appendChild(dot);
    }
    this.dots = this.querySelectorAll('.carousel__dot');
  }

  initEvents() {
    this.btnNext?.addEventListener('click', () => this.navigate(1));
    this.btnPrev?.addEventListener('click', () => this.navigate(-1));

    let scrollTimeout;
    this.viewport.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => this.updateActiveState(), 50);
    }, { passive: true });
  }

  navigate(direction) {
    let nextIndex = this.currentIndex + direction;

    if (this.isLoop) {
      if (nextIndex > this.maxIndex) nextIndex = 0;
      if (nextIndex < 0) nextIndex = this.maxIndex;
    } else {
      nextIndex = Math.max(0, Math.min(nextIndex, this.maxIndex));
    }

    this.scrollToIndex(nextIndex);
  }

  scrollToIndex(index) {
    const itemWidth = this.slides[0].offsetWidth; // Precīzāks mērījums nekā viewport dalīšana
    this.viewport.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    this.currentIndex = index; // Uzreiz atjaunojam, lai pogas reaģē ātri
  }

  updateActiveState() {
    const itemWidth = this.slides[0].offsetWidth;
    if (itemWidth === 0) return;

    this.currentIndex = Math.round(this.viewport.scrollLeft / itemWidth);

    this.dots?.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === this.currentIndex);
    });

    if (!this.isLoop) {
      if (this.btnPrev) this.btnPrev.disabled = this.currentIndex <= 0;
      if (this.btnNext) this.btnNext.disabled = this.currentIndex >= this.maxIndex;
    }
  }
}

if (!customElements.get('wudo-carousel')) {
  customElements.define('wudo-carousel', WudoCarousel);
}
