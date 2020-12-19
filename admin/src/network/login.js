import {request} from './request.js'



export function login(params) {
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}