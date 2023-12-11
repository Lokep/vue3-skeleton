<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 min-h-screen">
    <header>
      <div class="wrapper">
        <nav>
          <!-- <RouterLink to="/">Home</RouterLink> -->
          <!-- <RouterLink to="/about">About</RouterLink> -->
        </nav>
      </div>
    </header>

    <RouterView />

  </div>
</template>

