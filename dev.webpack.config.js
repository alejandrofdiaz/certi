const
	webpack = require('webpack'),
	webpackMerge = require('webpack-merge'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	commonConfig = require('./base.webpack.config.js');

module.exports = () =>
	webpackMerge(commonConfig, {
		module: {
			rules: [
				{
					test: /\.css$/,
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
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							}
						]
					})
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
								loader: 'postcss-loader',
								options: {
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
			]
		},
		devtool: 'inline-source-map',
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'GOOGLE_API_KEY': JSON.stringify('AIzaSyDbtEXX5KAQWgVfRUoDFj5BOkPcUHt8j2w')
				}
			}),
		]
	});