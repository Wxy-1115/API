const { addrIDError } = require("../constant/err.type");
const { createAddr, findAllAddr, updateAddr, removeAddr, setDefaultAddr } = require("../service/addr.service")

class addrController {
  async create(ctx) {
    const {id:user_id} = ctx.state.user
    const {consignee, phone, address} = ctx.request.body
    console.log(user_id, consignee, phone, address);
    const res = await createAddr({user_id, consignee, phone, address})
    ctx.body = {
      code: 0,
      message: '添加地址成功',
      result: res
    }
  }
  async findAll(ctx) {
    const {id:user_id} = ctx.state.user
    const res = await findAllAddr(user_id)
    ctx.body = {
      code: 0,
      message: '获取地址列表成功',
      result: res
    }
  }
  async update(ctx) {
    const {id} = ctx.request.params
    const res = await updateAddr(id, ctx.request.body)
    if(res[0] === 0){
      return ctx.app.emit('error', addrIDError, ctx)
    }
    ctx.body = {
      code: 0,
      message: '更新地址成功',
      result: res
    }
  }
  async remove(ctx) {
    const {id} = ctx.request.params
    const res = await removeAddr(id)
    if(res === 0){
      return ctx.app.emit('error', addrIDError, ctx)
    }
    ctx.body = {
      code: 0,
      message: '删除地址成功',
      result: res
    }
  }
  async setDefault(ctx) {
    const {id} = ctx.request.params
    const {id:user_id} = ctx.state.user

    const res = await setDefaultAddr(id,user_id)
    if(res[0] === 0){
      return ctx.app.emit('error', addrIDError, ctx)
    }
    ctx.body = {
      code: 0,
      message: '设置默认地址成功',
      result: res
    }
  }
}


module.exports = new addrController()