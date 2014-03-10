'use strict';

angular.module('angularAddToHomeScreen')
  .directive('ngAddToHomeScreen', ['$homeScreenDetector', function($homeScreenDetector){
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      scope: {}, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      template: '<div class="aths-container" ng-if="applicable"></div>',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {
        var hsd = new $homeScreenDetector();
        var icon = 'derp';
        var locales = {
          'en': {
            'iOS': 'Install this web app on your ' + hsd.device() + ': tap '+ icon + ' and then <strong>Add to Home Screen</strong>.'
          }
        };
        $scope.applicable = hsd.safari && (hsd.iOS7() || hsd.iOS6());
        if($scope.applicable) {
          iElm.append(locales.en.iOS);
        }
      }
    };
  }]);