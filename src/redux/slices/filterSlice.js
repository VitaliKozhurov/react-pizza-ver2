import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
      }

   },
})

export const { setCategoryId, setPageId, setSortType, setFilters } = filterSlice.actions;

export default filterSlice.reducer;