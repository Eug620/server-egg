/* 
 * @Author       : Eug
 * @Date         : 2022-03-08 14:50:53
 * @LastEditTime : 2022-03-11 14:28:17
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/router/article.js
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/article/all', controller.article.all)
    router.get('/article/index', controller.article.index)
    router.get('/article/detail', controller.article.detail)
    router.post('/article/add', controller.article.add)
    router.post('/article/update', controller.article.update)
    router.post('/article/delete', controller.article.delete)
};