import common from "./helpers.js";
import $ from '../../node_modules/jquery';

// async loading. require only get objects (is also a good practice always return objects)
require(["./shared"], function(shared) {
  shared.log(shared.common + "...you've just clicked!!");
});
