import common from "./helpers.js";
import $ from '../../node_modules/jquery';
import { Point, ColorPoint } from "./myClass.js";

var color = new ColorPoint(5,6,"blue");
console.log ( color.toString() )

var point = new Point(4,56);
console.log ( point.toString() )

// async loading. require only get objects (is also a good practice always return objects)
require(["./shared"], function(shared) {
  shared.log(shared.common + "...you've just clicked!!");
});
