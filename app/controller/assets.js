/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 14:52:37
 * @LastEditTime: 2022-08-27 17:27:25
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/controller/assets.js
 */
'use strict';

const Controller = require('egg').Controller;

class FileController extends Controller {
  async upload() {
    await this.ctx.service.assets.upload();
    this.ctx.returnBody(200, '上传成功')
  }
  async finish() {
    await this.ctx.service.assets.finish();
    this.ctx.returnBody(200, '上传成功')
  }

  async fileList() {
    const result = await this.ctx.service.assets.fileList();
    this.ctx.returnBody(200, '查询成功', result)
  }


  async assets() {
    await this.ctx.service.assets.assets();
  }
  async cleans() {
    await this.ctx.service.assets.cleans();
    this.ctx.returnBody(200, '清空成功')
  }
  async delete() {
    await this.ctx.service.assets.delete();
    this.ctx.returnBody(200, '删除成功')
  }
}

module.exports = FileController;
