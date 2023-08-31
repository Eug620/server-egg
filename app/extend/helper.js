'use strict';
var Minio = require('minio')
let fs = require('fs');
const path = require('path');

var minioClient = new Minio.Client({
    endPoint: 'eug.asia',
    port: 9000,
    useSSL: false,
    accessKey: 'yeyuhang',
    secretKey: 'ye13837885797'
});
module.exports = {
    parseMsg(action, payload = {}, metadata = {}) {
        const meta = Object.assign({}, {
            timestamp: Date.now(),
        }, metadata);

        return {
            meta,
            data: {
                action,
                payload,
            },
        };
    },
    getMinioInstance() {
        return minioClient
    },
    /**
     * 递归删除文件夹
     * @param {*} dir 
     */
    removeDir(dir) {
        return new Promise(async (resolve, reject) =>{
            let files = fs.readdirSync(dir)
            for (var i = 0; i < files.length; i++) {
                let newPath = path.join(dir, files[i]);
                let stat = fs.statSync(newPath)
                if (stat.isDirectory()) {
                    //如果是文件夹就递归下去
                    await this.ctx.helper.removeDir(newPath);
                } else {
                    //删除文件
                    fs.unlinkSync(newPath);
                }
            }
            fs.rmdirSync(dir)//如果文件夹是空的，就将自己删除掉
            resolve()
        })

    }
};