const { userRegisterError } = require("../constant/err.type");
const { createUser } = require("../service/user.service");


class UserController {
  async register(ctx, next) {
    // console.log(ctx.request.body);
    // 1. 获取数据
    const { user_name, password } = ctx.request.body
    // 2.操作数据库，创建用户
    try {
      const res = await createUser(user_name, password)
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name
        }
      }
    } catch (error) {
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }
  async login(ctx, next) {
    ctx.body = '用户登录成功'
  }
}

module.exports = new UserController()