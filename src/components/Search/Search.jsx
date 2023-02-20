import { useContext, useState, useRef, useCallback } from 'react';
import { SearchContext } from '../../App';
import style from './Search.module.scss';
// Функция debounce, для отложенных действий
const debounce = (callBack, ms) => {
   let timeout;
   return function (...args) {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
         callBack.apply(this, args)
      }, ms)
   }
}

const Search = () => {
   const { searchState, setSearchState } = useContext(SearchContext);
   const [inputState, setInputState] = useState('');
   const inputRef = useRef(null); // Для взаимодействия с DOM элементами

   const onClickClear = () => {
      setSearchState('');
      setInputState('');
      inputRef.current.focus();
   }


   const update = useCallback(debounce(setSearchState, 300), []);

   const onChangeInput = (event) => {
      setInputState(event.target.value);
      update(event.target.value);
   }

   return (
      <>
         <div className={style.root}>
            <input
               ref={inputRef}
               onChange={event => onChangeInput(event)}
               value={inputState}
               className={style.input}
               placeholder='Поиск пиццы...'
            />
            <svg className={style.icon} height="800px" width="800px" version="1.1" id="Capa_1"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 54.971 54.971">
               <circle style={{ fill: '#556080' }} cx="20" cy="20.379" r="20" />
               <path style={{ fill: '#8697CB' }} d="M53.799,47.763L43.314,37.278l-1.414,1.414l-6.183-5.971c-0.827,1.051-1.752,2.019-2.77,2.886  l6.124,5.914l-1.414,1.414L48.142,53.42c1.562,1.562,4.095,1.562,5.657,0C55.361,51.858,55.361,49.326,53.799,47.763z" />
               <circle style={{ fill: '#B0D3F0' }} cx="20" cy="20.379" r="16" />
            </svg>
            {inputState && (
               <svg onClick={onClickClear} className={style.clearIcon} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 9L15 15" stroke="#556080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 9L9 15" stroke="#556080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" stroke="#556080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
               </svg>)}
         </div>

      </>
   )
}

export default Search