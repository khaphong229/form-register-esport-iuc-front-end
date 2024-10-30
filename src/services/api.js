import axios from 'axios'
import URL_SERVER from '../utils/constants'

const axiosInstance = axios.create({
  baseURL: URL_SERVER,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 10000 // 10 seconds timeout
})

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // You can add auth token here if needed
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    const customError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Something went wrong',
      data: error.response?.data || null
    }
    return Promise.reject(customError)
  }
)

export default axiosInstance
