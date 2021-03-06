import React from 'react';
import Item from './ExpenseItem';
import { MdDelete } from 'react-icons/md';
// Main: Podemos ingresar directamente a Expenses gracias a Hooks
const ExpenseList = ({ expenses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      <ul className='list'>
        {expenses.map((item) => {
          return (
            <Item
              key={item.id}
              expense={item}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            ></Item>
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className='btn' onClick={clearItems}>
          Clear List <MdDelete className='btn-icon'></MdDelete>
        </button>
      )}
    </>
  );
};

export default ExpenseList;
