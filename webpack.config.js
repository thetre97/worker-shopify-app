const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: `worker.js`,
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: []
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  }
}
