import axios from 'axios'
// create an axios instance
const service = axios.create({
  // baseURL:'http://118.190.244.2:8877',
  // baseURL:'http://192.168.0.104:8887',
  baseURL:'http://wp.wangpu100.com',
  // baseURL:'http://192.168.0.222:8887',

  timeout: 60000 // request timeout
})

// response interceptor
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
