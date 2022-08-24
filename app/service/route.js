const Service = require('egg').Service;
const UUID = require('uuid')

class RouteService extends Service {
  /**
   * @returns user list all
   */
  async all () {
    const SQL_STRING =
    `
      select 
        *
      from routes
    `
    const result = await this.app.mysql.query(SQL_STRING)
    return result;
  }

  async add () {
    const { 
        affix, 
        isEle, 
        type, 
        api, 
        parent_id, 
        name, 
        path, 
        cache, 
        component_path, 
        description, 
        sort_id, 
        enable, 
        icon, 
        isChecked, 
        redirect,
        service,
        decode 
    } = this.ctx.params
    const ct = Date.now()
    const user_list = await this.app.mysql.select('user', {
      where: {
        id: decode.id
      }
    })
    if (user_list.length) {
      const id = UUID.v4()
      const SQL_STRING =
        `
        INSERT INTO routes
        (
            id,
            affix, 
            isEle, 
            type, 
            api, 
            parent_id, 
            name, 
            path, 
            cache, 
            component_path, 
            description, 
            sort_id, 
            enable, 
            icon, 
            isChecked,
            redirect,
            service,
            ct
        )
        VALUES
        (
          '${id}',
          ${affix},
          ${isEle},
          ${type},
          '${api}',
          '${parent_id}',
          '${name}',
          '${path}',
          ${cache},
          '${component_path}',
          '${description}',
          ${sort_id},
          ${enable},
          '${icon}',
          ${isChecked},
          '${redirect}',
          '${service}',
          ${ct}
        )
      `
      await this.app.mysql.query(SQL_STRING)
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
}

module.exports = RouteService