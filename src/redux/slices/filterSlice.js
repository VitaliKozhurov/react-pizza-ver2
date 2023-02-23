import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
      setCategoryId: (state, action) => {
         state.categoryId = action.payload;
      },
      setPageId: (state, action) => {
         state.pageId = action.payload
      },
      setSortType: (state, action) => {
         state.sort.sortType = action.payload;
      },
      setFilters: (state, action) => {
         state.pageId = Number(action.payload.currentPage);
         state.sort.sortType = action.payload.sortBy;
         state.categoryId = Number(action.payload.categoryId);
      },
      setSearchValue: (state, action) => {
         state.searchValue = action.payload
      }

   },
})

export const selectCategoryId = ({ filter }) => filter.categoryId;
export const selectSortType = ({ filter }) => filter.sort.sortType;
export const selectCurrentPage = ({ filter }) => filter.pageId;
export const selectorSearchValue = ({ filter }) => filter.searchValue;

export const { setCategoryId, setPageId, setSortType, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;