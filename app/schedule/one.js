/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 16:41:30
 * @LastEditTime : 2022-02-11 16:48:01
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /egg-example/app/schedule/one.js
 */
// var i = 9999
// 设置immediate参数为true时，该定时任务会在项目启动时，立即执行一次定时任务
module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
    immediate: true, //项目启动就执行一次定时任务
  },
  async task(ctx) {
  //   i++
  //   console.log('1分钟间隔执行一次所有任务', i)
  },
};