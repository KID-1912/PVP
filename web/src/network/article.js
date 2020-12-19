
import request from './request.js'


export function getArticle(id){
  return request({
    url: `article/${id}`,
    method: 'get'
  })
}