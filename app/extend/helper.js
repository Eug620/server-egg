'use strict';

var Minio = require('minio')
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
    }
};