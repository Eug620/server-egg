/* 
 * @Author       : Eug
 * @Date         : 2022-03-11 17:39:42
 * @LastEditTime : 2022-03-11 18:31:43
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/middleware/authorization.js
 */
module.exports = (options) => {
  return async function (ctx, next) {
    if (ctx.get('Authorization')) {
      const token = ctx.request.header.authorization.substring(7);
      let decode;
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        await next();
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          /**401 http错误 未经授权,访问由于凭证无效而被拒绝 */
          ctx.status = 401;
          ctx.body = {
            code: 401,
            msg: 'token过期' + error.message
          }
          return;
        } else {
          ctx.status = 401;
          ctx.body = {
            code: 401,
            msg: 'token失效' + error.message
          }
          return;
        }
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: 'token缺失'
      }
      return;
    }
  }
}
