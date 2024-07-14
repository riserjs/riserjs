#!/usr/bin/env node
import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpackDevServer from 'webpack-dev-server'
import DotEnv from 'dotenv-webpack'

const config: any = {
  mode: process.argv[ process.argv.length - 1 ] == 'dev' ? 'development' : 'production',
  target: 'web',
  entry: [ './index.jsx' ],
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.css' ],
  },
  output: {
    publicPath: '/',
    path: path.resolve( __dirname, '../../../dist' ),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', [ '@babel/preset-react', { 'runtime': 'automatic' } ], '@babel/preset-typescript' ],
          },
        },
      },
      { 
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin( {
      //favicon: path.join( __dirname, './src', 'favicon.ico' ),
      templateContent: '<!DOCTYPE html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0"></head><body><div id="root"></div></body></html>'
    } ),
    new DotEnv()
  ],
  stats: {
    modules: false,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}

const compiler = webpack( config )

new webpackDevServer( {
  host: '0.0.0.0',
  hot: true,
  client: { logging: 'none' },
  liveReload: true,
  port: 3000,
  historyApiFallback: true,
  allowedHosts: 'all'
}, compiler ).start( )