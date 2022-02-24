/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 16:30:56
 * @LastEditTime : 2022-02-11 16:51:11
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /egg-example/app/schedule/test.js
 */
// 在app/schedule目录下新建一个js文件，每一个js文件就是一个定时任务
// var i = 0
module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
  //   i++
  //   console.log('定时任务,每分钟执行一次', i)
  },
};

// TODO
// 配置disable参数为true时，该定时任务即关闭
// env: ["dev", "debug"] //该定时任务在开发环境和debug模式下才执行