<script setup lang="ts">
import { RouterView } from 'vue-router'

const toggle = (event: MouseEvent) => {
  // document.documentElement.classList.toggle('dark')
  document.documentElement.style.setProperty("--x", event.clientX + 'px')
  document.documentElement.style.setProperty("--y", event.clientY + 'px')

  /**
   * 兼容性不太理想
   * https://caniuse.com/?search=startViewTransition
   */
  // @ts-ignore
  if (document?.startViewTransition) {
    // @ts-ignore
    document?.startViewTransition(() => {
      document.documentElement.classList.toggle('dark')
    })
  } else {
    document.documentElement.classList.toggle('dark')
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 min-h-screen ">
    <header>
      <div class="wrapper">
        <nav>
          <!-- <RouterLink to="/">Home</RouterLink> -->
          <!-- <RouterLink to="/about">About</RouterLink> -->
        </nav>
      </div>
    </header>

    <!-- <div class="w-36 text-center rounded cursor-pointer select-none py-2 bg-white fixed right-0 top-0 dark:bg-slate-800 "
      @click="toggle">切换</div> -->

    <!-- <RouterView /> -->


    <RouterView v-slot="{ Component }">
      <transition enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut" mode="out-in">
        <div class="w-full" :key="$route.path">
          <component :is="Component"></component>
        </div>
      </transition>
    </RouterView>

  </div>
</template>

<style lang="scss" >
:root {
  --animate-duration: 300ms;
}

::view-transition-old(*) {
  animation: none;
}

::view-transition-new(*) {
  animation: effects .6s ease-in-out;
}

@keyframes effects {
  // from {
  //   clip-path: circle(0% at var(--x) var(--y));
  // }

  // to {
  //   clip-path: circle(100% at var(--x) var(--y));

  // }

  from {
    clip-path: circle(0% at 50% 50%);
  }

  to {
    clip-path: circle(100% at 50% 50%);

  }
}
</style>
