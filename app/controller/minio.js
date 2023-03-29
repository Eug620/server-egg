/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-03-29 15:44:32
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-03-29 17:06:35
 * @FilePath     : /server-egg/app/controller/minio.js
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 桶名 all
    async bucketAll() {
        const minio = this.ctx.helper.getMinioInstance()
        const result = await minio.listBuckets();
        console.log(result);
        this.ctx.returnBody(200, '查询成功', result)
    }
    // 桶内 详情
    async bucketDetail() {
        const { bucketName } = this.ctx.params
        const minio = this.ctx.helper.getMinioInstance()
        const stream = await minio.listObjectsV2(bucketName, '', true);
        return new Promise((resolve, reject) => {
            let fileList = []
            stream.on('data', (file) => {
                fileList.push(file)
            })
            stream.on('end', () => {
                this.ctx.returnBody(200, '查询成功', fileList)
                resolve()
            })
            stream.on('error', (err) => {
                reject({
                    status: 422,
                    message: '读取失败'
                })
            })
        })

    }
}

module.exports = UserController;
