import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import removeConsole from "vite-plugin-remove-console";
import progress from "vite-plugin-progress";
import colors from 'picocolors'

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    chunkSplitPlugin({
      customSplitting: {
        'utils': [
          /src\/utils/
        ],
      }
    }),
    removeConsole(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    progress({
      format: `${colors.green(colors.bold('Bouilding'))} ${colors.cyan('[:bar]')} :percent`,
      total: 200,
      width: 60,
      complete: "=",
      incomplete: "",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }

  }
})
