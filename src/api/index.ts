import request from '@/utils/request'

export const getCategory = () =>
  request({
    url: '/category/all',
    method: 'get'
  })

export const getCategoryTopTen = () =>
  request({
    url: '/category/topTen',
    method: 'get'
  })

export const getProductList = (params: any) =>
  request({
    url: '/product/list',
    method: 'get',
    params
  })

export const getProductDetail = (params: any) =>
  request({
    url: '/product/detail',
    method: 'get',
    params
  })
