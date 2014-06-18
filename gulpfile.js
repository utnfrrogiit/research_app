var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

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

gulp.task('test', function() {
  process.env.NODE_ENV = 'test';
  return gulp.src('./test/**/*.js', {read: false})
    .pipe(mocha({reporter: "spec"}))
})
