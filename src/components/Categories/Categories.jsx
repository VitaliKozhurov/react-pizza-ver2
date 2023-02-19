import { useState } from "react";
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];


const Categories = () => {
   const [catIndex, setCatIndex] = useState(0);

   const setCategory = (index) => {
      setCatIndex(index)
   }
   return (
      <>
         <div className="categories">
            <ul>
               {categories.map((el, ind) => (
                  <li
                     key={el + ind}
                     className={catIndex === ind ? 'active' : ''}
                     onClick={() => setCategory(ind)}
                  >
                     {el}
                  </li>
               ))}
            </ul>
         </div>
      </>
   )
}

export default Categories;