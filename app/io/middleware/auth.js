/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-09-17 00:55:03
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-18 02:27:49
 * @FilePath: /server-egg/app/io/middleware/auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const PREFIX = 'room';
const SET_ROOMS = new Set(['wtf'])
module.exports = () => {
    return async (ctx, next) => {
        let { socket, app, helper, logger } = ctx
        const id = socket.id;
        const namespace = app.io.of('/')
        const query = socket.handshake.query;

        // 用户信息
        const { room } = query;
        const rooms = [room];
        logger.debug('#user_info', id, room, id);

        const tick = (id, msg) => {
            logger.debug('#tick', id, msg);

            // 踢出用户前发送消息
            socket.emit(id, helper.parseMsg('deny', msg));

            // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件
            // namespace.adapter.remoteDisconnect(id, true, err => {
            //     logger.error(err);
            // });
        };

        const hasRoom = SET_ROOMS.has(room)
        logger.debug('#has_exist', hasRoom);


        // 用户加入
        logger.debug('#join', room);
        socket.join(room);

        // 在线列表
        namespace.adapter.clients(rooms, (err, clients) => {
            logger.debug('#online_join', clients);

            // 更新在线用户列表
            namespace.to(room).emit('online', {
                clients,
                action: 'join',
                target: 'participator',
                message: `User(${id}) joined.`,
            });
        });

        if (!hasRoom) {
            tick(id, {
                type: 'deleted',
                message: 'deleted, room has been deleted.',
            });
            return;
        }

        await next();

        // 用户离开
        logger.debug('#leave', room);

        // 在线列表
        namespace.adapter.clients(rooms, (err, clients) => {
            logger.debug('#online_leave', clients);
            // 获取 client 信息
            // const clientsDetail = {};
            // clients.forEach(client => {
            //   const _client = app.io.sockets.sockets[client];
            //   const _query = _client.handshake.query;
            //   clientsDetail[client] = _query;
            // });

            // 更新在线用户列表
            namespace.to(room).emit('online', {
                clients,
                action: 'leave',
                target: 'participator',
                message: `User(${id}) leaved.`,
            });
        });
    };
};