/**
 * @file
 * Mobile menu toggler behavior.
 *
 * Expects markup structure:
 * <div data-mobile-menu>
 *   <button data-menu-toggle aria-expanded="false">☰</button>
 *   <nav data-menu hidden> ... </nav>
 * </div>
 */

(function (Drupal) {
  Drupal.behaviors.mobileMenuToggler = {
    attach(context) {
      once('mobile-menu', '[data-mobile-menu]', context).forEach((wrapper) => {

        const toggle = wrapper.querySelector('[data-menu-toggle]');
        const menu = wrapper.querySelector('[data-menu]');
        const trapContainer = wrapper;
        const firstMenuLink = menu.querySelector('.menu--level-0 > li > a');
        const FOCUSABLE_SELECTOR =
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

        if (!toggle || !menu) return;

        // Optional: store the element that had focus before opening
        let lastFocusedElement = null;

        const openMenu = () => {
          lastFocusedElement = document.activeElement;

          toggle.setAttribute('aria-expanded', 'true');
          menu.classList.add('is-open');

          document.addEventListener('keydown', trapFocus);
          document.addEventListener('keydown', onEscape);

          if (firstMenuLink) {
            firstMenuLink.focus();
          }
        };

        const closeMenu = () => {
          toggle.setAttribute('aria-expanded', 'false');
          menu.classList.remove('is-open');

          document.removeEventListener('keydown', trapFocus);
          document.removeEventListener('keydown', onEscape);

          // Return focus to toggle
          lastFocusedElement?.focus();
        };

        const getFocusable = (container) =>
          container.querySelectorAll(FOCUSABLE_SELECTOR);

        const getVisibleFocusable = container =>
          Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
            .filter(el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));

        const trapFocus = e => {
          if (e.key !== 'Tab') return;

          // toggle + visible menu links
          const topLinks = [toggle, ...getVisibleFocusable(menu)];

          // if submenu is open, add its links too
          const activeSubmenuToggle = menu.querySelector('.menu__item--has-children > .menu__toggle[aria-expanded="true"]');
          const subLinks = activeSubmenuToggle
            ? getVisibleFocusable(activeSubmenuToggle.nextElementSibling || activeSubmenuToggle)
            : [];

          // full trap
          const focusable = [...topLinks, ...subLinks];

          if (!focusable.length) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) { // SHIFT+TAB
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else { // TAB
            if (document.activeElement === last) {
              e.preventDefault();
              // if submenu is open, focus its toggle
              if (activeSubmenuToggle) activeSubmenuToggle.focus();
              else first.focus();
            }
          }
        };

        const onEscape = (e) => {
          if (e.key === 'Escape') {
            closeMenu();
          }
        };

        toggle.addEventListener('click', () => {
          const expanded = toggle.getAttribute('aria-expanded') === 'true';
          if (expanded) {
            closeMenu();
          } else {
            openMenu();
          }
        });
      });
    },
  };
})(Drupal);
