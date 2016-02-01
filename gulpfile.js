'use strict';

var jshint = require('gulp-jshint');
var gulp = require('gulp');
// var watch = require('gulp-watch');
var jasmine = require('gulp-jasmine');

gulp.task('default', ['watch']);



gulp.task('jshint', function() {
  return gulp.src('lufthansa_calorie_app/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});
	
gulp.task('jasmine-test', function () {
  return gulp.src('lufthansa_calorie_app/**/*.js')
    .pipe(jasmine());
});

gulp.task('watch', function() {
  gulp.watch('lufthansa_calorie_app/**/*.js', ['jshint']);
});

gulp.task('watch', function() {
  gulp.watch('lufthansa_calorie_app/**/*.js', ['jasmine-test']);
});