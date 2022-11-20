<template>
  <div class="internal-form">
    <div class="mr-2">
      <label for="exampleInputEmail1" class="form-label">Remitter ID</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  v-model="remitter_account_id">
    </div>
    <div class="mr-2">
      <label for="exampleInputEmail1" class="form-label">Beneficiary ID</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-on:change='fillForm()' v-model="beneficiary_account_id">
    </div>
    <button type="button" class="btn btn-primary mt-3" @click.prevent="fillForm">CONFIRM</button>
  </div>
</template>
<script>
export default {
  name: "InternalComponent",
  props: ['remitter', 'beneficiary'],
  data(){
    return {
      remitter_account_id: this.remitter !== null? this.remitter.id: "",
      beneficiary_account_id: this.beneficiary !== null? this.beneficiary.id: ""
    }
  },
  methods: {
    fillForm(){
      let payload = {
        remitter_account_id: this.remitter_account_id,
        beneficiary_account_id: this.beneficiary_account_id
      }
      this.$emit('fillForm', payload)
    }
  }
}
</script>
<style scoped>

</style>