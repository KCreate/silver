var gulp 	= require('gulp');
var uglify 	= require('gulp-uglify');

gulp.task("default", function(){
	/* Uglify js */

	var files = [
		'index.js'
	];

	gulp.src(files)
		.pipe(uglify())
		.pipe(gulp.dest("build"));
});
