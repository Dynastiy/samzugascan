<template>
  <div>
    <div class="no__results__wrap text-center pt-5">
      <img src="@/assets/img/sad.png" alt="sad emoji" />
      <h3>Oooops! No Results Found</h3>
      <p>
        We couldn't find your search results. Please check if you typed a <br />
        correct block or transaction hash or try a different one.
      </p>
      <div @click="goBack()" class="back__wrap d-flex justify-content-center">
        <ion-icon ios="ios-arrow-back" md="ios-arrow-round-back"></ion-icon>
        <span>back</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>