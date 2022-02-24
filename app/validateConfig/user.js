/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:35:19
 * @LastEditTime : 2022-02-11 17:50:10
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /egg-example/app/validateConfig/user.js
 */
module.exports = {
  // 对应路由的/User/userList的（userList）
  // userList: {
  //   username: { type: 'string', required: false },
  //   packageName: { type: 'string', required: true },
  //   // sort: { type: 'number',required: true },
  // },
  add: {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true },
    email: { type: 'string', required: true },
  }
}