'use strict';

var directives = angular.module('fs-directives', []);

directives.directive('fsPages', function(Navigation) {

  return function(scope, elm, attrs, ctrl) {
    elm.addClass('fs-pages-container');
    var pageElms = elm.children();

    var onResize = function() {
      //var h = window.innerHeight;
      var w = window.innerWidth;
      elm.css('width', pageElms.length * w + "px");

      _.forEach(pageElms, function(p) {
        angular.element(p).css('width', w + "px");
      });

      Navigation.setWidth(w);
    }

    window.addEventListener('resize', onResize, false);
    onResize();

    Navigation.registerPages(elm);
  };
});

directives.directive('fsPage', function(Navigation) {
  return function(scope, elm, attrs, ctrl) {
    elm.addClass('fs-page');
  };
});

