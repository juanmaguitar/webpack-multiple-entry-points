var common = require("./helpers");
var $ = require('../../node_modules/jquery');

$("#click-me").click(function() {

  // already loaded by pageA.js??
  require.ensure([ /* "./shared" */ ], function(require) {
    var shared = require("./shared");
    shared("You've just clicked!!");
  });

  // will be loaded on-demand (when clicking)
  require.ensure([], function(require) {
    var asyncLog = require("./on-demand-something");
    asyncLog("Yes you did!!");
  });
})
