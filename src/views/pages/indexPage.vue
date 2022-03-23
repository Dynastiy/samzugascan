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
          <h4>12182</h4>
        </div>
      </div>
      <div class="card--content">
        <div>
          <h6>Blocks</h6>
          <h4>12182</h4>
        </div>
      </div>
      <div class="card--content">
        <div>
          <h6>Market Cap</h6>
          <h4>12223k</h4>
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
                  <tr>
                    <td><div class="icon-tx">Bk</div></td>
                    <td>
                      <router-link to="/"
                        ><h4 class="block--num m-0 text-white">
                          2132
                        </h4></router-link
                      >
                      <p class="small time m-0">2 Hours ago</p>
                    </td>

                    <td>
                      <h6>
                        <span class="header--sender m-0">Samzuga Contract</span>
                      </h6>
                      <p class="small m-0 text-white">25bb300312...</p>
                    </td>

                    <td>
                      <div class="icon-num">1</div>
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
                  <tr>
                    <td><div class="icon-tx">Tx</div></td>
                    <td>
                      <router-link to="/"
                        ><span class="block--num m-0 text-white">
                          0xfe4aae1bc682b...
                        </span></router-link
                      >
                      <p class="small time m-0">2 Hours ago</p>
                    </td>

                    <td>
                      <h6>
                        <span class="sender">From:</span>
                        <span class="header--sender">Samzuga Contract</span>
                      </h6>
                      <p class="small">
                        <span class="sender">To:</span> 0xfe4aae1bc682b...
                      </p>
                    </td>

                    <td>
                      <div class="icon-num">0.232szc</div>
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
export default {
  data: () => {
    return {
      loading: false,
    };
  },
  methods: {
    async getBlocks(){
      let res = await  this.$axios.get('/blocks?_sort=id:DESC&_limit=5');
      console.log(res);
    }
  },
  async created() {
    this.getBlocks()
  },
};
</script>