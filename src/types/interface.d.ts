interface ISwiper {
  id: number,
  image: string
}

interface ICategory {
  code: number,
  sort: number,
  name: string,
  icon: string,
  titleImage: string,
  children: Array<ISubCategory>
}

interface ISubCategory {
  code: number,
  sort: number,
  name: string,
  parentCode: number
}
