import { useState, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from 'qs';
import { SearchContext } from "../../App";
import { Categories, Loader, Pagination, PizzaBlock, Sort } from "../../components";
import { setCategoryId, setPageId, setSortType, setFilters } from "../../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import { fetchToPizzas } from "../../redux/slices/pizzasSlice";

const Home = () => {
   const navigate = useNavigate();

   const isGetRequest = useRef(false); // Создаем переменную, чтобы определять надо ли делать дефолтный запрос на сервер
   const isMounted = useRef(false); // Создаем переменную, которая будет определять первый раз смонтирована страница или нет

   // Контекст
   const { searchState } = useContext(SearchContext);

   // Глобальное состояние
   const dispatch = useDispatch();
   const categoryId = useSelector(({ filter }) => filter.categoryId);
   const sortType = useSelector(({ filter }) => filter.sort.sortType);
   const currentPage = useSelector(({ filter }) => filter.pageId);
   const { items, status } = useSelector((state) => state.pizza);
   const sortQuery = sortType.split('_');
   const search = searchState ? `&search=${searchState}` : '';

   const getPizza = async () => {
      const category = categoryId ? categoryId : '';
      const sort = sortQuery[0];
      const order = sortQuery[1];

      dispatch(fetchToPizzas({ currentPage, category, sort, order, search }));
   }

   useEffect(() => {
      if (isMounted.current) {// Формируем строку запроса
         const queryString = qs.stringify({
            sortBy: sortType,
            categoryId: categoryId,
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
         const params = qs.parse(window.location.search.substring(1));
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
   }, [categoryId, sortType, searchState, currentPage]);


   const skeletons = [...new Array(10)].map((el, ind) => <Loader key={ind} />);
   const pizzas = items.map(el => (<PizzaBlock key={el.id} {...el} />));

   // Обработчики изменения глобального стора
   const onChangeCategory = (id) => {
      dispatch(setCategoryId(id))
   }

   const onChangeSort = (id) => {
      dispatch(setSortType(id))
   }

   const onChangePage = (page) => {
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
            <div className="content__items">
               {status === 'loading'
                  ? skeletons
                  : pizzas}
            </div>
            <Pagination onPageChange={onChangePage} currentPage={currentPage} />
         </div>
      </>
   )
}

export default Home;