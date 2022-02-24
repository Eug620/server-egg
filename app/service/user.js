/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 14:55:30
 * @LastEditTime : 2022-02-11 15:19:28
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /egg-example/app/service/user.js
 */
const Service = require('egg').Service;
const UUID = require('uuid')

class UserService extends Service {
  async all() {
    const result = await this.app.mysql.select('user',{
      columns: ['id', 'email', 'create_time', 'update_time', 'name'], //查询字段，全部查询则不写，相当于查询*
    })
    return result;
  }
  async add() {
    const { name, password, email } = this.ctx.params
    const create_time = Date.parse(new Date()) 
    const update_time = Date.parse(new Date()) 
    const id = UUID.v4()
    await this.app.mysql.insert('user',{ id, name, password, email, create_time, update_time })
  }
}

module.exports = UserService;