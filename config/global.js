require('log1')(true)

global.current_path = process.cwd();
global.Promise = require('bluebird')
global.debug = require('debug')('moa2');