<template>
  <HeaderVue />
  <main>
    <router-view/>
  </main>
</template>

<script>
import HeaderVue from '@/components/HeaderVue.vue'
export default {
  components: {
    HeaderVue
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>
