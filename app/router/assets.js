/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-08-30 11:02:14
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-08-30 13:48:55
 * @FilePath     : /server-egg/app/router/assets.js
 * @Description  : 文件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app;

    router.post('/assets/upload', controller.assets.upload)
    router.get('/assets/finish', controller.assets.finish)
    router.get('/assets/list', controller.assets.fileList)
    router.get('/assets/cleans', controller.assets.cleans)
    router.get('/assets/delete', controller.assets.delete)
    router.get('/assets/:id', controller.assets.assets)
};