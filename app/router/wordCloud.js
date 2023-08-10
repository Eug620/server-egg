/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-08-10 16:46:53
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-08-10 16:50:59
 * @FilePath     : /server-egg/app/router/wordCloud.js
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app;
    router.get('/word-cloud/allByMonth', controller.wordCloud.allByMonth)
};