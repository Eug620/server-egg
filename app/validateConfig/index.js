/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:34:57
 * @LastEditTime: 2022-09-18 02:59:57
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/validateConfig/index.js
 */
'use strict';
const userValidate = require('./user')
const articleValidate = require('./article')
const routeValidate = require('./route')
const commentValidate = require('./comment')
const rooms = require('./rooms')
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
    },
    comment:{
        ...commentValidate
    },
    rooms: {
        ...rooms
    }
}