import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './Components/ExpenseList';
import ExpenseForm from './Components/ExpenseForm';
import Alert from './Components/Alert';
import { v4 as uuidv4 } from 'uuid';

// Dummy Values: Sacados una vez tenemos toda la Functionality y queremos usar Local Storage.
// const initialExpenses = [
//   { id: uuidv4(), charge: 'rent', amount: 1600 },
//   { id: uuidv4(), charge: 'car', amount: 400 },
//   { id: uuidv4(), charge: 'CC bill', amount: 1200 },
// ];
// console.log(initialExpenses); // Vemos nuestras uuidv4
//
// PARA USAR LOCAL STORAGE: GET ITEMS.
const initialExpenses = localStorage.getItem('expenses') // Ingresamos a la local: TERNARY OPERATOR
  ? JSON.parse(localStorage.getItem('expenses')) // SI TRUE: Parse a String la local
  : []; // SI FALSE: Empty Array
//
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
  // For Edit Functionality:
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  //
  //********* USE EFFECT **********/
  // USE EFFECT, PARA LOCAL STORAGE:
  // Usamos el HOOK --->
  useEffect(() => {
    // A EVITAR:
    // console.log('Use Effect');
    // Vemos que se USA TODO EL TIEMPO
    // por la cualidad de react de actualizar todo por separado.
    // ---
    // Local Storage.
    localStorage.setItem('expenses', JSON.stringify(expenses));
    // Pasamos-->  key: "expenses"  value: Array Expenses
  }, [expenses]);
  //[expenses] --> Hara que cargue SOLO CUANDO HAY UN CAMBIO EN EL STATE EXPENSES
  // [] --> Hara que cargue solo UNA VEZ AL CARGAR LA PAGE,
  // pero queremos que se actualize cuando hay cambio en nuestro state

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
    //
    // IF NOT EMPTY VALUES:
    if (charge !== '' && amount > 0) {
      //********** EDIT ************/
      if (edit) {
        // Edit: True
        let tempExpenses = expenses.map((item) => {
          // SI MATCHEA: Cambiamos charge y amount de lo que tenga ...item
          // SI NO MATCHEA: devolvemos Item normal.
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses); // Pasamos New Array
        setEdit(false); // Devolvemos Edit:False
        handleAlert({ type: 'success', text: 'Item Edited' }); // Alert de Success
      } else {
        //********* Submit Normal **********/
        // Creamos un Objeto para alojarlo en el Array:
        const singleExpense = { id: uuidv4(), charge, amount };
        // Initial State: NO PODEMOS PASAR OBJECT, tenemos que pasar el Array que contengan Objects
        // Ademas: Deberá contener lo anterior: Spread operator
        setExpenses([...expenses, singleExpense]);
        // Alert ------>  SI hay valores pasados (charge y amount)
        handleAlert({ type: 'success', text: 'Item Added' });
      }
      // Limpiamos los Values de los Inputs:
      setCharge('');
      setAmount('');
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

  //*************** Btns *******************
  // Clear All:
  const clearItems = () => {
    // console.log('Item CLEAR'); // Funciona
    setExpenses([]); // On Click pasamos un Empty Array. al State Inicial.
    handleAlert({ type: 'danger', text: 'List Cleared' });
  };
  // Delete Item:
  const handleDelete = (id) => {
    // Iteramos Array, devolvemos los que NO match el ID clickeado.
    // console.log(`Deleted: ${id}`); // Vemos que funciona
    let tempExpenses = expenses.filter((item) => item.id !== id);
    // console.log(tempExpenses); // Vemos que funciona
    setExpenses(tempExpenses); // NO PONEMOS ARRAY, YA QUE FILTER DEVUELVE ARRAY
    handleAlert({ type: 'danger', text: 'Item Deleted' });
  };

  // Edit Item:
  const handleEdit = (id) => {
    // console.log(`Edit: ${id}`); // Funciona
    // Debemos agregar dos Hooks mas. Vemos Arriba (Edit y ID)
    let expense = expenses.find((item) => item.id === id); // Si item en Array comparte ID clickeada
    // console.log(expense); // Vemos el Object: ID, charge, amount
    // 1) Destructuramos EXPENSE y pasamos dichos valores a los INPUTS
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    // 2) Edit TRUE
    setEdit(true);
    // 3) Usar el ID para re-editar el mismo Object (Se hace en HANDLE SUBMIT)
    setId(id);
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
          edit={edit}
        ></ExpenseForm>
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        ></ExpenseList>
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
