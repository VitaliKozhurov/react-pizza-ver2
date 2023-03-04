export type sortTypeVal = 'rating_asc' | 'rating_desc' | 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc';

export type SortType = {
   sortType: 'rating_asc' | 'rating_desc' | 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc',
}

export interface FilterSliceState {
   searchValue: string,
   categoryId: number,
   pageId: number,
   sort: SortType,
}

export type UrlParams = {
   currentPage: string;
   categoryId: string;
   order: string;
   search: string;
   sortBy: 'rating_asc' | 'rating_desc' | 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc';
}