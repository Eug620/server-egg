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
const chunkMap = new Map();
class FileService extends Service {
  async upload() {
    const { ctx } = this;
    const { req } = ctx;
    const { idx } = this.ctx.params
    const stream = await this.ctx.getFileStream();//单个文件使用
    const filename = stream.filename
    // let dir = stream.filename.split('-')
    // let writedir = dir.slice(2).join('-').split('.').slice(0, -1).join('.')


    if (chunkMap.has(filename)) {
      const chunkID = chunkMap.get(filename)

      await pipeline(stream,
        fse.createWriteStream(
          path.resolve(
            this.app.baseDir,
            'chunk',
            `${idx}&${chunkID}`
          )
        )
      ); // use `pipeline` not `pipe`

    } else {
      const chunkID = UUID.v4()
      chunkMap.set(filename, chunkID)
      await pipeline(stream,
        fse.createWriteStream(
          path.resolve(
            this.app.baseDir,
            'chunk',
            `${idx}&${chunkID}`
          )
        )
      ); // use `pipeline` not `pipe`
    }


    // if (!fse.existsSync(path.resolve(this.app.baseDir, 'upload', writedir))) {
    //   fse.mkdir(path.resolve(this.app.baseDir, 'upload', writedir))
    // }
    // await pipeline(stream,
    //   fse.createWriteStream(
    //     path.resolve(
    //       this.app.baseDir,
    //       'upload',
    //       writedir,
    //       stream.filename
    //     )
    //   )
    // ); // use `pipeline` not `pipe`
  }

  async finish() {
    try {
      const { size, name, total } = this.ctx.params

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


      if (chunkMap.has(name)) {
        const chunkID = chunkMap.get(name)
        const chunks = await fse.readdir(path.resolve(this.app.baseDir, 'chunk'))
        const NameList = chunks.filter(v => v.includes(chunkID))

        if (total != NameList.length) {
          chunkMap.delete(name)
          NameList.forEach(async file => {
            await fse.rmSync(path.resolve(this.app.baseDir, 'chunk', file))
          })

          await Promise.reject({
            status: 422,
            message: `上传失败[${NameList.length}/${total}]`
          })
          return
        }

        NameList.sort((a, b) => a.split("&")[0] - b.split("&")[0]);
        await Promise.all(NameList.map((chunkPath, idx) =>
          pipeStream(
            path.resolve(this.app.baseDir,
              'chunk', chunkPath),
            // 根据 size 在指定位置创建可写流
            fse.createWriteStream(path.resolve(this.app.baseDir,
              'upload', name), {
              start: idx * size,
            })
          )
        ))
        chunkMap.delete(name)
        return {
          code: 200,
          message: `文件合并完毕[${name}]`,
        }
      } else {
        await Promise.reject({
          status: 422,
          message: `文件不存在[${name}]`
        })
      }
    } catch ({ message }) {
      return {
        code: 422,
        message
      }
    }
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
    const { dir } = this.ctx.params
    if (dir) {
      await this.ctx.helper.removeDir(path.resolve(this.app.baseDir, 'upload', dir))
    } else {
      const chunkPaths = await fse.readdir(path.resolve(this.app.baseDir, 'upload'))
      await Promise.all(chunkPaths.map(item => fse.rmSync(path.resolve(this.app.baseDir, 'upload', item))))
    }
  }

  async delete() {
    const { name } = this.ctx.params
    await fse.rmSync(path.resolve(this.app.baseDir, 'upload', name))
  }
}

module.exports = FileService;