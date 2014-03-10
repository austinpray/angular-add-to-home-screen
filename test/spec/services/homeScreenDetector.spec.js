'use strict';

var $homeScreenDetector;

var iOS7UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_3 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B508 Safari/9537.53';
var iOS6UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B141 Safari/8536.25';
var chromeUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.146 Safari/537.36';

describe("Service that detects what mobile OS the user is running", function () {
  beforeEach(function () {
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
  it('should detect iOS 6 Safari', function() {
    var hsd = new $homeScreenDetector({ customUA: iOS6UA });
    expect(hsd.iOS6() && hsd.safari()).to.be.true;
  });

  it('should detect iOS 7 Safari', function() {
    var hsd = new $homeScreenDetector({ customUA: iOS7UA });
    expect(hsd.iOS7() && hsd.safari()).to.be.true;
  });

  it('should detect device as iPhone', function() {
    var hsd = new $homeScreenDetector({ customUA: iOS7UA });
    expect(hsd.device()).to.equal('iPhone');
  });

  it('should not give bogus results', function () {
    var hsd = new $homeScreenDetector({ customUA: chromeUA });
    expect(hsd.iOS7()).to.be.false;
    expect(hsd.iOS6()).to.be.false;
    expect(hsd.safari()).to.be.false;
  });

});