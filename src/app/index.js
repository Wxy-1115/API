const path = require('path')

const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');

const errHander = require('./errHander');
const router = require('../router');

const app = new Koa()

app
  .use(KoaBody({
    multipart:true,
    formidable:{
      uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true,
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  }))
  .use(KoaStatic(path.join(__dirname, '../upload')))
  .use(parameter(app))
  .use(router.routes())
  .use(router.allowedMethods())

app.on('error', errHander)

module.exports = app
