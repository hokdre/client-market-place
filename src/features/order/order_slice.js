import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name : "order",
    initialState : {
        orders : []
    },
    reducers : {
        pushOrders : (state, action) => {
            if(action.payload.orders) {
                state.orders.push(...action.payload.orders)
            }
        },
        addOrder : (state, action )=> {
            if(action.payload.order){
                state.orders.push(action.payload.order)
            }
        },
        deleteOrder : (state, action) => {
            let orderId = action.payload.orderId
            if(orderId){
                let index = -1 

                state.orders.forEach((order, i) => {
                    if(order._id === orderId) index = i
                })
                if(index !== -1) {
                    state.orders.splice(index, 1)
                }
            }
        },
        deleteManyOrder : (state, action) => {
            let newOrders = [...state.orders]
            
            let orderIds = action.payload.orderIds
            orderIds.forEach(orderId => {
                let index = -1 
                newOrders.forEach((order, i )=> {
                    if (order._id === orderId) index = i
                })
                if(index !== 1) {
                    newOrders.splice(index, 1)
                }
            })

            state.orders = newOrders
            
        },
        updateOrder : (state, action ) => {
            let orderId = action.payload.order._id
            if(orderId){
                let index = -1 

                state.orders.forEach((order, i) => {
                    if(order._id === orderId) index = i
                })
                if(index !== -1) {
                    state.orders[index] = action.payload.order
                }
            }
        },
        setOrders : (state, action) => {
            state.orders = action.payload.orders
        }
    }
})

export const {
    addOrder,
    deleteOrder,
    updateOrder,
    deleteManyOrder,
    pushOrders,
    setOrders
} = orderSlice.actions

export const selectOrders = state => state.order.orders

export default orderSlice.reducer