<template>
  <div class="skeleton">

    <div class="block" :style="{ width: '30%', height }"></div>
    <!-- 1 盒子-->
    <div class="block" v-for="item in 4" :key="item" :style="{ height }"></div>
    <!-- 2 闪烁效果 skeleton 伪元素 --->
    <div class="block" :style="{ width: '60%', height }"></div>

  </div>
</template>

<script lang="ts">
export default {
  name: 'Skeleton',
  // 使用的时候需要动态设置 高度，宽度，背景颜色，是否闪烁
  props: {
    bg: {
      type: String,
      default: '#f2f2f3'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '16px'
    },
    animated: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped lang="scss">
.skeleton {
  position: relative;
  overflow: hidden;

  .block {
    width: 100%;
    margin-bottom: 12px;
    animation: el-skeleton-loading 1.4s ease infinite;
    background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
    background-size: 400% 100%;
  }
}

@keyframes el-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}
</style>

