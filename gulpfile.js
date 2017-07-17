var gulp = require("gulp");
var eslint = require('gulp-eslint');
var webpack = require("webpack");
var WebpackDevServer = require('webpack-dev-server');
var config = require('./dev/run.js');

gulp.task('lint', function() {
  return gulp.src(
    [
      'src/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('server', function() {
  new WebpackDevServer(webpack(config), {
    noInfo: true,
    publicPath: config.output.publicPath,
    // disableHostCheck: true, // webpack-dev-server版本是1.16.5时需要添加这个字段
    hot: true,
    historyApiFallback: true
  }).listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log('Listening at http://localhost:3000/');
  });
});