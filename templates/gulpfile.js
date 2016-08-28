/**
 * Required Gulp Packages
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');

//var uglify = require('gulp-uglify');
//var minifyjs = require('gulp-js-minify');
//var sourcemaps = require('gulp-sourcemaps');
//var autoprefixer = require('gulp-autoprefixer');

/**
 * Development Process
 * Start browserSync server
 */
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

/**
 * Sass process to convert the sass into css
 */
gulp.task('sass', function() {
  return gulp.src('app/assets/sass/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Passes it through a gulp-sass
    .pipe(gulp.dest('app/assets/stylesheets')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

/**
 * Watchers to watch the included files changes
 */
gulp.task('watch', function() {
  gulp.watch('app/assets/sass/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/library/**/*.js', browserSync.reload);
})

/**
 * Optimizing CSS and JavaScript 
 */
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    //.pipe(gulpIf('*.js', uglify()))
    //.pipe(gulpIf('*.js', minifyjs()))
    .pipe(gulpIf('*.js', concat('assets/js/app_output.js')))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

/**
 * Copying the required View files
 */
gulp.task('views', function() {
return gulp.src('app/views/**/*')
 .pipe(gulp.dest('dist/views'))
})

/**
 * Copying the Ajay Relay files
 */
gulp.task('ajax-relay', function() {
return gulp.src('app/ajax_relay/**/*')
 .pipe(gulp.dest('dist/ajax_relay'))
})

/**
 * Copying the images files
 */
gulp.task('images', function() {
return gulp.src('app/assets/images/**/*')
 .pipe(gulp.dest('dist/assets/images'))
})

/**
 * Optimizing Images 
 */
//gulp.task('images', function() {
//  return gulp.src('app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
//    .pipe(cache(imagemin({
//      interlaced: true,
//    })))
//    .pipe(gulp.dest('dist/assets/images'))
//});

/**
 * Copying the fonts
 */
gulp.task('fonts', function() {
  return gulp.src('app/assets/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'))
})

/**
 * Remove the existing dist when we Build the code
 */
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

/**
 * Remove the existing dist files when we Build the code
 */
gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

/**
 * Default action for Gulp
 */
gulp.task('default', function(callback) {
  runSequence(['browserSync', 'watch'], // 'sass',
    callback
  )
})

/**
 * Task to build the code
 */
gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    //'sass',
    ['useref', 'images', 'fonts', 'views', 'ajax-relay'], // , 'ajax-relay'
    callback
  )
})
