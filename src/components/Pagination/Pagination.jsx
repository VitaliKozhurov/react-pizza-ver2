import style from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import React from 'react'

const Pagination = ({ onPageChange }) => {
   return (
      <ReactPaginate
         className={style.root}
         breakLabel="..."
         nextLabel="Next >"
         onPageChange={event => onPageChange(event.selected + 1)}
         pageRangeDisplayed={4}
         pageCount={3}
         previousLabel="< Prev"
         renderOnZeroPageCount={null}
      />
   )
}

export default Pagination