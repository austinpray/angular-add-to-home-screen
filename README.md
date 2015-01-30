angular-add-to-home-screen [![Build Status](https://travis-ci.org/austinpray/angular-add-to-home-screen.svg?branch=0.1.2)](https://travis-ci.org/austinpray/angular-add-to-home-screen)
=========================

An AngularJS directive to display an "add to homescreen" dialog for iOS.

[Try it out](http://rawgit.com/austinpray/angular-add-to-home-screen/master/example.html) (hint: your user agent needs to identify as an iOS device).

![iOS7](http://i.imgur.com/UVjLVWw.png)
![iOS6](http://i.imgur.com/Ap4r995.png)

Installation
---
### bower
```
bower install angular-add-to-home-screen
```

Setup
---
1. Grab `dist/angular-add-to-home-screen.js` and include it in your javascript payload
2. Import the module as a dependency
```js
angular.module('myApp', ['angularAddToHomeScreen']);
```
3. Include the classes from `styles/aaths.css` in your app's CSS :cool:

Examples
---
### Basic
Will show a dialog with the proper icons for the platform
```html
<div ng-add-to-homescreen></div>
```

CSS API
---
This plugin does not style anything for you. It is completely up to you to
style the dialog in whatever way makes sense for your application. However, this is
a fully styled example in the `example/` directory. Check out `example.css`. Feel
free to just copy the styles into your project.
```haml
div.aaths-container
  a.aaths-close // close button
  div.aaths-instructions
    span.aaths-iOS6-icon // "share" icon if iOS6
    span.aaths-iOS7-icon // "share" icon if iOS7
    span.aaths-iOS8-icon // "share" icon if iOS8
```

### why?
If you are using this script you might want to make a modal window pop up
with the instructions, or you might want to make one of those trendy
app banners up top. I don't discriminate, use this to do the hard stuff
and you can style it however you want.

Contributing
---
Issues and pull requests greatly appreciated. Please be on the lookout for:
- outdated User Agent strings
- tests failing
- improve testing

### Todo
- Add to homescreen for Android Chrome

License
---
MIT
