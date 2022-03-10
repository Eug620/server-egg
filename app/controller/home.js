/* 
 * @Author       : Eug
 * @Date         : 2022-03-08 14:50:53
 * @LastEditTime : 2022-03-10 15:25:06
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/controller/home.js
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app: { controller } } = this;
    await ctx.render('index.njk', {
      userName: '张三',
      content: '这是传入的内容',
      list: Object.keys(controller)
    })
  }
}

module.exports = HomeController;
