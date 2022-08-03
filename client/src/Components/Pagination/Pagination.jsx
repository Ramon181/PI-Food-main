import React from 'react'
import './Pagination.css'

const Pagination = ({ recipesPerPege, totalRecipes, paginate, setCurrentPage, currentPage }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPege); i++) { // Consigue el Numero Redondo de la Operacion
        pageNumbers.push(i) // Pushea el nomero Conseguido     
    }


    return (
        <div className='pege-body'>
          
            <ul className='pagination'>{
                pageNumbers.map(number => (
                    <li key={number} className='li-page'>
                        <a onClick={() => paginate(number)} href='#!'>{number}</a>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default Pagination;
