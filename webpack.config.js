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
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('commons.js')
	]
}