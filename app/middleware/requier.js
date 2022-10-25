/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:31:49
 * @LastEditTime: 2022-08-27 16:29:18
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/middleware/requier.js
 */
//参数校验、参数过滤中间件
const validateConfig = require('../validateConfig')
module.exports = options => {
  return async (ctx, next) => {
    let requestURL = ctx.request.url;
    // 拆分请求url，获取到controller和方法名
    requestURL = requestURL.split('?')[0].split('/')
    let valiDataRule = validateConfig;
    requestURL.forEach(url => {
      if (url) {
        valiDataRule = valiDataRule[url];
      }
    });
    checkPparams(ctx);
    //参数校验
    if (valiDataRule && requestURL.some(v=>v)) {
      ctx.validate(valiDataRule, ctx.params)
    }
    await next();
  }
};
//过滤请求参数
const checkPparams = (ctx) => {
  //GET非严格模式ctx.query / 严格模式ctx.params   POST  》》  ctx.request.body
  let paramsData = {};
  if (ctx.request.method === 'GET') {
    paramsData = ctx.query || ctx.params || {};
  } else {
    paramsData = ctx.request.body || {};
  }
  // 请求参数
  ctx.params = paramsData;
}

//    控制层controller中可直接用ctx.params获取到请求参数
//    得安装egg-validate    npm install --save egg-validate
//    app/validateConfig存放接口参数校验规则
