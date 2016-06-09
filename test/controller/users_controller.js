import test from 'ava'

var superkoa = require('superkoa')

var model = 'users'

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
test.cb('GET /' + model, t => {
  superkoa('../../app.js')
    .get('/' + model)
    .end(function (err, res) {
      t.ifError(err)
      t.is(200, res.status)
      t.regex(res.text, /table/g)
      t.end()
    })
})

test.cb('POST /' + model, t => {
  superkoa('../../app.js')
    .post('/' + model)
    .field('username', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      t.ifError(err)
      t.is(200, res.status)
      t.end()
    })
})

test.cb('GET /' + model + '/:user_id', t => {
  superkoa('../../app.js')
    .get('/' + model + '/:user_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end)
})

test.cb('PATCH /' + model + '/:user_id', t => {
  superkoa('../../app.js')
    .patch('/' + model + '/:user_id')
    .field('username', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end)
})

test.cb('GET /' + model + '/:user_id', t => {
  superkoa('../../app.js')
    .delete('/' + model + '/:user_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end)
})

/**
 * api test
 */
test.cb('GET /api/' + model, t => {
  superkoa('../../app.js')
    .get('/api/' + model)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end)
})

test.cb('POST /api/' + model, t => {
  superkoa('../../app.js')
    .post('/api/' + model)
    .field('username', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end)
})

test.cb('GET /api/' + model + '/:user_id', t => {
  superkoa('../../app.js')
    .get('/api/' + model + '/:user_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end)
})

test.cb('PATCH /api/' + model + '/:user_id', t => {
  superkoa('../../app.js')
    .patch('/api/' + model + '/:user_id')
    .field('username', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end)
})

test.cb('GET /api/' + model + '/:user_id', t => {
  superkoa('../../app.js')
    .delete('/api/' + model + '/:user_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end)
})
