const gulp = require('gulp');
require('./lint');
require('./jasmine');

gulp.task(
  'default',
  gulp.series('lint', 'spec', done => {
    done();
  })
);
