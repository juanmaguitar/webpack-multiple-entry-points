# webpack-multiple-entry-points (ES2015 modules)

This repository is based in the [multiple-entry-points](https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points) example available at https://github.com/webpack/webpack

## Install

First of all you must install dependencies

`npm install`

and then you can create the bundles by doing

`npm start`

After this, you can open `pageA.html` or `pageAB.html` and check how the js files have been created properly and how webpack is also managing the 'on-demand' loading


## Description 

This example shows:
- how to use multiple entry points
- how to create a common chunk w/ shared dependencies
- how to do 'on-demand' js loading and let webpack handle it

In this example you have two (HTML) pages `pageA` and `pageAB`. You want to create individual bundles for each page. In addition to this you want to create a shared bundle that contains all modules used in both pages (assuming there are many/big modules in common). The pages also use Code Splitting to load a less used part of the features on demand (async loading).

You can see how to define multiple entry points via the `entry` option and the required changes (`[name]`) in the `output` option. You can also see how to use the CommonsChunkPlugin.

You can see the output files:

* `commons.js` contains:
  * the module system
  * chunk loading logic
  * module `helpers.js` and `jQuery` which is used in both entry pages
* `pageA.bundle.js` contains:
  * the entry point `pageA.js`
  * it would contain any other module that is only used by `pageA`
* `pageA.bundle.js` contains:
  * the entry point `pageB.js`
  * it would contain any other module that is only used by `pageB`
* `1.1.bundle.js` is an additional chunk which is used by both pages. It contains:
  * module `shared.js`
* `3.3.bundle.js` is an additional chunk which is used only used by `pageB`. It contains:
  * module `on-demand-something.js`


You can also see the info that is printed to console. It shows among others:

* the generated files
* the chunks with file, name and id
  * see lines starting with `chunk`
* the modules that are in the chunks
* the reasons why the modules are included
* the reasons why a chunk is created
  * see lines starting with `>`

## `src/js` files

#### `pageA.js`

``` javascript
import common from "./helpers.js";
import $ from '../../node_modules/jquery';

// async loading. require only get objects (is also a good practice always return objects)
require(["./shared"], function(shared) {
  shared.log(shared.common + "...you've just clicked!!");
});
```

#### `pageB.js`

``` javascript
import common from "./helpers.js";
import $ from '../../node_modules/jquery';

$("#click-me").click(function() {

  // already loaded by pageA.js??
   require(["./shared"], function(shared) {
    shared.log(shared.common + "...you've just clicked!!");
  });

  // will be loaded on-demand (when clicking)
  require(["./on-demand-something"], function(onDemand) {
    onDemand.log("Yes you did!!");
    onDemand.log(common);
  });

})
```

## `config` files

#### `package.json`

``` javascript
{
  "name": "webpack-multiple-entry-points",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webpack-dev": "webpack --progress --colors -d",
    "webpack-prod": "webpack --progress --colors -p",
    "webpack-dev-details": "webpack --progress --colors --display-reasons --display-chunks --display-modules",
    "build": "npm run webpack-prod",
    "start": "npm run webpack-dev"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "jquery": "^2.1.4"
  },
  "devDependencies": {
    "webpack": "^1.12.9",
    "babel-core": "^6.3.17",
    "babel-loader": "^6.2.0",
    "babel-preset-es2015": "^6.3.13"
  }
}

```


#### `webpack.config.js`

``` javascript
var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    pageA: "./src/js/pageA",
    pageB: "./src/js/pageB"
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    publicPath: "dist/js/",
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('commons.js')
  ]
}
```

## `html` files

#### `pageA.html`

``` html
<html>
  <head></head>
  <body>
    <!-- html content -->
    <p><a href="pageAB.html">go to pageAB >>>>>>>> </a></p>

    <!-- scripts -->
    <script src="dist/js/commons.js" charset="utf-8"></script>
    <script src="dist/js/pageA.bundle.js" charset="utf-8"></script>
  </body>
</html>
```

#### `pageAB.html`

