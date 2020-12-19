import {request} from './request.js'

export function addAdminUser(params){
  return request({
    url: 'reset/admin_users',
    method: 'post',
    data: params
  })
}

export function removeAdminUser(id){
  return request({
    url: `reset/admin_users/${id}`,
    method: 'delete'
  })
}

export function updateAdminUser(id,params){
  return request({
    url: `reset/admin_users/${id}`,
    method: 'put',
    data: params
  })
}

export function getAdminUsers(){
  return request({
    url: 'reset/admin_users',
    method: 'get'
  })
}

export function getAdminUser(id){
  return request({
    url: `reset/admin_users/${id}`,
    method: 'get'
  })
}