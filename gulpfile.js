var gulp = require('gulp'),
	mainBowerFiles =require('main-bower-files'),
	preen = require('preen');


gulp.task('bower', function () {
	preen.preen({})
});