import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart, NotFound, FullPizza } from './pages';
import './scss/app.scss';

function App() {

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/pizza/:pizzaId' element={<FullPizza />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;