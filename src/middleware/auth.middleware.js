const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { tokenExpiredError, jsonWebTokenError, hasNotAdminPermisson } = require('../constant/err.type');

const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err);
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('token无效', err);
        return ctx.app.emit('error', jsonWebTokenError, ctx)

      default:
        console.error('token无效', err);
        return ctx.app.emit('error', jsonWebTokenError, ctx)
        break;
    }
  }
  await next()
}
const hasAdminPermisson = async (ctx, next) => {
  const {is_admin} = ctx.state.user
  if(!is_admin){
    console.error('该用户没有管理员权限',ctx.state.user);
    return ctx.app.emit('error', hasNotAdminPermisson, ctx)
  }
  await next()
}
module.exports = {
  auth,
  hasAdminPermisson
}