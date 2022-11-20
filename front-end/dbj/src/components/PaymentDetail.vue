<template>
  <div class="payment-detail">
    <div class="payment-essential">
      <div class="payment-ori-data">
        <h6 style="color:white; background-color:black; width:100%"><b>PAYMENT DATA</b></h6>
        <p>Payment ID </p><p>: {{onePayment.id}}</p>
        <p>Type Key </p><p>: {{onePayment.type_key}}</p>
        <p>Amount </p><p>: Rp {{onePayment.amount}},00</p>
      </div>
      <div class="remitter-data">
        <h6 style="color:white; background-color:black;width:100%"><b>REMMITER DATA</b></h6>
        <p>Remitter ID </p><p>: {{onePayment.remitter_account_id}}</p>
        <p>Remitter Name </p><p>: {{onePayment.remitter_name}}</p>
        <p>Remitter Number </p><p>: {{onePayment.remitter_account_number}}</p>
      </div>
      <div class="beneficiary-data">
        <h6 style="color:white; background-color:black;width:100%"><b>BENEFICIARY DATA</b></h6>
        <p>Remitter ID </p><p>: {{onePayment.remitter_account_id}}</p>
        <p>Remitter Name </p><p>: {{onePayment.remitter_name}}</p>
        <p>Remitter Number </p><p>: {{onePayment.remitter_account_number}}</p>
      </div>
    </div>
    <div class="payment-description">
      <h6 style="color:white;">DESCRIPTION</h6>
      <p style="color:white; text-align:left;">
        {{onePayment.description}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentDetail',
  props: ['onePayment']
}
</script>
<style scoped>
.payment-detail{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.payment-description{
  background-color: rgb(25, 92, 92);
  width: 30vw;
  align-self: center;
  /* height: 20vh; */
  height: 81.7vh;
  padding: 10px;
  border-radius: 12px;
}
.payment-ori-data{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: aqua;
  border-radius: 12px;
}
.remitter-data{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: green;
  border-radius: 12px;
  color:white;
}
.beneficiary-data{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: red;
  border-radius: 12px;
  color:white;
}
 @media only screen and (max-width: 650px){
  .payment-detail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .payment-description{
    background-color: rgb(25, 92, 92);
    width: 80vw;
    align-self: center;
    height: 40vh;
  }
  .payment-ori-data{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: aqua;
    width: 80vw;
  }
  .remitter-data{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: green;
    width: 80vw;
  }
  .beneficiary-data{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: red;
    width: 80vw;
  }
}
</style>
