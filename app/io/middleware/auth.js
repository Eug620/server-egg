/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2022-09-23 11:33:44
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-03-29 11:37:35
 * @FilePath     : /server-egg/app/io/middleware/auth.js
 * @Description  : filename
 * 
 * Copyright (c) 2022 by eug yyh3531@163.com, All Rights Reserved. 
 */
module.exports = () => {
    return async (ctx, next) => {
        let { socket, app, helper, logger, service } = ctx

        // 用户信息
        const id = socket.id;
        let hasUser = await service.user.getUserInfo({ id })
        console.log('用户是否存在:', !!hasUser);
        // 用户不存在
        if (!hasUser) return tick(id, {
            type: 'deleted',
            message: 'token 错误',
        })

        // 用户房间列表
        const OwnRoom = await service.rooms.getOwnRoomByID(id)
        const rooms = OwnRoom.map(v => v.id)
        console.log('房间列表:',rooms);


        /**
         * 区分房间 - 所有房间
         */
        let res = await app.mysql.select(app.config.databaseName.Rooms, {
            columns: ['id'], //查询字段，全部查询则不写，相当于查询*
        })
        const SET_ROOMS = new Set(res.map(v => v.id))

        const namespace = app.io.of('/')

        const tick = (id, msg) => {
            logger.debug('#tick', id, msg);

            // 踢出用户前发送消息
            socket.emit(id, helper.parseMsg('deny', msg));

            // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件
            // namespace.adapter.remoteDisconnect(id, true, err => {
            //     logger.error(err);
            // });
        };

        // 循环进入房间
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
        logger.debug('#leave', OwnRoom);

        // 在线列表 - 通知离开
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