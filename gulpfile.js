'use strict'

const Koa = require('koa')
const path = require('path')
const gulp = require('gulp')
const ava = require('gulp-ava')
const mount = require('mount-koa-routes')

const sourcePath = ['test/**/*.js', 'lib/*.js']

gulp.task('watch', function () {
  gulp.watch(sourcePath, ['ava'])
})

gulp.task('test', function () {
  return gulp.src('test/**/*.js')
    // gulp-ava needs filepaths so you can't have any plugins before it
    .pipe(ava())
})

gulp.task('routes', function () {
  const app = new Koa()
  // mount routes
  mount(app, path.join(__dirname, 'app/routes'), true)
})

gulp.task('kp', function () {
  let kp = require('kp')
  let isSudo = false
  let pre = isSudo === true ? 'sudo' : ''

  kp(3000, pre)
})

gulp.task('default', ['test', 'watch'])
