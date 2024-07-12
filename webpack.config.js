const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )

module.exports = {
  mode: 'development',
  target: 'web',
  entry: [ './index.jsx' ],
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.css' ],
  },
  output: {
    publicPath: '/',
    path: path.resolve( __dirname, 'dist' ),
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
            presets: [ '@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript' ],
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
    } )
  ],
  stats: {
    modules: false,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    server: 'http',
    historyApiFallback: true,
    allowedHosts: 'all'
  }
}
