/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-23 11:33:44
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-03-01 16:27:38
 * @FilePath     : /server-egg/app/controller/rooms.js
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use strict';

const Controller = require('egg').Controller;

class RoomsController extends Controller {
    // 房间列表all
    async all() {
        const result = await this.ctx.service.rooms.all();
        this.ctx.returnBody(200, '查询成功', result)
    }
    // 新增房间
    async create() {
        await this.ctx.service.rooms.create();
        this.ctx.returnBody(200, '新增成功')
    }

    // 更新房间
    async update() {
        const { code, message } = await this.ctx.service.rooms.update()
        this.ctx.returnBody(code, message, null)
    }

    // 删除房间
    async delete() {
        const { code, message } = await this.ctx.service.rooms.delete()
        this.ctx.returnBody(code, message)
    }
    // 加入房间
    async join() {
        const { code, message } = await this.ctx.service.rooms.join();
        this.ctx.returnBody(code, message)
    }

    // 删除成员
    async deleteUser() {
        const { code, message } = await this.ctx.service.rooms.deleteUser()
        this.ctx.returnBody(code, message, null)
    }

    // 自己所有房间
    async ownRoom() {
        const result = await this.ctx.service.rooms.ownRoom();
        this.ctx.returnBody(200, '查询成功', result)
    }

    // 聊天记录
    async records() {
        const { code, message, result } = await this.ctx.service.rooms.records();
        this.ctx.returnBody(code, message, result)
    }
}

module.exports = RoomsController;