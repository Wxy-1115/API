const jwt = require('jsonwebtoken');

const { userRegisterError } = require("../constant/err.type");
const { createUser, getUserInfo, updateById } = require("../service/user.service");

const {JWT_SECRET} = require('../config/config.default');

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
    const {user_name} = ctx.request.body
    try {
      const {password, ...res} = await getUserInfo({user_name})
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'})
        }
      }

    } catch (err) {
      console.error('用户登录失败', err);
    }
  }
  async changePassword(ctx, next) {
    const {id} = ctx.state.user
    const {password} = ctx.request.body
    // console.log(id,password);
    const res = await updateById({id,password})
    if(res){
      ctx.body = {
        code: 0,
        message: '密码修改成功',
        result: ''
      }
    }else{
      ctx.body = {
        code: '10007',
        message: '密码修改失败',
        result: ''
      }
    }
  }
}

module.exports = new UserController()