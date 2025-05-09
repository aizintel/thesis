// services/api.ts
import axios from 'axios'

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:3001/api", //https://thesis-production-1f4b.up.railway.app/api
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  
})


export default api
