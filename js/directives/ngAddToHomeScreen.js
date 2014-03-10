'use strict';

angular.module('angularAddToHomeScreen')
  .directive('ngAddToHomeScreen', ['$homeScreenDetector', 'aathsLocales', function($homeScreenDetector, aathsLocales){
    var hydrateInstructions = function (hsdInstance) {
      var device = hsdInstance.device() || "device";
      var instructions;
      var icon;

      if(hsdInstance.iOS7() || hsdInstance.iOS6()) {
        instructions = aathsLocales.en.iOS;
        icon = hsdInstance.iOS7() === true ? 'iOS7' : 'iOS6';
      }

      instructions = instructions
        .replace('%icon', function () {
          return '<span class="aaths-' + icon + '-icon"></span>';
        })
        .replace('%device', device);
      console.log(instructions);
      return instructions;
    };

    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      scope: {}, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      template: '<div class="aaths-container" ng-if="applicable"></div>',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {
        var hsd = new $homeScreenDetector();
        $scope.applicable = hsd.safari && (hsd.iOS7() || hsd.iOS6());
        if($scope.applicable) {
          iElm.append(hydrateInstructions(hsd));
        }
      }
    };
  }]);