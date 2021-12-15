const { TEXT } = require('sequelize/dist');
const { cartFormatError } = require('../constant/err.type');
const { createOrUpdate, findCarts, updateCarts, removeCarts, selectAllCarts } = require('../service/cart.service');

class cartController {
  async add(ctx) {
    const { id: user_id } = ctx.state.user
    const { goods_id } = ctx.request.body
    const res = await createOrUpdate(user_id, goods_id)
    ctx.body = {
      code: 0,
      message: '加入购物车成功',
      result: res
    }
  }
  async findAll(ctx) {
    const {pageNum = 1, pageSize = 10} = ctx.request.query
    console.log(pageNum, pageSize);
    const res = await findCarts(pageNum, pageSize)
    ctx.body = {
      code: 0,
      message: "获取购物车列表",
      result: res
    }
  }
  async update(ctx) {
    const {id} = ctx.request.params
    const {number, select} = ctx.request.body
    if(number === undefined && select === undefined){
      cartFormatError.message = 'number和select不能同时为空'
      return ctx.app.emit('error', cartFormatError, ctx)
    }
    const res = await updateCarts({id, number, select})
    if(res.length === 0){
      cartFormatError.message = '该商品不存在'
      return ctx.app.emit('error', cartFormatError, ctx)
    }
    ctx.body = {
      code: 0,
      message: "更新购物车成功",
      result: res
    }
  }
  async remove(ctx) {
    const {ids} = ctx.request.body
    const res = await removeCarts(ids)

    ctx.body = {
      code: 0,
      message: '删除购物车成功',
      reault: res
    }
  }
  async selectAll(ctx) {
    const {id:user_id} = ctx.state.user
    let {select} = ctx.request.params
    select = select === "0" ? false : true
    // console.log(select);
    const res = await selectAllCarts(user_id, select)
    ctx.body = {
      code: 0,
      message: select ? '全部选中' : '取消全选',
      reault: res
    }
  }
}


module.exports = new cartController()