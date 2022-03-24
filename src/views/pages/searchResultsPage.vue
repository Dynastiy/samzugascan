<template>
  <div>
    <div class="block_txns" v-if="currentRouteName == 'block' ">
      <h5>Block 2108</h5>
      <div class="block__table">
        <div class="d-md-flex">
          <div>
            <h6>Hash</h6>
          </div>
          <div class="d-flex ml-auto">
            <p>187328737asHGSUIUIW8Y9</p>
            <ion-icon ios="ios-copy" md="md-copy"></ion-icon>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Block Height</h6>
          </div>
          <div class="ml-auto">
            <p>2108</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Transactions</h6>
          </div>
          <div class="ml-auto">
            <p>20</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Timestamp</h6>
          </div>
          <div class="ml-auto">
            <p>24 hours ago</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Miner</h6>
          </div>
          <div class="ml-auto">
            <p>Samzuga Contract</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Transactions Section -->

    <div class="block_txns mt-5" v-else>
      <h5>Transaction Details</h5>
      <div class="block__table">
        <div class="d-md-flex">
          <div>
            <h6>Transaction Hash</h6>
          </div>
          <div class="d-flex ml-auto">
            <p>187328737asHGSUIUIW8Y9</p>
            <ion-icon ios="ios-copy" md="md-copy"></ion-icon>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Status</h6>
          </div>
          <div class="ml-auto">
            <p class="text-success">Confirmed</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Block</h6>
          </div>
          <div class="ml-auto">
            <p>2108</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Timestamp</h6>
          </div>
          <div class="ml-auto">
            <p>24 hours ago</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>From</h6>
          </div>
          <div class="ml-auto">
            <p>0xD2D44309EA0d11f4cE777aBEdF <span>(samzuga.money)</span></p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>To</h6>
          </div>
          <div class="ml-auto">
            <p>0xD2D44309EA0d11f4cE777aBEdF <span>(samzuga.money)</span></p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Amount</h6>
          </div>
          <div class="ml-auto">
            <p>1e-7szc</p>
          </div>
        </div>
        <div class="d-md-flex">
          <div>
            <h6>Transaction Fee</h6>
          </div>
          <div class="ml-auto">
            <p>0.4928 szc <span>($7.90)</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  methods: {
    async getBlockById(){
      try {
        let res = await this.$axios.get(`/blocks/${this.id}?populate=txns,miner`);
        console.log(res.data.data.attributes);
      } catch (error) {
        console.log(error);
      }
    },
    async getTxnById(){
      try {
       let res = await this.$axios.get(`/txns/${this.id}?populate=block,pool_owner_user`);
       console.log(res.data.data.attributes);
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created(){
    if(this.$route.name === 'txn'){
        this.getTxnById()
    }
    else{
      this.getBlockById()
    }
    
    
    console.log(this.$route.name);
  },
  computed: {
    currentRouteName(){
      return this.$route.name
    }
  }
};
</script>

//  https://explorer.zugascan.com/api/txns/1?populate=block,pool_owner_user
// https://explorer.zugascan.com/api/blocks/3?populate=txns,miner