import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../../App";
import { Categories, Loader, Pagination, PizzaBlock, Sort } from "../../components";
import { setCategoryId, setSortType } from "../../redux/slices/filterSlice";


const Home = () => {
   // Контекст
   const { searchState } = useContext(SearchContext);

   // Глобальное состояние
   const dispatch = useDispatch();
   const categoryId = useSelector(({ filter }) => filter.categoryId);
   const sortType = useSelector(({ filter }) => filter.sort.sortType);
   const sortQuery = sortType.split('_');

   // Локальное состояние
   const [fetchPizzas, setPizzas] = useState([]);
   const [isLoaded, setLoad] = useState(true);
   const [currentPage, setCurrentPage] = useState(1);
   const search = searchState ? `&search=${searchState}` : '';

   // Запросы на сервер
   useEffect(() => {
      setLoad(true);
      // параметр sortBy, определяет сортировку, order - порядок, asc(возрастание), desc(убывание)
      fetch(`https://63f0f6655b7cf4107e2a2f99.mockapi.io/items?page=${currentPage}&limit=4&${categoryId ? `category=${categoryId}` : ''}&sortBy=${sortQuery[0]}&order=${sortQuery[1]}${search}`)
         .then(response => response.json())
         .then(data => {
            setPizzas(data);
            setLoad(false);
         })
         .catch(error => console.log(error));

      window.scrollTo(0, 0);// При возврате на главную страницу будем скролить ее вверх
   }, [categoryId, sortType, searchState, currentPage]);


   const skeletons = [...new Array(10)].map((el, ind) => <Loader key={ind} />);
   const pizzas = fetchPizzas.map(el => (<PizzaBlock key={el.id} {...el} />));

   // Обработчики изменения глобального стора
   const onChangeCategory = (id) => {
      dispatch(setCategoryId(id))
   }

   const onChangeSort = (id) => {
      dispatch(setSortType(id))
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
               {isLoaded
                  ? skeletons
                  : pizzas}
            </div>
            <Pagination onPageChange={setCurrentPage} />
         </div>
      </>
   )
}

export default Home;
