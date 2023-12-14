<style lang="scss" scoped>
.title {
  font-weight: 400;
  font-style: normal;
}

li {
  @apply text-sm;
}
</style>

<template>
  <div class="container">
    <div class="px-3 py-2">

      <h1 class="flex flex-col text-3xl text-black leading-normal tracking-wider title">
        <span>Hello,</span>
        <span>I'm SISYPHUS</span>
      </h1>

      <div class="mt-2 text-gray-900 space-y-1.5">
        <p class="text-sm">雪花还在飘落，浓雾还没散去，我仍然在行走。</p>
      </div>
    </div>

    <div class="flex items-center justify-between px-3 mt-8">
      <h2 class="font-medium text-xl text-gray-800">信件</h2>
    </div>


    <ul class="mt-4">
      <li class="px-3 py-2 mt-1 rounded-md transition-colors hover:bg-gray-100" v-for="(item, index) in records.letters"
        :key="index">
        <RouterLink class="flex items-center justify-between space-x-2" :to="{
          name: 'Docs',
          params: {
            id: encrypt({
              title: item.title,
              no: records.letters.length - index,
              modifiedTime: item.modifiedTime,
            })
          }
        }">
          <span class="flex-grow text-gray-900 line-clamp-1">第 {{ records.letters.length - index }} 封：{{ item.title
          }}</span>
          <span class="flex-shrink-0 text-gray-400 ">{{ item.modifiedTime }}</span>
        </RouterLink>
      </li>
    </ul>


    <div class="flex items-center justify-between px-3 mt-12">
      <h2 class="font-medium text-xl text-gray-800">零碎</h2>
    </div>


    <ul class="mt-4">
      <li class="px-3 py-2 mt-1 rounded-md transition-colors hover:bg-gray-100" v-for="(item, index) in records.dreams"
        :key="index">
        <RouterLink class="flex items-center justify-between space-x-2" :to="{
          name: 'Docs',
          params: {
            id: encrypt({
              title: item.title,
              no: records.letters.length - index,
              modifiedTime: item.modifiedTime,
            })
          },

        }">
          <span class="flex-grow text-gray-900 line-clamp-1">第 {{ records.dreams.length - index }} 期：{{ item.title
          }}</span>
          <span class="flex-shrink-0 text-gray-400 ">{{ item.modifiedTime }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import records from '@/output/index'
import * as qs from 'qs'

const encrypt = ({ title, no, modifiedTime }: { title: string, no: number, modifiedTime: string }) => {
  return btoa(qs.stringify({
    t: title,
    n: no,
    m: modifiedTime
  }))
}

</script>
