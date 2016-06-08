'use strict'

const path = require('path')
const gulp = require('gulp')
const mocha = require('gulp-mocha')
const mount = require('mount-routes')

const sourcePath = ['test/**/*.js', 'lib/*.js']

gulp.task('watch', function () {
  gulp.watch(sourcePath, ['mocha'])
})

gulp.task('mocha', function () {
  return gulp.src(sourcePath, {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({reporter: 'spec'}))
})

gulp.task('routes', function () {
  let express = require('express')
  let app = express()

  // mount routes
  mount(app, path.join(__dirname, 'app/routes'), true)
})

gulp.task('kp', function () {
  let kp = require('kp')
  let isSudo = false
  let pre = isSudo === true ? 'sudo' : ''

  kp(3000, pre)
})

gulp.task('default', ['mocha', 'watch'])
