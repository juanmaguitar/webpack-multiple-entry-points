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
