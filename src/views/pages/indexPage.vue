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
          <ion-icon name="search" class="search" @click="goToSearch"></ion-icon>

          <input
            type="search"
            placeholder="Search by Transaction Hash / block address"
          />

          <ion-icon name="arrow-forward" class="forward"></ion-icon>
        </div>
      </div>
    </div>

    <!-- Number of Blocks and Transactions  -->
    <div class="card--area">
      <div class="card--content">
        <div>
          <h6>Transactions</h6>
          <h4>
            <span v-if="loading">
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div></span
            >
            {{ total_txns }}
          </h4>
        </div>
      </div>
      <div class="card--content">
        <div>
          <h6>Blocks</h6>
          <h4>
            <span v-if="loading">
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div></span
            >
            {{ total_blocks }}
          </h4>
        </div>
      </div>
      <div class="card--content">
        <div>
          <h6>Market Cap</h6>
          <h4>
            <span v-if="loading">
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div></span
            >
            {{ dollarFilter(live_prices.market_cap) }}
          </h4>
        </div>
      </div>
    </div>

    <!-- Main Content  -->
    <div class="row mt-5 g-0 m-0 main--content">
      <div class="col-lg col-sm-12 p-0">
        <div class="card block bg-transparent main-content-card">
          <div class="card-body">
            <h4 class="mb-3 text-white">Blocks</h4>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-0">
                <tbody>
                  <tr v-for="block in blocks" :key="block.id">
                    <td><div class="icon-tx">Bk</div></td>
                    <td>
                      <router-link :to="'/block/' + block.id"
                        ><h4
                          class="block--num m-0 text-white"
                          v-if="block.attributes"
                        >
                          {{ block.id - 1 }}
                        </h4></router-link
                      >
                      <p class="small time m-0" v-if="block.attributes">
                        {{ timeRange(block.attributes.createdAt) }}
                      </p>
                    </td>

                    <td>
                      <h6>
                        <span
                          v-if="block.attributes"
                          class="header--sender m-0"
                        >
                          <span class="small">Mined by:</span>
                          <span class="text-capitalize"
                            >{{
                              block.attributes.miner.data.attributes.username
                            }}
                          </span></span
                        >
                      </h6>
                      <p class="small m-0 text-white" v-if="block.attributes">
                        {{ sliceHash(block.attributes.block_hash) }}
                      </p>
                    </td>

                    <td>
                      <div class="icon-num" v-if="block.attributes.txns">
                        {{ block.attributes.txns.data.length }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <span v-if="loading">
                      <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div></span
                    >
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- end table-responsive -->
          </div>
        </div>

        <div class="text-center mb-4 view--all">
          <router-link to="/blocks">View All Blocks </router-link>
          <ion-icon name="arrow-forward"></ion-icon>
        </div>
      </div>

      <div class="divider"></div>
      <!-- <hr class=""> -->

      <div class="col-lg col-sm-12 p-0 m-0">
        <div class="card block bg-transparent main-content-card">
          <div class="card-body">
            <h4 class="mb-3 text-white">Transactions</h4>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-0">
                <tbody>
                  <tr v-for="txn in txns" :key="txn.id">
                    <td><div class="icon-tx">Tx</div></td>
                    <td v-if="txn.attributes">
                      <router-link :to="'/tx/' + txn.id"
                        ><span class="block--num m-0 text-white">
                          {{ sliceHash(txn.attributes.txn_hash) }}
                        </span></router-link
                      >
                      <p class="small time m-0" v-if="txn.attributes">
                        {{ timeRange(txn.attributes.createdAt) }}
                      </p>
                    </td>

                    <td v-if="txn.attributes">
                      <h6>
                        <span class="sender">From:</span>
                        <span class="header--sender">{{
                          sliceHash(txn.attributes.txn_address_from)
                        }}</span>
                      </h6>
                      <p class="small">
                        <span class="sender">To:</span>
                        {{ sliceHash(txn.attributes.txn_address_to) }}
                      </p>
                    </td>

                    <td v-if="txn.attributes">
                      <div class="icon-num">
                        {{ txn.attributes.amount }}{{ txn.attributes.currency }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <span v-if="loading">
                      <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div></span
                    >
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- end table-responsive -->
          </div>
        </div>
        <div class="text-center view--all">
          <router-link to="/txns">View All Transactions </router-link>
          <ion-icon name="arrow-forward"></ion-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dollarFilter, timeRange, sliceHash } from "@/plugins/filter.js";
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
    };
  },

  methods: {
    
    async getBlocks() {
      this.loading = true;
      try {
        let res = await this.$axios.get(
          "blocks?sort=id:DESC&pagination[pageSize]=5&populate=miner,txns"
        );

        this.total_blocks = res.data.meta.pagination.total;
        this.blocks = res.data.data;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
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
    
    this.getBlocks();
      this.getTxns();
      this.getLivePrices();
  }
};
</script>