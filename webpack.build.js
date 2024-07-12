const path = require( 'path' )

module.exports = {
  mode: 'development',
  target: 'web',
  entry: [ './src/index.tsx' ],
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.css' ],
  },
  output: {
    path: path.resolve( __dirname, 'dist' ),
    libraryTarget: 'commonjs2',
    filename: 'riser.js'
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
