const bcrypt = require('bcryptjs')
const { userFormateError, userAlreadyExited, userRegisterError, userDoesNotExist, userLoginError, invalidPassword } = require("../constant/err.type")
const { getUserInfo } = require("../service/user.service")

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }
  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  try {
    const res = await getUserInfo({ user_name })
    if (res) {
      console.error('用户已经存在', { user_name })
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (error) {
    console.error('获取用户信息错误', error)
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }
  await next()
}

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  try {
    const res = await getUserInfo({ user_name })
    if (!res) {
      console.error('用户名不存在', { user_name });
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }
    if(!bcrypt.compareSync(password, res.password)){
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
  } catch (err) {
    console.error(err);
    return ctx.app.emit('用户登录失败', userLoginError, ctx)
  }
  await next()
}

module.exports = { userValidator, verifyUser, cryptPassword, verifyLogin }