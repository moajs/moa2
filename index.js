'use strict'

const extend = require('extend');


var conf = {}
var default_conf = require('./config')

module.exports = function (conf_files) {  
  conf = extend(conf, default_conf)
  
  if (!Array.isArray(conf_files)) {
    conf_files = Array.from(arguments)
  }
  
  console.log('Config files = ' + JSON.stringify(conf_files, null, 4))
  
  conf_files.map(function (new_conf) {
    conf = extend(conf, require(new_conf))
  })
  
  return require('./app')(conf)
}

