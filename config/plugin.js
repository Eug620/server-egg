/* 
 * @Author       : Eug
 * @Date         : 2022-03-08 14:50:53
 * @LastEditTime : 2022-03-10 14:48:10
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/config/plugin.js
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',  
  },
  validate: {
    enable: true,
    package: 'egg-validate', 
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  }
};

