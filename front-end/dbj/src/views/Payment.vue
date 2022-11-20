<template>
  <div class="big-payment-page">
    <div class="payment-page">
      <h3>CREATE PAYMENT</h3>
      <h4 v-if="remitter !== null && beneficiary !== null">{{remitter.name}} TO {{beneficiary.name}}</h4>
      <h4 v-if="remitter == null && beneficiary == null">MANUAL</h4>
      <form @submit.prevent="addNewPayment" class="form-payment">
        
        <div class="payment-form">
          <div class="sender-receive">
            <div>
              
              <InternalComponent 
                v-if='type_key == "internal"'
                v-bind:remitter='remitter'
                v-bind:beneficiary='beneficiary'
                v-on:fillForm='fillForm'/>
              <IncomingComponent 
                v-if='type_key == "incoming"'
                v-bind:remitter='remitter'
                v-bind:beneficiary='beneficiary'
                v-on:fillForm='fillForm'/>
              <OutgoingComponent 
                v-if='type_key == "outgoing"'
                v-bind:remitter='remitter'
                v-bind:beneficiary='beneficiary'
                v-on:fillForm='fillForm'/>
            </div>
            <div class="amount-type-form">
              <div class="form-group col-md-4 type-form">
                <label for="inputState" class="form-label">Type</label>
                <select id="inputState" class="form-control" v-on:change='(event) => pickType(event)' v-model="type_key">
                  <option selected disabled>Choose...</option>
                  <option v-bind:value="'internal'">Internal</option>
                  <option v-bind:value="'incoming'">Incoming</option>
                  <option v-bind:value="'outgoing'">Outgoing</option>
                </select>
              </div>
              <div class="amount-area">
                <label for="exampleInputEmail1" class="form-label">Amount</label>
                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="amount">
              </div>
            </div>
            
          </div>
          <div class="utility-form">
            
            <div class="form-group description-area">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea class="form-control description-form" id="exampleFormControlTextarea1" rows="3" v-model="description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary submit-button">Submit</button>
          </div>
        </div>
        
      </form>
    </div>
    <PaymentDetail
      v-if='paymentId != null'
      v-bind:onePayment='onePayment'/>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import InternalComponent from '../components/Internal.vue'
import IncomingComponent from '../components/Incoming.vue'
import OutgoingComponent from '../components/Outgoing.vue'
import PaymentDetail from '../components/PaymentDetail.vue'
export default {
  name: "Payment",
  components: {
    InternalComponent,
    IncomingComponent,
    OutgoingComponent,
    PaymentDetail
  },
  computed: {
    remitter(){
      return this.$store.state.remitterData
    },
    beneficiary(){
      return this.$store.state.beneficiaryData
    }
  },
  data(){
    return {
      description: '',
      amount: 0,
      type_key: '',
      payload: {},
      paymentId: null,
      onePayment: null

    }
  },
  methods: {
    pickType(){
    },
    fillForm(payload){
      console.log(payload)
      this.payload = payload
    },
    addNewPayment(){
      this.payload.description = this.description
      this.payload.amount = +this.amount
      this.payload.type_key = this.type_key
      let params = {
        data: this.payload
      }
      this.$store.dispatch('createPayment', params)
        .then((resp) => {
          this.paymentId = resp.id
          this.onePayment = resp
          Swal.fire({
            icon: 'success',
            title: 'Horay',
            text: "Success Create Payment",
          })
        })
        .catch((err) => {
          let allErrs = err.errors
          let sendErr = []
          for (let key in allErrs){
            allErrs[key].forEach((el) => {
              sendErr.push(el)
            })
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: sendErr.join(' | '),
          })
        })
    }
  }
}
</script>
<style scoped>
.big-payment-page{
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.payment-page{
  width: 70vw;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: aqua;
  border-radius: 12px;
  border-width: solid;
  border-color: black;
  box-shadow: 10px 5px 5px #64748b;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.payment-form{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  /* background-color: greenyellow; */
  height: 100vh;

}
 @media only screen and (max-width: 950px) {
  .payment-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .utility-form{
    /* background-color: blueviolet; */
    flex-direction: column;
    justify-content: center;
    flex-grow: 2;
    width: 100%;
    /* background-color: red; */
    align-items: flex-start;
  }
  .description-area{
    /* background-color: brown; */
    height: 500px;
  }
  .description-form{
    width: 100vw;
    height: 70%;
  }
  .submit-button{
    width: 100%;
    top: 10px;
  }
}
.sender-receive {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
}
.essential-form{
  display: flex;
  flex-direction: row;

}
@media only screen and (min-width: 951px) {
  .utility-form{
    /* background-color: blanchedalmond; */
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .description-form{
    height: 50vh;
  }
  .amount-type-form{
    margin-top: 10px;
    /* background-color: azure; */
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    align-items: flex-end;
  }
  .type-form{
    flex-grow: 2;
  }
  .amount-area{
    flex-grow: 0;
  }
  .submit-button{
    width: 100%;
  }
}
.description-area{
  padding: 10px;
}

.description-form{
  width: 100%;
}
</style>