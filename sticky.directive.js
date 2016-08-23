(function () {
  'use strict';

  angular.module('appModule').directive('stickyOject', stickyOject);

  function stickyOject() {

    controller.$inject =['$element','$window'];

    function controller($element, $window) {

      var self = this;
      var stickyFrom = isStickyFrom();
      var stickyUntil = isStickyUntil();
      var stickyOffset = self.stickyOffset || 0;
      var stickyFromMedia = isStickyFromMedia();
      

      function isStickyFromMedia() {
        // Check media queries against "sticky-from-media" attribute when set.
        var mediaQueries = {xs:0, sm:768, md:992, lg:1200};
        if (angular.isDefined(self.stickyFromMedia)) {
          return $window.innerWidth > mediaQueries[self.stickyFromMedia];
        }
        return true
      }

      function sticky(el){
        // Freeze width/height/fixed/top.
        el.css({
          height: el[0].offsetHeight + 'px',
          width: el[0].offsetWidth + 'px',
          position: 'fixed',
          top: stickyOffset + 'px'
        });
      }

      function unsticky(el){
        // Reset all values.
        el.css({
          height:'',
          width:'',
          position:'',
          top:''
        });
      }

      function isStickyFrom() {
        // If no 'sticky-from' is defined, this will return the parent element.
        if (angular.isDefined(self.stickyFrom)) {
          return document.querySelector(self.stickyFrom);
        }
        return $element[0].parentNode;
      }

      function isStickyUntil() {
        // If no 'sticky-until' is defined, $element will remain sticky till the end of the document/page.
        if (angular.isDefined(self.stickyUntil)) {
          return document.querySelector(self.stickyUntil);
        }
        return undefined;
      }

      angular.element($window).on('scroll', function(){
        // Trigger directive functions on scroll.
        if (stickyFrom.getBoundingClientRect().top < stickyOffset && stickyFromMedia) {
          sticky($element);
        }
        if (stickyFrom.getBoundingClientRect().top > stickyOffset && stickyFromMedia || stickyUntil && stickyFromMedia && (stickyUntil.getBoundingClientRect().top - $element[0].offsetHeight) < stickyOffset) {
          unsticky($element);
        }
      });
    }

    return {
      restrict: 'A',
      controller: controller,
      controllerAs: 'stickyController',
      bindToController: {
        stickyFrom: '@',
        stickyUntil: '@',
        stickyOffset: '@',
        stickyFromMedia: '@'
      }
    }
  }
})();
