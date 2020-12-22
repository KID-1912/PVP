import axios from 'axios'

export default function(config){
  const instance = new axios.create({
    timeout: 5000,
    baseURL: process.env.VUE_APP_API_URL || '/web/api',
  })

  instance.interceptors.response.use(result => {
    console.log(result);
    return result.data
  },error => {
    const msg = error.response.data.message;
    console.log(msg)
  })

  return instance(config);
}