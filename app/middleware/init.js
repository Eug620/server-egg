/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:27:01
 * @LastEditTime : 2022-03-11 18:29:38
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/middleware/init.js
 */
// 封装ctx.body
module.exports = options => {
  return async (ctx, next) => {
    ctx.returnBody = (code = 200, msg = '', data = {}, another) => {
      ctx.status = code;
      ctx.body = {
        code,
        msg,
        data,
        ...another
        // time: Math.floor(Date.now()) 
      };
      return;
    }
    await next();
  }
};