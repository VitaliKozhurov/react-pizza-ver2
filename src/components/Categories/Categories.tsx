import { useWhyDidYouUpdate } from "ahooks";
import React from "react";

const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
   catId: number;
   onChangeCategory: (ind: number) => void;
}


const Categories: React.FC<CategoriesProps> = React.memo(({ catId, onChangeCategory }) => {
   useWhyDidYouUpdate('Categories', { catId, onChangeCategory })
   return (
      <>
         <div className="categories">
            <ul>
               {categories.map((el, ind) => (
                  <li
                     key={el + ind}
                     className={catId === ind ? 'active' : ''}
                     onClick={() => onChangeCategory(ind)}
                  >
                     {el}
                  </li>
               ))}
            </ul>
         </div>
      </>
   )
})

export default Categories;