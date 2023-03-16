
const Service = require('egg').Service;
const UUID = require('uuid')

class CommentService extends Service {
    /**
     * @returns user list all
     */
    async all() {

        const { article_id } = this.ctx.params

        // const SQL_STRING =
        //     `
        //     select 
        //         ${this.app.config.databaseName.Article_Comment}.id as id, 
        //         article_id, 
        //         pid, 
        //         content, 
        //         operator, 
        //         name, 
        //         ${this.app.config.databaseName.Article_Comment}.create_time as create_time
        //         from ${this.app.config.databaseName.Article_Comment}
        //         LEFT JOIN ${this.app.config.databaseName.User} ON ${this.app.config.databaseName.User}.id = ${this.app.config.databaseName.Article_Comment}.operator
        //         where  article_id = '${article_id}' and pid = '${article_id}'
        //         order by  create_time DESC
        //     `

        const userList = await this.app.mysql.select(this.app.config.databaseName.User)
        const userMap = new Map() // 用户名称map
        const userAvatarMap = new Map() // 用户头像map
        userList.forEach(v => {
            userMap.set(v.id, v.name)
            userAvatarMap.set(v.id, v.avatar)
        })
        const commentList = await this.app.mysql.select(this.app.config.databaseName.Article_Comment, {
            where: {
                article_id: article_id
            },
            orders: [['create_time', 'DESC']]
        })
        console.log(commentList.length);
        const OuterLayer = []
        // 内层评论
        const InnerLayer = []


        commentList.forEach(item => {
            item['operator_name'] = userMap.get(item['operator'])
            item['operator_avatar'] = userAvatarMap.get(item['operator'])
            item['comment_name'] = userMap.get(item['tid'])
            item['comment_avatar'] = userAvatarMap.get(item['tid'])
            if (item['article_id'] === article_id && item['pid'] === article_id) {
                item['children'] = []
                OuterLayer.push(item)
            } else {
                InnerLayer.push(item)
            }
        })
        OuterLayer.forEach(outer => {
            const inner_list = InnerLayer.filter(item => item.pid === outer.id)
            if (inner_list.length) outer['children'].push(...inner_list)
        })
        return OuterLayer
    }

    async add() {
        const timer = Date.parse(new Date())
        const id = UUID.v4()
        const { article_id, pid, content, tid, decode } = this.ctx.params
        const articleInfo = await this.app.mysql.get(this.app.config.databaseName.Article, { id: article_id })
        if (!articleInfo) {
            return Promise.reject({
                status: 422,
                message: 'Article does not exist'
            })
        }
        console.log({
            article_id,
            pid,
            content,
            tid,
            id,
            operator: decode.id,
            create_time: timer
        });
        await this.app.mysql.insert(this.app.config.databaseName.Article_Comment, {
            article_id,
            pid,
            content,
            tid,
            id,
            operator: decode.id,
            create_time: timer
        })
        return {
            code: 200,
            message: '新增成功'
        }

    }

    async delete() {
        const { id, decode } = this.ctx.params
        const commenInfo = await this.app.mysql.get(this.app.config.databaseName.Article_Comment, { id })
        if (!commenInfo) {
            return {
                code: 403,
                message: '评论不存在'
            }
        }

        if (commenInfo.operator !== decode.id) {
            return {
                code: 403,
                message: '权限不足'
            }
        }

        // 全部通过，可以删除
        await this.app.mysql.delete(this.app.config.databaseName.Article_Comment, { id })
        return {
            code: 200,
            message: '删除评论成功'
        }
    }

    // 通过文章id删除评论
    async deleteCommenByArticleID(article_id) {
        await this.app.mysql.delete(this.app.config.databaseName.Article_Comment, { article_id })
    }

    // 通过用户id删除评论
    async deleteCommenByUserID(operator) {
        await this.app.mysql.delete(this.app.config.databaseName.Article_Comment, { operator })
    }
}
module.exports = CommentService;