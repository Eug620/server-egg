'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app;
    
    router.get('/route/all', jwt, controller.route.all)
    router.post('/route/add', jwt, controller.route.add)
};