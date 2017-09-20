const path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
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
				test: /\.(woff2?|svg|png|jpe?g)$/,
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
		new webpack.DefinePlugin({
			'process.env': {
				'GOOGLE_API_KEY': JSON.stringify('AIzaSyCK4elKV3R6ynOFngczVc0-kiBeHd9uEbo')
			}
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
		}),
		new BundleAnalyzerPlugin({  // Can be `server`, `static` or `disabled`. 
			// In `server` mode analyzer will start HTTP server to show bundle report. 
			// In `static` mode single HTML file with bundle report will be generated. 
			// In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`. 
			analyzerMode: 'static',
			// Host that will be used in `server` mode to start HTTP server. 
			// analyzerHost: '127.0.0.1',
			// // Port that will be used in `server` mode to start HTTP server. 
			// analyzerPort: 8888,
			// Path to bundle report file that will be generated in `static` mode. 
			// Relative to bundles output directory. 
			reportFilename: 'report.html',
			// Module sizes to show in report by default. 
			// Should be one of `stat`, `parsed` or `gzip`. 
			// See "Definitions" section for more information. 
			defaultSizes: 'parsed',
			// Automatically open report in default browser 
			openAnalyzer: false,
			// If `true`, Webpack Stats JSON file will be generated in bundles output directory 
			generateStatsFile: false,
			// Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`. 
			// Relative to bundles output directory. 
			statsFilename: 'stats.json',
			// Options for `stats.toJson()` method. 
			// For example you can exclude sources of your modules from stats file with `source: false` option. 
			// See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21 
			statsOptions: null,
			// Log level. Can be 'info', 'warn', 'error' or 'silent'. 
			logLevel: 'info'
		})
	],
}