``` html
<html>
  <head></head>
  <body>
    <!-- html content -->
    <button id="click-me">click me to load js file</button>
    <p><a href="pageA.html"> <<<<<<<<<<<< go to pageA</a></p>

    <!-- scripts -->
    <script src="dist/js/commons.js" charset="utf-8"></script>
    <script src="dist/js/pageA.bundle.js" charset="utf-8"></script>
    <script src="dist/js/pageB.bundle.js" charset="utf-8"></script>
  </body>
</html>
```

## `dist/js` (generated) files

#### `commons.js`

``` javascript
/******/ (function(modules) { // webpackBootstrap
/******/  // install a JSONP callback for chunk loading
/******/  var parentJsonpFunction = window["webpackJsonp"];
/******/  window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/    // add "moreModules" to the modules object,
/******/    // then flag all "chunkIds" as loaded and fire callback
/******/    var moduleId, chunkId, i = 0, callbacks = [];
/******/    for(;i < chunkIds.length; i++) {
/******/      chunkId = chunkIds[i];
/******/      if(installedChunks[chunkId])
/******/        callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/      installedChunks[chunkId] = 0;
/******/    }
/******/    for(moduleId in moreModules) {
/******/      modules[moduleId] = moreModules[moduleId];
/******/    }
/******/    if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/    while(callbacks.length)
/******/      callbacks.shift().call(null, __webpack_require__);
/******/    if(moreModules[0]) {
/******/      installedModules[0] = 0;
/******/      return __webpack_require__(0);
/******/    }
/******/  };

/******/  // The module cache
/******/  var installedModules = {};

/******/  // object to store loaded and loading chunks
/******/  // "0" means "already loaded"
/******/  // Array means "loading", array contains callbacks
/******/  var installedChunks = {
/******/    4:0
/******/  };

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      exports: {},
/******/      id: moduleId,
/******/      loaded: false
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.loaded = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }

/******/  // This file contains only the entry chunk.
/******/  // The chunk loading function for additional chunks
/******/  __webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/    // "0" is the signal for "already loaded"
/******/    if(installedChunks[chunkId] === 0)
/******/      return callback.call(null, __webpack_require__);

/******/    // an array means "currently loading".
/******/    if(installedChunks[chunkId] !== undefined) {
/******/      installedChunks[chunkId].push(callback);
/******/    } else {
/******/      // start chunk loading
/******/      installedChunks[chunkId] = [callback];
/******/      var head = document.getElementsByTagName('head')[0];
/******/      var script = document.createElement('script');
/******/      script.type = 'text/javascript';
/******/      script.charset = 'utf-8';
/******/      script.async = true;

/******/      script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"pageA","2":"pageB"}[chunkId]||chunkId) + ".bundle.js";
/******/      head.appendChild(script);
/******/    }
/******/  };

/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "dist/js/";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* helpers.js */
  var helper = "Helper";
  exports.default = helper;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
   * jQuery JavaScript Library v2.1.4
   * http://jquery.com/
   *
   * Includes Sizzle.js
   * http://sizzlejs.com/
   *
   * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
   * Released under the MIT license
   * http://jquery.org/license
   *
   * Date: 2015-04-28T16:01Z
   */

  (function( global, factory ) {

  // jquery code.... LOTS OF LINES!!!!

  return jQuery;

  }));

/***/ }
/******/ ]);
```

#### `pageA.bundle.js`

``` javascript
webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";

  var _helpers = __webpack_require__(1);

  var _helpers2 = _interopRequireDefault(_helpers);

  var _jquery = __webpack_require__(2);

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // async loading. require only get objects (is also a good practice always return objects)
  __webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(3)]; (function (shared) {
    shared.log(shared.common + "...you've just clicked!!");
  }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});

/***/ }
]);
```

#### `pageB.bundle.js`

``` javascript
webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";

  var _helpers = __webpack_require__(1);

  var _helpers2 = _interopRequireDefault(_helpers);

  var _jquery = __webpack_require__(2);

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  (0, _jquery2.default)("#click-me").click(function () {

    // already loaded by pageA.js??
    __webpack_require__.e/* require */(1/* duplicate */, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(3)]; (function (shared) {
      shared.log(shared.common + "...you've just clicked!!");
    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});

    // will be loaded on-demand (when clicking)
    __webpack_require__.e/* require */(3, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(4)]; (function (onDemand) {
      onDemand.log("Yes you did!!");
      onDemand.log(_helpers2.default);
    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
  });

/***/ }
]);
```

