'use strict';

var $homeScreenDetector;

var invalidUA = 'Something/5.0 (whatever) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4';
var invalidiOSUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS     like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4';
var iOS8UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4';
var iOS7UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_3 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B508 Safari/9537.53';
var iOS6UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B141 Safari/8536.25';
var chromeUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.146 Safari/537.36';

describe("Service that detects what mobile OS the user is running", function () {
  beforeEach(function () {
    delete window.navigator.standalone;
    module('angularAddToHomeScreen');
    inject(function(_$homeScreenDetector_) {
      $homeScreenDetector = _$homeScreenDetector_;
    });
  });
  it('should exist', function() {
    expect(!!$homeScreenDetector).to.equal(true);
  });
  it('should return a value even if no value is provided to the constructor', function() {
    var hsd = new $homeScreenDetector();
    expect(hsd.iOS7()).to.not.be.undefined;
  });
  it('should return a value even if invalid user agent is provided to the constructor', function() {
    var hsd = new $homeScreenDetector({ customUA: invalidUA });
    expect(hsd.iOS8()).to.not.be.undefined;
  });
  it('should return a value even if invalid iOS user agent is provided to the constructor', function() {
    var hsd = new $homeScreenDetector({ customUA: invalidiOSUA });
    expect(hsd.iOS8()).to.not.be.undefined;
  });
  it('should detect iOS 6 Safari', function() {
    var hsd = new $homeScreenDetector({ customUA: iOS6UA });
    expect(hsd.iOS6() && hsd.safari()).to.be.true;
  });

  it('should detect iOS 7 Safari', function() {
    var hsd = new $homeScreenDetector({ customUA: iOS7UA });
    expect(hsd.iOS7() && hsd.safari()).to.be.true;
  });

  it('should detect iOS 8 Safari', function() {
    var hsd = new $homeScreenDetector({ customUA: iOS8UA });
    expect(hsd.iOS8() && hsd.safari()).to.be.true;
  });

  it('should detect device as iPhone', function() {
    var hsd = new $homeScreenDetector({ customUA: iOS7UA });
    expect(hsd.device()).to.equal('iPhone');
  });

  it('should detect fullscreen mode if in fullscreen mode', function() {
    window.navigator.standalone = true;
    var hsd = new $homeScreenDetector({ customUA: iOS8UA });
    expect(hsd.fullscreen()).to.be.true;
  });

  it('should detect fullscreen mode as false if not currently fullscreen', function() {
    window.navigator.standalone = false;
    var hsd = new $homeScreenDetector({ customUA: iOS8UA });
    expect(hsd.fullscreen()).to.be.false;
  });

  it('should not give bogus results', function () {
    var hsd = new $homeScreenDetector({ customUA: chromeUA });
    expect(hsd.iOS8()).to.be.false;
    expect(hsd.iOS7()).to.be.false;
    expect(hsd.iOS6()).to.be.false;
    expect(hsd.safari()).to.be.false;
  });

});
