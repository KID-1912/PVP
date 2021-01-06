import {request} from './request'




export function addVideo(params) {
  return request({
    url: '/reset/videos',
    method: 'post',
    data: params
  })
}


export function removeVideo(id) {
  return request({
    url: `/reset/videos/${id}`,
    method: 'delete',
  })
}

export function updateVideo(id,params) {
  return request({
    url: `/reset/videos/${id}`,
    method: 'put',
    data: params
  })
}

export function getVideos() {
  return request({
    url: '/reset/videos',
    method: 'get'
  })
}


export function getVideo(id) {
  return request({
    url: `/reset/videos/${id}`,
    method: 'get'
  })
}