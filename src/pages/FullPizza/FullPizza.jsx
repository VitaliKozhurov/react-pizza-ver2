import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './FullPizza.module.scss';

const FullPizza = () => {
   const { pizzaId } = useParams();
   const [pizza, setPizza] = useState();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const { data } = await axios.get(`https://63f0f6655b7cf4107e2a2f99.mockapi.io/items/${pizzaId}`);
            setPizza(data);
         } catch (error) {
            console.log('Ошибка при получении информации о пицце :(', error)
         }
      }
      fetchData();
   }, [])

   return (
      <>
         {pizza
            ? <div className={style.root}>
               <h2>{pizza.title}</h2>
               <img src={pizza.imageUrl} alt='Pizza info' />
               <p>Традиционное итальянское блюдо в виде круглой дрожжевой лепёшки, выпекаемой с уложенной сверху начинкой из томатного соуса, сыра и зачастую других ингредиентов, таких как мясо, овощи, грибы и других продуктов. </p>
               <span>Стоимость: </span><b>{pizza.price} ₽</b>
            </div>
            : <h2 className={style.loading}>Идет загрузка...</h2>
         }

      </>
   )
}

export default FullPizza;