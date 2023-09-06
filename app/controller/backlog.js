/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-09-06 11:23:47
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-09-06 11:33:51
 * @FilePath     : /server-egg/app/controller/backlog.js
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use strict';

const Controller = require('egg').Controller;

class BacklogController extends Controller {
  async save() {
    await this.ctx.service.backlog.save();
    this.ctx.returnBody(200, '保存成功')
  }

  async detail() {
    const result = await this.ctx.service.backlog.detail();
    this.ctx.body = result
    this.ctx.returnBody(200, '查询成功', result)
  }
}
module.exports = BacklogController;