/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-10-25 15:13:35
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-03-07 14:26:12
 * @FilePath     : /server-egg/app/router/image.js
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app;

    router.get('/image/all', controller.image.all)
    router.post('/image/add', controller.image.add)
    router.post('/image/update', jwt, controller.image.update)
    router.post('/image/delete', jwt, controller.image.delete)
    router.get('/image/random', controller.image.random)
};