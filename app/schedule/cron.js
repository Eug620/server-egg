/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 16:37:45
 * @LastEditTime : 2023-08-30 12:36:32
 * @LastEditors  : eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/schedule/cron.js
 */
// 定点任务
// 定点任务（以每周一的5点30分0秒更新排行榜为例）
// 使用cron参数设定时间，cron参数分为6个部分，*表示所有都满足

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ 星期 (0 - 7) (0或7都是星期日)
// │    │    │    │    └───── 月份 (1 - 12)
// │    │    │    └────────── 日期 (1 - 31)
// │    │    └─────────────── 小时 (0 - 23)
// │    └──────────────────── 分钟 (0 - 59)
// └───────────────────────── 秒 (0 - 59, optional)
// var i = 0
module.exports = {
  schedule: {
    cron: '0 50 16 * * 5', //每周一的5点30分0秒更新
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    console.log('schedule: cron');
  //   i++
  //   console.log('只执行一次的任务', i)
  },
};
