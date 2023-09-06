/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 17:34:57
 * @LastEditTime: 2022-09-18 02:59:57
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/validateConfig/index.js
 */
'use strict';
//参数校验数据
module.exports = {
    // 对应路由的/User/userList的（User）
    user: require('./user'),
    article: require('./article'),
    route: require('./route'),
    comment: require('./comment'),
    rooms: require('./rooms'),
    image: require('./image'),
    minio: require('./minio'),
    assets: require('./assets'),
    backlog: require('./backlog'),
    ['visitor-info']: require('./visitor-info'),
    ['word-cloud']: require('./word-cloud'),
}