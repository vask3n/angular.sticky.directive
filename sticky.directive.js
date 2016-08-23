(function () {
  'use strict';

  angular.module('appModule').directive('stickyOject', stickyOject);

  function stickyOject() {

    controller.$inject =['$element','$window'];
    function controller($element, $window) {

      var self = this;
      var stickyFrom = origin();
      var stickyUntil = document.querySelector(self.stickyUntil);
      var stickyOffset = self.stickyOffset || 0;

      function sticky(el){
        // Freeze width/height/fixed/top
        el.css({height: el[0].offsetHeight + 'px', width: el[0].offsetWidth + 'px', position: 'fixed', top: stickyOffset + 'px'});
      }

      function unsticky(el){
        // Reset all values
        el.css({height:'', width:'', position:'', top:''});
      }

      function origin(){
        // If no 'sticky-from' is defined, this will return the parent element.
        if (angular.isDefined(self.stickyFrom)) {
          return document.querySelector(self.stickyFrom);
        }
        return $element[0].parentNode;
      }

      angular.element($window).on('scroll', function(){
        // Trigger directive functions on scroll.
        if (stickyFrom.getBoundingClientRect().top < 0) {
          sticky($element);
        }
        if (stickyFrom.getBoundingClientRect().top > 0 || (stickyUntil.getBoundingClientRect().top - $element[0].offsetHeight) < 0) {
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
        stickyOffset: '@'
      }
    }
  }
})();
