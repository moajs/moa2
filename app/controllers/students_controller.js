"use strict";

/**
 * Created by Moajs on June 8th 2016, 9:03:58 am.
 */
 
const $models = require('mount-models')(__dirname);

const Student = $models.student;

exports.list = function *(ctx, next) {
  console.log(ctx.method + ' /students => list, query: ' + JSON.stringify(ctx.query));
  
  let students = yield Student.getAllAsync();
  
  yield ctx.render('students/index', {
    students : students
  })
};

exports.new = function *(ctx, next) {
  console.log(ctx.method + ' /students/new => new, query: ' + JSON.stringify(ctx.query));

  yield ctx.render('students/new', {
    student : {
      "_action" : "new"
    }
  });
};

exports.show = function *(ctx, next) {
  console.log(ctx.method + ' /students/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  let id = ctx.params.id;
  let student = yield Student.getByIdAsync(id);
  
  console.log(student);
  
  yield ctx.render('students/show', {
    student : student
  });
};

exports.edit = function *(ctx, next) {
  console.log(ctx.method + ' /students/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  let id = ctx.params.id;

  let student = yield Student.getById(id);
  
  console.log(student);
  student._action = 'edit';

  yield ctx.render('students/edit', {
    student : student
  });
};

exports.create = function *(ctx, next) {
  console.log(ctx.method + ' /students => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  let student = yield Student.createAsync({name: ctx.request.body.name,password: ctx.request.body.password});
  
  console.log(student);
  yield ctx.render('students/show', {
    student : student
  });
};

exports.update = function *(ctx, next) {
  console.log(ctx.method + ' /students/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  let id = ctx.params.id;

  let student = yield Student.updateById(id,{name: ctx.request.body.name,password: ctx.request.body.password});
  
  yield ctx.body = ({
    data:{
      redirect : '/students/' + id
    },
    status:{
      code : 0,
      msg  : 'delete success!'
    }
  });
};

exports.destroy = function *(ctx, next) {
  console.log(ctx.method + ' /students/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  let id = ctx.params.id;
  
  yield Student.deleteByIdAsync(id);
  
  yield ctx.body= ({
    data:{},
    status:{
      code : 0,
      msg  : 'delete success!'
    }
  });
};

// -- custom

// -- custom api
exports.api = {
  list: function *(ctx, next) {
    let student_id = ctx.api_student._id;

    let students = yield Student.queryAsync({});
    
    yield ctx.api({
      students : students
    })
  },
  show: function *(ctx, next) {
    let student_id = ctx.api_student._id;
    let id = ctx.params.student_id;

    let student = yield Student.getByIdAsync(id);
    
    yield ctx.api({
      student : student
    });
  },
  create: function *(ctx, next) {
    let student_id = ctx.api_student._id;

    let student = yield Student.createAsync({name: ctx.request.body.name,password: ctx.request.body.password});
    
    yield ctx.body = ({
      student : student
    });
  },
  update: function *(ctx, next) {
    let student_id = ctx.api_student._id;
    let id = ctx.params.student_id;
    
    let student = yield Student.updateByIdAsync(id, {name: ctx.request.body.name,password: ctx.request.body.password});
    
    yield ctx.api({
      student : student,
      redirect : '/students/' + id
    });
  },
  delete: function *(ctx, next) {
    let student_id = ctx.api_student._id;
    let id = ctx.params.student_id;

    yield Student.deleteByIdAsync(id);
    
    yield ctx.api({id: id});
  }
}
