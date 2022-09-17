/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-09-18 02:37:26
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-18 02:48:43
 * @FilePath: /server-egg/app/router/room.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

    const { router, controller, jwt } = app;

    router.get('/rooms/all', jwt, controller.rooms.all)
    router.post('/rooms/create', jwt, controller.rooms.create)
    router.post('/rooms/update', jwt, controller.rooms.update)
    router.post('/rooms/delete', jwt, controller.rooms.delete)
    router.post('/rooms/join', jwt, controller.rooms.join)

    router.post('/rooms/deleteUser', jwt, controller.rooms.deleteUser)
    router.get('/rooms/ownRoom', jwt, controller.rooms.ownRoom)
};

/**
 * 房间表
 * rooms 表 - 字段 
 * id - 主键
 * name
 * describe
 * author
 */

/**
 * 房间成员表
 * rooms_staff 表 - 字段
 * id - 主键
 * room_id
 * user_id
 */