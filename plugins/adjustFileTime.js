import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'


const isFileNameAvaiable = (filePath) => {
  const name = filePath.split('/').at(-1).replace('.md', '')

  if (!dayjs(name).isValid()) {
    return false
  }

  return new Date(name).getTime()
}


/**
 * 调整文件的更新时间，跟文件名上的时间保持一致
 * @param {String} filePath
 */
function adjust(filePath) {

  const __dirname = path.resolve()
  const p = path.resolve(__dirname, filePath)

  fs.stat(p, function (err, stats) {

    if (err) {
      console.log("读取文件信息失败：" + err)
      return
    }

    const d = isFileNameAvaiable(filePath)

    if (!d) {
      return
    }

    // 设置新的时间戳
    fs.utimes(filePath, d / 1000, d / 1000, function (err) {
      if (err) {
        console.log("修改创建时间戳失败：" + err)
        return
      }
      // 读取修改后的文件信息
      fs.stat(filePath, function (err, stats) {
        if (err) {
          console.log("读取修改后的文件信息失败：" + err)
          return
        }
        // 打印修改后的时间戳
        console.log("修改后的时间戳：" + dayjs(stats.ctimeMs).format('YYYY-MM-DD'), dayjs(stats.mtimeMs).format('YYYY-MM-DD'), dayjs(stats.atimeMs).format('YYYY-MM-DD'))
      })
    })
  })
}

const records = {
  "letters": [
    {
      "filePath": "src/docs/letters/凌晨4点.md",
      "modifiedTime": "2023-12-12",
      "title": "凌晨4点"
    },
    {
      "filePath": "src/docs/letters/2023-05-29.md",
      "modifiedTime": "2023-12-12",
      "title": "2023-05-29"
    },
    {
      "filePath": "src/docs/letters/2018-02-18.md",
      "modifiedTime": "2023-12-12",
      "title": "2018-02-18"
    },
    {
      "filePath": "src/docs/letters/2021-02-08.md",
      "modifiedTime": "2023-12-11",
      "title": "2021-02-08"
    },
    {
      "filePath": "src/docs/letters/2017-02-17.md",
      "modifiedTime": "2023-12-11",
      "title": "2017-02-17"
    },
    {
      "filePath": "src/docs/letters/2016-05-01.md",
      "modifiedTime": "2023-12-11",
      "title": "2016-05-01"
    },
    {
      "filePath": "src/docs/letters/2015-02-01.md",
      "modifiedTime": "2015-02-01",
      "title": "2015-02-01"
    }
  ],
  "dreams": [
    {
      "filePath": "src/docs/dreams/2023-10-20.md",
      "modifiedTime": "2023-12-12",
      "title": "2023-10-20"
    },
    {
      "filePath": "src/docs/dreams/到站.md",
      "modifiedTime": "2023-12-11",
      "title": "到站"
    },
    {
      "filePath": "src/docs/dreams/2023-07-24.md",
      "modifiedTime": "2023-12-11",
      "title": "2023-07-24"
    }
  ]
};

for (let key in records) {
  records[key].forEach(item => {
    adjust(`./${item.filePath}`)
  })
}
