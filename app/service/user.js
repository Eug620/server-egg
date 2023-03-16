/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 14:55:30
 * @LastEditTime: 2022-08-27 18:47:50
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/service/user.js
 */
const Service = require('egg').Service;
const UUID = require('uuid')

class UserService extends Service {
  /**
   * @returns user list all
   */
  async all() {
    const result = await this.app.mysql.select(this.app.config.databaseName.User, {
      columns: ['id', 'email', 'create_time', 'update_time', 'name', 'avatar'], //查询字段，全部查询则不写，相当于查询*
    })
    return result;
  }

  /**
   * name require
   * password require
   * email require
   */
  async add() {
    const { name, password, email, avatar } = this.ctx.params
    const create_time = Date.parse(new Date())
    const update_time = Date.parse(new Date())
    const id = UUID.v4()
    let result = await this.app.mysql.get(this.app.config.databaseName.User, {
      name
    })
    console.log(result);
    if (result) {
      return Promise.reject({
        status: 204,
        message: 'The username already exists'
      })
    } else {
      await this.app.mysql.insert(this.app.config.databaseName.User, { id, name, password, email, create_time, update_time, avatar })
    }
  }

  /**
   * id require
   * name
   * password
   * email
   */
  async update() {
    const { name, password, email, decode, avatar } = this.ctx.params
    const update_time = Date.parse(new Date())
    const options = {
      where: {
        id: decode.id
      }
    }

    const userInfo = { update_time }
    // if (name !== void 0) userInfo['name'] = name
    if (password !== void 0) userInfo['password'] = password
    if (email !== void 0) userInfo['email'] = email
    if (avatar !== void 0) userInfo['avatar'] = avatar
    await this.app.mysql.update(this.app.config.databaseName.User, userInfo, options)
  }

  /**
   * id require
   */
  async delete() {
    const { id } = this.ctx.params
    await this.app.mysql.delete(this.app.config.databaseName.User, { id })
  }

  /**
   * 默认 第一页 10 条
   */
  async index() {
    const { size, page } = this.ctx.params
    const current_size = size || 10
    const current_page = ((isNaN(page) || page < 1) ? 0 : page - 1) * current_size
    const SQL_STRING = `
      SELECT 
      id, email, create_time, update_time, name, avatar
      FROM user 
      ORDER BY update_time DESC  
      LIMIT ${current_page}, ${current_size}
    `
    const result = await this.app.mysql.query(SQL_STRING)
    return result;
  }

  async login() {
    const { app } = this;
    const { name, password } = this.ctx.params
    let result = await this.app.mysql.get(this.app.config.databaseName.User, {
      name,
      password
    })
    if (result) {
      delete result['password']
      //生成 token 的方式
      const token = app.jwt.sign({
        name, //需要存储的 token 数据
        password,
        id: result.id
        //......
      }, app.config.jwt.secret, { expiresIn: app.config.expiresIn });
      // 返回 token 到前端
      return {
        msg: '登录成功',
        result,
        token
      };
    } else {
      let hasUser = await this.app.mysql.get(this.app.config.databaseName.User, { name })
      if (hasUser) {
        return Promise.reject({
          status: 204,
          message: 'Wrong account or password'
        })
      } else {
        return Promise.reject({
          status: 204,
          message: 'User has expired'
        })
      }
    }
  }
}

module.exports = UserService;