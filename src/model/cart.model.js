const { DataTypes } = require("sequelize/dist");
const seq = require("../db/seq");
const Goods = require("./goods.model")

const Cart = seq.define('hk_carts', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品id'
  },
  number: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
    comment: '商品数量'
  },
  select: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    comment: '是否选中'
  }
})

// Cart.sync({force:true})

Cart.belongsTo(Goods, {
  foreignKey: 'goods_id',
  as: 'goods_info'
})

module.exports = Cart