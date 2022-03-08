/* 
 * @Author       : Eug
 * @Date         : 2022-03-08 14:50:53
 * @LastEditTime : 2022-03-08 15:03:14
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/router/user.js
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    /**
     * user 表 - 字段
     * id - 主键
     * name
     * password
     * email
     * create_time
     * update_time
     */
    const { router, controller } = app;
    router.get('/user/all', controller.user.all)
    router.post('/user/add', controller.user.add)
    router.post('/user/update', controller.user.update)
    router.post('/user/delete', controller.user.delete)
    router.get('/user/index', controller.user.index)
};