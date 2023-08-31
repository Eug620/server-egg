/* 
 * @Author       : Eug
 * @Date         : 2022-02-11 14:55:30
 * @LastEditTime: 2022-08-27 18:47:50
 * @LastEditors: eug yyh3531@163.com
 * @Descripttion : Descripttion
 * @FilePath     : /server-egg/app/service/assets.js
 */
const Service = require('egg').Service;
const UUID = require('uuid')
const fse = require("fs-extra");
const stream = require('stream');
const util = require('util');
const path = require('path');
const pipeline = util.promisify(stream.pipeline);

class FileService extends Service {

  async upload() {
    const { ctx } = this;
    const { req } = ctx;
    const stream = await this.ctx.getFileStream();//单个文件使用
    console.log(stream.filename);
    let dir = stream.filename.split('-')
    let writedir = dir.slice(2).join('-').split('.').slice(0, -1).join('.')

    if (!fse.existsSync(path.resolve(this.app.baseDir, 'upload', writedir))) {
      fse.mkdir(path.resolve(this.app.baseDir, 'upload', writedir))
    }
    await pipeline(stream,
      fse.createWriteStream(
        path.resolve(
          this.app.baseDir,
          'upload',
          writedir,
          stream.filename
        )
      )
    ); // use `pipeline` not `pipe`
  }

  async finish() {
    const { size, name, total } = this.ctx.params
    const pathdir = name.split('.').slice(0, -1).join('.')
    const filename = name
    // 写入文件流
    const pipeStream = (path, writeStream) =>
      new Promise(resolve => {
        const readStream = fse.createReadStream(path);
        readStream.on("end", () => {
          fse.unlinkSync(path);
          resolve();
        });
        readStream.pipe(writeStream);
      });
    const chunkPaths = await fse.readdir(path.resolve(this.app.baseDir, 'upload', pathdir))
    if (total != chunkPaths.length) {
      const Paths = await fse.readdir(path.resolve(this.app.baseDir, 'upload', pathdir))
      await Promise.all(Paths.map(item => fse.rmSync(path.resolve(this.app.baseDir, 'upload', pathdir, item))))
      await this.ctx.helper.removeDir(path.resolve(this.app.baseDir, 'upload', pathdir))
      await Promise.reject({
        status: 422,
        message: '上传失败'
      })
      return
    }
    chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
    await Promise.all(chunkPaths.map((chunkPath, idx) =>
      pipeStream(
        path.resolve(this.app.baseDir,
          'upload', pathdir, chunkPath),
        // 根据 size 在指定位置创建可写流
        fse.createWriteStream(path.resolve(this.app.baseDir,
          'upload', filename), {
          start: idx * size,
        })
      )
    ))
    // 删除目录
    await this.ctx.helper.removeDir(path.resolve(this.app.baseDir, 'upload', pathdir))
  }

  async fileList() {
    var result = await fse.readdir(path.resolve(this.app.baseDir, 'upload'))
    return result
  }

  async assets() {
    const { id } = this.ctx.params
    var rs = fse.createReadStream(path.resolve(this.app.baseDir, 'upload', id), {
      start: 0
    });
    this.ctx.response.body = rs
    this.ctx.body = rs
  }

  async cleans() {
    const chunkPaths = await fse.readdir(path.resolve(this.app.baseDir, 'upload'))
    await Promise.all(chunkPaths.map(item => fse.rmSync(path.resolve(this.app.baseDir, 'upload', item))))
  }

  async delete() {
    const { name } = this.ctx.params
    console.log('name>>>>',name);
    await fse.rmSync(path.resolve(this.app.baseDir, 'upload', name))
  }
}

module.exports = FileService;