// 向后端发起的categorys路径请求

import {request} from './request.js'



export function addCategory(params){
  return request({
    url: 'reset/categories',
    method: 'post',
    data: params
  })
}

export function removeCategory(id){
  return request({
    url: `reset/categories/${id}`,
    method: 'delete'
  })
}

export function updateCategory(id,params){
  return request({
    url: `reset/categories/${id}`,
    method: 'put',
    data: params
  })
}

export function getCategories(){
  return request({
    url: 'reset/categories',
    method: 'get'
  })
}

export function getCategory(id){
  return request({
    url: `reset/categories/${id}`,
    method: 'get'
  })
}


