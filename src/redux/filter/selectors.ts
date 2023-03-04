import { RootState } from "../store";

export const selectCategoryId = ({ filter }: RootState) => filter.categoryId;
export const selectSortType = ({ filter }: RootState) => filter.sort.sortType;
export const selectCurrentPage = ({ filter }: RootState) => filter.pageId;
export const selectorSearchValue = ({ filter }: RootState) => filter.searchValue;