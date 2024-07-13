const path = require( 'path' )
const webpack = require( 'webpack' )
const nodeExternals = require( 'webpack-node-externals' )

const config = {
  mode: 'development',
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
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
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

const command = {
	...config,
  target: 'node',
	entry: [ './src/command/index.ts' ],
	output: {
		path: path.resolve( __dirname, 'command' ),
		filename: 'index.js',
	},
  externals: [
		nodeExternals()
	],
  plugins: [
    new webpack.BannerPlugin( { banner: "#!/usr/bin/env node", raw: true } ),
  ],
}

module.exports = [ network, interface, command ]