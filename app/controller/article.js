/* 
 * @Author       : Eug
 * @Date         : 2022-03-08 15:33:55
 * @LastEditTime : 2022-03-10 17:00:45
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/controller/article.js
 */
'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  constructor() {
    this.icon = 'test'
  }
  // 文章列表all
  async all () {
    const { ctx } = this;
    const result = await ctx.service.article.all();
    ctx.body = result
    ctx.returnBody(200, '查询成功', result)
  }
  
  // 文章列表
  async index () {
    const { ctx } = this;
    const result = await ctx.service.article.index();
    ctx.body = result
    ctx.returnBody(200, '查询成功', result)
  }

  // 文章详情
  async detail () {
    const { ctx } = this;
    const result = await ctx.service.article.detail();
    ctx.body = result
    ctx.returnBody(200, '查询成功', result)
  }
}
module.exports = ArticleController;
