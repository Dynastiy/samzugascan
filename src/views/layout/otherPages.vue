<template>
    <div>
        <app-header></app-header>
        <router-view class="container main" :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
import AppHeader from '@/components/static/appHeaderWithSearch.vue'
export default {
    components: {
        AppHeader
    }
}
</script>