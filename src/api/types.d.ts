export interface ICategory {
  code: number,
  sort: number,
  name: string,
  icon: string,
  parentCode: number,
  titleImage: string,
  children: Array
}

export interface IProduct {
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
