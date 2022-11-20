<template>
  <div class="big-page">
    <div class="home-page">
      <!-- REGISTER -->
      <div class="tab-pane fade show active user-create" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
        <form @submit.prevent="userReg">
          <div class="text-center mb-3">
            <p>Register</p>
          </div>

          <!-- Email input -->
          <div class="form-outline mb-4 userInput">
            <input type="text" id="loginName" class="form-control" v-model="name"/>
            <label class="form-label" for="loginName">username</label>
          </div>

          <!-- Submit button -->
          <button type="submit" class="btn btn-primary btn-block mb-4">Create Account</button>
        </form>
      </div>

      <!-- Table User -->
      <div class="user-table">
         <button type="button" class="btn btn-primary" @click.prevent="toCreatePayment" v-if="(isRemitter != null && isBeneciary != null) && (isBeneciary != isRemitter)">Create Payment Auto Fill</button>
         <button type="button" class="btn btn-secondary" disabled v-if="(isRemitter == null || isBeneciary == null) || (isBeneciary == isRemitter)">Create Payment Auto Fill</button>
        <table class="table data-table" >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col">Balance
                <select class="form-select" aria-label="Default select example" v-on:change.prevent='(event) => pickSortBalance(event)' v-model="balanceBy">
                  <option selected disabled>Sort</option>
                  <option v-bind:value="'desc'">Highest</option>
                  <option v-bind:value="'asc'">Lowest</option>
                  <option v-bind:value="null">Reset</option>
                </select>
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <div></div>
          <tbody v-for='user in users' v-bind:key='user.id' >
            <tr>
              <th scope="row">{{user.id}}</th>
              <td>{{user.name}}</td>
              <td>{{user.number}}</td>
              <td style="text-align:left">Rp {{user.balance}},00</td>
              <td>
                <button type="button" class="btn btn-primary" @click.prevent="getOneUser(user.id, user)">Detail</button>

                <button type="button" class="btn btn-outline-success" @click.prevent="saveRemitter(user.id, user)" v-if="user.balance > 0 && isRemitter == null">Remitter</button>
                <button type="button" class="btn btn-success" @click.prevent="unsaveRemitter()" v-if="user.balance > 0 && isRemitter == user.id">Remitter</button>
                <button type="button" class="btn btn-secondary" disabled v-if="user.balance==0">Remitter</button>
                <button type="button" class="btn btn-secondary" disabled v-if="user.balance > 0 && isRemitter !== user.id && isRemitter !== null">Remitter</button>

                <button type="button" class="btn btn-outline-warning" @click.prevent="saveBeneciary(user.id, user)" v-if="isBeneciary == null && user.id !== isRemitter">Beneficiary</button>
                <button type="button" class="btn btn-warning" @click.prevent="unsaveBeneciary()" v-if="isBeneciary == user.id && isBeneciary !== null">Beneficiary</button>
                <button type="button" class="btn btn-secondary" disabled v-if="isRemitter == user.id">Beneficiary</button>
                <button type="button" class="btn btn-secondary" disabled v-if="isBeneciary != user.id && isBeneciary !== null && isRemitter != user.id">Beneficiary</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="user-detail" v-if='userId != null'>
      <h4 class="heading-detail"><b>USER</b></h4>
      <p class="detail-name">User ID </p><p class="detail-data">: {{oneUser.id}}</p>
      <p class="detail-name">Name   </p><p class="detail-data">: {{oneUser.name}}</p>
      <p class="detail-name">Number </p><p class="detail-data">: {{oneUser.number}}</p>
      <p class="detail-name">Balance </p><p class="detail-data">: {{oneUser.balance}}</p>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
  name: 'RegLog',
  // props: {
  //   msg: String
  // }
  data(){
    return {
      name: "",
      oneUser: {},
      userId: null,
      balanceBy: null,
      allUsers: [],
      isRemitter: null,
      remitterData: null,
      isBeneciary: null,
      beneciaryData: null
    }
  },
  created(){
    this.$store.dispatch('getAllUsers',{
      data: {
        name: undefined
      }
    })
  },
  computed: {
    users(){
      return this.$store.state.users
    }
  },
  methods: {
    userReg(){
      let payload = {
        data: {
          name: this.name
        }
      }
      this.$store.dispatch('createUser', payload)
        .then((resp) => {
          this.oneUser = resp.data.data
          this.userId = resp.data.data.id
          this.$store.dispatch('getAllUsers')
          Swal.fire({
            icon: 'success',
            title: 'Horay',
            text: "Success Create User",
          })
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.name,
          })
        })
    },
    pickSortBalance(){
      console.log(this.balanceBy, this.users[1].balance)
      this.$store.dispatch('getAllUsers', {
        name: undefined,
        sort: this.balanceBy
      })
      
    },
    getOneUser(id, payload){
      this.oneUser = payload
      this.userId = id
    },
    saveRemitter(id, payload){
      this.isRemitter = id
      this.remitterData = payload
    },
    unsaveRemitter(){
      this.isRemitter = null
      this.remitterData = null
    },
    saveBeneciary(id, payload){
      this.isBeneciary = id
      this.beneciaryData = payload
    },
    unsaveBeneciary(){
      this.isBeneciary = null
      this.beneciaryData = null
    },
    toCreatePayment(){
      let payload = {
        remitter: this.remitterData,
        beneficiary: this.beneciaryData
      }
      this.$store.dispatch('saveRemitterBeneficiary', payload)
        .then(() => {
          this.$router.push({name: 'Payment'})
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
  .big-page{
    display: flex;
    flex-direction: column;
    /* justify-content: column; */
    align-items: center;
  }
  .home-page{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 100px;
    flex-grow: stretch;
    
    
  }
  @media only screen and (max-width: 650px) {
  .home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .user-create{
    width: 80%;
    background-color: aqua;
    padding: 10px;
    border-color: black;
    border-radius: 12px;
  }
  }
  @media only screen and (min-width: 651px){
    .home-page{
      width: 80vw;
    }
    .user-create{
      width: 20%;
      background-color: aqua;
      padding: 10px;
      border-color: black;
      border-radius: 12px;
      
    }
  }
  .user-table{
    width: 80%;
    padding: 20px;
    height: 50vh;
    overflow:scroll;
  }
  .user-detail{
    background-color: aqua;
    width: 500px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    border-radius: 12px;
  }
  .heading-detail{
    align-self: center;
  }
  .detail-name{
    margin-bottom: 3px;
    font-weight: bold;
  }
  .detail-data{
    text-indent: 10px;
    margin-bottom: 3px;
  }

</style>
