import React from 'react';
import { MdSend } from 'react-icons/md';

// Main:
const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='charge'>charge</label>
          <input
            type='text'
            className='form-control'
            id='charge'
            name='charge'
            placeholder='E.g. Rent'
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>amount</label>
          <input
            type='number'
            className='form-control'
            id='amount'
            name='amount'
            placeholder='E.g. 1500'
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type='submit' className='btn  '>
        {edit ? 'Edit' : 'Submit'}
        <MdSend className='btn-icon'></MdSend>
      </button>
    </form>
  );
};
export default ExpenseForm;
