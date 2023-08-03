/* 
 * @Author       : Eug
 * @Date         : 2022-03-08 14:50:53
 * @LastEditTime : 2023-08-03 15:28:46
 * @LastEditors  : eug yyh3531@163.com
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
    const { router, controller, jwt } = app;
    
    router.get('/user/all', jwt, controller.user.all)
    router.post('/user/add', controller.user.add)
    router.post('/user/update', jwt, controller.user.update)
    router.post('/user/delete', jwt, controller.user.delete)
    router.get('/user/index', jwt, controller.user.index)
    router.post('/user/login', controller.user.login)


    router.post('/visitor-info/add', jwt, controller.user.visitorInfoAdd)
    router.get('/visitor-info/index', jwt, controller.user.visitorInfoIndex)
    router.get('/visitor-info/all', jwt, controller.user.visitorInfoAll)
};