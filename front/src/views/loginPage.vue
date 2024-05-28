<template>
  <div class="">
    <h1>Wellcome</h1>
    <label for="">
      <h2>who are you ?</h2>
      <input type="text" v-model="userName" name="" id="">
      <button @click="login">login</button>
    </label>
  </div>
</template>
<script setup>



import { ref } from 'vue';
import { userDataStore } from '@/stores/userData';
const userStore = userDataStore()
const userName = ref("");
function login() {
  if (userName.value)
    userStore.userName = userName.value
  else {
    alert("you should choose an userName")
  }
}
</script>
<style></style>
