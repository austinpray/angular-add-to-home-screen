/**
* angularAddToHomescreen Module
*
* Description
*/
angular.module('angularAddToHomeScreen', [])
  .constant('aathsLocales', {
    'en': {
      'iOS': 'Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.'
    }
  });
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
'use strict';

/**
 * 
 */
angular.module('angularAddToHomeScreen')
  .factory('$homeScreenDetector', [function(){
    
    var parser = new UAParser();

    function getMajorVersion (version) {
      return version.split('.')[0];
    }

    var Detector = function(options) {
      angular.extend(this, options);
      if(angular.isDefined(this.customUA)) {
        parser.setUA(this.customUA);
      }
      this.result = parser.getResult();
    };

    Detector.prototype.safari = function () {
      return this.result.browser.name === 'Mobile Safari';
    };

    Detector.prototype.iOS7 = function () {
      return this.result.os.name === 'iOS' && getMajorVersion(this.result.os.version) === '7';
    };

    Detector.prototype.iOS6 = function () {
      return this.result.os.name === 'iOS' && getMajorVersion(this.result.os.version) === '6';
    };

    Detector.prototype.device = function () {
      return this.result.device.model;
    };

    return Detector;

  }]);