import axios from "axios";

// Setting the base URL for the API requests
axios.defaults.baseURL = 'https://playdate-drf-api-a577c80fbeb8.herokuapp.com/'

// Setting the default headers for POST requests to 'multipart/form-data'
axios.defaults.headers.post['Content-Type']= 'multipart/form-data'

// Allowing cross-origin requests with credentials
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();