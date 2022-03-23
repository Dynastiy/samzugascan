<template>
    <div>
        <app-header></app-header>
        <router-view class="container main"></router-view>
    </div>
</template>

<script>
import AppHeader from '@/components/static/appHeader.vue'
export default {
    components: {
        AppHeader
    }
}
</script>