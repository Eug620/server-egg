/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-08-10 16:00:34
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-08-10 16:36:23
 * @FilePath     : /server-egg/app/service/wordCloud.js
 * @Description  : 词云
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const Service = require('egg').Service;
const UUID = require('uuid')

class WordCloudService extends Service {
    async addRecord(keyword) {
        if (!keyword) return
        const statistics = (new Date()).toISOString().slice(0,7)
        const keyWordInfo = await this.app.mysql.get(this.app.config.databaseName.Word_Cloud, { keyword, statistics })
        if (keyWordInfo) {
            await this.app.mysql.update(this.app.config.databaseName.Word_Cloud, {
                frequency: keyWordInfo.frequency + 1
            }, {
                where: {
                    id: keyWordInfo.id
                }
            })

        } else {
            this.app.mysql.insert(this.app.config.databaseName.Word_Cloud, {
                keyword,
                statistics,
                id: UUID.v4(),
                frequency: 1
            })
        }
    }
    async allByMonth() {
        const statistics = this.ctx.params.statistics || (new Date()).toISOString().slice(0,7)
        return await this.app.mysql.select(this.app.config.databaseName.Word_Cloud, {
            where: {
                statistics
            },
            orders: [['frequency', 'DESC']]
        })
    }
}

module.exports = WordCloudService;
