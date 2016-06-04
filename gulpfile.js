var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('default', function () {
	gulp.src('src/styles.scss')
    .pipe(sass())
		.pipe(cssmin())
		.pipe(rename({basename: 'bundle', suffix: '.min'}))
		.pipe(gulp.dest('src'));
});
