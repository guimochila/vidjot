const path = require('path');

module.exports = {
  entry: './public/js/vidjot.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'vidjot.js',
  },
  devtool: 'source-map',
};
