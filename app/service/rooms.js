const Service = require('egg').Service;
const UUID = require('uuid')

class UserService extends Service {
    /**
     * @returns room list all
     */
    async all() {
        const result = await this.app.mysql.select(this.app.config.databaseName.Rooms, {
            columns: ['id', 'name', 'describe', 'author'], //查询字段，全部查询则不写，相当于查询*
        })
        return result;
    }

    /**
     * name require
     * describe require
     */
    async create() {
        const { name, describe, decode } = this.ctx.params
        const id = UUID.v4()
        await this.app.mysql.insert(this.app.config.databaseName.Rooms, { id, name, describe, author: decode.id })
        await this.app.mysql.insert(this.app.config.databaseName.Rooms_Staff, { id: UUID.v4(), room_id: id, user_id: decode.id })

    }

    /**
     * id require
     * name
     * password
     */
    async update() {
        const { id, name, describe, decode } = this.ctx.params

        // 判断是否为当前所属用户的房间
        const rooms = await this.app.mysql.select(this.app.config.databaseName.Rooms, {
            where: {
                id: id
            }
        })
        // 错误的房间id
        if (!rooms.length) {
            return {
                code: 200,
                message: '不存在此房间'
            }
        }
        // 无修改权限
        if (rooms[0].author !== decode.id) {
            return {
                code: 200,
                message: '没有修改权限'
            }
        }
        const options = {
            where: {
                id: id
            }
        }
        await this.app.mysql.update(this.app.config.databaseName.Rooms, { name, describe }, options)
        return {
            code: 200,
            message: '更新房间信息成功'
        }
    }

    /**
     * id require
     */
    async delete() {
        const { id, decode } = this.ctx.params
        let result = await this.app.mysql.get(this.app.config.databaseName.Rooms, {
            id,
            author: decode.id
        })
        if (result) {
            await this.app.mysql.query(`
                delete
                from Rooms_Staff
                where room_id in (
                    select room_id as id from Rooms where room_id = '${id}'
                )
            `)

            await this.app.mysql.delete(this.app.config.databaseName.Rooms, { id })
            return {
                code: 200,
                message: '删除成功'
            }
        } else {
            return {
                code: 200,
                message: '没有权限或房间不存在'
            }
        }

    }

    /**
     * 加入房间
     * room_id require
     */
    async join() {
        const { room_id, decode } = this.ctx.params
        const id = UUID.v4()
        let result = await this.app.mysql.get(this.app.config.databaseName.Rooms, {
            id: room_id
        })
        if (result) {
            await this.app.mysql.insert(this.app.config.databaseName.Rooms_Staff, { id, room_id, user_id: decode.id })
            return {
                code: 200,
                message: '加入成功'
            }
        } else {
            return {
                code: 200,
                message: '房间不存在'
            }
        }
    }

    async deleteUser() {
        const { user_id, room_id, decode } = this.ctx.params
        const { name, password } = this.ctx.params
        let result = await this.app.mysql.get(this.app.config.databaseName.Rooms, {
            id: room_id,
            author: decode.id
        })
        if (result) {
            const hasUser = await this.app.mysql.get(this.app.config.databaseName.Rooms_Staff, {
                room_id,
                user_id
            })
            if (hasUser) {
                await this.app.mysql.delete(this.app.config.databaseName.Rooms_Staff, { user_id, room_id })
                return {
                    code: 200,
                    message: '删除成功'
                }
            } else {
                return {
                    code: 200,
                    message: '此房间不存在该用户'
                }
            }
        } else {
            return {
                code: 200,
                message: '没有权限或房间不存在'
            }
        }
    }
    async ownRoom() {
        const { decode } = this.ctx.params
        const { Rooms, Rooms_Staff } = this.app.config.databaseName
        const SQL_STRING = `
            select 
                ${Rooms}.id,
                ${Rooms}.name,
                ${Rooms}.describe,
                ${Rooms}.author
            from ${Rooms_Staff}
            LEFT JOIN  ${Rooms} on ${Rooms_Staff}.room_id = ${Rooms}.id
            where user_id = '${decode.id}'
        `
        const result = await this.app.mysql.query(SQL_STRING)
        return result
    }
}

module.exports = UserService;