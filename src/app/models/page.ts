export interface Page<T> {
  content: T[],
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    pageNumber: number,
    pageSize: number,
    offset: number,
    paged: boolean,
    unpaged: boolean
  },
  last: boolean,
  totalPages: number,
  totalElements: number,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  first: boolean,
  numberOfElements: number,
  empty: boolean
}
