import request from './request'

export function getVideo(id){
  return request({
    url: `/video/${id}`,
    method: 'get'
  })
}