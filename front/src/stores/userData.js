import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userDataStore = defineStore("userData" , {
  state:()=>({
    userName:"",
    messages:[]
  }),
  getters:{
    
  }
})
