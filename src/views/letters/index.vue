<style lang="scss" >
@import '@/assets/styles/md.scss';
</style>

<template>
  <div class="container">
    <div class="flex flex-col items-center px-2 pt-12 pb-8">
      <h1 class="font-medium text-2xl">第 {{ no }} 封：{{ id }}</h1>
      <p class="mt-2 text-gray-500 text-sm font-mono">{{ modifiedTime }}</p>
    </div>

    <Skeleton v-if="!content" />

    <div class="letter" v-else v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import markdownItIframe from '@/utils/markdownItIframe'
import markdownItImage from '@/utils/markdownItImage'
import Skeleton from '@/components/skeleton.vue'

const rawContent = ref('')

const content = computed(() => {
  const md = new MarkdownIt()

  md.use(markdownItImage)
  md.use(markdownItIframe, { renderIframe: true, height: 88 })

  return md.render(rawContent.value)
})

const route = useRoute()
const { id = '' } = route.params
const { modifiedTime, no } = route.query


const modules = import.meta.glob('./*.md', { as: 'raw', import: 'default' })

for (const path in modules) {
  modules[path]().then((mod) => {
    if (path.replace(/^.\/|.md$/g, '') === id || path.includes(modifiedTime as string)) {
      rawContent.value = mod
    }
  })
}
</script>
