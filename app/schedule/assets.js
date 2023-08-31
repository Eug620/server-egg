const fse = require("fs-extra");
const path = require('path');

/**
 * 定时清理upload
 */
module.exports = {
    schedule: {
        cron: '59 59 23 * * 7', // 1 分钟间隔
        type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
        console.log('schedule: day 7, date 23:59:59');
        await ctx.helper.removeDir(path.resolve(ctx.app.baseDir, 'upload'))
        fse.mkdir(path.resolve(ctx.app.baseDir, 'upload'))
    },
  };