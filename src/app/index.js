const Koa = require('koa');
const koaBody = require('koa-body');

const userRouter = require('../router/user.route');
const errHander = require('./errHander');

const app = new Koa()

app
  .use(koaBody())
  .use(userRouter.routes())

app.on('error', errHander)

module.exports = app
