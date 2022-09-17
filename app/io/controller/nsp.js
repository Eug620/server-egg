/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-09-17 00:54:36
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-18 02:29:36
 * @FilePath: /server-egg/app/io/middleware/chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
              const msg = ctx.helper.parseMsg('confabulate', payload, { client, target });
              nsp.emit(target, msg);
            } catch (error) {
              app.logger.error(error);
            }
        }
    }
    return Controller;
};