/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-28 12:38:53
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 12:40:00
 * @FilePath: /server-egg/app/router/comment.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/comment/all', controller.comment.all)
    router.post('/comment/add', controller.comment.add)
    router.post('/comment/delete', controller.comment.delete)
};