import {request} from './request'



export function addItem(params){
  return request({
    url: '/reset/items',
    method: 'post',
    data: params
  })
}

export function removeItem(id){
  return request({
    url: `/reset/items/${id}`,
    method: 'delete'
  })
}

export function updateItem(id,params){
  return request({
    url: `/reset/items/${id}`,
    method: 'put',
    data: params
  })
}

export function getItem(id){
  return request({
    url: `/reset/items/${id}`,
    method: 'get'
  })
}

export function getItems(){
  return request({
    url: '/reset/items',
    method: 'get'
  })
}