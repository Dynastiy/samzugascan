<template>
  <div>
      <!-- Hero Section -->
    <div class="hero--section d-flex align-items-center">
      <div class="w-100">
        <div class="bg--image">
          <img src="@/assets/img/top--image.png" alt="" />
        </div>
        <h1 class="text-white">SamZuga Blockchain Explorer</h1>
        <div class="search--area d-flex align-items-center" style="gap: 10px">
          
            <ion-icon name="search" class="search"></ion-icon>
          
            <input type="search" placeholder="Search by Transaction Hash / block address"/>
          
            <ion-icon name="arrow-forward"  class="forward"></ion-icon>
          
        </div>
      </div>
    </div>

    <!-- Number of Blocks and Transactions  -->
    <div class="card--area">
        <div class="card--content">
            <div>
                <h6>Transactions</h6>
            <h4>12182</h4>
            </div>
        </div>
         <div class="card--content">
            <div>
                 <h6>Blocks</h6>
            <h4>12182</h4>
            </div>
         </div>
    </div>

    <!-- Main Content  -->
    <div class="main--content">
        <div class="main-content-card">
            <h5>Blocks</h5>
            <div class="d-flex justify-content-between align-items-center">
                <div class="icon-tx">Bk</div>
                <div>
                    <h6 class="block--num">2132</h6>
                    <p class="small time">2 Hours ago</p>
                </div>
                <div>
                    <h6><span class="header--sender">Samzuga Contract</span></h6>
                    <p class="small">25bb300312...</p>
                </div>
                <div class="icon-num">
                    1
                </div>
            </div>
            <hr class="mt-4 hr--line">
            
            <div class="text-center view--all">
                <router-link to="/">View All Blocks  </router-link>
                <ion-icon name="arrow-forward"></ion-icon>
            </div>
        </div>
        <div class="divider"></div>
          <div class="main-content-card">
            <h5>Transactions</h5>
            <div class="d-flex justify-content-between align-items-center">
                <div class="icon-tx">Tx</div>
                <div>
                    <h6 class="block--num">2132</h6>
                    <p class="small time">2 Hours ago</p>
                </div>
                <div>
                    <h6> <span class="sender">From:</span> <span class="header--sender">Samzuga Contract</span></h6>
                    <p class="small"> <span class="sender">To:</span> 25bb300312...</p>
                </div>
                <div class="icon-num">
                    0.3szc
                </div>
            </div>
            <hr class="mt-4 hr--line">
            
            <div class="text-center view--all">
                <router-link to="/">View All Transactions  </router-link>
                <ion-icon name="arrow-forward"></ion-icon>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  methods: {
    async getPosts(){
      let res = await  this.$axios.get('/pots');
      console.log(res);
    }
  },
  async created() {
    this.getPosts()
  },
};
</script>