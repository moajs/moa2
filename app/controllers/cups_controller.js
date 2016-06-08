"use strict";

/**
 * Created by Moajs on June 8th 2016, 3:04:26 pm.
 */
 
var $models = require('mount-models')(__dirname);

var Cup = $models.cup;

exports.list = async (ctx, next) => {
  console.log(ctx.method + ' /cups => list, query: ' + JSON.stringify(ctx.query));
  try {
    let cups = await Cup.getAllAsync();
  
    await ctx.render('cups/index', {
      cups : cups
    })
  } catch (err) {
    return ctx.api_error(err);
  }
};

exports.new = async (ctx, next) => {
  console.log(ctx.method + ' /cups/new => new, query: ' + JSON.stringify(ctx.query));
  
  await ctx.render('cups/new', {
    cup : {
      "_action" : "new"
    }
  });
};

exports.show = async (ctx, next) => {
  console.log(ctx.method + ' /cups/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
    
  try {
    let id = ctx.params.id;
    let cup = await Cup.getByIdAsync(id);
  
    console.log(cup);
  
    await ctx.render('cups/show', {
      cup : cup
    });
  } catch (err) {
    return ctx.api_error(err);
  }
};

exports.edit = async (ctx, next) => {
  console.log(ctx.method + ' /cups/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  try {
    let id = ctx.params.id;

    let cup = await Cup.getByIdAsync(id);
  
    console.log(cup);
    cup._action = 'edit';

    await ctx.render('cups/edit', {
      cup : cup
    });
  } catch (err) {
    return ctx.api_error(err);
  }
};

exports.create = async (ctx, next) => {
  console.log(ctx.method + ' /cups => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  try {
    let cup = await Cup.createAsync({name: ctx.request.body.name,password: ctx.request.body.password});
  
    console.log(cup);
    await ctx.render('cups/show', {
      cup : cup
    });
  } catch (err) {
    return ctx.api_error(err);
  }
};

exports.update = async (ctx, next) => {
  console.log(ctx.method + ' /cups/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  try {
    let id = ctx.params.id;

    let cup = await Cup.updateByIdAsync(id,{name: ctx.request.body.name,password: ctx.request.body.password});
  
    ctx.body = ({
      data:{
        redirect : '/cups/' + id
      },
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  } catch (err) {
    return ctx.api_error(err);
  }
};

exports.destroy = async (ctx, next) => {
  console.log(ctx.method + ' /cups/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
    
  try {
    let id = ctx.params.id;
  
    await Cup.deleteByIdAsync(id);
  
    ctx.body = ({
      data:{},
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  } catch (err) {
    return ctx.api_error(err);
  }
};

// -- custom

// -- custom api
exports.api = {
  list: async (ctx, next) => {
    try {
      let cup_id = ctx.api_cup._id;

      let cups = await Cup.queryAsync({});
    
      await ctx.api({
        cups : cups
      })
    } catch (err) {
      return ctx.api_error(err);
    }
  },
  show: async (ctx, next) => {
    try {
      let cup_id = ctx.api_cup._id;
      let id = ctx.params.cup_id;

      let cup = await Cup.getByIdAsync(id);
    
      await ctx.api({
        cup : cup
      });
    } catch (err) {
      return ctx.api_error(err);
    }
  },
  create: async (ctx, next) => {
    try {
      let cup_id = ctx.api_cup._id;

      let cup = await Cup.createAsync({name: ctx.request.body.name,password: ctx.request.body.password});
    
      ctx.body = ({
        cup : cup
      });
    } catch (err) {
      return ctx.api_error(err);
    }
  },
  update: async (ctx, next) => {
    try {
      let cup_id = ctx.api_cup._id;
      let id = ctx.params.cup_id;
    
      let cup = await Cup.updateByIdAsync(id, {name: ctx.request.body.name,password: ctx.request.body.password});
    
      await ctx.api({
        cup : cup,
        redirect : '/cups/' + id
      });
    } catch (err) {
      return ctx.api_error(err);
    }
  },
  delete: async (ctx, next) => {
    try {
      let cup_id = ctx.api_cup._id;
      let id = ctx.params.cup_id;

      await Cup.deleteByIdAsync(id);
    
      await ctx.api({id: id});
    } catch (err) {
      return ctx.api_error(err);
    }
  }
}
