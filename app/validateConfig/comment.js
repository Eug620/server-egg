/*
 * @Author: eug yyh3531@163.com
 * @Date: 2022-08-28 12:55:22
 * @LastEditors: eug yyh3531@163.com
 * @LastEditTime: 2022-08-28 13:50:04
 * @FilePath: /server-egg/app/validateConfig/comment.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
    all: {
        article_id: { type: 'string', required: true }
    },
    add: {
        article_id: { type: 'string', required: true },
        pid: { type: 'string', required: true },
        content: { type: 'string', required: true },
        tid: { type: 'string', required: true },
        // operator: { type: 'string', required: true },
    }
}