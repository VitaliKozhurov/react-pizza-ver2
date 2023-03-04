import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, sortTypeVal, UrlParams } from './types';

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
      setSortType: (state, action: PayloadAction<sortTypeVal>) => {
         state.sort.sortType = action.payload;
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

export const { setCategoryId, setPageId, setSortType, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;