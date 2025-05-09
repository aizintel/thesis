// services/api.ts
import axios from 'axios'

// Create Axios instance
const api = axios.create({
  baseURL: "https://thesis-production-1f4b.up.railway.app/api", //https://thesis-production-1f4b.up.railway.app/api
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  
})


export default api
