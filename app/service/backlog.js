/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-09-06 11:25:17
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-09-06 12:57:05
 * @FilePath     : /server-egg/app/service/backlog.js
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const Service = require('egg').Service;
const UUID = require('uuid')

class BacklogService extends Service {
    async save() {
        const { week, decode: { id }, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = this.ctx.params
        const [current] = await this.app.mysql.select(this.app.config.databaseName.Backlog, {
            where: {
                user: id,
                week
            }
        })

        if (current) {// 更新
            await this.app.mysql.update(this.app.config.databaseName.Backlog, {
                Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
            }, {
                where: {
                    id: current.id
                }
            })
        } else { // 新建
            await this.app.mysql.insert(this.app.config.databaseName.Backlog, {
                Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday,
                week, 
                id: UUID.v4(),
                user: id
            })
        }
        console.log(current);
    }
    async detail() {
        console.log(this.ctx.params);
        const { week, decode: { id } } = this.ctx.params
        const detail = await this.app.mysql.select(this.app.config.databaseName.Backlog, {
            where: {
                user: id,
                week
            }
        })
        return detail[0] || {}
    }
}

module.exports = BacklogService;
