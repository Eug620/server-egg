/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:35:19
 * @LastEditTime : 2022-02-11 17:50:10
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /egg-example/app/validateConfig/user.js
 */
module.exports = {
  add: {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true },
    email: { type: 'string', required: true },
  },
  update: { 
    id: { type: 'string', required: true }
  },
  delete: { 
    id: { type: 'string', required: true }
  }
}