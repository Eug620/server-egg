/* 
 * @Author       : Eug
 * @Date         : 2022-03-08 14:50:53
 * @LastEditTime: 2022-08-28 12:38:58
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/router/article.js
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app;
    router.get('/article/all', controller.article.all)
    router.get('/article/index', controller.article.index)
    router.get('/article/detail', controller.article.detail)
    router.post('/article/add', jwt, controller.article.add)
    router.post('/article/update', jwt, controller.article.update)
    router.post('/article/delete', jwt, controller.article.delete)
    router.get('/article/tags', controller.article.tags)
};