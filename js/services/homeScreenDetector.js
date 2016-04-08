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
