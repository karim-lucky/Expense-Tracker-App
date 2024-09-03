import React, { useState } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { addIncome, addExpense, deleteIncome } from '@/store/expenseSlice'; // Correct path to your slice
import "./expensiveTracer.css";
import { store } from '@/store/store';

  export default function MyExpensiveTracer(){
    return <Provider store={store}>
        {/* <ExpensiveTracerxpensiveTracer />
         */}
         <ExpensiveTracer></ExpensiveTracer>
    </Provider>
  }

function ExpensiveTracer() {
    const { income, expense, balance, transactions } = useSelector((state) => state.expense);
    const dispatch = useDispatch();

   let  handleDeleteTransaction=(index)=>{
          dispatch(deleteIncome(index))
    }

    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const handleAddTransaction = () => {
        console.log("this is amoutn send to store ")
        console.log(amount)
        if (amount > 0) {
            dispatch(addIncome({ text, amount: parseFloat(amount) }));
        } else {
            dispatch(addExpense({ text, amount: Math.abs(parseFloat(amount)) }));
        }
        setText('');
        setAmount(0);
    };

    return (
        <div className="container-fluid align-items-center justify-content-center text-white d-flex" style={{ backgroundColor: "black", minHeight: "100vh" }}>
            <div className='trakerBox'>
                <div className='p-2'>
                    <h2 className="text-center bg-danger p-1">Expense Tracker</h2>

                    <div className="d-flex justify-content-between mt-2">
                        <div>
                            <h4>Your Balance</h4>
                            <h1>${balance.toFixed(2)}</h1>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center bg-white text-center mx-0" style={{ borderRadius: "8px" }}>
                        <div className="pe-4 incomeBox">
                            <span className='text-dark'><b>INCOME</b></span>
                            <h3 className="text-success">${income.toFixed(2)}</h3>
                        </div>
                        <div className="ms-3">
                            <span className='text-dark'><b>EXPENSE</b></span>
                            <h3 className="text-danger">${expense.toFixed(2)}</h3>
                        </div>
                    </div>

                    <h4>History</h4>
                    <ul className={`list-group mb-2 ${transactions.length > 3 ? 'scrollable-list' : ''}`}>
                        {transactions.map((transaction, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between">
                              <sapn><button className='mybtn' onClick={()=>handleDeleteTransaction(index)}>X</button> {transaction.text}</sapn>  
                                <span className={transaction.amount > 0 ? 'text-success' : 'text-danger'}>
                                    {transaction.amount > 0 ? `+${transaction.amount}` : `${transaction.amount}`}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <h4>Add new transaction</h4>
                    <div className="form-group">
                        <label>Text</label>
                        <input
                            type="text"
                            className="form-control"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label>Amount</label><br></br>
                        <small className="form-text text-danger">
                            <b>(negative - expense, positive - income)</b>
                        </small>
                        <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-danger mt-3 w-100" onClick={handleAddTransaction}>
                        Add transaction
                    </button>
                </div>
            </div>
        </div>
    );
}

 