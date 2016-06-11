import test from 'ava'
import superkoa from 'superkoa'

var model = 'users'

var user

test.before(function * (t) {
  var res = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send({
      'username': 'alfred',
      'password': '000000'
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  user = res.body.user

  // console.log(user)

  t.is(200, res.status)
})

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /users[/]        => user.list()
 *  GET    /users/new       => user.new()
 *  GET    /users/:id       => user.show()
 *  GET    /users/:id/edit  => user.edit()
 *  POST   /users[/]        => user.create()
 *  PATCH  /users/:id       => user.update()
 *  DELETE /users/:id       => user.destroy()
 *
 */

// *  GET    /users[/]        => user.list()
test('GET /' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/' + model)

  t.is(200, res.status)
  t.regex(res.text, /table/g)
})

// *  GET    /users/new       => user.new()
test('GET /' + model + '/new', function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/' + model + '/new')

  t.is(200, res.status)
  t.regex(res.text, /New\suser/)
})

// *  GET    /users/:id       => user.show()
test('GET /' + model + '/:id show', function * (t) {
  var res1 = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send({
      'username': 'alfred',
      'password': '000000'
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  user = res1.body.user
  
  var res = yield superkoa('../../app.js')
    .get('/' + model + '/' + user._id)

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  GET    /users/:id/edit  => user.edit()
test('GET /' + model + '/:id/edit', function * (t) {
  var res1 = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send({
      'username': 'alfred',
      'password': '000000'
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  user = res1.body.user
    
  var res = yield superkoa('../../app.js')
    .get('/' + model + '/' + user._id + '/edit')

  // console.log(res)
  t.is(200, res.status)
  t.regex(res.text, /Editing\suser/)
})

// *  POST   /users[/]        => user.create()
test('POST /' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .post('/' + model)
    .send({
      'username': 'alfred',
      'password': '000000'
    })

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  PATCH  /users/:id       => user.update()
test('PATCH /' + model + '/:id update', function * (t) {
  var res = yield superkoa('../../app.js')
    .patch('/' + model + '/' + user._id)
    .send({
      'username': 'alfred',
      'password': '111111'
    })
  // console.log(res)
  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// *  DELETE /users/:id       => user.destroy()
test('DELETE /' + model + '/:id destroy', function * (t) {
  var res1 = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send({
      'username': 'alfred',
      'password': '000000'
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  user = res1.body.user
  
  var res = yield superkoa('../../app.js')
    .del('/' + model + '/' + user._id)

  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// api
test('API GET /api/' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/api/' + model)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API POST /api/' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .post('/api/' + model)
    .field('username', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:user_id', function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/api/' + model + '/:user_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API PATCH /api/' + model + '/:user_id', function * (t) {
  var res = yield superkoa('../../app.js')
    .patch('/api/' + model + '/:user_id')
    .field('username', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:user_id', function * (t) {
  var res = yield superkoa('../../app.js')
    .delete('/api/' + model + '/:user_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})
