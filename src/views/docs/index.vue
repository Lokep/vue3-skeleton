<style lang="scss" >
@import '@/assets/styles/md.scss';
</style>

<template>
  <div class="container">
    <div class="flex flex-col items-center px-2 pt-12 pb-8">
      <h1 class="font-medium text-2xl dark:text-white">第 {{ no }} 封：{{ title }}</h1>
      <p class="mt-2 text-gray-500 text-sm font-mono dark:text-white">{{ modifiedTime }}</p>
    </div>

    <div class="letter dark:text-white overflow-hidden pb-12 px-2 pt-2" v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import qs from 'qs';
import markdownItIframe from '@/utils/markdownItIframe'
import markdownItImage from '@/utils/markdownItImage'
import markdownItTasks from '@/utils/markdownItTasks'
import Skeleton from '@/components/skeleton.vue'

const rawContent = ref('')

const content = computed(() => {
  const md = new MarkdownIt()

  md.use(markdownItImage)
  md.use(markdownItIframe, { renderIframe: true, height: 88 })
  md.use(markdownItTasks)

  return md.render(rawContent.value)
})

const route = useRoute()
const { id = '' } = route.params
const { m: modifiedTime, n: no, t: title } = qs.parse(atob(id as string))


const modules = import.meta.glob('@/docs/**/*.md', { as: 'raw', import: 'default' })

for (const path in modules) {
  modules[path]().then((mod) => {
    const reg = /^\/src\/docs\/(letters|dreams)\/|.md$/g
    if (path.replace(reg, '') === title || path.includes(modifiedTime as string)) {
      rawContent.value = mod
    }
  })
}
</script>
