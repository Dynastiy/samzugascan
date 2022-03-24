<template>
  <div>
    <div class="txns__wrap">
      <h5>All Transactions</h5>
      <div class="txns__content mt-3">
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0">
            <thead>
              <tr>
                <th scope="col">Transaction Hash</th>
                <th scope="col">Block</th>
                <th scope="col">Timestamp</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="txn in txns" :key="txn.id">
                <td v-if="txn.attributes" ><router-link :to="'/tx/' + txn.id"
                        > {{ sliceHash(txn.attributes.txn_hash) }} </router-link> </td>
                <td v-if="txn.attributes"> {{ txn.attributes.block.data.id-1 }} </td>
                <td v-if="txn.attributes"> {{  timeRange(txn.attributes.createdAt)}} </td>
                <td v-if="txn.attributes">{{ sliceHash(txn.attributes.txn_address_from) }}</td>
                <td v-if="txn.attributes">{{ sliceHash(txn.attributes.txn_address_to) }}</td>
                <td v-if="txn.attributes"> {{ txn.attributes.amount }}<span>{{ txn.attributes.currency }} </span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { dollarFilter, timeRange, sliceHash } from "@/plugins/filter.js";
export default {
  data(){
    return{
      dollarFilter, timeRange, sliceHash,
      txns: '',
    }
  },
  methods:{
    async getTxns(){
      try {
        let res = await this.$axios('/txns?sort=id:DESC&&populate=block,pool_owner_user');
        console.log(res.data.data);
        this.txns = res.data.data
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created(){
    this.getTxns()
  }
};
</script>