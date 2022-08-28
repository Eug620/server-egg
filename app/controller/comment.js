/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-28 12:40:16
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 14:28:52
 * @FilePath: /server-egg/app/controller/comment.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  // 评论列表all
  async all () {
    const { ctx } = this;
    const result = await ctx.service.comment.all();
    ctx.body = result
    ctx.returnBody(200, '查询成功', result)
  }

  async add () {
    const { ctx } = this;
    const { code , message } = await ctx.service.comment.add();
    this.ctx.returnBody(code , message, null)
  }

  async delete () {
    const { ctx } = this;
    const { code , message } = await ctx.service.comment.delete();
    this.ctx.returnBody(code , message, null)
  }
}
module.exports = CommentController;