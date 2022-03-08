/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 14:55:30
 * @LastEditTime : 2022-03-08 15:29:14
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/service/user.js
 */
const Service = require('egg').Service;
const UUID = require('uuid')

class UserService extends Service {
  /**
   * @returns user list all
   */
  async all () {
    const result = await this.app.mysql.select('user', {
      columns: ['id', 'email', 'create_time', 'update_time', 'name'], //查询字段，全部查询则不写，相当于查询*
    })
    return result;
  }

  /**
   * name require
   * password require
   * email require
   */
  async add () {
    const { name, password, email } = this.ctx.params
    const create_time = Date.parse(new Date())
    const update_time = Date.parse(new Date())
    const id = UUID.v4()
    await this.app.mysql.insert('user', { id, name, password, email, create_time, update_time })
  }

  /**
   * id require
   * name
   * password
   * email
   */
  async update () {
    const { id, name, password, email } = this.ctx.params
    const update_time = Date.parse(new Date())
    const options = {
      where: {
        id
      }
    }

    const userInfo = { update_time }
    if (name) userInfo['name'] = name
    if (password) userInfo['password'] = password
    if (email) userInfo['email'] = email
    await this.app.mysql.update('user', userInfo, options)
  }

  /**
   * id require
   */
  async delete () {
    const { id } = this.ctx.params
    await this.app.mysql.delete('user', { id })
  }

  /**
   * 默认 第一页 10 条
   */
  async index () {
    const { size, page } = this.ctx.params
    const SQL_STRING = `
      SELECT 
      id, email, create_time, update_time, name
      FROM user 
      ORDER BY update_time DESC  
      LIMIT ${(isNaN(page) || page < 1) ? 0 : page - 1}, ${size || 10}
    `
    const result = await this.app.mysql.query(SQL_STRING)
    return result;
  }
}

module.exports = UserService;