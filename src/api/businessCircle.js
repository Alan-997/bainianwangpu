import request from '@/utils/request'

export function getClassificationList( params) {
  return request({
    url: '/app/businessCircle/getClassificationList',
    method: 'get',
    params
  })
}
/*获取商圈数据列表*/
export function getBusiness(params) {
  return request({
    url: '/app/businessCircle/getAdListPage',
    method: 'get',
    params
  })
}
export function getBsInfoById(params) {
  return request({
    url: '/app/businessCircle/getAdById',
    method: 'get',
    params
  })
}
export function dianzanAd(params) {
  return request({
    url: '/app/businessCircle/dianzanAd',
    method: 'get',
    params
  })
}
export function usercollect(params) {
  return request({
    url: '/app/businessCircle/usercollect',
    method: 'get',
    params
  })
}
export function getAd(params) {
  return request({
    url: '/app/businessCircle/getAd',
    method: 'get',
    params
  })
}
export function getCategory(params) {
  return request({
    url: '/app/businessCircle/getCategory',
    method: 'get',
    params
  })
}

export function getAreaList(params) {
  return request({
    url: '/app/businessCircle/getAreaList',
    method: 'get',
    params
  })
}
export function getByclassificationList(params) {
  return request({
    url: '/app/businessCircle/getByclassificationList',
    method: 'get',
    params
  })
}
export function getClassificationListpublish(params) {
  return request({
    url: '/app/businessCircle/getClassificationListpublish',
    method: 'get',
    params
  })
}
export function saveAd(params) {
  return request({
    url: '/app/businessCircle/saveAd',
    method: 'post',
    data: params
  })
}
export function uploadFileImg( params) {
  return request({
    url: '/zupuk/webApi/uploadFileImg',
    method: 'post',
    data: params
  })
}
export function uploadFileWater( params) {
  return request({
    url: '/system/uploadFileWater',
    method: 'post',
    data: params
  })
}
export function uploadFileVideo( params) {
  return request({
    url: '/system/uploadVideo',
    method: 'post',
    data: params
  })
}

export function getAdPublish(params) {
  return request({
    url: '/app/businessCircle/getAdPublish',
    method: 'get',
    params
  })
}

export function rfeshAdPublish(params) {
  return request({
    url: '/app/businessCircle/rfeshAdPublish',
    method: 'get',
    params
  })
}

export function getAdcollect(params) {
  return request({
    url: '/app/businessCircle/getAdcollect',
    method: 'get',
    params
  })
}