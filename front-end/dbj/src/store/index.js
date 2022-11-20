import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
let auth = {
  username: 'danabijak',
  password: 'iVpZk1C0AFFwDfDV'
}
export default new Vuex.Store({
  state: {
    users: [],
    remitterData: null,
    beneficiaryData: null,
    payments: [],
  },
  mutations: {
    SET_USERS(state, payload){
      state.users = payload
    },
    SET_REMITTER(state, payload){
      state.remitterData =payload
    },
    SET_BENEFICIARY(state, payload){
      state.beneficiaryData =payload
    },
    SET_PAYMENTS(state, payload){
      state.payments = payload
    },
  },
  actions: {
    createUser(context, payload){
      return new Promise ((resolve, rejects) => {
        axios.post(`https://front-end-test-assignment.fintech-market.com/api/v1/accounts`, payload, {
        auth: auth
      })
        .then((resp) => {
          resolve(resp)
        })
        .catch((err) => {
          console.log(err.response.data)
          rejects(err.response.data.errors)
        })
      })
    },
    getAllUsers(context, payload){
      axios.post(`https://front-end-test-assignment.fintech-market.com/api/v1/accounts/search`, payload, {
        auth: auth
      })
        .then((resp) => {
          if (payload.sort == 'desc'){
            let sendData = resp.data.data.sort((a, b) => +b.balance - +a.balance)
            context.commit('SET_USERS', sendData)
          } else if(payload.sort == 'asc'){
            let sendData = resp.data.data.sort((a, b) => +a.balance - +b.balance)
            context.commit('SET_USERS', sendData)
          } else{
            context.commit('SET_USERS', resp.data.data)

          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err.response.data, null, 2))
        })
    },
    filterTable(context, payload){
      if (payload.keyword){
        let idData = this.state.users.filter((el) => {
          if (el.id.match(payload.keyword)){
            return el
          }
        })
        let nameData = this.state.users.filter((el) => {
          if (el.name.match(payload.keyword)){
            return el
          }
        })
        let sendData = idData
        sendData = sendData.concat(nameData)
        context.commit('SET_USERS', sendData)
      }
    },
    saveRemitterBeneficiary(context, payload){
      return new Promise((resolve, rejects) => {
        
        if (payload.remitter && payload.beneficiary){
          context.commit('SET_REMITTER', payload.remitter)
          context.commit('SET_BENEFICIARY', payload.beneficiary)
          resolve()
        } else{
          context.commit('SET_REMITTER', null)
          context.commit('SET_BENEFICIARY', null)
          resolve()
        }
        if (payload == null){
          rejects('Failed')
        }
      })
    },
    createPayment(context, payload){
      return new Promise((resolve, rejects) => {
        axios.post('https://front-end-test-assignment.fintech-market.com/api/v1/payments', payload, {
          auth:auth
        })
          .then((resp) => {
            resolve(resp.data.data)
          })
          .catch((err) => {
            rejects(err.response.data)
          })
      })
    },
    getAllPayments(context, payload){
      axios.post('https://front-end-test-assignment.fintech-market.com/api/v1/payments/search', payload, {
        auth: auth
      })
        .then((resp) => {
          context.commit('SET_PAYMENTS', resp.data.data)
        })
        .catch((err) =>{
          console.log(err.response.data)
        })
    }
  },
  modules: {
  }
})
