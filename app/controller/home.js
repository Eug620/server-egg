/* 
 * @Author       : Eug
 * @Date         : 2022-03-08 14:50:53
 * @LastEditTime : 2022-03-11 14:23:49
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/controller/home.js
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app: { controller } } = this;
    const renderList = {}
    for (const key in controller) {
      renderList[key] = Object.keys(controller[key]).map(v => `/${key}/${v}`)
    }
    await ctx.render('index.njk', {
      list: renderList
    })
  }
}

module.exports = HomeController;
