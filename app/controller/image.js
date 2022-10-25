/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-10-25 15:18:13
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-10-25 15:43:30
 * @FilePath     : /server-egg/app/controller/image.js
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // all
  async all () {
    const result = await this.ctx.service.image.all();
    this.ctx.returnBody(200, '查询成功', result)
  }
  // 新增
  async add () {
    const { code , message } = await this.ctx.service.image.add();
    this.ctx.returnBody(code , message, null)
  }

  // 更新
  async update () {
    await this.ctx.service.image.update()
    this.ctx.returnBody(200, '更新成功')
  }
  // 删除
  async delete () {
    await this.ctx.service.image.delete()
    this.ctx.returnBody(200, '删除成功')
  }
  // 随机
  async random () {
    const result = await this.ctx.service.image.random();
    this.ctx.returnBody(200, '查询成功', result)
  }
}

module.exports = UserController;
