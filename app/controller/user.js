/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 14:52:37
 * @LastEditTime: 2022-08-27 17:27:25
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/controller/user.js
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 用户列表all
  async all () {
    const result = await this.ctx.service.user.all();
    this.ctx.returnBody(200, '查询成功', result)
  }
  // 新增用户
  async add () {
    await this.ctx.service.user.add();
    this.ctx.returnBody(200, '新增成功')
  }

  // 更新用户
  async update () {
    await this.ctx.service.user.update()
    this.ctx.returnBody(200, '更新成功')
  }
  // 删除
  async delete () {
    await this.ctx.service.user.delete()
    this.ctx.returnBody(200, '删除成功')
  }
  // 分页
  async index () {
    const result = await this.ctx.service.user.index();
    this.ctx.returnBody(200, '查询成功', result)
  }
  // 登录
  async login () {
    const { msg, result, token, code } = await this.ctx.service.user.login();
    this.ctx.returnBody(code, msg, result, { token })
  }


  async visitorInfoAdd () {
    await this.ctx.service.user.visitorInfoAdd();
    this.ctx.returnBody(200, '新增成功')
  }

  // 分页
  async visitorInfoIndex () {
    const result = await this.ctx.service.user.visitorInfoIndex();
    this.ctx.returnBody(200, '查询成功', result)
  }

  async visitorInfoAll () {
    const result = await this.ctx.service.user.visitorInfoAll();
    this.ctx.returnBody(200, '查询成功', result)
  }
}

module.exports = UserController;
