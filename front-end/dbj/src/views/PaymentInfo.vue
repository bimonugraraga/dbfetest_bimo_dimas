<template>
  <div class="big-page">
    <div class="payment-table">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Remitter Name</th>
            <th scope="col">Beneficiary Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-for='payment in payments' v-bind:key='payment.id'>
          <tr>
            <th scope="row">{{payment.id}}</th>
            <td>{{payment.remitter_name}}</td>
            <td>{{payment.beneficiary_name}}</td>
            <td>Rp {{payment.amount}},00</td>
            <td>
              <div v-if='payment.type_key == "internal"' style="background-color:red;color:white;">{{payment.type_key}}</div>
              <div v-if='payment.type_key == "incoming"' style="background-color:green;color:white;">{{payment.type_key}}</div>
              <div v-if='payment.type_key == "outgoing"' style="background-color:blue;color:white;">{{payment.type_key}}</div>
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click.prevent="getOnePayment(payment.id, payment)">Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaymentDetail
      v-if='paymentId != null'
      v-bind:onePayment='onePayment'/>
  </div>
</template>
<script>
import PaymentDetail from '../components/PaymentDetail.vue'
export default {
  name: "PaymentInfo",
  components: {
    PaymentDetail
  },
  data(){
    return {
      paymentId: null,
      onePayment: null
    }
  },
  created(){
    this.$store.dispatch('getAllPayments', {
      data: {
        id: undefined
      }
    })
  },
  computed:{
    payments(){
      return this.$store.state.payments
    },
    newPayment(){
      return this.$store.state.newPayment
    },
    newPaymentId(){
      return this.$store.state.newPaymentId
    }
  },
  methods: {
    getOnePayment(id, paymentData){
      this.paymentId = id
      this.onePayment = paymentData
    }
  }

}
</script>
<style scoped>
.big-page{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.payment-table{
  width: 80%;
  padding: 20px;
  height: 50vh;
  overflow:scroll;
}


</style>