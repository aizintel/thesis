// services/api.ts
import axios from 'axios'

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})


export default api
