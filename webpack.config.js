const path = require( 'path' )
const webpack = require( 'webpack' )
const nodeExternals = require( 'webpack-node-externals' )

const config = {
  mode: 'production',
  target: 'web',
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.css' ],
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
  }
}

const network = {
	...config,
	entry: [ './src/network/index.ts' ],
	output: {
		path: path.resolve( __dirname, 'network' ),
    libraryTarget: 'commonjs2',
		filename: 'index.js',
	}
}

const interface = {
	...config,
	entry: [ './src/interface/index.ts' ],
	output: {
		path: path.resolve( __dirname, 'interface' ),
    libraryTarget: 'commonjs2',
		filename: 'index.js',
	}
}

const builder = {
	...config,
  target: 'node',
	entry: [ './src/builder/index.ts' ],
	output: {
		path: path.resolve( __dirname, 'builder' ),
		filename: 'index.js',
	},
  externals: [
		nodeExternals()
	],
  plugins: [
    new webpack.BannerPlugin( { banner: "#!/usr/bin/env node", raw: true } ),
  ],
}

module.exports = [ network, interface, builder ]