const Addr = require("../model/addr.model")

class addrService {
  async createAddr(addr) {
    return await Addr.create(addr)
  }
  async findAllAddr(user_id) {
    return await Addr.findAll({
      attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
      where: {user_id}
    })
  }
  async updateAddr(id, addr) {
    return await Addr.update(
      addr,
      {where: {id}}
    )
  }
  async removeAddr(id) {
    return await Addr.destroy(
      {where: {id}}
    )
  }
  async setDefaultAddr(id, user_id) {
    await Addr.update({is_default: false},{where: {user_id}})
    return await Addr.update({is_default: true},{where: {id}})
  }
}

module.exports = new addrService()