// Modules:
var path              = require('path');
var gulp              = require('gulp');
var gulpBabel         = require('gulp-babel');
var webpackRecipe     = require('gib-recipe-webpack');


// Tasks:
gulp.task('default', ['webpack', 'webpack-server']);

gulp.task('webpack-server', webpackRecipe.server({
  dest: path.resolve(__dirname, 'build'),
}));

gulp.task('webpack', function () {
  return gulp.src('src/index.js')
    .pipe(gulpBabel({presets: ['es2015']}))
    .pipe(webpackRecipe.webpack({
      dest: path.resolve(__dirname, 'build')
    }))
    .on('error', function (err) {
      console.error(err);
    })
    .pipe(gulp.dest('build/'))
});

