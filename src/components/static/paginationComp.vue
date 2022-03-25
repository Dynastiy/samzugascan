<template>
    <div>
         <nav class="text-right">
          <ul
            class="pagination pagination-md d-flex justify-content-end align-items-center" style="gap:20px"
          >
            <li class="page-item" v-show="meta.page !== 1" :class="{ disabled: meta.pageSize === 0 }">
              <a
                href="javascript:void(0)"
                class="page-link"
                @click="next(meta.page - 1)"
              >
              <i class="fa fa-angle-left" aria-hidden="true"></i>
                <!-- &laquo; -->
              </a>
            </li>
            <li class="page-link">
               Page <span> {{ meta.page }} of {{ meta.pageCount }} </span>
            </li>
            <!-- <li
              class="page-item"
              v-for="page in meta.last_page"
              :key="page"
              :class="{active: meta.page === page }"
            >
              <a
                href="javascript:void(0)"
                @click.prevent="next(page)"
                class="page-link"
              >
                {{ page}}
              </a>
            </li> -->
            <li
              class="page-item"
              v-show="meta.page !== meta.pageCount"
              :class="{ disabled: meta.page === meta.pageCount }"
            >
              <a
                href="javascript:void(0)"
                class="page-link"
                @click="next(meta.page + 1)"
              >
              <i class="fa fa-angle-right" aria-hidden="true"></i>
                <!-- &raquo; -->
              </a>
            </li>
          </ul>
        </nav>
    </div>
</template>
<script>
export default {
    props: ['meta'],
    data(){
        return{
            disabled: true,
        }
    },
    methods: {
        next(page) {
            this.$emit('next', page);
        }
    }
}
</script>