import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

//
// Main: ---> Pasamos EXPENSE porque alojamos dicho valor en ExpenseList como EXPENSE
const ExpenseItem = ({ expense }) => {
  const { id, charge, amount } = expense;
  return (
    <li className='item'>
      <div className='info'>
        <span className='expense'>{charge}</span>
        <span className='amount'>$ {amount}</span>
      </div>
      <div>
        <button className='edit-btn' aria-label='edit button'>
          <MdEdit></MdEdit>
        </button>
        <button className='clear-btn' aria-label='delete button'>
          <MdDelete></MdDelete>
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
