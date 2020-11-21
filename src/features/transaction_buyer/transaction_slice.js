import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
    name : "transaction",
    initialState : {
        transactions : []
    },
    reducers : {
        pushTransactions : (state, action) => {
            if(action.payload.transactions) {
                state.transactions.push(...action.payload.transactions)
            }
        },
        addTransaction : (state, action )=> {
            if(action.payload.transaction){
                state.transactions.push(action.payload.transaction)
            }
        },
        deleteTransaction : (state, action) => {
            let transactionId = action.payload.transactionId
            if(transactionId){
                let index = -1 

                state.transactions.forEach((transaction, i) => {
                    if(transaction._id === transactionId) index = i
                })
                if(index !== -1) {
                    state.transactions.splice(index, 1)
                }
            }
        },
        deleteManyTransaction : (state, action) => {
            let newTransactions = [...state.transactions]
            
            let transactionIds = action.payload.transactionIds
            transactionIds.forEach(transactionId => {
                let index = -1 
                newTransactions.forEach((transaction, i )=> {
                    if (transaction._id === transactionId) index = i
                })
                if(index !== 1) {
                    newTransactions.splice(index, 1)
                }
            })

            state.transactions = newTransactions
            
        },
        updateTransaction : (state, action ) => {
            let transactionId = action.payload.transaction._id
            if(transactionId){
                let index = -1 

                state.transactions.forEach((transaction, i) => {
                    if(transaction._id === transactionId) index = i
                })
                if(index !== -1) {
                    state.transactions[index] = action.payload.transaction
                }
            }
        },
        setTransactions : (state, action) => {
            state.transactions = action.payload.transactions
        }
    }
})

export const {
    addTransaction,
    deleteTransaction,
    updateTransaction,
    deleteManyTransaction,
    pushTransactions,
    setTransactions
} = transactionSlice.actions

export const selectTransactions = state => state.transaction.transactions

export default transactionSlice.reducer