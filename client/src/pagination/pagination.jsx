import React from 'react'

export default function Paginate({ recipesPerPage, allRecipes, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <div>
        {pageNumbers.map((number) => {
          return (
            <div key={number} onClick={() => paginate(number)}>
              <span >{number}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}