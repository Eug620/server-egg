/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-23 11:33:44
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-03-16 18:02:27
 * @FilePath     : /server-egg/app/service/route.js
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const Service = require('egg').Service;
const UUID = require('uuid')

class RouteService extends Service {
  /**
   * @returns user list all
   */
  async all() {
    const result = await this.app.mysql.select(this.app.config.databaseName.Routes)
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
    const hasUser = await this.app.mysql.get(this.app.config.databaseName.User, { id: decode.id })
    if (hasUser) {
      const id = UUID.v4()
      await this.app.mysql.insert(this.app.config.databaseName.Routes, {
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