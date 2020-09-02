export interface ICategory {
  id: number,
  code: string,
  sort: number,
  name: string,
  icon: string,
  parentCode: string,
  titleImage: string,
  children: Array
}

export interface IProduct {
  code: string,
  name: string,
  image: string,
  price: number,
  originPrice: number,
  brand: string,
  label: string,
  inventory: number,
  soldNum: number,
  promotion: string,
  promotionTag: string,
  promotionTitle: string,
  sort: number
}
