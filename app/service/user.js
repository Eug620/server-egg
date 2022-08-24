/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 14:55:30
 * @LastEditTime : 2022-03-11 18:28:42
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
    const { name, password, email, decode } = this.ctx.params
    const update_time = Date.parse(new Date())
    const options = {
      where: {
        id: decode.id
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
    const current_size = size || 10
    const current_page = ((isNaN(page) || page < 1) ? 0 : page - 1) * current_size
    const SQL_STRING = `
      SELECT 
      id, email, create_time, update_time, name
      FROM user 
      ORDER BY update_time DESC  
      LIMIT ${ current_page }, ${ current_size }
    `
    const result = await this.app.mysql.query(SQL_STRING)
    return result;
  }

  async login () {
    const { app } = this;
    const { name, password } = this.ctx.params
    const [ result ] = await this.app.mysql.select('user', {
      columns: ['id', 'email', 'create_time', 'update_time', 'name'], //查询字段，全部查询则不写，相当于查询*
      where: {
        name,
        password
      }
    })
    
    if (result) {
      // 过期时间
      let term = (60 * 60 * 24) + 's'
      //生成 token 的方式
      const token = app.jwt.sign({
        name, //需要存储的 token 数据
        password,
        id: result.id
        //......
      }, app.config.jwt.secret, { expiresIn: term });
      // 返回 token 到前端
      return {
        msg: '登录成功',
        result,
        token
      };
    } else {
      return {
        msg: '用户不存在',
        result: null
      };
    }
  }
}

module.exports = UserService;