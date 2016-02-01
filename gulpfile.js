
var jshint = require('gulp-jshint');
var gulp = require('gulp');
var watch = require('gulp-watch');
var jasmine = require('gulp-jasmine');


gulp.task('lint', function() {
    gulp.src('lufthansa_calorie_app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!',
        }));
});

	
gulp.task('jasmine-test', function () {
  return gulp.src('lufthansa_calorie_app/**/*.js')
    .pipe(jasmine());
});

 
gulp.task('watch-jasmine', function () {
	gulp.watch(['lufthansa_calorie_app/**/*.js'], ['jasmine-test']);
});