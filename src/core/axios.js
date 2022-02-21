import axios from "axios"

// axios.defaults.baseURL = window.location.origin
axios.defaults.baseURL = "https://backend-todo-list-web-mob.herokuapp.com"

window.axios = axios

export default axios