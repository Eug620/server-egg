/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-17 00:54:36
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-03-01 16:27:43
 * @FilePath     : /server-egg/app/io/controller/nsp.js
 * @Description  : io controller
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
 */
module.exports = app => {
  class Controller extends app.Controller {
    async exchange() {
      const { ctx, app } = this;
      const nsp = app.io.of('/');
      const message = ctx.args[0] || {};
      const socket = ctx.socket;
      const client = socket.id;

      try {
        const { target, payload } = message;
        if (!target) return;
        const { name, avatar } = await app.mysql.get(app.config.databaseName.user, { id: client })
        const msg = ctx.helper.parseMsg('confabulate', payload, { client, target, clientName: name, clientAvatar: avatar });
        // 聊天记录
        await this.app.mysql.insert(this.app.config.databaseName.Rooms_Record, {
          name,
          avatar,
          target,
          timestamp: msg.meta.timestamp,
          message: payload.message,
          id: client
        })

        nsp.adapter.clients([target], (err, clients) => {
          nsp.to(target).emit(target, msg);
        });
      } catch (error) {
        app.logger.error(error);
      }
    }
  }
  return Controller;
};