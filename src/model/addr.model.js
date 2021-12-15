const { DataTypes } = require("sequelize/dist");
const seq = require("../db/seq");

const Addr = seq.define('hk_addrs', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人姓名'
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: '手机号'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货地址'
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: '是否为默认地址，0:不是，1:是'
  }
})

// Addr.sync({force:true})


module.exports = Addr