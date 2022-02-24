/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 14:52:37
 * @LastEditTime : 2022-02-11 18:08:40
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /egg-example/app/controller/user.js
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 用户列表all
  async all() {
    const { ctx } = this;
    const result = await ctx.service.user.all();
    ctx.body = result
    ctx.returnBody(200, '查询成功', result)
  }
  // 新增用户
  async add() {
    const { ctx } = this;
    await ctx.service.user.add();
    ctx.returnBody(200, '新增成功')
  }
}

module.exports = UserController;
