/**
 * @file
 * Wudo Menu Flyout behavior.
 */
(function (Drupal, once) {
  'use strict';

  function WudoMenu(el) {
    if (el.getAttribute('data-flyout-initialized') === 'true') {
      return;
    }

    this.el = el;
    this.panel = this.el.querySelector('[data-flyout-panel]');

    // Find the specific trigger (using your findOpenTrigger logic).
    const allTriggers = document.querySelectorAll('[data-flyout-open-trigger]');
    this.openTrigger = this.findOpenTrigger(allTriggers, el);

    if (!this.openTrigger || !this.panel) return;

    this.duration = this.el.hasAttribute('data-flyout-duration')
      ? parseInt(this.el.getAttribute('data-flyout-duration'), 10)
      : 300;

    // Initialize event listeners
    this.init();

    // Mark as initialized
    this.el.setAttribute('data-flyout-initialized', 'true');
  }

  WudoMenu.prototype.init = function () {
    this.openTrigger.addEventListener('click', this.toggle.bind(this));

    // ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.el.hasAttribute('data-flyout-expanded')) {
        this.collapse();
      }
    });

    // Click outside
    document.addEventListener('click', (e) => {
      if (!this.el.contains(e.target) && !this.openTrigger.contains(e.target)) {
        if (this.el.hasAttribute('data-flyout-expanded')) {
          this.collapse();
        }
      }
    });

    this.panel.addEventListener('focusout', (e) => {
      const nextFocus = e.relatedTarget;
      if (!this.panel.contains(nextFocus) && !this.openTrigger.contains(nextFocus)) {
        if (this.el.hasAttribute('data-flyout-expanded')) {
          this.collapse();
        }
      }
    });
  };

  WudoMenu.prototype.findOpenTrigger = function (triggers, el) {
    for (let trigger of triggers) {
      if (trigger.getAttribute('data-flyout-target')) {
        const targetId = trigger.getAttribute('data-flyout-target');
        if (document.querySelector(targetId) === el) return trigger;
      }
      // Check if it is the immediate sibling (li-a-ul structure)
      else if (trigger.nextElementSibling === el) {
        return trigger;
      }
    }
    return null;
  };

  WudoMenu.prototype.toggle = function (e) {
    e.preventDefault();
    e.stopPropagation();
    return this.el.hasAttribute('data-flyout-expanded') ? this.collapse() : this.expand();
  };

  WudoMenu.prototype.expand = function () {
    this.el.setAttribute('data-flyout-expanded', 'true');
    this.openTrigger.setAttribute('aria-expanded', 'true');
    this.panel.setAttribute('aria-hidden', 'false');
    this.panel.style.visibility = 'visible';
  };

  WudoMenu.prototype.collapse = function () {
    this.el.removeAttribute('data-flyout-expanded');
    this.openTrigger.setAttribute('aria-expanded', 'false');
    this.panel.setAttribute('aria-hidden', 'true');

    setTimeout(() => {
      if (!this.el.hasAttribute('data-flyout-expanded')) {
        this.panel.style.visibility = 'hidden';
      }
    }, this.duration);
  };

  // Drupal Behavior init
  Drupal.behaviors.wudoMenu = {
    attach: function (context) {
      once('wudo-menu', '[data-menu-flyout]', context).forEach((el) => {
        new WudoMenu(el);
      });
    }
  };

})(Drupal, once);
