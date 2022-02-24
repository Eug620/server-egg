/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:34:57
 * @LastEditTime : 2022-02-11 17:46:36
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /egg-example/app/validateConfig/index.js
 */
'use strict';
const userValidate = require('./user')
//参数校验数据
module.exports = {
    // 对应路由的/User/userList的（User）
    user: {
        ...userValidate
    }
}