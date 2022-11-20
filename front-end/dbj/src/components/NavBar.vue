<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="" @click.prevent="toPage('Home')">Home</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" @click.prevent="toPage('Payment')">Create Payment</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" @click.prevent="toPage('PaymentInfo')">Payment Info</a>
          </li>
        </ul>
        <form class="d-flex" >
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="keyword">
          <button class="btn btn-outline-success" type="submit" @click.prevent="filterTable">Search</button>
          <button class="btn btn-outline-primary" type="submit" @click.prevent="resetTable">Reset</button>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  data(){
    return {
      keyword: ""
    }
  },
  methods: {
    toPage(pageName){
      this.$store.dispatch('saveRemitterBeneficiary', {})
        .then(() => {
          this.$router.push({name: pageName})
        })
    },
    filterTable(){
      this.$router.push({name: pageName})
      this.$store.dispatch('filterTable', {
        keyword: this.keyword? this.keyword: null
      })
    },
    resetTable(){
      this.$store.dispatch('getAllUsers', {
        name: undefined
      })
    }
  }
}
</script>
<style scoped>

</style>
