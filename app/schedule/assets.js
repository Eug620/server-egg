module.exports = {
    schedule: {
        interval: '1s', // 1 分钟间隔
        // type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
        console.log('schedule: hhhhh 1s');
    //   i++
    //   console.log('只执行一次的任务', i)
    },
  };