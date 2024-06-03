<style lang="scss" scoped></style>

<template>
  <div>
    <van-cell
      v-for="item in 100"
      :key="item"
      :title="item"
      @click="() => router.push('/test')"
    />
  </div>
</template>

<script setup lang="ts">
import { sleep } from '@/utils';
import { get } from 'lodash-es';
import { computed, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

const a = ref(1);
const b = computed(() => {
  const test = {
    a: 1,
  };

  return a.value + get(test, 'a');
});
const route = useRoute();

const onPullDownRefresh: any = inject('onPullDownRefresh');

onPullDownRefresh(async () => {
  console.log('onPullDownRefresh');
  await sleep(2000);
});

const onReachBottom: any = inject('onReachBottom');

onReachBottom(async () => {
  console.log('onReachBottom');
  await sleep(2000);
});
</script>
