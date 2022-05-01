import { createStore } from 'vuex'
import Axios from 'axios'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    GET_ORDERS_LIST({commit}, data){
      return new Promise((resolve, reject) => {
        Axios({
          method: 'GET',
          url: "http://134.209.119.20:8123/orders",
          params: {
            limit: data.limit,
            offset: data.offset
          }
        }).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GET_COURIERS_LIST({commit}){
      return new Promise((resolve, reject) => {
        Axios({
          method: 'GET',
          url: "http://134.209.119.20:8123/couriers",
        }).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})

