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

          <input
            type="search"
            v-model="search_item"
            placeholder="Search by Transaction Hash / Block Hash"
          />
          <ion-icon name="arrow-forward" class="forward" @click="goToSearch"></ion-icon>
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
          <div class="icon-num">1</div>
        </div>
        <hr class="mt-4 hr--line" />

        <div class="text-center view--all">
          <router-link to="/">View All Blocks </router-link>
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
            <h6>
              <span class="sender">From:</span>
              <span class="header--sender">Samzuga Contract</span>
            </h6>
            <p class="small"><span class="sender">To:</span> 25bb300312...</p>
          </div>
          <div class="icon-num">0.3szc</div>
        </div>
        <hr class="mt-4 hr--line" />

        <div class="text-center view--all">
          <router-link to="/">View All Transactions </router-link>
          <ion-icon name="arrow-forward"></ion-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      timeRange,
      dollarFilter,
      sliceHash,
      loading: false,
      blocks: [],
      txns: "",
      total_blocks: "",
      total_txns: "",
      live_prices: "",
      search_item: '',
    };
  },
  methods: {
    async getPosts() {
      let res = await this.$axios.get("/pots");
      console.log(res);
    },
    async getTxns() {
      this.loading = true;
      try {
        let res = await this.$axios.get(
          "txns?sort=id:DESC&pagination[pageSize]=5&populate=block,pool_owner_user"
        );
        console.log(res.data);
        this.total_txns = res.data.meta.pagination.total;
        this.txns = res.data.data;
      } catch (error) {
        console.log(error.response);
      }
      this.loading = false;
    },
    goToSearch(){
       this.$router.push({path:'/search-results', query:{ q: this.search_item}});
            console.log(this.search_item)
    },
    getLivePrices() {
      this.$axios
        .get("https://price-api.crypto.com/price/v1/global-metrics")
        .then((response) => {
          this.live_prices = response.data.data;
          console.log(this.live_prices);
        });
    },
    
  },
  async created() {
    this.getPosts();
  },
};
</script>