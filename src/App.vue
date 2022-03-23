<template>
  <div id="app">
    <router-view/>
    <app-footer/>
  </div>
</template>

<style>

</style>

<script>
import appFooter from '@/components/static/appFooter.vue'
export default {
  components:{
    appFooter
  }
}
</script>
