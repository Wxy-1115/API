const Router = require('koa-router');

const { create, findAll, update } = require('../controller/order.controller');

const { auth } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/order.middleware');

const router = new Router({prefix: '/orders'})

// 提交订单

router
  .post('/', auth, validator({
    address_id: 'int',
    goods_info: 'string',
    total: 'string'
  }), 
  create
  )
  .get('/', auth, findAll)
  .patch('/:id', auth, validator({
    status: 'number'
  }),
  update)
module.exports = router