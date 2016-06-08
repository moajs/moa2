"use strict";

/**
 * Created by Moajs on June 8th 2016, 11:17:15 am.
 */
 
var $models = require('mount-models')(__dirname);

var Book = $models.book;

exports.list = function *(ctx, next) {
  console.log(ctx.method + ' /books => list, query: ' + JSON.stringify(ctx.query));
  
  let books = yield Book.getAllAsync();
  
  yield ctx.render('books/index', {
    books : books
  })
};

exports.new = function *(ctx, next) {
  console.log(ctx.method + ' /books/new => new, query: ' + JSON.stringify(ctx.query));

  yield ctx.render('books/new', {
    book : {
      "_action" : "new"
    }
  });
};

exports.show = function *(ctx, next) {
  console.log(ctx.method + ' /books/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  let id = ctx.params.id;
  let book = yield Book.getByIdAsync(id);
  
  console.log(book);
  
  yield ctx.render('books/show', {
    book : book
  });
};

exports.edit = function *(ctx, next) {
  console.log(ctx.method + ' /books/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  let id = ctx.params.id;

  let book = yield Book.getByIdAsync(id);
  
  console.log(book);
  book._action = 'edit';

  yield ctx.render('books/edit', {
    book : book
  });
};

exports.create = function *(ctx, next) {
  console.log(ctx.method + ' /books => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  let book = yield Book.createAsync({name: ctx.request.body.name,password: ctx.request.body.password});
  
  console.log(book);
  yield ctx.render('books/show', {
    book : book
  });
};

exports.update = function *(ctx, next) {
  console.log(ctx.method + ' /books/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  let id = ctx.params.id;

  let book = yield Book.updateByIdAsync(id,{name: ctx.request.body.name,password: ctx.request.body.password});
  
  yield ctx.body = ({
    data:{
      redirect : '/books/' + id
    },
    status:{
      code : 0,
      msg  : 'delete success!'
    }
  });
};

exports.destroy = function *(ctx, next) {
  console.log(ctx.method + ' /books/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  let id = ctx.params.id;
  
  yield Book.deleteByIdAsync(id);
  
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
    let book_id = ctx.api_book._id;

    let books = yield Book.queryAsync({});
    
    yield ctx.api({
      books : books
    })
  },
  show: function *(ctx, next) {
    let book_id = ctx.api_book._id;
    let id = ctx.params.book_id;

    let book = yield Book.getByIdAsync(id);
    
    yield ctx.api({
      book : book
    });
  },
  create: function *(ctx, next) {
    let book_id = ctx.api_book._id;

    let book = yield Book.createAsync({name: ctx.request.body.name,password: ctx.request.body.password});
    
    yield ctx.body = ({
      book : book
    });
  },
  update: function *(ctx, next) {
    let book_id = ctx.api_book._id;
    let id = ctx.params.book_id;
    
    let book = yield Book.updateByIdAsync(id, {name: ctx.request.body.name,password: ctx.request.body.password});
    
    yield ctx.api({
      book : book,
      redirect : '/books/' + id
    });
  },
  delete: function *(ctx, next) {
    let book_id = ctx.api_book._id;
    let id = ctx.params.book_id;

    yield Book.deleteByIdAsync(id);
    
    yield ctx.api({id: id});
  }
}
