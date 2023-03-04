import React, { useCallback } from 'react';
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import qs from 'qs';
import { Categories, ErrorStatus, Loader, Pagination, PizzaBlock, Sort } from "../../components";

import { useNavigate } from "react-router-dom";
import { sortTypeVal, UrlParams } from '../../redux/filter/types';
import { useAppDispatch } from '../../redux/store';
import { selectCategoryId, selectCurrentPage, selectorSearchValue, selectSortType } from '../../redux/filter/selectors';
import { setCategoryId, setFilters, setPageId, setSortType } from '../../redux/filter/slice';
import { selectPizza } from '../../redux/pizzas/selectors';
import { fetchToPizzas } from '../../redux/pizzas/slice';

const Home: React.FC = () => {
   const navigate = useNavigate();

   const isGetRequest = useRef(false); // Создаем переменную, чтобы определять надо ли делать дефолтный запрос на сервер
   const isMounted = useRef(false); // Создаем переменную, которая будет определять первый раз смонтирована страница или нет

   // Глобальное состояние
   const dispatch = useAppDispatch();
   const categoryId = useSelector(selectCategoryId);
   const sortType = useSelector(selectSortType);
   const currentPage = useSelector(selectCurrentPage);
   const searchValue = useSelector(selectorSearchValue);

   const { items, status } = useSelector(selectPizza);
   const sortQuery = sortType.split('_');
   const search = searchValue ? `&search=${searchValue}` : '';

   const getPizza = async () => {
      const category = categoryId ? `&category=${categoryId}` : '';
      const sort = sortQuery[0];
      const order = sortQuery[1];

      dispatch(
         //@ts-ignore
         fetchToPizzas({ currentPage, category, sort, order, search }));
   }

   useEffect(() => {
      if (isMounted.current) {// Формируем строку запроса
         const queryString = qs.stringify({
            sortBy: sortType,
            categoryId: categoryId > 0 ? categoryId : null,
            currentPage: currentPage
         });
         // Navigate отображает в адресной строке нашу сформированную строку
         navigate(`?${queryString}`);
      }
      isMounted.current = true; // Указываем что первый рендер произошел
   }, [categoryId, sortType, currentPage])

   useEffect(() => {
      // В случае если имеется значение в адресной строке после знака ?
      // то эти параметры диспатчим в стор редакса
      if (window.location.search) {
         const params = (qs.parse(window.location.search.substring(1)) as unknown) as UrlParams;
         // Сохраняем в redux параметры из строки
         dispatch(
            setFilters(params)
         )
         /*   isGetRequest.current = true; */
      }
   }, [])

   // Запросы на сервер
   useEffect(() => {
      // При первой загрузки страницы если было какое-то значение в адресной строке сначала эти значения закидываем  в стор, а со второй и когда эти значения поменяются в сторе мы будем  почылать запрос
      getPizza();
      //isGetRequest.current = false;
      // параметр sortBy, определяет сортировку, order - порядок, asc(возрастание), desc(убывание)
      window.scrollTo(0, 0); // При возврате на главную страницу будем скролить ее вверх
   }, [categoryId, sortType, searchValue, currentPage]);


   const skeletons = [...new Array(10)].map((el, ind) => <Loader key={ind} />);
   const pizzas = items.map((el: any) => (<PizzaBlock key={el.id} {...el} />));

   // Обработчики изменения глобального стора
   const onChangeCategory = useCallback((id: number) => {
      dispatch(setCategoryId(id))
   }, []);

   const onChangeSort = useCallback((id: sortTypeVal) => {
      dispatch(setSortType(id))
   }, [])

   const onChangePage = (page: number) => {
      dispatch(setPageId(page))
   }

   return (
      <>
         <div className="container">
            <div className="content__top">
               <Categories catId={categoryId} onChangeCategory={onChangeCategory} />
               <Sort type={sortType} onChangeSort={onChangeSort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
               status === 'error'
                  ? <ErrorStatus />
                  : <div className="content__items">
                     {status === 'loading'
                        ? skeletons
                        : pizzas}
                  </div>
            }
            <Pagination onPageChange={onChangePage} currentPage={currentPage} />
         </div>
      </>
   )
}

export default Home;