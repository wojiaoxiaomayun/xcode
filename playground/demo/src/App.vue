<script setup>
import HelloWorld from './components/HelloWorld.vue'
import {onMounted} from 'vue'
import XCode from '@zkwq/xcode-core'
import '@zkwq/xcode-core/dist/index.css'
onMounted(() => {
  new XCode(document.getElementById('app'))
})
</script>

<template>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
