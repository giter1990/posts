const path = require("path"),
	webpack = require("webpack"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	HtmlWebpackHotPlugin = require("html-webpack-hot-plugin"),
	htmlHotPlugin = new HtmlWebpackHotPlugin({
		hot: true
	}),
	WebpackMildCompile = require("webpack-mild-compile").Plugin,
	{ CleanWebpackPlugin } = require("clean-webpack-plugin");
	
module.exports = {
	entry: "./src/index.js",
	mode: "development",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader",
				options: { presets: ["@babel/env"] }
			},
			{
				test: /\.(pug)$/,
				include: path.join(__dirname, "src/"),
				use: [
					{loader: "apply-loader"},
					{loader: "pug-loader"}
				]
			},
			{
				test: /favicon.png/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							esModule: false
						}
					}
				]
			}
		]
	},
	resolve: { extensions: ["*", ".js", ".jsx"] },
	output: {
		path: path.resolve(__dirname, "./public/"),
		filename: "bundle.min.js"
	},
	devServer: {
		open: true,
		watchContentBase: true,
		contentBase: path.join(__dirname, "./public/"),
		compress: true,
		writeToDisk: (filePath) => {
			return /\.(html|js)$/.test(filePath);
		},
		port: 3000,
		publicPath: "http://localhost:3000/",
		hotOnly: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/index.pug"
		}),
		new WebpackMildCompile(),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				"0.*.hot-update.js",
				"1.*.hot-update.js",
				"main.*.hot-update.js"
			],
			cleanStaleWebpackAssets: false
		})
	]
}