<template>
  <div>
    <div class="txns__wrap">
      <h5>All Blocks</h5>
      <div class="txns__content mt-3">
        <div class="table-responsive">
            <!-- Pagination -->
         <pagination :meta="meta" v-on:next="getBlocks"/>
          <table class="table table-centered table-nowrap mb-0">
            <thead>
              <tr>
                <th scope="col">Block Hash</th>
                <th scope="col">Block Height</th>
                <th scope="col">Timestamp</th>
                <th scope="col">Miner</th>
                <th scope="col">Block Size</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="block in blocks" :key="block.id">
                <td v-if="block.attributes">
                  <router-link :to="'/block/' + block.id">
                    {{ sliceHash(block.attributes.block_hash) }}</router-link
                  >
                </td>
                <td class="">{{ block.id - 1 }}</td>
                <td v-if="block.attributes">
                  {{ timeRange(block.attributes.createdAt) }}
                </td>
                <td v-if="block.attributes" class="text-capitalize">
                  {{ block.attributes.miner.data.attributes.username }}
                </td>
                <td v-if="block.attributes" class="text-right">
                  {{ block.attributes.block_size }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <pagination :meta="meta" v-on:next="getBlocks" class="mt-4"/>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/static/paginationComp.vue";
import { dollarFilter, timeRange, sliceHash } from "@/plugins/filter.js";
export default {
  components: {
    pagination,
  },
  data() {
    return {
      dollarFilter,
      timeRange,
      sliceHash,
      blocks: "",
      meta: {},
    };
  },
  methods: {
    async getBlocks(page=1) {
      try {
        let res = await this.$axios(
          `/blocks?sort=id:DESC&pagination[page]=${page}&populate=miner,txns`
        );
        this.blocks = res.data.data;
        this.meta = res.data.meta.pagination
        console.log(this.meta);
      } catch (error) {
        console.log(error);
      }
    },
     next(page) {
      this.getBlocks(page);
    },
  },
  async created() {
    this.getBlocks();
  },
};
</script>