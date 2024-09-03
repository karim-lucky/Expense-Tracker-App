import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  income: 0,
  expense: 0,
  balance: 0,
  transactions: [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addIncome: (state, action) => {
      state.income += action.payload.amount;
      state.balance += action.payload.amount;
      state.transactions.push({ text: action.payload.text, amount: action.payload.amount });
    },
    addExpense: (state, action) => {
      state.expense += action.payload.amount;
      state.balance -= action.payload.amount;
      state.transactions.push({ text: action.payload.text, amount: -action.payload.amount });
    },
    deleteIncome:(state,action)=>{
      let transaction=state.transactions[action.payload];

       if(transaction.amount>0){
              state.income -=transaction.amount;
              state.balance -=transaction.amount;
              // state.transactions.splice(action.payload,1);
       }else{
        state.expense-=Math.abs(transaction.amount);
        state.balance+=Math.abs(transaction.amount);

       }
       state.transactions.splice(action.payload,1);
    }
  },
});

export const { addIncome, addExpense,deleteIncome } = expenseSlice.actions;

export default expenseSlice.reducer;