#### `1.1.bundle.js`

``` javascript
webpackJsonp([1],{

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.common = exports.log = undefined;

  var _helpers = __webpack_require__(1);

  var _helpers2 = _interopRequireDefault(_helpers);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /* on-demand something */
  function log(msg) {
    console.log(msg);
  } /* shared */
  ;

  // var common = require("./helpers");
  exports.log = log;
  exports.common = _helpers2.default;

/***/ }

});
```

#### `3.3.bundle.js`

``` javascript
webpackJsonp([3],{

/***/ 4:
/***/ function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* on-demand something */
  function log(msg) {
    console.log(msg);
  };

  // var common = require("./helpers");
  exports.log = log;

/***/ }

});
```

# Info

## Uncompressed
```ShellSession
$ npm run webpack-dev-details

> webpack-multiple-entry-points@1.0.0 webpack-dev-details /Users/juanma/www/webpack-multiple-entry-points
> webpack --progress --colors --display-reasons --display-chunks --display-modules

Hash: 81c66a85d898dddc5e4d  
Version: webpack 1.12.9
Time: 8299ms
          Asset       Size  Chunks             Chunk Names
pageA.bundle.js  748 bytes       0  [emitted]  pageA
  1.1.bundle.js  602 bytes       1  [emitted]  
pageB.bundle.js    1.11 kB       2  [emitted]  pageB
  3.3.bundle.js  294 bytes       3  [emitted]  
     commons.js     259 kB       4  [emitted]  commons.js
chunk    {0} pageA.bundle.js (pageA) 500 bytes {4} [rendered]
    [0] ./src/js/pageA.js 500 bytes {0} [built]
chunk    {1} 1.1.bundle.js 488 bytes {0} {2} [rendered]
    [3] ./src/js/shared.js 488 bytes {1} [built]
        amd require ./shared [0] ./src/js/pageA.js 14:0-16:2
        amd require ./shared [0] ./src/js/pageB.js 16:2-18:4
chunk    {2} pageB.bundle.js (pageB) 693 bytes {4} [rendered]
    [0] ./src/js/pageB.js 693 bytes {2} [built]
chunk    {3} 3.3.bundle.js 206 bytes {2} [rendered]
    [4] ./src/js/on-demand-something.js 206 bytes {3} [built]
        amd require ./on-demand-something [0] ./src/js/pageB.js 21:2-24:4
chunk    {4} commons.js (commons.js) 248 kB [rendered]
    [1] ./src/js/helpers.js 145 bytes {4} [built]
        cjs require ./helpers.js [0] ./src/js/pageA.js 3:15-38
        cjs require ./helpers.js [0] ./src/js/pageB.js 3:15-38
        cjs require ./helpers.js [3] ./src/js/shared.js 8:15-38
    [2] ./~/jquery/dist/jquery.js 248 kB {4} [built]
        cjs require ../../node_modules/jquery [0] ./src/js/pageA.js 7:14-50
        cjs require ../../node_modules/jquery [0] ./src/js/pageB.js 7:14-50
```

Notice the `amd require` (AMD require) and `cjs require` (CommonJs require) indicating different types of modules co-existing

## Minimized (uglify-js, no zip)

```ShellSession
$ npm run webpack-prod

> webpack-multiple-entry-points@1.0.0 webpack-prod /Users/juanma/www/webpack-multiple-entry-points
> webpack --progress --colors -p

Hash: 72b7f523425f8266b817  
Version: webpack 1.12.9
Time: 10796ms
          Asset       Size  Chunks             Chunk Names
  0.0.bundle.js  253 bytes       0  [emitted]  
     commons.js    86.3 kB       1  [emitted]  commons.js
  2.2.bundle.js  136 bytes       2  [emitted]  
pageB.bundle.js  394 bytes       3  [emitted]  pageB
pageA.bundle.js  238 bytes       4  [emitted]  pageA
    + 6 hidden modules

WARNING in commons.js from UglifyJs
Condition always true [./~/jquery/dist/jquery.js:9170,0]
```

## Resources 

- http://www.slideshare.net/ittalk/webpack
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
- https://hacks.mozilla.org/2015/08/es6-in-depth-modules/
- http://exploringjs.com/es6/ch_modules.html
- 