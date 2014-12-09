'use strict';

var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();

gulp.task('clean', function () {
  return gulp.src(['dist/'], {read: false}).pipe(plugins.clean());
});

gulp.task('scripts', function () {
  return gulp.src('js/**/*.js')
    .pipe(plugins.changed('dist/'))
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.concat('angular-add-to-home-screen.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(plugins.size());
});

gulp.task('styles', function () {
  return gulp.src('styles/**/*.css')
    .pipe(plugins.changed('dist/'))
    .pipe(plugins.base64())
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['scripts', 'styles']);

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

var testFiles = [
  'bower_components/ua-parser-js/src/ua-parser.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-mocks/angular-mocks.js',
  'js/**/*.js',
  'test/**/*.js'
];

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(plugins.karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

// Watch
gulp.task('watch', function () {
  // Watch .js files
  gulp.watch(['js/**/*.js', 'styles/**/*.css'], ['build']);
});
