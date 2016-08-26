(function () {
  'use strict';

  angular.module('appModule').directive('ngSticky', ngSticky);

  function ngSticky() {

    controller.$inject = ['$element', '$window'];

    function controller($element, $window) {

      var self = this;
      self.isStickyActive = false;

      var parentElem;
      var stickyFrom;
      var stickyUntil;
      var stickyOffset;
      var stickyFromMedia = isStickyFromMedia();
      var scrollView = getStickyParent();
      var scrollViewOffset = getScrollViewOffset();

      init();

      function init() {
        createParentElement();
        stickyFrom = isStickyFrom();
        stickyUntil = isStickyUntil()
        stickyOffset = parseInt(self.stickyOffset) || 0;
      }

      function createParentElement() {
        $element.wrap('<span>');
        parentElem = $element.parent();
      }

      function getStickyParent() {
        // Get the parent with scrollbar
        return angular.isDefined(self.stickyParent) ? scrollParent(self.stickyParent) : $window;
      }

      function getScrollViewOffset() {
        // Check offset if scrollView is not $window.
        return getStickyParent() !== $window ? scrollParent(self.stickyParent)[0].getBoundingClientRect().top : 0;
      }

      function scrollParent(selector) {
        // Find first parent that hits the selector;
        // TODO ksaanen: make this find it's scroll parent without selector defined
        var el = $element.parent();
        while (el !== document) {
          var iteration = el;
          if (iteration.parent()[0].querySelectorAll(selector).length > 0) {
            return iteration;
          }
          el = iteration.parent();
        }
        return null;
      }

      function isStickyFromMedia() {
        // Check media queries against "sticky-from-media" attribute when set.
        var mediaQueries = {xs:0, sm:768, md:992, lg:1200};
        if (angular.isDefined(self.stickyFromMedia)) {
          return $window.innerWidth > mediaQueries[self.stickyFromMedia];
        }
        return true;
      }

      function sticky() {
        // Get sticky
        if (!self.isStickyActive) {
          $element.css({
            height: $element[0].offsetHeight + 'px',
            width: $element[0].offsetWidth + 'px',
            position: 'fixed',
            top: (stickyOffset + scrollViewOffset) + 'px'
          });
          dummySwitch();
          self.isStickyActive = true;
        };
      }

      function unsticky(){
        // Reset all values.
        if (self.isStickyActive) {
          $element.css({ height: '', width: '', position: '', top: '' });
          dummySwitch();
          self.isStickyActive = false;
        };
      }

      function isStickyFrom() {
        // If no 'sticky-from' is defined, this will return the parent element.
        if (angular.isDefined(self.stickyFrom)) {
          return document.querySelector(self.stickyFrom);
        }
        return parentElem[0]; // dummy block
      }

      function isStickyUntil() {
        // If no 'sticky-until' is defined, $element will remain sticky till the end of the document/page.
        if (angular.isDefined(self.stickyUntil)) {
          return document.querySelector(self.stickyUntil);
        }
        return null;
      }

      function dummySwitch() {
        // Reserve space so layout won't fail
        if (!self.isStickyActive) {
          var dummy = document.createElement('div');
          angular.element(dummy).css({ height: $element[0].offsetHeight + 'px', width: $element[0].offsetWidth + 'px' });
          parentElem.append(dummy);
        } else {
          $element.next().remove();
        }
      }

      function scrollEvent(e){
        var origin = (scrollView !== $window) ? scrollView[0].getBoundingClientRect().top : 0;
        var from = (stickyFrom.getBoundingClientRect().top - origin);

        if (from < stickyOffset && stickyFromMedia) {
          sticky();
        } else if (from > stickyOffset && stickyFromMedia || stickyUntil && stickyFromMedia && (stickyUntil.getBoundingClientRect().top - $element[0].offsetHeight) < stickyOffset) {
          unsticky();
        }
      }

      angular.element(scrollView).on('scroll', function() {
        scrollEvent();
      });

    }

    return {
      restrict: 'A',
      controller: controller,
      controllerAs: '$ctrl',
      bindToController: {
        stickyFrom: '@',
        stickyUntil: '@',
        stickyOffset: '@',
        stickyFromMedia: '@',
        stickyParent: '@'
      }
    }
  }
})();
