const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './build-lib/webpack-entry.js',
  output: {
    filename: 'webpack-entry.js',
    path: path.resolve(__dirname, '../es')
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/components',
        to: '../es/components',
        ignore: [ '*.ts','*.tsx' ]
        // toType: 'template'
      }
    ])
  ]
};
