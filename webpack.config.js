const path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	basePath = __dirname;

module.exports = {
	resolve: {
		extensions: ['.js', '.ts', '.tsx']
	},
	entry: {
		app: './src/index.tsx',
		vendor: [
			'babel-polyfill',
			'axios'
		]
	},
	output: {
		path: path.join(basePath, 'dist'),
		filename: '[chunkhash][name].js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [{
					loader: 'babel-loader'
				}]
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader'
				},
				{
					loader: 'ts-loader'
				},
				{
					loader: 'tslint-loader'
				}
				]
			}]
	},
	devtool: 'inline-source-map',
	devServer: {
		port: 8080,
		hot: false,
		quiet: false,
		inline: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html', //Name of file in ./dist/
			template: './src/index.html', //Name of template in ./src
			hash: true,
		}),
		new webpack.ProvidePlugin({
			axios: 'axios'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new CopyWebpackPlugin([{
			from: 'src/assets',
			to: 'assets'
		}])
	],
}