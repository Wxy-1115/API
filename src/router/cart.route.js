const Router = require('koa-router');
const { invalidGoodsID, cartFormatError } = require('../constant/err.type');

const { add, findAll, update, remove, selectAll } = require('../controller/cart.controller');

const { auth } = require('../middleware/auth.middleware');
const { validator, existedGoods } = require('../middleware/cart.middleware');

const router = new Router({prefix: '/carts'})


router
  .post('/', auth, validator({goods_id: 'number'}, invalidGoodsID), existedGoods, add)
  .get('/', auth, findAll)
  .patch(
    '/:id', 
    auth, 
    validator({
      number: {type: 'number', required: false},
      select: {type: 'bool', required: false}
    }, cartFormatError),
    update
  )
  .delete(
    '/', 
    auth, 
    validator({ids: 'array'}, cartFormatError), 
    remove
  )
  .post(
    '/selectAll/:select', 
    auth, 
    selectAll
  )

module.exports = router