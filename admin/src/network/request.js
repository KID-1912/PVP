import axios from 'axios'
import Vue from 'vue'
import router from '../router'

export function request(config){
  const instance = axios.create({
    timeout: 5000,
    baseURL: process.env.VUE_APP_API_URL || '/admin/api'
    // baseURL: 'http://localhost:3000/admin/api'
  });

  instance.interceptors.request.use((config) => {
    const token = window.sessionStorage.getItem("token");
    if(!token) return config;
    const authorization = 'Basic ' + token;
    config.headers.Authorization = authorization;
    return config
  });

  instance.interceptors.response.use(result => {
    console.log(result);
    return result.data
  },error => {
    const msg = error.response.data.message;
    console.log(error.response)
    if(msg) Vue.prototype.$message.error(msg);
    if(error.response.status == 401) router.push('/login');
  })

  return instance(config);
}
