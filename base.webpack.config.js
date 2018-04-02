const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePath = __dirname;

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css'],
    alias: {
      bulma: path.resolve(__dirname, 'node_modules/bulma/')
    }
  },
  entry: {
    app: './src/index.tsx',
    etiqueta: './src/etiqueta.tsx',
    vendor: ['react', 'react-dom', 'babel-polyfill', 'axios'],
    style: ['./src/styles', './node_modules/font-awesome/scss/font-awesome.scss']
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[chunkhash][name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
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
        test: /\.(woff2?|svg|png|jpe?g)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader'
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: false,
    quiet: false,
    inline: true,
    allowedHosts: ['http://localhost:8080'],
    host: 'localhost',
    port: 3000,
    proxy: {
      '/': {
        target: 'http://test:8080',
        secure: false,
        pathRewrite: { '^/': '' }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: './src/index.ejs', //Name of template in ./src
      hash: true,
      favicon: 'favicon.ico',
      excludeChunks: ['etiqueta']
    }),
    new HtmlWebpackPlugin({
      filename: 'etiquetaIndex.html', //Name of file in ./dist/
      template: './src/etiquetaIndex.html', //Name of template in ./src
      hash: true,
      chunksSortMode: 'dependency',
      favicon: 'favicon.ico',
      excludeChunks: ['app']
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'etiquetaEn.html',
    //   template: './ws/etiqueta_rendering/etiquetaEn.html',
    //   hash: true,
    //   chunksSortMode: 'manual',
    //   chunks: ['manifest', 'bootstrap', 'eeStyles']
    // }),
    new webpack.ProvidePlugin({
      axios: 'axios'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['manifest', 'vendor', 'app'].reverse()
    // }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: 'favicon.ico',
        to: 'favicon.ico'
      }
    ]),
    new ExtractTextPlugin({
      filename: '[chunkhash].[name].css',
      disable: false,
      allChunks: true
    })
  ]
};
