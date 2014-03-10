angular-add-to-home-screen
=========================

An AngularJS directive to display an "add to homescreen" dialog for iOS 7 and iOS 6

Features
---
- ~~No dependencies~~ Doesn’t require jQuery
- Bring Your Own Styling
- Kept up-to-date by the Open Source community

Examples
---
### Basic
Will show a dialog with the proper icons for the platform
```html
<div ng-add-to-homescreen></div>
```

Installation
---
1. Grab `dist/angular-add-to-home-screen.js` and include it in your javascript payload
2. Import the module as a dependency
```js
angular.module('myApp', ['angularAddToHomeScreen']);
```
3. :cool:

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
