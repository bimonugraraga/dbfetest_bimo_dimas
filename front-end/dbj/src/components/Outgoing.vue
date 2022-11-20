<template>
  <div  class="outoing-form">
    <div class="mr-2">
      <label for="exampleInputEmail1" class="form-label">Remitter ID</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="remitter_account_id">
    </div>
    <div class="mr-2">
      <label for="exampleInputEmail1" class="form-label">Beneficiary Number</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="beneficiary_account_number">
    </div>
    <div class="mr-2">
      <label for="exampleInputEmail1" class="form-label">Beneficiary Name</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="beneficiary_name">
    </div>
    <button type="button" class="btn btn-primary mt-3" @click.prevent="fillForm">CONFIRM</button>
  </div>
</template>
<script>
export default {
  name: "OutgoingComponent",
  props: ['remitter', 'beneficiary'],
  data(){
    return {
      remitter_account_id: this.remitter !== null? this.remitter.id: "",
      beneficiary_name: this.beneficiary !== null? this.beneficiary.name: "",
      beneficiary_account_number: this.beneficiary !== null? this.beneficiary.number: ""
    }
  },
  methods: {
    fillForm(){
      let payload = {
        remitter_account_id: this.remitter_account_id,
        beneficiary_name: this.beneficiary_name,
        beneficiary_account_number: this.beneficiary_account_number,
      }
      this.$emit('fillForm', payload)
    }
  }
}
</script>
<style scoped>

</style>
