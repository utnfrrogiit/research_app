var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

gulp.task('lint', function() {
  return gulp.src([
      './app/**/*.js',
      './public/**/*.js',
      '!./public/libs/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('develop', function () {
  nodemon({
    script: 'server.js',
    ext: 'html js css',
    env: {NODE_ENV: 'development'}
  })
})
