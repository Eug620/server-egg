/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-23 11:33:44
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-03-16 18:01:53
 * @FilePath     : /server-egg/app/io/middleware/auth.js
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
 */
const PREFIX = 'room';
// const SET_ROOMS = new Set(['wtf'])
module.exports = () => {
    return async (ctx, next) => {
        let { socket, app, helper, logger } = ctx
        /**
         * 区分房间
         */
        let res = await app.mysql.select(app.config.databaseName.Rooms, {
            columns: ['id'], //查询字段，全部查询则不写，相当于查询*
        })
        const SET_ROOMS = new Set(res.map(v => v.id))

        const id = socket.id;
        const namespace = app.io.of('/')
        const query = socket.handshake.query;

        // 用户信息
        const { room } = query;
        // const rooms = [room];
        const rooms = room.split(',');
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
        rooms.forEach(room => {
            const hasRoom = SET_ROOMS.has(room)
            logger.debug('#has_exist', hasRoom);

            if (!hasRoom) {
                tick(id, {
                    type: 'deleted',
                    message: 'deleted, room has been deleted.',
                });
                return;
            }

            // 用户加入
            logger.debug('#join', room);
            socket.join(room);

            // 在线列表
            namespace.adapter.clients(rooms, async (err, clients) => {
                logger.debug('#online_join', clients);
                const { name } = await app.mysql.get(app.config.databaseName.User, { id })     
                // 更新在线用户列表
                namespace.to(room).emit('online', {
                    clients,
                    room,
                    clients,
                    action: 'join',
                    target: 'participator',
                    message: `${name} 已上线`,
                    user: id,
                });
            });
        })
      

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

            rooms.forEach(async room => {
                const { name } = await app.mysql.get(app.config.databaseName.User, { id })     

                // 更新在线用户列表
                namespace.to(room).emit('online', {
                    clients,
                    room,
                    clients,
                    action: 'leave',
                    target: 'participator',
                    message: `${name} 已下线`,
                    user: id,
                });
            })

        });
    };
};