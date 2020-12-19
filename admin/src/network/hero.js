import {request} from './request'



export function addHero(params){
  return request({
    url: '/reset/heros',
    method: 'post',
    data: params
  })
}

export function removeHero(id){
  return request({
    url: `/reset/heros/${id}`,
    method: 'delete'
  })
}

export function updateHero(id,params){
  return request({
    url: `/reset/heros/${id}`,
    method: 'put',
    data: params
  })
}

export function getHero(id){
  return request({
    url: `/reset/heros/${id}`,
    method: 'get'
  })
}

export function getHeros(){
  return request({
    url: '/reset/heros',
    method: 'get'
  })
}