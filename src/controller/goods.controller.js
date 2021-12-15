const path = require('path');
const { fileUploadError, fileTypeError, createGoodsError, invalidGoodsID } = require('../constant/err.type');
const { createGoods, updateGoods, removeGoods, restoreGoods, findAllGoods } = require('../service/goods.service');

class GoodsController {
  async upload(ctx) {
    const { file } = ctx.request.files
    // console.log(file);
    const fileTypes = ['image/jpeg', 'image/png']
    if (file) {
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit('error', fileTypeError, ctx)
      }
      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          goods_img: path.basename(file.path)
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }

  }
  async create(ctx) {
    try {
      const { updatedAt, createdAt, ...res } = await createGoods(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', createGoodsError, ctx)
    }
  }
  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改商品成功',
          result: ''
        }
      } else {
        ctx.app.emit('error', invalidGoodsID, ctx)
      }
    } catch (err) {
      console.error(err);
    }
  }
  async remove(ctx) {
    try {
      const res = await removeGoods(ctx.params.id)
      if (res) {
        ctx.body = {
          code: 0,
          message: '下架商品成功',
          result: ''
        }
      } else {
        ctx.app.emit('error', invalidGoodsID, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async restore(ctx) {
    try {
      const res = await restoreGoods(ctx.params.id)
      if (res) {
        ctx.body = {
          code: 0,
          message: '上架商品成功',
          result: ''
        }
      } else {
        ctx.app.emit('error', invalidGoodsID, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async findAll(ctx) {
    const {pageNum = 1, pageSize = 10} = ctx.request.query
    const res = await findAllGoods(pageNum, pageSize)
    ctx.body = {
      code: 0,
      message: '获取商品列表成功',
      result: res
    }
  }
}


module.exports = new GoodsController()