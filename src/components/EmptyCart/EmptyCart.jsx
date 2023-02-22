import { Link } from 'react-router-dom';
import cartImage from '../../assets/img/empty-cart.png';

function EmptyCart() {
   return (
      <>
         <div className="container container--cart">
            <div className="cart cart--empty">
               <h2 style={{ fontWeight: 800 }}>Корзина пустая <span>😕</span></h2>
               <p>
                  Вероятней всего, вы не заказывали ещё пиццу.<br />
                  Для того, чтобы заказать пиццу, перейди на главную страницу.
               </p>
               <img src={cartImage} alt="Empty cart" />
               <Link to="/" className="button button--black">
                  <span>Вернуться назад</span>
               </Link>
            </div>
         </div>
      </>
   )
}

export default EmptyCart;