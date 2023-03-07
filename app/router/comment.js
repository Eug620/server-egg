/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-23 11:33:44
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-03-07 14:00:46
 * @FilePath     : /server-egg/app/router/comment.js
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
    router.get('/comment/all', controller.comment.all)
    router.post('/comment/add', jwt, controller.comment.add)
    router.post('/comment/delete', jwt, controller.comment.delete)
};