<template>
    <main>
        <ul>
            <li v-if="messages.length" v-for="message in messages">
                {{ message.name }} : {{ message.message }}
            </li>
            <li v-else>پیامی یافت نشد</li>
        </ul>
        <section class="new-message-wrapper">
            <input type="text" name="" v-model="newMessage" id="" placeholder="message">
            <button @click="sendMessageFunc">send </button>
        </section>
    </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { sendMessage } from '@/socketIoConf';
import { userDataStore } from '@/stores/userData';
import { storeToRefs } from 'pinia';
// const messages = ref([
//     //   { name: "nima", message: "salam bacheha !" },
//     //   { name: "mamad", message: "hello !" },
// ]);
 const userStore = userDataStore()
 const {messages} = storeToRefs(userStore)
const newMessage = ref("")
function sendMessageFunc() {
    if (newMessage.value) {
        sendMessage(newMessage.value)
    }
}

</script>

<style scoped>
main {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
}

ul {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    color: #fff;
    padding: 24px;
    list-style: none;
    gap: 16px;
}

li {
    background: green;
    padding: 16px;
    border-radius: 16px;
}

main>section.new-message-wrapper {
    height: 80px;
    display: flex;
    padding: 12px 24px;
    padding-bottom: 24px;
    gap: 8px;
}

main>section.new-message-wrapper>* {
    border-radius: 48px;
    border: none;
}

main>section.new-message-wrapper>input {
    flex: 1;
    padding-inline: 16px;
}

main>section.new-message-wrapper>button {
    padding: 8px 24px;
    background: green;
    color: #fff;
}
</style>