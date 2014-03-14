angular-add-to-home-screen [![Build Status](https://travis-ci.org/austinpray/angular-add-to-home-screen.png?branch=master)](https://travis-ci.org/austinpray/angular-add-to-home-screen)
=========================

An AngularJS directive to display an "add to homescreen" dialog for iOS 7 and iOS 6

Installation
---
### bower
```
bower install angular-add-to-home-screen
```

### Manually
[Hop on over to the releases page](https://github.com/austinpray/angular-add-to-home-screen/releases) and grab `angular-add-to-homescreen.js` and `aaths.css`

or download the source code and use the files in the `dist/` folder

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
