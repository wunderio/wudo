/**
 * @file
 * Mobile Menu Portal (DOM Reparenting) behavior.
 *
 * This script moves the menu element between the desktop header and the
 * mobile drawer to avoid HTML duplication, preserving event listeners
 * and improving SEO.
 *
 * @version 1.0.0
 */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.mobileMenuPortal = {
    attach(context) {
      once('mobile-menu-portal', 'body', context).forEach(() => {
        const drawerId = 'mobile-menu-drawer';
        const desktopMenu = document.querySelector('[data-desktop-menu]');
        const slot = document.getElementById('mobile-menu-slot');
        const desktopWrapper = document.querySelector('.site-header__menu');
        const toggle = document.querySelector('[data-menu-drawer-trigger]');

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

        const observer = new ResizeObserver(() => {
          const isDesktop = window.getComputedStyle(toggle).display === 'none';

          if (isDesktop && slot.contains(desktopMenu)) {

            document.dispatchEvent(new CustomEvent('drawer:close', {
              detail: { id: drawerId }
            }));

            desktopWrapper.appendChild(desktopMenu);
          }
        });

        observer.observe(toggle);
      });
    },
  };
})(Drupal, once);
