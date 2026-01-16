(function (Drupal, once) {
  Drupal.behaviors.mobileMenuPortal = {
    attach(context) {
      once('mobile-menu-portal', 'body', context).forEach(() => {
        const drawerId = 'mobile-menu-drawer';
        const desktopMenu = document.querySelector('[data-desktop-menu]');
        const slot = document.getElementById('mobile-menu-slot');
        const desktopWrapper = document.querySelector('.site-header__menu');

        if (!desktopMenu || !slot || !desktopWrapper) return;

        document.addEventListener('drawer:open', (e) => {
          if (e.detail.id !== drawerId) return;

          if (!slot.contains(desktopMenu)) {
            slot.appendChild(desktopMenu);
          }
        });

        document.addEventListener('drawer:after-close', (e) => {
          if (e.detail.id !== drawerId) return;

          if (!desktopWrapper.contains(desktopMenu)) {
            desktopWrapper.appendChild(desktopMenu);
          }
        });
      });
    },
  };
})(Drupal, once);
