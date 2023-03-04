import { lazy, Suspense } from 'react';
import Loadable from 'react-loadable';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home } from './pages';
import './scss/app.scss';

const Cart = Loadable({
  loader: () => import('./pages/Cart/Cart'),
  loading: () => <div>Loading Cart...</div>,
});

//const Cart = lazy(() => import(/*webpackChunkName: "Cart"*/'./pages/Cart/Cart'));
const FullPizza = lazy(() => import(/*webpackChunkName: "FullPizza"*/'./pages/FullPizza/FullPizza'));
const NotFound = lazy(() => import(/*webpackChunkName: "NotFound"*/'./pages/Not_found/NotFound'));




function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/pizza/:pizzaId' element={
              <Suspense fallback={<div>Loading pizza info...</div>}>
                <FullPizza />
              </Suspense>
            } />
            <Route path='*' element={
              <Suspense fallback={<div>Loading...</div>}>
                <NotFound />
              </Suspense>
            } />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
