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