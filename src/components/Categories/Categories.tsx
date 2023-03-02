const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
   catId: number;
   onChangeCategory: (ind: number) => void;
}


const Categories: React.FC<CategoriesProps> = ({ catId, onChangeCategory }) => {
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
}

export default Categories;