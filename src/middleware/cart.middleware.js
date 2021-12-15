const { invalidGoodsID } = require("../constant/err.type");
const Goods = require("../model/goods.model");


const validator = (rulers, error) => {
  return async (ctx,next) => {
    try {
      ctx.verifyParams(rulers)
      await next()
    } catch (err) {
      error.result = err
      return ctx.app.emit('error', error, ctx)
    }
  }
}
const existedGoods = async (ctx,next) => {
  const {goods_id: id} = ctx.request.body
  console.log(id);
  const res = await Goods.findOne({where: {id}})
  if(res){
    await next()
  }else {
    return ctx.app.emit('error', invalidGoodsID, ctx)
  }
}

module.exports={
  validator,
  existedGoods
}