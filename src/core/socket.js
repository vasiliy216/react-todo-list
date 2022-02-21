import io from 'socket.io-client'

const socket = io("https://backend-todo-list-web-mob.herokuapp.com");
// const socket = io(window.location.origin.replace("3003", "3000"));

socket.on('message', data => console.log(data))

export default socket 