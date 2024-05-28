import { connect, io } from "socket.io-client";
import { onMounted, reactive, ref } from "vue";
import { userDataStore } from "./stores/userData";
import { storeToRefs } from "pinia";
export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

const URL = "ws://192.168.1.196:3000"
export const socket = io(URL);

socket.on("connect", () => {
    state.connected = true
})


socket.on("disconnect", () => {
    state.connected = false
})
// const UserName = ref()
// const Messages = ref()
// onMounted(() => {

//     UserName.value = userName
//     Messages.value = messages
//     console.log("messges:",Messages);

// })
socket.on("message", (message) => {
    const userStore = userDataStore();

    const { messages } = storeToRefs(userStore)

    messages.value.push(message);
})
export const sendMessage = (message) => {
    const userStore = userDataStore();

    const { userName } = storeToRefs(userStore)

    socket.emit("message", { name:userName.value, message: message })
}
socket.on("foo", (...args) => {
    state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
    state.barEvents.push(args);
});