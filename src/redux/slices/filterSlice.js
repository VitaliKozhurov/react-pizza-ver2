import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   categoryId: 0,
   pageId: 1,
   sort: {
      sortType: 'rating_asc',
   }
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
   },
})

export const { setCategoryId, setPageId, setSortType } = filterSlice.actions;

export default filterSlice.reducer;