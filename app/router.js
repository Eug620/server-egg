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
};
