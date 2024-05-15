<style lang="scss" scoped>
.title {
  font-weight: 400;
  font-style: normal;
}

li {
  @apply text-sm;
}

.cell {
  @apply px-3;
  @apply py-2;
  @apply mt-1;
  @apply rounded-md;
  // @apply hover:bg-gray-100;

  @media (any-hover: hover) {
    &:hover {
      @apply bg-gray-100;
    }
  }

  &>a:active {
    background-color: transparent;
  }

  &:hover {
    .cell-title {
      @apply text-gray-900;
    }

    .cell-time {
      @apply text-gray-400;
    }
  }

  &-title {
    @apply flex-grow;
    @apply text-gray-900;
    @apply line-clamp-1;
    @apply dark:text-white;
  }

  &-time {
    @apply flex-shrink-0;
    @apply text-gray-400;
    @apply dark:text-white;
  }
}
</style>

<template>
  <div class="container pt-12">
    <div class="px-3 py-2">

      <h1 class="flex flex-col text-3xl text-black leading-normal tracking-wider title dark:text-white">
        <span>Hello,</span>
        <span>I'm SISYPHUS</span>
      </h1>

      <div class="mt-2 text-gray-900 space-y-1.5 dark:text-white">
        <p class="text-sm">雪花还在飘落，浓雾还没散去，我仍然在行走。</p>
      </div>
    </div>

    <div class="flex items-center justify-between px-3 mt-8">
      <h2 class="font-medium text-xl text-gray-800 dark:text-white">信件</h2>
    </div>


    <ul class="mt-4">
      <li class="cell" v-for="(item, index) in records.letters" :key="index">
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
          <span class="cell-title">第 {{ records.letters.length - index }} 封：{{
        item.title
      }}</span>
          <span class="cell-time">{{ item.modifiedTime }}</span>
        </RouterLink>
      </li>
    </ul>


    <div class="flex items-center justify-between px-3 mt-12">
      <h2 class="font-medium text-xl text-gray-800 dark:text-white">零碎</h2>
    </div>


    <ul class="mt-4">
      <li class="cell" v-for="(item, index) in records.dreams" :key="index">
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
          <span class="cell-title">第 {{ records.dreams.length - index }} 期：{{
        item.title
      }}</span>
          <span class="cell-time">{{ item.modifiedTime }}</span>
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
