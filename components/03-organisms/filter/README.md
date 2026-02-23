# Wudo Filter Manager & Filter trigger
A decoupled UI pattern for Drupal Views consisting of three synchronized components: Toggler, Drawer, and Manager. This suite handles the complex lifecycle of AJAX-powered filters while providing a clear UX for active filter states.

## Core Components
1. `filter-toggler`: A trigger button that opens the filter panel and listens for state updates to display an active filter count (Badge).
2. `filter-manager`: A logic wrapper that analyzes the nested `<form>`, calculates active selections (ignoring defaults like "All"), and broadcasts updates via Custom Events.
3. `drawer`: A reusable sliding panel component that can be positioned on any side of the viewport, used here to contain the filter manager.

## Usage
```twig
{# Trigger Button - can be placed anywhere in the DOM tree #}
{{ include('wudo:filter-toggler', {
    drawer_id: 'filter-control-center',
    badge_style: 'blue',
  }, with_context = false) }}

  {% embed 'wudo:drawer' with {
    id: 'filter-control-center',
    position: 'right',
    size: '500px',
    title: 'Filters'|t,
    exposed: exposed,
    modifier_class: 'drawer--filters'
  } only %}
    {% block content %}
      {% embed 'wudo:filter-manager' with {
        id: 'filter',
        exposed: exposed
      } only %}
        {% block content %}
          {{ exposed }}
        {% endblock %}
      {% endembed %}
    {% endblock %}
  {% endembed %}
```
