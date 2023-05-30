const Service = require('egg').Service;
const UUID = require('uuid')

class ArticleService extends Service {
  /**
   * @returns user list all
   */
  async all() {
    const SQL_STRING =
      `
      select 
        author,
        page_views,
        article.id,
        article.title,
        article.describe,
        article.create_time,
        user.name as user_name,
        (SELECT COUNT(*) FROM ${this.app.config.databaseName.Article_Comment} WHERE article_id = article.id) as count
      from article LEFT JOIN user ON user.id = article.author
      order by create_time DESC
    `
    const result = await this.app.mysql.query(SQL_STRING)
    return result;
  }
  /**
   * @returns user list 
   */
  async index() {
    const { size, page, keyword } = this.ctx.params
    const current_size = size || 10
    const current_page = ((isNaN(page) || page < 1) ? 0 : page - 1) * current_size
    const SQL_STRING =
      `
      select 
        author, 
        page_views, 
        article.id, 
        article.title, 
        article.describe, 
        article.create_time, 
        user.name as user_name, 
        (SELECT COUNT(*) FROM ${this.app.config.databaseName.Article_Comment} WHERE article_id = article.id ) as count
      from ${this.app.config.databaseName.Article}
      LEFT JOIN ${this.app.config.databaseName.User} ON user.id = article.author
      ${keyword ? `where article.title like '%${keyword}%'` : ''}
      order by create_time DESC
      LIMIT ${current_page}, ${current_size}
    `
    const result = await this.app.mysql.query(SQL_STRING)
    return result;
  }

  /**
   * @returns user detail 
   */
  async detail() {
    const { id } = this.ctx.params
    const SQL_STRING =
      `
      select 
        author, 
        page_views, 
        article.id, 
        article.title, 
        article.content, 
        article.describe, 
        article.create_time, 
        user.name as user_name, 
        (SELECT COUNT(*) FROM ${this.app.config.databaseName.Article_Comment} WHERE article_id = article.id) as count
      from article LEFT JOIN user ON user.id = article.author
      where article.id = '${id}'
    `
    const [result] = await this.app.mysql.query(SQL_STRING)
    const options = {
      where: {
        id: id
      }
    }
    await this.app.mysql.update(this.app.config.databaseName.Article, {
      page_views: result.page_views + 1
    }, options)
    return result || {};
  }

  async add() {
    const { title, describe, content, decode } = this.ctx.params
    const user_list = await this.app.mysql.select(this.app.config.databaseName.User, {
      where: {
        id: decode.id
      }
    })
    if (user_list.length) {
      const id = UUID.v4()
      const SQL_STRING =
        `
        INSERT INTO article
        (
          id,
          title,
          author,
          content,
          article.describe,
          page_views,
          create_time
        )
        VALUES
        (
          '${id}',
          '',
          '${decode.id}',
          '',
          '',
          ${0},
          ${Date.parse(new Date())}
        )
      `
      await this.app.mysql.query(SQL_STRING)
      const options = {
        where: {
          id
        }
      }
      await this.app.mysql.update(this.app.config.databaseName.Article, { title, content, describe }, options)
      return {
        code: 200,
        message: '新增成功'
      }
    } else {
      return {
        code: 200,
        message: '用户不存在'
      }
    }
  }
  async update() {
    const { title, describe, content, id, decode } = this.ctx.params
    // 判断是否为当前所属用户的文章
    const article_detail = await this.app.mysql.select(this.app.config.databaseName.Article, {
      where: {
        id: id
      }
    })
    // 错误的文章id
    if (!article_detail.length) {
      return {
        code: 200,
        message: '不存在此文章'
      }
    }
    // 无修改权限
    if (article_detail[0].author !== decode.id) {
      return {
        code: 200,
        message: '此文章不是你的文章，你没有修改权限'
      }
    }

    // 全部通过，可以修改
    const options = {
      where: {
        id
      }
    }
    await this.app.mysql.update(this.app.config.databaseName.Article, { title, content, describe }, options)
    return {
      code: 200,
      message: '更新文章成功'
    }
  }

  async delete() {
    const { id, decode } = this.ctx.params
    // 判断是否为当前所属用户的文章
    const article_detail = await this.app.mysql.select(this.app.config.databaseName.Article, {
      where: {
        id: id
      }
    })
    // 错误的文章id
    if (!article_detail.length) {
      return {
        code: 200,
        message: '不存在此文章'
      }
    }
    // 无删除权限
    if (article_detail[0].author !== decode.id) {
      return {
        code: 200,
        message: '此文章不是你的文章，你没有删除权限'
      }
    }

    // 全部通过，可以删除
    await this.app.mysql.delete(this.app.config.databaseName.Article, { id })
    // 删除对应的评论
    await this.ctx.service.comment.deleteCommenByArticleID(id)
    return {
      code: 200,
      message: '删除文章成功'
    }
  }
}
module.exports = ArticleService;
