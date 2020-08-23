import request from '@/utils/request'

export function getRentoutListPage(params) {
  return request({
    url: '/zupuk/webApi/getRentoutListPage',
    method: 'get',
    params
  })
}
export function getRentoutListPageIndex(params) {
  return request({
    url: '/zupuk/webApi/getRentoutListPageIndex',
    method: 'get',
    params
  })
}
export function getRentoutInfoById(params) {
  return request({
    url: '/zupuk/webApi/getRentoutInfoById',
    method: 'get',
    params
  })
}
export function getBsInfoById(params) {
  return request({
    url: '/zupuk/webApi/getAdById',
    method: 'get',
    params
  })
}
export function getWantedListPage(params) {
  return request({
    url: '/zupuk/webApi/getWantedListPage',
    method: 'get',
    params
  })
}
export function getSellListPage(params) {
  return request({
    url: '/zupuk/webApi/getSellListPage',
    method: 'get',
    params
  })
}
export function getSellInfoById(params) {
  return request({
    url: '/zupuk/webApi/getSellInfoById',
    method: 'get',
    params
  })
}
export function getWantedInfoById(params) {
  return request({
    url: '/zupuk/webApi/getWantedInfoById',
    method: 'get',
    params
  })
}
export function getRentoutListRPage(params) {
  return request({
    url: '/zupuk/webApi/getRentoutListRPage',
    method: 'get',
    params
  })
}
export function getSellListSPage(params) {
  return request({
    url: '/zupuk/webApi/getSellListSPage',
    method: 'get',
    params
  })
}
export function saverentout(params) {
  return request({
    url: '/zupuk/webApi/saverentout',
    method: 'post',
    data: params
  })
}
export function saveSell(params) {
  return request({
    url: '/zupuk/webApi/saveSell',
    method: 'post',
    data: params
  })
}
export function wantedSave(params) {
  return request({
    url: '/zupuk/webApi/seveWanted',
    method: 'get',
    params
  })
}
export function getCListRPage(params) {
  return request({
    url: '/zupuk/webApi/getCListRPage',
    method: 'get',
    params
  })
}
// export function getAlListPage(params) {
//   return request({
//     url: '/zupuk/webApi/getAlListPage',
//     method: 'get',
//     params
//   })
// }
export function getAlListPage(params) {
  return request({
    url: '/zupuk/webApi/getAlListPages',
    method: 'get',
    params
  })
}
export function saveViewNum(params) {
  return request({
    url: '/zupuk/webApi/seveViewRecord',
    method: 'get',
    params
  })
}
/*获取商圈数据列表*/
export function getBusiness(params) {
  return request({
    url: '/zupuk/webApi/getAdListPage',
    method: 'get',
    params
  })
}
/*最近成交案例*/
export function rentoutNearComplete(params) {
  return request({
    url: '/zupuk/webApi/rentoutNearComplete',
    method: 'get',
    params
  })
}

/*手机端轮播图*/
export function getAppBanner(params) {
  return request({
    url: '/zupuk/webApi/getAppBanner',
    method: 'get',
    params
  })
}
/*手机端定位得到当前城市*/
export function getLocalCityList(params) {
  return request({
    url: '/zupuk/webApi/getLocalCityList',
    method: 'get',
    params
  })
}
/*手机端得到大类别*/
export function getClassificationList(params) {
  return request({
    url: '/zupuk/webApi/getClassificationList',
    method: 'get',
    params
  })
}
/*手机端得到小类别*/
export function getListByclassificationId(params) {
  return request({
    url: '/zupuk/webApi/getListByclassificationId',
    method: 'get',
    params
  })
}
/*手机端全景图*/
export function selectByTypeId(params) {
  return request({
    url: '/zupuk/webApi/selectByTypeId',
    method: 'get',
    params
  })
}

/*注册*/
export function login(params) {
  return request({
    url: '/zupuk/webApi/login',
    method: 'post',
    data: params
  })
}
export function applogin(params) {
  return request({
    url: '/zupuk/webApi/applogin',
    method: 'post',
    data: params
  })
}
export function getInfo(params) {
  return request({
    url: '/zupuk/clientele/getClienteleByToken',
    method: 'get',
    params
  })
}
export function getclientInfo(params) {
  return request({
    url: '/zupuk/webApi/getClienteleByToken',
    method: 'get',
    params
  })
}
export function logout( params) {
  return request({
    url: '/zupuk/webApi/logout',
    method: 'get',
    params
  })
}
export function getAreaList( params) {
  return request({
    url: '/zupuk/webApi/getAreaList',
    method: 'get',
    params
  })
}
export function getAreaListcityname( params) {
  return request({
    url: '/zupuk/webApi/getAreaListcityname',
    method: 'get',
    params
  })
}
export function getPublishList( params) {
  return request({
    url: '/zupuk/webApi/getPublishList',
    method: 'get',
    params
  })
}
export function uploadFileImg( params) {
  return request({
    url: '/zupuk/webApi/uploadFileImg',
    method: 'post',
    data: params
  })
}
export function saveWanted( params) {
  return request({
    url: '/zupuk/webApi/saveWanted',
    method: 'post',
    data: params
  })
}
export function passwordUpdate( params) {
  return request({
    url: '/zupuk/webApi/passwordUpdate',
    method: 'post',
    data: params
  })
}
export function smscode( params) {
  return request({
    url: '/zupuk/webApi/smscode',
    method: 'get',
    params
  })
}
export function getWantedIndustry( params) {
  return request({
    url: '/zupuk/webApi/getWantedIndustry',
    method: 'get',
    params
  })
}
export function freshrentout( params) {
  return request({
    url: '/zupuk/webApi/freshrentout',
    method: 'get',
    params
  })
}
export function freshsell( params) {
  return request({
    url: '/zupuk/webApi/freshsell',
    method: 'get',
    params
  })
}

export function freshwanted( params) {
  return request({
    url: '/zupuk/webApi/freshwanted',
    method: 'get',
    params
  })
}

export function getWantedListPageIndex( params) {
  return request({
    url: '/zupuk/webApi/getWantedListPageIndex',
    method: 'get',
    params
  })
}
export function editUserName( params) {
  return request({
    url: '/zupuk/webApi/editUserName',
    method: 'post',
    data: params
  })
}

export function getclassfi( params) {
  return request({
    url: '/app/businessCircle/getClassificationList',
    method: 'get',
    params
  })
}

