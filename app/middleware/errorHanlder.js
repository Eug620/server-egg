/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:29:32
 * @LastEditTime : 2022-02-11 18:08:23
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /egg-example/app/middleware/errorHanlder.js
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
      const status = err.status || 500
      const message = status === 422 ? '参数校验未通过' : 'Internal Server Error';
      // HTTP Code
      ctx.status = status;
      // 生产环境
      const isProd = ctx.app.config.env === 'prod';
      // 错误响应对象 (status === 422 参数校验监听拦截)
      const msg = (status === 500 && isProd) ? 'Internal Server Error' : message;
      const data = status === 422 ? err.errors.map((item) => {
        return `${item.field}--${item.message}`;
      }) : undefined;
      ctx.returnBody(status, msg, data);
    }
  }
}
 //参数校验在下一条中间件 app/middleware/requier.js，参数校验不通过会抛出422的错误