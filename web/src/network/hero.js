
import request from './request'



export function getHero(id){
  return request({
    url: `/hero/${id}`,
    methods: 'get'
  })
}