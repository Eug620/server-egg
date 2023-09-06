'use strict';

const I18n = require('i18n');
var jwt = require('jsonwebtoken');
const UUID = require('uuid')

I18n.configure({
  locales: ['zh-CN'],
  defaultLocale: 'zh-CN',
  directory: __dirname + '/locale',
});

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1644561770400_9089';

  // add your user config here
  const userConfig = {
    // 数据库表名
    databaseName: {
      Routes: 'routes', // 路由表
      User: 'user', // 用户表
      Image: 'image', // 图片表
      Article: 'article', // 文章表
      Article_Comment: 'Article_Comment', // 文章评论表
      Rooms: 'Rooms', // 房间表
      Rooms_Staff: 'Rooms_Staff',// 房间成员表
      Rooms_Record: 'Rooms_Record',
      User_Friend: 'User_Friend',// 用户好友表
      Visitor_Info: 'Visitor_Info',// 登陆相关信息
      Word_Cloud: 'Word_Cloud',// 热词相关信息
      Backlog: 'Backlog',// 待办相关信息
    },
    // 状态码
    statusType: {
      204: '登录失败',
      400: '请求错误',
      401: 'Token错误',
      403: '拒绝访问',
      404: '请求地址出错',
      408: '请求超时',
      422: '参数错误',
      413: 'Nginx等其他配置文件错误',
      500: '服务器内部错误',
      501: '服务未实现',
      502: '网关错误',
      503: '服务不可用',
      504: '网关超时',
      505: 'HTTP版本不受支持'
    },
    // token 过期时间 / 3 Day
    expiresIn: (60 * 60 * 24 * 3) + 's'
  };

  // TODO
  // egg 的默认安全系统，前后端不分离的情况下需要注意，
  // 每次在前端发送 post 请求的时候必须读取一个 cookie 字段 : csrfToken 放在 header 请求头里面，
  // 每次请求的时候 egg 会帮我们验证一次，所以我们需要重新配置一下：
  config.security = {
    csrf: {
      headerName: 'x-csrf-token',
      // post请求必须携带这个请求头
      // 值是服务端写入的kookie --> csrfToken
      // 取出来直接填入就好了
      // 不然post请求调不通
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'], // 配置白名单
  }
  config.cors = {
    origin: '*',//允许所有跨域访问，注释掉则允许上面 白名单 访问
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '47.93.229.170',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'ye13837885797',
      // 数据库名
      database: 'database_egg',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };


  // TODO
  // add your middleware config here
  // 注入中间件
  config.middleware = [
    'init',
    'errorHanlder',
    'requier',
    'params',
    'authorization'
  ];


  // TODO
  // 启动配置项
  config.cluster = {
    listen: {
      port: 5000,
      hostname: process.env.NODE_ENV === 'development' ? '127.0.0.1' : '0.0.0.0',
      // path: '/var/run/egg.sock',
    }
  }


  config.validate = {
    // convert: false,
    // validateRoot: false,
    translate() {
      const args = Array.prototype.slice.call(arguments);
      return I18n.__.apply(I18n, args);
    },
  }

  // 模版引擎
  config.view = {
    // 定义映射的文件后缀名
    // 此处我们定义为.njk，那么我们的模板都需要以.njk结束，
    // 这样该类型的文件才会被我们的模板插件进行处理
    mapping: {
      '.njk': 'nunjucks',
    }
  }

  // 开启中间件，登录页不需要权限认证
  config.authorization = {
    // 设置为true, 走以下判断是否鉴权
    enable: false,
    match(ctx) { // 只匹配指定路由，反之如果只忽略指定路由，可以用ignore
      //匹配不需要验证token的路由
      const url = ctx.request.url;
      const ignore_url = ['/', '/user/login']
      if (ignore_url.includes(url.split('?')[0])) {
        return false;
      } else {
        return true; // 开启中间件，开启token验证
      }
    }
  };

  // egg-jwt
  config.jwt = {
    secret: "88888888"//自定义 token 的加密条件字符串
  };


  // formdata 配置
  config.multipart = {
    // mode: 'file',
    // allowArrayField: true,
    fileExtensions: [
      '.pdf',
      '.xlsx',
      '.xls',
      '.png',
      '.jpg',
      '.jpeg',
      '.mp3',
      '.mp4',
      '.wav',
      '.js',
      '.css',
      '.html',
      '.vue',
      '.jsx',
      '.tsx',
      '.json',
      '.md',
      '.text'
    ]
  }

  // websocket
  config.io = {
    init: {
      wsEngine: 'ws',
    },
    namespace: {
      '/': {
        // connectionMiddleware是在client保持连接的时候调用的中间件
        connectionMiddleware: ['auth'],
        // packetMiddleware是在server发送包给client之后调用的中间件 加密处理
        packetMiddleware: [],
      },
    },
    generateId: req => { //自定义 socket.id 生成函数
      try {
        // 解码token中的用户ID
        const { id } = jwt.verify(req._query.token, config.jwt.secret)
        console.log('generateId:', id);
        return id
      } catch (error) {
        // 解析失败 暂时用随机ID -> auth 会再次验证ID可靠性
        return UUID.v4()
      }
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
