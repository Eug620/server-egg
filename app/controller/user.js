/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 14:52:37
 * @LastEditTime : 2022-03-11 18:31:18
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/controller/user.js
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 用户列表all
  async all () {
    const { ctx } = this;
    const result = await ctx.service.user.all();
    ctx.body = result
    ctx.returnBody(200, '查询成功', result)
  }
  // 新增用户
  async add () {
    const { ctx } = this;
    await ctx.service.user.add();
    ctx.returnBody(200, '新增成功')
  }

  // 更新用户
  async update () {
    const { ctx } = this
    await ctx.service.user.update()
    ctx.returnBody(200, '更新成功')
  }
  // 删除
  async delete () {
    const { ctx } = this
    await ctx.service.user.delete()
    ctx.returnBody(200, '删除成功')
  }
  // 分页
  async index () {
    const { ctx } = this;
    const result = await ctx.service.user.index();
    ctx.body = result
    ctx.returnBody(200, '查询成功', result)
  }
  // 登录
  async login () {
    const { ctx } = this;
    const { msg, result, token } = await ctx.service.user.login();
    ctx.body = result
    ctx.returnBody(200, msg, result, { token })
  }
}

module.exports = UserController;
