/* 
 * @Author       : Eug
 * @Date         : 2022-03-08 15:33:55
 * @LastEditTime : 2023-08-16 15:26:11
 * @LastEditors  : eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/controller/article.js
 */
'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
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

  async add () {
    const { ctx } = this;
    const { code , message } = await ctx.service.article.add();
    this.ctx.returnBody(code , message, null)
  }

  async update () {
    const { ctx } = this;
    const { code , message } = await ctx.service.article.update();
    this.ctx.returnBody(code , message, null)
  }

  async delete () {
    const { ctx } = this;
    const { code , message } = await ctx.service.article.delete();
    this.ctx.returnBody(code , message, null)
  }

  async tags() {
    const result = await this.ctx.service.article.tags();
    this.ctx.body = result
    this.ctx.returnBody(200, '查询成功', result)
  }
}
module.exports = ArticleController;
