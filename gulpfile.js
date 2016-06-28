var gulp  = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var merge2 = require('merge-stream');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var autoPrefixer = require('gulp-autoprefixer');

var src = {
	working: {
		scss: './scss/*.scss',
		js: './js/*.js',
		assets: './assets/*',
		html: './*.html',
		fonts: './fonts/**'
	},
	build: {
		css: './build/css/',
		js: './build/js/',
		assets: './build/assets/',
		html: './build/',
		fonts: './build/fonts/'
	}
};

var browsers = ['last 2 versions'];

gulp.task('clean', function() {
	return gulp.src(src.build.html, { read: false })
		.pipe(clean());
});

gulp.task('reload', function(cb) {
	browserSync.reload();
	cb();
});

/* styles */
gulp.task('styles', function() {
	var files = [
		'./fonts/Nexa-Light/stylesheet.css',
		'./fonts/font-awesome-4.6.3/css/font-awesome.css',
		src.working.scss
	];

	var opts = {
		outputStyle: 'compressed'
	};

	return gulp.src(files)
		.pipe(sourcemaps.init())
		.pipe(sass(opts).on('error', sass.logError))
		.pipe(autoPrefixer({
			browsers: browsers,
			cascade: false
		}))
		.pipe(concat('styles.min.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(src.build.css));
});

gulp.task('styles:reload', function(cb) {
	runSequence(
		'styles',
		'reload',
		cb
	);
});

/* scripts */
gulp.task('scripts', function() {
	var files = [
		'./node_modules/jquery/dist/jquery.js',
		'./node_modules/snapsvg/dist/snap.svg-min.js',
		'./node_modules/isotope-layout/dist/isotope.pkgd.min.js',
		src.working.js
	];

	return gulp.src(files)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('scripts.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(src.build.js));
});

gulp.task('scripts:reload', function(cb) {
	runSequence(
		'scripts',
		'reload',
		cb
	);
});

gulp.task('copy', function() {
	var htmlCopy = gulp.src(src.working.html)
		.pipe(gulp.dest(src.build.html));

	var assetsCopy = gulp.src(src.working.assets)
		.pipe(gulp.dest(src.build.assets));

	var phpCopy = gulp.src('./email.php')
		.pipe(gulp.dest(src.build.html));

	var fontCopy = gulp.src(src.working.fonts)
		.pipe(gulp.dest(src.build.fonts));

	/*var jsonCopy = gulp.src('./*.json')
		.pipe(gulp.dest(src.build.html));*/

	return merge2(htmlCopy, assetsCopy, phpCopy, fontCopy);
});

gulp.task('copy:reload', function(cb) {
	runSequence(
		'copy',
		'reload',
		cb
	);
});

gulp.task('default', function(cb) {
	runSequence(
		'clean',
		['styles', 'scripts', 'copy'],
		cb
	);
});

gulp.task('serve', ['default'], function() {
	browserSync.init({
		port: 8080,
		server: src.build.html,
		notify: false
	});

	gulp.watch(src.working.scss, ['styles:reload']);
	gulp.watch(src.working.js, ['scripts:reload']);
	gulp.watch(src.working.html, ['copy:reload']);
	gulp.watch(src.working.assets, ['copy:reload']);
});