/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-09-18 02:59:17
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-09-18 03:33:42
 * @FilePath: /server-egg/app/validateConfig/rooms.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
    create: {
        name: { type: 'string', required: true },
        describe: { type: 'string', required: true },
    },
    update: {
        id: { type: 'string', required: true },
        name: { type: 'string', required: true },
        describe: { type: 'string', required: true },
    },
    delete: {
        id: { type: 'string', required: true },
    },
    join: {
        room_id: { type: 'string', required: true },
    },
    deleteUser: {
        room_id: { type: 'string', required: true },
        user_id: { type: 'string', required: true },
    },
    search:{

    }
}