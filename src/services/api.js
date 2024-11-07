import axios from 'axios'
import URL_SERVER from '../utils/constants'

const axiosInstance = axios.create({
  baseURL: URL_SERVER,
  withCredentials: true,
  timeout: 10000
})

axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    const customError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Có lỗi xảy ra',
      data: error.response?.data || null
    }
    return Promise.reject(customError)
  }
)

export default axiosInstance
