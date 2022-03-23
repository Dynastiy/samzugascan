<template>
    <div>
        <div class="container pt-4 app--header d-flex align-items-center justify-content-between">
            <div>
                <header-logo/>
            </div>
            <ul class="list-unstyled d-flex m-0" style="gap:20px">
                <li><router-link to="/blocks">Blocks</router-link></li>
                <li><router-link to="/txns">Transactions</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
import headerLogo from '@/components/appLogo.vue'
export default {
    components:{
        headerLogo
    }
    
}
</script>