<template>
  <div>
    <div class="block_txns" v-if="currentRouteName == 'block'">
      <h3>Block #{{ block_id - 1 }}</h3>
      <div class="block__table">
        <div class="d-md-flex">
          <div>
            <h6>Block Hash</h6>
          </div>
          <div class="d-flex ml-auto align-items-center" style="gap: 10px">
            <p>{{ block.block_hash }}</p>
            <ion-icon ios="ios-copy" md="md-copy"></ion-icon>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Previous Hash</h6>
          </div>
          <div class="d-flex ml-auto align-items-center" style="gap: 10px">
            <p>{{ block.previous_hash }}</p>
            <ion-icon ios="ios-copy" md="md-copy"></ion-icon>
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

    <!-- Transactions Section -->

    <div class="block_txns mt-5" v-else>
      <h3>Transaction Details</h3>
      <div class="block__table">
        <div class="d-md-flex">
          <div>
            <h6>Transaction Hash</h6>
          </div>
          <div class="d-flex ml-auto">
            <p>{{ txn.txn_hash }}</p>
            <ion-icon ios="ios-copy" md="md-copy"></ion-icon>
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
import { dollarFilter, timeRange, sliceHash } from "@/plugins/filter.js";
export default {
  data() {
    return {
      dollarFilter,
      timeRange,
      sliceHash,
      id: this.$route.params.id,
      block: "",
      block_id: "",
      txn: "",
    };
  },
  methods: {
    async getBlockById() {
      try {
        let res = await this.$axios.get(
          `/blocks/${this.id}?populate=txns,miner`
        );
        console.log(res.data.data.attributes);
        this.block = res.data.data.attributes;
        this.block_id = res.data.data.id;
      } catch (error) {
        console.log(error);
      }
    },
    async getTxnById() {
      try {
        let res = await this.$axios.get(
          `/txns/${this.id}?populate=block,pool_owner_user`
        );
        console.log(res.data.data.attributes);
        this.txn = res.data.data.attributes;
        //  this.txn_id = res.data.data.id
      } catch (error) {
        console.log(error);
      }
    },
    async searchQuery() {
      // var loadinn =  localStorage.getItem("loader");
      // loadinn = false
      this.loading = true;
      const usersInput = this.$route.query.q;
      // var url1 = 'https://network.zugascan.com/txns?txn_hash=' + usersInput;
      // var url2 = 'https://network.zugascan.com/blocks?id=' + usersInput;
      // var url3 = 'https://network.zugascan.com/txns?txn_address_from=' + usersInput;
      // var url4 = 'https://network.zugascan.com/txns?txn_address_to=' + usersInput;

      var res = Promise.all([
        this.$axios.get(
          `txns?sort=id:DESC&pagination[pageSize]=5&filters[txn_hash][$eq]=${usersInput}`
        ).then((res) => (res.ok && res.json()) || Promise.reject(res)),
        this.$axios.get(
          `blocks?sort=id:DESC&pagination[pageSize]=5&filters[block_hash][$eq]=${usersInput}&populate=txns,miner`
        ).then((res) => (res.ok && res.json()) || Promise.reject(res)),
        // fetch(url3).then(res => res.ok && res.json() || Promise.reject(res)),
        // fetch(url4).then(res => res.ok && res.json() || Promise.reject(res)),
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
    displaySearchResult(data) {
      function isEmpty(data) {
        return (data == null || data.length === 0);
      }
      if (isEmpty(data[0]) == false) {
        this.txnDetails(data[0]);
      } else if (isEmpty(data[1]) == false) {
        this.blockDetails(data[1]);
        console.log("data 1 from conditional statement");
      } else if (isEmpty(data[0], data[1] == true)) {
        this.searchResultNotfound();
      } else {
        alert("An error occurred");
      }
    },
    searchResultNotfound() {
      const userVal = localStorage.getItem("userInput");
      this.vaal = userVal;
      this.notfound = true;
    },
    txnDetails(data) {
      this.txns = data;
      console.log(this.txns);
    },
    blockDetails(data) {
      this.blocks = data;
    },
  },
  async created() {
    if (this.$route.params.id !== undefined) {
      if (this.$route.name === "txn") {
        this.getTxnById();
      } else {
        this.getBlockById();
      }
    } else {
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

