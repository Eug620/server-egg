/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-08-10 16:45:22
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-08-10 16:45:51
 * @FilePath     : /server-egg/app/controller/word-cloud.js
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use strict';

const Controller = require('egg').Controller;

class WordCloudController extends Controller {
    async allByMonth() {
        const { ctx } = this;
        const result = await ctx.service.wordCloud.allByMonth();
        ctx.body = result
        ctx.returnBody(200, '查询成功', result)
    }
}
module.exports = WordCloudController;