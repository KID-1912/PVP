import request from './request.js' 

export function getNewsList() {
  return request({
    url: "/newslist",
    method: "get"
  })
}


export function getHeroesList() {
  return request({
    url: "/herolist",
    method: "get"
  })
}

export function getBanners(){
  return request({
    url: "/ads/homeBanner",
    method: "get"
  })
}

export function getCardBanner(){
  return request({
    url: "/ads/cardHero",
    method: "get"
  })
}