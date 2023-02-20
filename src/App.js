import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart, NotFound } from './pages';
import './scss/app.scss';


export const SearchContext = React.createContext();

function App() {
  const [searchState, setSearchState] = useState('');

  return (
    <>
      <div className="wrapper">
        <SearchContext.Provider value={{ searchState, setSearchState }} >
          <Header />
          <div className="content">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </>
  );
}

export default App;