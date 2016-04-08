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
      var device = hsdInstance.device() || 'device';
      var instructions;
      var icon;


      if(hsdInstance.iOS9() || hsdInstance.iOS8() || hsdInstance.iOS7() || hsdInstance.iOS6()) {
        instructions = aathsLocales.en.iOS;
        if (hsdInstance.iOS9()) {
          icon = 'iOS8';
        } else if (hsdInstance.iOS8()) {
          icon = 'iOS8';
        } else if (hsdInstance.iOS7()) {
          icon = 'iOS7';
        } else {
          icon = 'iOS6';
        }
      }

      instructions = instructions
        .replace('%icon', function () {
          return '<span class="aaths-' + icon + '-icon"></span>';
        })
        .replace('%device', device);
      return '<div class="aaths-instructions">' + instructions + '</div>';
    };

    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      scope: {
        closeCallback: '=closeCallback'
      }, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      template: '<a class="aaths-close" ng-click="aathsClose()">{{ closeText }}</a><div ng-transclude></div>',
      // templateUrl: '',
      // replace: true,
      transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm) {

        $scope.aathsClose = function () {
          iElm.remove();
          if(angular.isFunction($scope.closeCallback)) {
            $scope.closeCallback();
          }
        };
        var hsd = new $homeScreenDetector();
        $scope.applicable = hsd.safari && (hsd.iOS9() || hsd.iOS8() || hsd.iOS7() || hsd.iOS6()) && !hsd.fullscreen();
        $scope.closeText = '×';
        if($scope.applicable) {
          iElm
            .addClass('aaths-container')
            .append(hydrateInstructions(hsd));
        } else {
          iElm.remove();
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
      return (typeof(version) === 'undefined') ? undefined : version.split('.')[0];
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

    Detector.prototype.iOS9 = function () {
      return this.result.os.name === 'iOS' && getMajorVersion(this.result.os.version) === '9';
    };
    
    Detector.prototype.iOS8 = function () {
      return this.result.os.name === 'iOS' && getMajorVersion(this.result.os.version) === '8';
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

    Detector.prototype.fullscreen = function () {
      return (("standalone" in window.navigator) && window.navigator.standalone) ? true : false;
    };

    return Detector;

  }]);
