<template>
  <div class="incoming-form">
    <div class="mr-2">
      <label for="exampleInputEmail1" class="form-label">Remitter Name</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="remitter_name">
    </div>
    <div class="mr-2">
      <label for="exampleInputEmail1" class="form-label">Beneficiary Account Number</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="remitter_account_number">
    </div>
    <div class="mr-2">
      <label for="exampleInputEmail1" class="form-label">Beneficiary ID</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="beneficiary_account_id">
    </div>
    <button type="button" class="btn btn-primary mt-3" @click.prevent="fillForm">CONFIRM</button>
  </div>
</template>
<script>
export default{
  name: "IncomingComponent",
  props: ['remitter', 'beneficiary'],
  data(){
    return {
      beneficiary_account_id: this.beneficiary !== null? this.beneficiary.id: "",
      remitter_name: this.remitter !== null? this.remitter.name: "",
      remitter_account_number: this.remitter !== null? this.remitter.number: ""
    }
  }, 
  methods: {
    fillForm(){
      let payload = {
        beneficiary_account_id: this.beneficiary_account_id,
        remitter_name: this.remitter_name,
        remitter_account_number: this.remitter_account_number,
      }
      this.$emit('fillForm', payload)
    }
  }
}
</script>
<style scoped>

</style>
