import style from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
   return (
      <div className={style.mainText}>
         <h1 >
            Ничего не найдено   😔
         </h1>
         <p>К сожалению данная страница отсутствует в нашем интернет-магазине</p>
      </div>
   )
}

export default NotFoundBlock;