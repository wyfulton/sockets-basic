var gulp = require('gulp'),
	mainBowerFiles =require('main-bower-files')


gulp.task('bower', function () {
	return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./public/dist/lib'))
});