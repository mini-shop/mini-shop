declare namespace ICategory {
  export interface Main {
    code: number,
    sort: number,
    name: string,
    icon: string,
    titleImage: string,
    children: Array<Sub>
  }
  export interface Sub {
    code: number,
    sort: number,
    name: string,
    parentCode: number
  }
}