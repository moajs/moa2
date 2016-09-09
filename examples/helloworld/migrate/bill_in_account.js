#!/usr/bin/env node

'use strict'

var path = require('path')

// 完成发货单，并生成对应账单
require('../../..')(path.join(__dirname, '../config'))

var User = $models.user

User.find({}, function (err, docs) {
  if (err) console.log(err)
  console.dir(docs)
  process.exit()
})
