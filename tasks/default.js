const gulp = require('gulp');

gulp.task(
  'default',
  gulp.series('lint', 'spec', done => {
    done();
  })
);
