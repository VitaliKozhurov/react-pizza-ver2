import { useState, useEffect } from "react";
import { Categories, Loader, PizzaBlock, Sort } from "../../components";


const Home = () => {
   const [fetchPizzas, setPizzas] = useState([]);
   const [isLoaded, setLoad] = useState(true);
   const [categoryId, setCategoryId] = useState(0);
   const [sortType, setSortType] = useState('rating');

   useEffect(() => {
      setLoad(true);
      // параметр sortBy, определяет сортировку, order - порядок, asc(возрастание), desc
      fetch(`https://63f0f6655b7cf4107e2a2f99.mockapi.io/items?${categoryId ? `category=${categoryId}` : ''}&sortBy=${sortType}&order=asc`)
         .then(response => response.json())
         .then(data => {
            setPizzas(data);
            setLoad(false);
         })
         .catch(error => console.log(error));

      window.scrollTo(0, 0);// При возврате на главную страницу будем скролить ее вверх
   }, [categoryId, sortType])

   return (
      <>
         <div className="container">
            <div className="content__top">
               <Categories catId={categoryId} onChangeCategory={id => setCategoryId(id)} />
               <Sort type={sortType} onChangeSort={id => setSortType(id)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
               {isLoaded
                  ? [...new Array(10)].map((el, ind) => <Loader key={ind} />)
                  : fetchPizzas.map(el => (
                     <PizzaBlock
                        key={el.id}
                        {...el}
                     />
                  ))}
            </div>
         </div>
      </>
   )
}

export default Home;
