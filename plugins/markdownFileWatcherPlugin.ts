// 引入依赖
import chokidar from 'chokidar';
import fs from 'fs';
import { Plugin } from 'vite';
import dayjs from 'dayjs';
import path from 'path';
import { debounce } from 'lodash-es'
import { constantRecords } from './origin';

interface FileChange {
  filePath: string;
  modifiedTime: string;
  title: string;
}

interface TotalData {
  letters: FileChange[];
  dreams: FileChange[];
  [key: string]: FileChange[]
}

const exportJs = debounce((data: TotalData) => {
  const writeStream = fs.createWriteStream(path.resolve(__dirname, '../src/output/index.ts'));
  // 使用写入流将 JSON 数据写入文件
  writeStream.write(`export default ${JSON.stringify(dataTransfer(data), null, 2)};`);
  // 关闭写入流
  writeStream.end();
})

const dataTransfer = (data: TotalData) => {
  const result: TotalData = {
    letters: [],
    dreams: []
  }

  for (let key in data) {
    result[key] = data[key].map(item => {

      const { modifiedTime = '', title = '' } = constantRecords.find(el => el.filePath === item.filePath) || {}

      return {
        filePath: item.filePath,
        modifiedTime: modifiedTime || item.modifiedTime,
        title: title || item.title
      }
    }).sort((a, b) => dayjs(a.modifiedTime).isBefore(dayjs(b.modifiedTime)) ? 1 : -1)
  }

  return result
}


const getTitle = (filePath: string) => {
  const pathArr = filePath.split('/')
  const fileName = pathArr[pathArr.length - 1]
  const title = fileName.replace('.md', '')
  return title
}

// 定义 Vite 插件
export default function markdownFileWatcherPlugin(): Plugin {
  // 监听文件变化的目录路径
  const watchedDir = ['./src/views/letters', './src/views/dreams'];

  // 用于记录文件变化信息的数组
  const fileChanges: TotalData = {
    letters: [],
    dreams: []
  }

  const start = () => {
    // 使用 chokidar 监听指定目录下的 markdown 文件变化
    const watcher = chokidar.watch(watchedDir, { ignored: /node_modules|.*\.vue$/ });

    // 监听文件添加、修改和删除事件
    watcher.on('add', (filePath: string) => {
      const mtimeMs = dayjs(fs.statSync(filePath).mtimeMs).format('YYYY-MM-DD')
      const record = { filePath, modifiedTime: mtimeMs, title: getTitle(filePath) }
      const keyword = filePath.split('/').at(-2) || ''

      if (!fileChanges[keyword]) {
        fileChanges[keyword] = []
      }

      fileChanges[keyword].push(record);

      console.log(fileChanges)
      exportJs(fileChanges)
    });

    watcher.on('change', (filePath: string) => {
      const mtimeMs = dayjs(fs.statSync(filePath).mtimeMs).format('YYYY-MM-DD')
      const record = { filePath, modifiedTime: mtimeMs, title: getTitle(filePath) }
      const keyword = filePath.split('/').at(-2) || ''

      if (!fileChanges[keyword]) {
        fileChanges[keyword] = []
      }

      fileChanges[keyword].splice(fileChanges[keyword].findIndex(change => change.filePath === filePath), 1);
      fileChanges[keyword].push(record);


      exportJs(fileChanges)
    });

    watcher.on('unlink', (filePath: string) => {

      const keyword = filePath.split('/').at(-2) || ''
      fileChanges[keyword].splice(fileChanges[keyword].findIndex(change => change.filePath === filePath), 1);

      exportJs(fileChanges)
    });
  }



  // 返回 Vite 插件对象
  return {
    name: 'markdown-file-watcher-plugin',
    // 应用插件
    apply: 'serve',
    configResolved(config) {
      // 当配置解析完成时，开始监听文件变化
      start();
    }
  };
}
