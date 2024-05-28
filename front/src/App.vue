<script setup>
import { userDataStore } from "./stores/userData";
import { compile, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { state,socket } from "./socketIoConf";
const router = useRouter()
const userStore = userDataStore();
const { userName } = storeToRefs(userStore)
function checkUsername() {
  console.log("checking username ...");
  if (!userStore.userName) {
    router.replace({ name: 'login' })
  } else {
    // socket.
    router.replace({ name: 'home' })
  }

  console.log(userStore.userName);
}
watch(userName, () => {
  console.log("watch checking");
  checkUsername()
})
onMounted(() => {
  // socket = io("ws://localhost:3000")s
  checkUsername()
})
const connected = computed(()=>state.connected)
function changeConnectionSocket(){
  connected?socket.disconnect():socket.connect();
}
</script>
<template>
  <main>
    <div>
      <h3>connected : {{connected?'connected':'disconnected'}}</h3>
      <button @click="changeConnectionSocket">
        <span v-if="connected">disconnect</span>
        <span v-else>connect</span>
      </button>
      <hr>
    </div>

    <RouterView></RouterView>
  </main>
</template>
<style scoped>
main{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
