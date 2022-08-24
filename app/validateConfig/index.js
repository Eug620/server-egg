/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:34:57
 * @LastEditTime : 2022-03-08 15:43:02
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/validateConfig/index.js
 */
'use strict';
const userValidate = require('./user')
const articleValidate = require('./article')
const routeValidate = require('./route')
//参数校验数据
module.exports = {
    // 对应路由的/User/userList的（User）
    user: {
        ...userValidate
    },
    article: {
        ...articleValidate
    },
    route:{
        ...routeValidate
    }
}