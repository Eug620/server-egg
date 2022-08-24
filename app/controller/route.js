'use strict';

const Controller = require('egg').Controller;

class RouteController extends Controller {
  // 路由列表all
  async all () {
    const { ctx } = this;
    const result = await ctx.service.route.all();
    ctx.body = result
    ctx.returnBody(200, '查询成功', result)
  }

  // 路由列表add
  async add () {
    const { ctx } = this;
    const { code , message } = await ctx.service.route.add();
    ctx.returnBody(code , message, null)
  }
  
}

module.exports = RouteController