const path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	basePath = __dirname;

module.exports = {
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		alias: {
			bulma: path.resolve(__dirname, 'node_modules/bulma/')
		}
	},
	entry: {
		app: './src/index.tsx',
		vendor: [
			'babel-polyfill',
			'axios'
		],
		style: [
			'./node_modules/font-awesome/scss/font-awesome.scss'
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
			},
			{
				test: /\.(scss|sass)$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: false,
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				})
			},
			{
				test: /\.(woff2?|svg|png|jpg)$/,
				loader: 'url-loader?limit=10000'
			},
			{
				test: /\.(ttf|eot)$/,
				loader: 'file-loader'
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
		}]),
		new ExtractTextPlugin({
			filename: '[chunkhash].[name].css',
			disable: false,
			allChunks: true
		})
	],
}