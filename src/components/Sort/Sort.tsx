import { useEffect, useRef, useState } from "react";

type SortItem = {
   name: string;
   sortProp: string;
}

type SortProps = {
   type: string;
   onChangeSort: any;
}

type PopupClick = React.MouseEvent<HTMLBodyElement> & {
   path: Node[]
};

const Sort: React.FC<SortProps> = ({ type, onChangeSort }) => {
   const sortArr: SortItem[] = [
      { name: 'популярности ⬆️', sortProp: 'rating_asc' },
      { name: 'популярности ⬇️', sortProp: 'rating_desc' },
      { name: 'цене ⬆️', sortProp: 'price_asc' },
      { name: 'цене ⬇️', sortProp: 'price_desc' },
      { name: 'алфавиту ⬆️', sortProp: 'title_asc' },
      { name: 'алфавиту ⬇️', sortProp: 'title_desc' },
   ];

   const [isOpen, setIsOpen] = useState(false);
   const sortName = sortArr.find(el => el.sortProp === type)?.name; // Опциональная цепочка
   const sortElem = useRef<HTMLDivElement>(null);

   const onClickSort = () => {
      setIsOpen(prevState => !prevState)
   }

   // Используем useRef для закрытия попапа при клике вне его.
   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         const _event = e as PopupClick;
         const docElem = _event.composedPath();
         if (sortElem.current && !docElem.includes(sortElem.current)) {
            setIsOpen(false)
         }
      }
      // composedPath представляет массив из Dom элементов, по которым происходило всплытие события, если в этом массиве не будет popUp, значит клик произошел вне его
      document.body.addEventListener('click', handleClickOutside);

      // Чтобы обработчики не накапливались, необходимо их удалять при размонтировании компонента
      return () => document.body.removeEventListener('click', handleClickOutside);
   }, [])

   return (
      <>
         <div ref={sortElem} className="sort">
            <div className="sort__label">
               <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={!isOpen ? 'open' : ''}
               >
                  <path
                     d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                     fill="#2C2C2C"
                  />
               </svg>
               <b>Сортировка по:</b>
               <span
                  onClick={onClickSort}
               >
                  {sortName}
               </span>
            </div>
            {isOpen && <div className="sort__popup">
               <ul>
                  {sortArr.map((el) => (
                     <li
                        key={el.name}
                        className={type === el.sortProp ? 'active' : ''}
                        onClick={() => {
                           onChangeSort(el.sortProp);
                           onClickSort();
                        }}
                     >
                        {el.name}
                     </li>
                  ))}
               </ul>
            </div>}
         </div>
      </>
   )
}

export default Sort;