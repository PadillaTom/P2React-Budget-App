import React, { useState } from 'react';
import './App.css';
import ExpenseList from './Components/ExpenseList';
import ExpenseForm from './Components/ExpenseForm';
import Alert from './Components/Alert';
import { v4 as uuidv4 } from 'uuid';

// Dummy Values:
const initialExpenses = [
  { id: uuidv4(), charge: 'rent', amount: 1600 },
  { id: uuidv4(), charge: 'car', amount: 400 },
  { id: uuidv4(), charge: 'CC bill', amount: 1200 },
];
// console.log(initialExpenses); // Vemos nuestras uuidv4
//
// Main:
function App() {
  // console.log(useState()); // Vemos la Array [value, function]
  // ********* State Values ************
  // Array destructure Para alojar Valores de Hook --->
  const [expenses, setExpenses] = useState(initialExpenses);
  // console.log(expenses); // Vemos que funciona!
  // Single Expense: (State Value)
  const [charge, setCharge] = useState(''); //  Damos Valor inicial al State: EMPTY
  // Single Amount: (State Value)
  const [amount, setAmount] = useState(''); //  Damos Valor inicial al State: EMPTY
  // ---> Luego iremos Alojando Valores al State <---
  // Alert:
  const [alert, setAlert] = useState({ show: false });
  // ---> Usaremos dicha alert en la Function

  //
  // ********* Functionality ***********
  // Dichas Functions las tendremos que pasar en el FORM <----------------
  // Handle Charge --> Pasaremos los valores escritos de input  directamente al State Empty
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(charge, amount); // Vemos que Tenemos Ambos Valores
    // Entonces ---> Deberiamos pasar dichos valores al Expenses Array.
    // If not empty
    if (charge !== '' && amount > 0) {
      // Creamos un Objeto para alojarlo en el Array:
      const singleExpense = { id: uuidv4(), charge, amount };
      // Initial State: NO PODEMOS PASAR OBJECT, tenemos que pasar el Array que contengan Objects
      // Ademas: Deberá contener lo anterior: Spread operator
      setExpenses([...expenses, singleExpense]);
      // Limpiamos los Values de los Inputs:
      setCharge('');
      setAmount('');
      // Alert ------>  SI hay valores pasados (charge y amount)
      handleAlert({ type: 'success', text: 'Item Added' });
    } else {
      //Handle Alert -----> SI NO HAY VALORES
      handleAlert({ type: 'danger', text: `Cannot be Empty` });
    }
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });

    // Que desaparezca a los 2.5s --> Mostrando False nuevamente
    setTimeout(() => {
      setAlert({ show: false });
    }, 2500);
  };

  // ********** Return ***************
  return (
    <React.Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text}></Alert>}
      <Alert></Alert>
      <h1>Budget calculator</h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        ></ExpenseForm>
        <ExpenseList expenses={expenses}></ExpenseList>
      </main>
      <h1>
        total spending:{' '}
        <span className='total'>
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </React.Fragment>
  );
}

export default App;
