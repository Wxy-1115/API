const Router = require('koa-router');

const { auth, hasAdminPermisson } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/goods.middleware');

const {upload, create, update, remove, restore, findAll} = require('../controller/goods.controller');


const router = new Router({prefix: '/goods'})

router
  // 上传图片
  .post('/upload', auth, hasAdminPermisson, upload)
  // 发布商品
  .post('/', auth, hasAdminPermisson, validator, create)
  // 修改商品
  .put('/:id', auth, hasAdminPermisson, validator, update)
  // 硬删除商品
  // .delete('/:id', auth, hasAdminPermisson, remove)
  // 下架商品
  .post('/:id/off', auth, hasAdminPermisson, remove)
  // 上架商品
  .post('/:id/on', auth, hasAdminPermisson, restore)
  // 获取商品列表
  .get('/', findAll)



module.exports = router