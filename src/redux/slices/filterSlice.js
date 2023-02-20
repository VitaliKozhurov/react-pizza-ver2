import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   categoryId: 0,
   sort: {
      sortType: 'rating_asc',
   }
}

export const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      /* setCategoryId: (state, action) => {
         state.categoryId = action.payload
      }, */
      setCategoryId: (state, action) => ({
         ...state,
         categoryId: action.payload,
      }),
      setSortType: (state, action) => {
         state.sort.sortType = action.payload
      }
      /* setSortType: (state, action) => ({
         ...state,
         sort: {
            ...state.sort,
            sortType: action.payload
         }
      }) */
   },
})

export const { setCategoryId, setSortType } = filterSlice.actions;

export default filterSlice.reducer;