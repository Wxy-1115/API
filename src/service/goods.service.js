const Goods = require("../model/goods.model")

class goodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods)
    return res.dataValues
  }
  async updateGoods(id, goods) {
    const res = await Goods.update(goods, {where: {id}})
    return res[0] > 0 ? true : false
  }
  async removeGoods(id) {
    const res = await Goods.destroy({where: {id}})
    // console.log(res);
    return res ? true : false
  }
  async restoreGoods(id) {
    const res = await Goods.restore({where: {id}})
    console.log(res);
    return res ? true : false
  }
  async findAllGoods(pageNum, pageSize) {
    pageNum *= 1
    pageSize *= 1
    const offset = (pageNum - 1) * pageSize
    const {count, rows} = await Goods.findAndCountAll({offset, limit:pageSize})
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }
}

module.exports = new goodsService()