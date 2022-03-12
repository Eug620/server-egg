/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 15:36:32
 * @LastEditTime : 2022-02-11 15:36:33
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /egg-example/app/middleware/params.js
 */
/**
 * 获取请求参数中间件
 * 可以使用ctx.params获取get或post请求参数
 */
module.exports = options => {
  return async function params(ctx, next) {
    let decode;
    if (ctx.get('Authorization')) {
      const token = ctx.request.header.authorization.substring(7);
      try {
        decode = ctx.app.jwt.verify(token, options.secret);
      } catch (error) {
        console.warn(ctx.request.url, error)
      }
    }
    ctx.params = {
      decode,
      ...ctx.query,
      ...ctx.request.body
    }
    await next();
  };
};

/**
 * 本质上就是把get请求的参数和post请求的参数都放到params这个对象里,所以,不管是get还是post都能获取到请求参数
 * 然后去/config/config.default.js里注入中间件
 */