const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = ({ catId, onChangeCategory }) => {
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