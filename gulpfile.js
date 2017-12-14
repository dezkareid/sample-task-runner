var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var pug = require('gulp-pug');

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
		.pipe(concat('app.js'))
		.pipe(minify())
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('pug', function() {
	return gulp.src('src/*.pug')
		.pipe(pug({}))
		.pipe(gulp.dest('build'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'build'
		},
	})
});

gulp.task('dev', ['browserSync','js', 'pug'], function() {
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/*.pug', ['pug']);
	gulp.watch(['src/js/*.js', 'src/*.pug'], browserSync.reload);
});
