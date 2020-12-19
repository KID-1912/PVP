import {request} from './request.js'


export function  addAd(params) {
  return request({
    url: '/reset/ads',
    method: 'post',
    data: params
  })
}

export function removeAd(id) {
  return request({
    url: `/reset/ads/${id}`,
    method: 'delete',
  })
}

export function updateAd(id,params) {
  return request({
    url: `/reset/ads/${id}`,
    method: 'put',
    data: params
  })
}

export function getAd(id) {
  return request({
    url: `/reset/ads/${id}`,
    method: 'get'
  })
}

export function getAds() {
  return request({
    url: `/reset/ads`,
    method: 'get'
  })
}



