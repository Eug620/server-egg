/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-23 11:33:44
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2025-08-05 15:16:49
 * @FilePath     : /server-egg/app/router/rooms.js
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
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
    router.get('/rooms/search', jwt, controller.rooms.search)

    // 
    router.post('/rooms/deleteUser', jwt, controller.rooms.deleteUser)
    router.get('/rooms/ownRoom', jwt, controller.rooms.ownRoom)

    // 聊天记录
    router.get('/rooms/records', jwt, controller.rooms.records)
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