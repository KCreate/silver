var gulp 	= require('gulp');
var uglify 	= require('gulp-uglify');
var rename	= require('gulp-rename');

/*
	Uglify the index file
*/
gulp.task("default", function () {
	gulp.src('index.js')
		.pipe(uglify())
		.pipe(rename('index.min.js'))
		.pipe(gulp.dest("./"));
});
