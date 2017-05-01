const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');
const copy = require('gulp-copy');

function compile (watch) {
  'use strict';

  let bundler = watchify(browserify('./app/scripts/main.js', {debug: true}).transform(babel.configure({
    presets: ['es2015']
  })));

  function rebundle () {
    return bundler.bundle()
    .on('error', function (err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function () {
      console.log('-> bundling...');
      rebundle();
    });
  }

  return rebundle();
}

function watch () {
  return compile(true);
}

function copyStatics () {
  return gulp.src(['app/styles/**', 'app/index.html'])
  .pipe(copy('build', {
    prefix: 1
  }));
}

gulp.task('build', () => {
  return compile();
});
gulp.task('watch', () => {
  return watch();
});
gulp.task('copyStatics', () => {
  return copyStatics();
});


gulp.task('default', ['watch', 'copyStatics']);