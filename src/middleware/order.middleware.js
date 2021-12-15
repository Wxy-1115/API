const { OrderFormatError } = require("../constant/err.type");

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (err) {
      console.error(err);
      OrderFormatError.result = err
      return ctx.app.emit('error', OrderFormatError, ctx)
    }

    await next()
  }
}

module.exports = {
  validator
}