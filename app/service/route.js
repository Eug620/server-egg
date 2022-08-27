/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-25 18:15:13
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-27 17:56:57
 * @FilePath: /server-egg/app/service/route.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Service = require('egg').Service;
const UUID = require('uuid')

class RouteService extends Service {
  /**
   * @returns user list all
   */
  async all() {
    const result = await this.app.mysql.select(this.app.config.databaseName.routes)
    return result;
  }

  async add() {
    const {
      affix,
      isEle,
      type,
      api,
      parent_id,
      name,
      path,
      cache,
      component_path,
      description,
      sort_id,
      enable,
      icon,
      isChecked,
      redirect,
      service,
      title,
      decode
    } = this.ctx.params
    const ct = Date.now()
    const hasUser = await this.app.mysql.get(this.app.config.databaseName.user, { id: decode.id })
    if (hasUser) {
      const id = UUID.v4()
      await this.app.mysql.insert(this.app.config.databaseName.routes, {
        affix,
        isEle,
        type,
        api,
        parent_id,
        name,
        path,
        cache,
        component_path,
        description,
        sort_id,
        enable,
        icon,
        isChecked,
        redirect,
        service,
        title,
        ct,
        id
      })
      return {
        code: 200,
        message: '新增成功'
      }
    } else {
      return {
        code: 401
      }
    }
  }
}

module.exports = RouteService