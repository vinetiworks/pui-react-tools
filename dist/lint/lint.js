'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('gulp-load-plugins')(),
    plumber = _require.plumber,
    eslint = _require.eslint,
    gulpIf = _require.if;

var lazypipe = require('lazypipe');
var gulp = require('gulp');

var _require2 = require('gulp-util'),
    log = _require2.log,
    colors = _require2.colors;

function lint() {
  var _process$env$FIX = process.env.FIX,
      fix = _process$env$FIX === undefined ? true : _process$env$FIX;

  return lazypipe().pipe(function () {
    return plumber();
  }).pipe(function () {
    return eslint({ fix: fix });
  }).pipe(function () {
    return eslint.format('stylish');
  }).pipe(function () {
    return gulpIf(function (file) {
      var fixed = file.eslint && typeof file.eslint.output === 'string';

      if (fixed) {
        log(colors.yellow('fixed an error in ' + file.eslint.filePath));
        return true;
      }
      return false;
    }, gulp.dest('.'));
  }).pipe(function () {
    return eslint.failAfterError();
  });
}

var Lint = {
  install: function install() {
    var installOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _extends(Lint.installOptions, installOptions);
    gulp.task('lint', Lint.tasks.lint());
  },


  installOptions: {
    globs: ['gulpfile.js', 'app/**/*.js', 'helpers/**/*.js', 'server/**/*.js', 'spec/**/*.js', 'tasks/**/*.js', 'lib/**/*.js']
  },

  lint: lint(),

  tasks: {
    lint: function lint() {
      return function (done) {
        var globs = Lint.installOptions.globs;
        gulp.src(globs, { base: '.' }).pipe(Lint.lint());
        done();
      };
    }
  }
};

module.exports = Lint;