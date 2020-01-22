const requiredGulp = require('gulp');
const { plumber, eslint, if: gulpIf } = require('gulp-load-plugins')();
const lazypipe = require('lazypipe');
const { log, colors } = require('gulp-util');

function lint(gulp) {
  const { FIX: fix = true } = process.env;
  return lazypipe()
    .pipe(() => plumber())
    .pipe(() => eslint({ fix }))
    .pipe(() => eslint.format('stylish'))
    .pipe(() =>
      gulpIf(file => {
        const fixed = file.eslint && typeof file.eslint.output === 'string';

        if (fixed) {
          log(colors.yellow(`fixed an error in ${file.eslint.filePath}`));
          return true;
        }
        return false;
      }, gulp.dest('.'))
    )
    .pipe(() => eslint.failAfterError());
}

const Lint = {
  install(installOptions = {}) {
    Object.assign(Lint.installOptions, installOptions);
    let gulp = installOptions.gulp || requiredGulp;
    gulp.task('lint', Lint.tasks.lint(gulp));
  },

  installOptions: {
    globs: [
      'gulpfile.js',
      'app/**/*.js',
      'helpers/**/*.js',
      'server/**/*.js',
      'spec/**/*.js',
      'tasks/**/*.js',
      'lib/**/*.js'
    ]
  },

  lint: gulp => lint(gulp)(),

  tasks: {
    lint(gulp) {
      return function(done) {
        const globs = Lint.installOptions.globs;
        gulp.src(globs, { base: '.' }).pipe(Lint.lint(gulp)).on('end', done);
      };
    }
  }
};

module.exports = Lint;
