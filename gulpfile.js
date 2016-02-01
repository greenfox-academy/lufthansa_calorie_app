'use strict';

var jshint = require('gulp-jshint');
var gulp = require('gulp');
var notify = require('gulp-notify');
var jasmine = require('gulp-jasmine');




gulp.task('jshint', function() {
  return gulp.src('./*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
        .pipe(notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!',
        }));
});
  
gulp.task('jasmine-test', function () {
  return gulp.src('spec/*.js')
    .pipe(jasmine());
});

gulp.task('watch', function() {
  gulp.watch('./*.js', ['jshint']);
});

gulp.task('watch-files', function() {
  gulp.watch('./hello-world.js', ['jasmine-test']);
});

gulp.task('default', ['watch']);


