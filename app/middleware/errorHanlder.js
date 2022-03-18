/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:29:32
 * @LastEditTime : 2022-03-18 15:59:23
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/middleware/errorHanlder.js
 */
// 异常处理、参数校验监听拦截中间件
//异常处理、参数校验监听拦截中间件
const STATUS_TYPE = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  413: 'Nginx等其他配置文件错误',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
}
module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx)
      const status = err.status || 500
      const message = STATUS_TYPE[status] ||  'Internal Server Error';
      // HTTP Code
      ctx.status = status;
      // 生产环境
      // const isProd = ctx.app.config.env === 'prod';
      // 错误响应对象 (status === 422 参数校验监听拦截)
      // const msg = (status === 500 && isProd) ? 'Internal Server Error' : message;
      const data = status === 422 ? err.errors.map((item) => {
        return `${item.field} ${item.message}`;
      }) : undefined;
      // ctx.returnBody(status, msg, data);
      ctx.returnBody(status, message, data);
    }
  }
}
 //参数校验在下一条中间件 app/middleware/requier.js，参数校验不通过会抛出422的错误