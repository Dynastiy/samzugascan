<template>
  <div>
    <div class="block_txns" v-if="currentRouteName == 'block' ||  name === 'block' " >
      <span v-if="loading">
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div></span>
      <div v-else>
        <h3>Block #{{ block_id - 1 }}</h3>
      <div class="block__table">
        <div class="d-md-flex">
          <div>
            <h6>Block Hash</h6>
          </div>
          <div class="d-flex ml-auto align-items-center" style="gap: 10px">
            <p class="no--hash">{{ block.block_hash }}</p>
            <p class="no--hash2">{{ sliceHash2(block.block_hash) }}</p>
            <!-- <ion-icon ios="ios-copy" md="md-copy"></ion-icon> -->
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Previous Hash</h6>
          </div>
          <div class="d-flex ml-auto align-items-center" style="gap: 10px">
            <p class="no--hash">{{ block.previous_hash }}</p>
             <p class="no--hash2">{{ sliceHash2(block.previous_hash) }}</p>
            <!-- <ion-icon ios="ios-copy" md="md-copy"></ion-icon> -->
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Block Size</h6>
          </div>
          <div class="ml-auto">
            <p>{{ block.block_size }}</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Block Height</h6>
          </div>
          <div class="ml-auto">
            <p>{{ block_id - 1 }}</p>
          </div>
        </div>
        <div class="d-md-flex" v-if="block.txns">
          <div>
            <h6>Transactions</h6>
          </div>
          <div class="ml-auto">
            <p>{{ block.txns.data.length }}</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Timestamp</h6>
          </div>
          <div class="ml-auto">
            <p>{{ timeRange(block.createdAt) }}</p>
          </div>
        </div>
        <div class="d-md-flex" v-if="block.miner">
          <div>
            <h6>Miner</h6>
          </div>
          <div class="ml-auto">
            <p class="text-capitalize">
              {{ block.miner.data.attributes.username }}
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- Transactions Section -->

    <div class="block_txns mt-5" v-else>
      <h3>Transaction Details</h3>
      <span v-if="loading">
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div></span>
      <div class="block__table" v-else>
        <div class="d-md-flex">
          <div>
            <h6>Transaction Hash</h6>
          </div>
          <div class="d-flex ml-auto">
            <p class="no--hash">{{ txn.txn_hash }}</p>
             <p class="no--hash2">{{ sliceHash2(txn.txn_hash) }}</p>
            <!-- <ion-icon ios="ios-copy" md="md-copy"></ion-icon> -->
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Status</h6>
          </div>
          <div class="ml-auto">
            <p class="success--badge">{{ txn.txn_status }}</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Block</h6>
          </div>
          <div class="ml-auto">
            <p v-if="txn.block">{{ txn.block.data.id - 1 }}</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Timestamp</h6>
          </div>
          <div class="ml-auto">
            <p>{{ timeRange(txn.createdAt) }}</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>From</h6>
          </div>
          <div class="ml-auto">
            <p>
              {{ txn.txn_address_from }}
              <span>({{ txn.txn_network_from }})</span>
            </p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>To</h6>
          </div>
          <div class="ml-auto">
            <p>
              {{ txn.txn_address_to }} <span>({{ txn.txn_network_to }})</span>
            </p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Amount</h6>
          </div>
          <div class="ml-auto">
            <p>{{ txn.amount }}{{ txn.currency }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dollarFilter, timeRange, sliceHash2 } from "@/plugins/filter.js";
export default {
  data() {
    return {
      dollarFilter,
      timeRange,
      sliceHash2,
      id: this.$route.params.id,
      block: "",
      block_id: "",
      txn: "",
      name: '',
    };
  },
  methods: {
    async getBlockById() {
      this.loading = true
      try {
        let res = await this.$axios.get(
          `/blocks/${this.id}?populate=txns,miner`
        );
        // console.log(res.data.data.attributes);
        this.block = res.data.data.attributes;
        this.block_id = res.data.data.id;
      } catch (error) {
        console.log(error);
      }
      this.loading = false
    },
    async getTxnById() {
      this.loading = true;
      try {
        let res = await this.$axios.get(
          `/txns/${this.id}?populate=block,pool_owner_user`
        );
        // console.log(res.data.data.attributes);
        this.txn = res.data.data.attributes;
        //  this.txn_id = res.data.data.id
      } catch (error) {
        console.log(error);
      }
      this.loading = false
    },
    async searchQuery() {
      this.loading = true;
      const usersInput = this.$route.query.search;
      var url1 = `https://explorer.zugascan.com/api/txns?sort=id:DESC&filters[txn_hash][$eq]=${usersInput}&populate=block,pool_owner_user`
      var url2 = `https://explorer.zugascan.com/api/blocks?sort=id:DESC&filters[block_hash][$eq]=${usersInput}&populate=txns,miner`
      var res = Promise.all([
        fetch(url1)
        .then(res => res.ok && res.json() || Promise.reject(res)),
        fetch(url2)
        .then(res => res.ok && res.json() || Promise.reject(res)),
      ])
        .then((data) => {
          console.log(res);
          this.displaySearchResult(data);
        })
        .catch((err) => {
          console.log(err);
          // searchResultNotfound();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    displaySearchResult(data){
      // console.log(data);
      if(data[0].data.length !== 0 ){
        this.txnDetails(data[0].data[0]);
        // console.log("Hello");
      }
      else if(data[1].data.length !== 0) {
        this.blockDetails(data[1].data[0])
        // console.log("Hi");
      }
      else{
        this.searchResultNotfound();
      }
    },
    searchResultNotfound() {
      // alert("No results")
      this.$router.push('/no-result')
    },
    txnDetails(data) {
      this.txn = data.attributes;
      this.name = "txn"
      console.log(this.txn);
    },
    blockDetails(data) {
      this.block = data.attributes;
      this.block_id = data.id
      this.name = "block"
      console.log(this.block);
    },
  },
  async created() {
    if (this.$route.params.id !== undefined) {
      if (this.$route.name === "txn") {
        this.getTxnById();
      } else {
        this.getBlockById();
      }
    } 
    else {
      this.searchQuery();
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

