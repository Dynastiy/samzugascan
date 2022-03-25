<template>
  <div>
    <div class="txns__wrap">
      <h5>All Transactions</h5>
      <div class="txns__content mt-3">
        
        <!-- Pagination -->
        <pagination :meta="meta" v-on:next="getTxns" class="mt-4"/>
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
        
        <!-- Pagination -->
        <pagination :meta="meta" v-on:next="getTxns" class="mt-4"/>
      </div>
    </div>
  </div>
</template>


<script>
import pagination from "@/components/static/paginationComp.vue";
import { dollarFilter, timeRange, sliceHash } from "@/plugins/filter.js";
export default {
  components:{
    pagination
  },
  data(){
    return{
      dollarFilter, timeRange, sliceHash,
      txns: '',
      meta: {}
    }
  },
  methods:{
    async getTxns(page = 1){
      try {
        let res = await this.$axios(`/txns?sort=id:DESC&pagination[page]=${page}&populate=block,pool_owner_user`);
        console.log(res.data.data);
        this.txns = res.data.data
        this.meta = res.data.meta.pagination
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