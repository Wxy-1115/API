const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware');
const {validator} = require('../middleware/addr.middleware');
const { create, findAll, update, remove, setDefault } = require('../controller/addr.controller');

const router = new Router({prefix: '/address'})

router
  .post('/', auth, validator({
    consignee: 'string',
    phone: {type: 'string', format: /^1\d{10}$/},
    address: 'string'
  }),
  create
  )
  .get('/', auth, findAll)
  .put('/:id', auth, validator({
    consignee: 'string',
    phone: {type: 'string', format: /^1\d{10}$/},
    address: 'string'
  }),
  update
  )
  .delete('/:id', auth, remove)
  .patch('/:id', auth, setDefault)
module.exports = router