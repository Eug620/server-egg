/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-09-06 11:22:35
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-09-06 11:22:44
 * @FilePath     : /server-egg/app/router/backlog.js
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

    router.post('/backlog/save', jwt, controller.backlog.save)
    router.get('/backlog/detail', jwt, controller.backlog.detail)
};