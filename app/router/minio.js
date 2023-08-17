/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-03-29 15:41:00
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-08-17 16:56:29
 * @FilePath     : /server-egg/app/router/minio.js
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app;
    router.get('/minio/bucket/all', controller.minio.bucketAll)
    router.get('/minio/bucket/:bucketName', controller.minio.bucketDetail)
    router.post('/minio/bucket/upload', controller.minio.upload)
};