# Favorite Button

The Favorite Button component is used to allow users to mark items as favorites. It can be integrated into various parts of the website where users can save their preferred items for easy access later.

## Usage
```twig
{{ include('wudo:favorite-button', {
  content_id: node.id,
  drawer_id: 'watchlist',
  label: node.label,
  modifier_class: 'is-teaser-view'
}, with_context = false) }}
```
## Styling
```css
/* Global CSS */
.wudo-favorite-button-wrapper.is-minimal {
  --wudo-fav-btn-bg: transparent;
  --wudo-fav-btn-border: transparent;
  --wudo-fav-btn-color: #94a3b8;
}
```
All variables
```css
:host {
  --wudo-fav-btn-size: 44px;
  --wudo-fav-btn-bg: #ffffff;
  --wudo-fav-btn-border: #e2e8f0;
  --wudo-fav-btn-color: #64748b;
  --wudo-fav-btn-active-bg: #f43f5e;
  --wudo-fav-btn-active-color: #ffffff);
  --wudo-fav-btn-hover-border: #f43f5e);
  --wudo-fav-btn-hover-color: #f43f5e);
}
```
