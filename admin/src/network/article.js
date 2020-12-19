import {request} from './request.js'

export function addArticle(params){
  return request({
    url: 'reset/articles',
    method: 'post',
    data: params
  })
}

export function removeArticle(id){
  return request({
    url: `reset/articles/${id}`,
    method: 'delete'
  })
}

export function updateArticle(id,params){
  return request({
    url: `reset/articles/${id}`,
    method: 'put',
    data: params
  })
}

export function getArticles(){
  return request({
    url: 'reset/articles',
    method: 'get'
  })
}

export function getArticle(id){
  return request({
    url: `reset/articles/${id}`,
    method: 'get'
  })
}