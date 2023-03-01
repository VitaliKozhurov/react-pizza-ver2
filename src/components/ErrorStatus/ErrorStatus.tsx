import React from "react";

const ErrorStatus: React.FC = () => {
   return (
      <>
         <div className="container container--cart">
            <div className="cart cart--empty">
               <h2 style={{ fontWeight: 800, padding: '50px' }}>Произошла ошибка <span>😕</span></h2>
               <p style={{ fontSize: "24px", padding: '20px 0px 70px 0px' }}>
                  К сожалению не удалось получить пиццы. Вероятней всего, сервер недоступен.<br />
                  Попробуйте повторить попытку позже.
               </p>
            </div>
         </div>
      </>
   )
}

export default ErrorStatus;