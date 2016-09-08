'use strict'

const extend = require('extend');


var conf = {}
var default_conf = {}

module.exports = function (conf_files) {
  console.log(conf_files)
  
  conf = extend(default_conf, conf)
  
  if (!Array.isArray(conf_files)) {
    conf_files = Array.from(arguments)
  }
  
  conf_files.map(function (new_conf) {
    conf = extend(conf, new_conf)
  })
  
  return require('./app')(conf)
}

