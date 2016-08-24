# angular.sticky.directive

## Instructions:

When only sticky-object attribute is being set the default from location will be the element's parent element position. (more to come...)

### Example: Showing all available attributes
```HTML
<div id="sidebar" sticky-oject sticky-from=".form-class" sticky-until="#end_id" sticky-from-media="xs" sticky-offset="20">
  <h2>Sidebar</h2>
  <p>Test test test...</p>
</div>
```


## Media Queries
Sticky object can be combined with bootstrap screensize variables with the "sticky-from-media" attribute.

### Example: Get sticky on screen sizes larger than md (992px).
```HTML
<div id="sidebar" sticky-oject sticky-from-media="md">
  <h2>Sidebar</h2>
  <p>Test test test...</p>
</div>
```

## Offset
An offset can be used to trigger the stickyness a certain pixels earlier.

### Example: Get sticky 20px earlier than touching the window top.
```HTML
<div id="sidebar" sticky-oject sticky-offset="20">
  <h2>Sidebar</h2>
  <p>Test test test...</p>
</div>
```