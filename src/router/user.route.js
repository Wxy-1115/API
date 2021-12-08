const Router = require('koa-router');
const {register, login} = require('../controller/user.controller');
const { userValidator, verifyUser, cryptPassword } = require('../middleware/user.middleware');

const router = new Router({prefix: '/user'})


router
  .post('/register', userValidator, verifyUser, cryptPassword, register)
  .post('/login', login)


module.exports = router