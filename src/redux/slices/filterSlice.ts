import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type SortType = {
   sortType: 'rating_asc' | 'rating_desc' | 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc',
}

interface FilterSliceState {
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

const initialState: FilterSliceState = {
   searchValue: '',
   categoryId: 0,
   pageId: 1,
   sort: {
      sortType: 'rating_asc',
   },
}

export const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setCategoryId: (state, action: PayloadAction<number>) => {
         state.categoryId = action.payload;
      },
      setPageId: (state, action: PayloadAction<number>) => {
         state.pageId = action.payload
      },
      setSortType: (state, action: PayloadAction<SortType>) => {
         state.sort = action.payload;
      },
      setFilters: (state, action: PayloadAction<UrlParams>) => {
         state.pageId = Number(action.payload.currentPage);
         state.sort.sortType = action.payload.sortBy;
         state.categoryId = Number(action.payload.categoryId);
      },
      setSearchValue: (state, action: PayloadAction<string>) => {
         state.searchValue = action.payload
      }

   },
})

export const selectCategoryId = ({ filter }: RootState) => filter.categoryId;
export const selectSortType = ({ filter }: RootState) => filter.sort.sortType;
export const selectCurrentPage = ({ filter }: RootState) => filter.pageId;
export const selectorSearchValue = ({ filter }: RootState) => filter.searchValue;

export const { setCategoryId, setPageId, setSortType, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;