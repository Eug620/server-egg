/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-17 00:54:36
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2022-09-22 16:33:03
 * @FilePath     : /server-egg/app/io/controller/nsp.js
 * @Description  : filename
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
              const { name } = await app.mysql.get(app.config.databaseName.user, { id: client })      
              const msg = ctx.helper.parseMsg('confabulate', payload, { client, target, clientName: name });
              nsp.emit(target, msg);
            } catch (error) {
              app.logger.error(error);
            }
        }
    }
    return Controller;
};