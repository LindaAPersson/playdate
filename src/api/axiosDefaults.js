import axios from "axios";

axios.defaults.baseURL = 'https://playdate-drf-api-a577c80fbeb8.herokuapp.com/'
axios.defaults.headers.post['Content-Type']= 'multipart/form-data'
axios.defaults.withCredentials = true