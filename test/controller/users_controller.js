import test from 'ava';

var superkoa = require('superkoa')

var model = 'users'

test.cb("GET /api/" + model, t => {
  superkoa()
    .get("/api/" + model)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end);
});
 
test.cb("POST /api/" + model, t => {
  superkoa()
    .post("/api/" + model)
    .field('username', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end);
});

test.cb("GET /api/" + model + '/:user_id', t => {
  superkoa()
    .get("/api/" + model + '/:user_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end);
});

test.cb("PATCH /api/" + model + '/:user_id', t => {
  superkoa()
    .patch("/api/" + model + '/:user_id')
    .field('username', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end);
});

test.cb("GET /api/" + model + '/:user_id', t => {
  superkoa()
    .delete("/api/" + model + '/:user_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, t.end);
});