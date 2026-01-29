# Favorite Counter
The Favorite Counter component displays the number of items a user has marked as favorites. It is typically used in the website header or user profile sections to provide quick access to the user's favorite items.

## Usage
```twig
{% embed 'wudo:favorite-counter' with {
  drawer_id: 'my-custom-id'
} %}
  {% block content %}
    <span class="icon">Heart</span>
  {% endblock %}
{% endembed %}
```
## Styling
```scss
--wudo-fav-badge-bg: #f43f5e; // Notification badge background
--wudo-fav-badge-text: #ffffff; // Badge text color
--wudo-fav-badge-border: #ffffff; // Border around the badge
--wudo-fav-badge-font-size: 11px; // Text size inside badge
```
