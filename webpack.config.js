const path = require( 'path' )

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
  plugins: [],
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

module.exports = [ network, interface ]