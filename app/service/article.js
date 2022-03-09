/* 
 * @Author       : Eug
 * @Date         : 2022-03-08 15:34:38
 * @LastEditTime : 2022-03-09 17:11:06
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/service/article.js
 */
const Service = require('egg').Service;
// const UUID = require('uuid')

class ArticleService extends Service {
  /**
   * @returns user list all
   */
  async all() {
    const SQL_STRING =
      `
      select 
        article_id, 
        user.name as user_name, 
        article_title, 
        article_describe, 
        author, 
        page_views, 
        article.create_time as create_time, 
        (SELECT COUNT(*) FROM comment WHERE article_id = article.article_id and pid = article.article_id ) as article_count
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
    const { size, page } = this.ctx.params
    const current_size = size || 10
    const current_page = ((isNaN(page) || page < 1) ? 0 : page - 1) * current_size
    const SQL_STRING =
      `
      select 
        article_id, 
        article_title, 
        article_describe, 
        author, 
        page_views, 
        article.create_time as create_time, 
        user.name as user_name, 
        (SELECT COUNT(*) FROM comment WHERE article_id = article.article_id and pid = article.article_id ) as article_count
      from article LEFT JOIN user ON user.id = article.author
      order by create_time DESC
      LIMIT ${ current_page }, ${ current_size }
    `
    const result = await this.app.mysql.query(SQL_STRING)
    return result;
  }

  /**
   * @returns user detail 
   */
  async detail () {
    const { article_id } = this.ctx.params
    const SQL_STRING =
    `
      select 
        article_id, 
        article_title, 
        article_describe, 
        article_content, 
        author, 
        page_views, 
        article.create_time as create_time, 
        user.name as user_name, 
        (SELECT COUNT(*) FROM comment WHERE article_id = article.article_id and pid = article.article_id ) as article_count
      from article LEFT JOIN user ON user.id = article.author
      where article_id = '${article_id}'
    `
    const result = await this.app.mysql.query(SQL_STRING)
    return result[0] || {};
  }
}
module.exports = ArticleService;
