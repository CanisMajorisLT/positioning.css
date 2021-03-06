/**
 * Created by vyt on 2015-03-12.
 */
module.exports = {
  entry: __dirname+'/dev/jsx/main.jsx',
  output: {
    filename: __dirname+'/public/javascripts/mainbundle.js'
  },
  module: {
      loaders: [{ test: /\.scss$/, loader: "style!css!autoprefixer-loader!sass" },
                { test: /\.jsx$/, loader: "jsx-loader"}]
  }
};