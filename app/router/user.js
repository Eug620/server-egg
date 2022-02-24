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
};