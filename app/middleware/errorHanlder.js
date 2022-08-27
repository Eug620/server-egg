/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:29:32
 * @LastEditTime: 2022-08-27 18:40:19
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/middleware/errorHanlder.js
 */
// 异常处理、参数校验监听拦截中间件
//异常处理、参数校验监听拦截中间件
module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx)
      ctx.status = 200
      const status = err.status || 500
      const message = `[ ${ctx.app.config.statusType[status]} ] ${err.message}`
      // HTTP Code
      // ctx.status = 200;
      // 生产环境
      // const isProd = ctx.app.config.env === 'prod';
      // 错误响应对象 (status === 422 参数校验监听拦截)
      // const msg = (status === 500 && isProd) ? 'Internal Server Error' : message;
      // const data = ctx.app.config.statusType[status]
      // ctx.returnBody(status, msg, data);
      ctx.returnBody(status, message);
    }
  }
}
 //参数校验在下一条中间件 app/middleware/requier.js，参数校验不通过会抛出422的错误