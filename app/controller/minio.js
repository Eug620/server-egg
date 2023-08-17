/*
 * @Author       : eug yyh3531@163.com
 * @Date         : 2023-03-29 15:44:32
 * @LastEditors  : eug yyh3531@163.com
 * @LastEditTime : 2023-08-17 17:47:08
 * @FilePath     : /server-egg/app/controller/minio.js
 * @Description  : filename
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use strict';

const Controller = require('egg').Controller;
const UUID = require('uuid')

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

    // 上传
    async upload() {
        const minio = this.ctx.helper.getMinioInstance()
        const { ctx } = this;
        const { req } = ctx;
        // const stream = await this.ctx.getFileStream();单个文件使用
        const parts = ctx.multipart();
        let part;
        let result = []
        while ((part = await parts()) != null) {
            if (part.length) {
                console.log("field: " + part[0]);
                console.log("value: " + part[1]);
            } else {
                if (!part.filename) {
                    continue;
                }
                const filename = `${UUID.v4()}_${part.filename}`
                // console.log("field: " + part.fieldname);
                // console.log("filename: " + filename);
                // console.log("encoding: " + part.encoding);
                // console.log("mime: " + part.mime);
                result.push(`https://eug.asia/minio/${this.ctx.params.path}/${filename}`)
                minio.putObject(this.ctx.params.path, filename, part, (err, etag) => {
                    if (!err) {
                        this.ctx.returnBody(204, '上传失败', [])
                        return
                    }
                })
            }
        }
        this.ctx.returnBody(200, '上传成功', result)
    }
}

module.exports = UserController;
