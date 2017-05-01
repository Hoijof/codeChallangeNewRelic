const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
  return gulp.src('app/main.js')
  .pipe(babel({
    presets: ['es2016'],
  }))
  .pipe(gulp.dest('dist'));
});