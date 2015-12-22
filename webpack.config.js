var path = require("path");
var webpack = require("webpack");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

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
		new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8080/webpack-dev-server/' }),
		new webpack.optimize.CommonsChunkPlugin('commons.js')
	]
}