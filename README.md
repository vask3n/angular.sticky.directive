# angular.sticky.directive

## Instructions:

When only ng-sticky attribute is being set the default from location will be the element's parent element position. (more to come...)

### Example: Showing all available attributes
```HTML
<div id="sidebar" ng-sticky sticky-from=".sticky-start" sticky-until=".sticky-end" sticky-from-media="xs" sticky-offset="20" sticky-parent=".sticky-parent">
  ...
</div>
```

## sticky-from (optional)
A sticky-start position can be specified, if none is given it'll start from the moment the element hit's the scrollable region's top.

### Example: Sticky-from.
```HTML
<div id="sidebar" ng-sticky sticky-from=".sticky-start">
  ...
</div>
```

## sticky-until (optional)
A sticky-end position can be specified, if none is given it'll stay sticky till the end of the scrollable region's bottom.

### Example: Sticky-until.
```HTML
<div id="sidebar" ng-sticky sticky-until=".sticky-end">
  ...
</div>
```

## sticky-from-media (optional)
Ng-sticky can be combined with bootstrap screensize variables with the "sticky-from-media" attribute to exclude certain screensizes.

### Example: Get sticky on screen sizes from md (992px) and larger.
```HTML
<div id="sidebar" ng-sticky sticky-from-media="md">
  ...
</div>
```

## sticky-offset (optional)
An offset can be used to trigger the stickyness a certain amount of pixels earlier.

### Example: Get sticky 20px earlier than touching the scrollable region's top (in this case the $window).
```HTML
<div id="sidebar" ng-sticky sticky-offset="20">
  ...
</div>
```

## sticky-parent (optional)
A parent element that contains the scrollbar can be specified by using "sticky-parent" as seen in de demo.html

### Example: Sticky parent selector.
```HTML
<div id="sidebar" ng-sticky sticky-parent=".sticky-parent">
  ...
</div>
```