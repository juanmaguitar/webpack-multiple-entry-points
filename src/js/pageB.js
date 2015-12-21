var common = require("./helpers");
var $ = require('../../node_modules/jquery');

require.ensure([ /* "./shared" */ ], function(require) {
	var shared = require("./shared");
	shared("This is page B");
});