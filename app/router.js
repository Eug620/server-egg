/* 
 * @Author       : Eug
 * @Date         : 2022-03-08 14:50:53
 * @LastEditTime : 2022-03-08 15:41:04
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/router.js
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 传参
  // router.get('/user/:id', controller.user.info);
  // query参数
  // router.get('/get', controller.user.get);


  // 参数校验
  // router.get('/user/userList', controller.user.userList);
  require('./router/user')(app);
  require('./router/article')(app);
};
