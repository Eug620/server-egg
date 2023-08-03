/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:35:19
 * @LastEditTime: 2022-08-27 18:52:35
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/validateConfig/user.js
 */
module.exports = {
  add: {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true },
    email: { type: 'string', required: true },
  },
  update: { 
    name: { type: 'string', required: true },
    password: { type: 'string', required: true },
    email: { type: 'string', required: true },
  },
  delete: { 
    id: { type: 'string', required: true }
  },
  login: {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true },
  },
}