/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-10-25 15:19:42
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-10-25 15:43:01
 * @FilePath     : /server-egg/app/service/image.js
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
 */

const Service = require('egg').Service;
const UUID = require('uuid')

class UserService extends Service {

    async all() {
        const result = await this.app.mysql.select(this.app.config.databaseName.image, {
            columns: ['id', 'url', 'create_time', 'update_time'], //查询字段，全部查询则不写，相当于查询*
            orders: [['update_time', 'DESC']]
        })
        return result;
    }


    async add() {
        const { url } = this.ctx.params
        const create_time = Date.parse(new Date())
        const update_time = Date.parse(new Date())
        const id = UUID.v4()
        let result = await this.app.mysql.get(this.app.config.databaseName.image, { url })
        if (result) {
            return {
                code: 200,
                message: '数据已经存在'
            }
        } else {
            await this.app.mysql.insert(this.app.config.databaseName.image, { id, url, create_time, update_time })
            return {
                code: 200,
                message: '新增成功'
            }
        }
    }


    async update() {
        const { url, id } = this.ctx.params
        const update_time = Date.parse(new Date())
        const options = {
            where: {
                id
            }
        }

        const imageInfo = { update_time, url }
        await this.app.mysql.update(this.app.config.databaseName.image, imageInfo, options)
    }

    async delete() {
        const { id } = this.ctx.params
        await this.app.mysql.delete(this.app.config.databaseName.image, { id })
    }


    async random() {
        // const { size, page } = this.ctx.params
        // const current_size = size || 10
        // const current_page = ((isNaN(page) || page < 1) ? 0 : page - 1) * current_size
        // const SQL_STRING = `
        //   SELECT 
        //   id, email, create_time, update_time, name
        //   FROM user 
        //   ORDER BY update_time DESC  
        //   LIMIT ${current_page}, ${current_size}
        // `
        // const result = await this.app.mysql.query(SQL_STRING)
        // return result;
        return {
            msg: '待开发'
        }
    }
}

module.exports = UserService;