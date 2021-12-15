const { Op } = require("sequelize/dist");
const Cart = require("../model/cart.model");
const Goods = require("../model/goods.model");


class CartService{
  async createOrUpdate(user_id, goods_id) {
    let res = await Cart.findOne({
      where: {
        [Op.and]:{
          user_id, 
          goods_id
        }
      }
    })
    const number = 1
    if(res){
      await res.increment('number')
      return await res.reload()
    }else{
      return await Cart.create({user_id,goods_id,number})
    }
  }
  async findCarts(pageNum, pageSize) {
    pageNum *= 1
    pageSize *= 1
    const offset = (pageNum-1) * pageSize
    const {count, rows} = await Cart.findAndCountAll({
      attributes: ['id', 'number', 'select'],
      offset,
      limit: pageSize,
      include: {
        model: Goods,
        as: 'goods_info',
        attributes: ['id', 'goods_name', 'goods_price', 'goods_img'],
      }
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }
  async updateCarts(params) {
    const {id, number, select} = params
    const res = await Cart.findByPk(id)
    if(!res) return ''
    number !== undefined ? res.number = number : ''
    select !== undefined ? res.select = select : ''
    return await res.save()
  }
  async removeCarts(ids) {
    return await Cart.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
  }
  async selectAllCarts(user_id, select) {
    return await Cart.update(
      {select: select},
      {where: {user_id}}
    )
  }
}

module.exports = new CartService()