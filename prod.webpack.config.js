const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./base.webpack.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const REMOTE_URL = 'http://localhost:8080/';

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
                  minimize: true,
                  modules: false,
                  sourceMap: false
                }
              },
              {
                loader: 'postcss-loader'
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
                  minimize: true,
                  modules: false,
                  sourceMap: false
                }
              },
              {
                loader: 'postcss-loader'
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          })
        }
      ]
    },
    devtool: 'none',
    plugins: [
      new webpack.DefinePlugin({
        __REACT_DEVTOOLS_GLOBAL_HOOK__: JSON.stringify(false),
        WS_URL: JSON.stringify(REMOTE_URL),
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          GOOGLE_API_KEY: JSON.stringify('AIzaSyDbtEXX5KAQWgVfRUoDFj5BOkPcUHt8j2w'),
          GOOGLE_CAPTCHA_KEY: JSON.stringify('6LcXNTMUAAAAAF6VkfDnlA-K4RAPsg6e7vs_iWsg')
        }
      }),
      new UglifyJSPlugin({
        sourceMap: false,
        uglifyOptions: {
          output: {
            comments: false,
            beautify: false,
            quote_style: 1
          }
        }
      })
    ]
  });
