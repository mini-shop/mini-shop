declare namespace IProduct {
  export interface List {
    code: string,
    name: string,
    image: string,
    price: number,
    originPrice: number,
    label: string,
    inventory: number,
    soldNum: number,
    promotion: string,
    promotionTag: string,
    promotionTitle: string,
    sort: number
  }
  export interface ListParams {
    categoryCode: number,
    isAll: boolean,
    pageSize: number,
    pageNum: number
  }
  export interface Detail {
    code: string,
    name: string,
    shopImages: Array<string>,
    price: number,
    originPrice: number,
    label: string,
    inventory: number,
    soldNum: number,
    promotion: string,
    promotionTag: string,
    promotionTitle: string,
    properties: Object,
    detailImages: Array<string>,
    pintuanmsg: string,
    cartMsg: string
  }
}
