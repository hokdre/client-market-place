import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import { URL_GET_CART_BY_ID } from '../../api/api';
import { action_error_format } from '../action_error_format';

export const getCartByID = createAsyncThunk("cart/getById", async (id, { rejectWithValue }) => {
    try{
        let response = await Axios.get(URL_GET_CART_BY_ID(id), {
            headers : {
                token : localStorage.getItem("token")
            }
        })

        return response.data.data
    }catch(error){
        return rejectWithValue(action_error_format(error))
    }
})

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        _id : "",
        items : [],
        created_at : "",
        updated_at : "",
        itemOrders : []   
    },
    reducers : {
        addItem : (state, action )=> {
            if(action.payload.item){
                let index = -1
                state.items.forEach((item, i) => {
                    if(item.product._id === action.payload.item.product._id){
                        index = i
                    }
                })
                if (index !== -1){
                    state.items[index].quantity++
                }else{
                    state.items.push(action.payload.item)
                }
            }
        },
        deleteItem : (state, action) => {
            let productId = action.payload.productId
            if(productId){
                let index = -1 

                state.items.forEach((item, i) => {
                    if(item.product._id === productId) index = i
                })
                if(index !== -1) {
                    state.items.splice(index, 1)
                }
            }
        },
        deleteManyItem : (state, action) => {
            let newItems = [...state.items]
            
            let productIds = action.payload.productIds
            productIds.forEach(productId => {
                let index = -1 
                newItems.forEach((item, i )=> {
                    if (item.product._id === productId) index = i
                })
                if(index !== 1) {
                    newItems.splice(index, 1)
                }
            })

            state.items = newItems
            
        },
        updateItem : (state, action ) => {
            let productId = action.payload.item.product._id
            if(productId){
                let index = -1 

                state.items.forEach((item, i) => {
                    if(item.product._id === productId) index = i
                })
                if(index !== -1) {
                    state.items[index] = action.payload.item
                }
            }
        },
        setItemOrders : (state, action) => {
            state.itemOrders = action.payload.itemOrders
        },
        clearCart : state => {
            state.items = []
        } 
    },
    extraReducers : {
        [getCartByID.fulfilled] : (state, action) => {
            state._id = action.payload._id
            state.items = action.payload.items
            state.created_at = action.payload.created_at
            state.updated_at = action.payload.updated_at
        }
    }
})

export const {
    addItem,
    deleteItem,
    updateItem,
    setItemOrders,
    clearCart,
    deleteManyItem
} = cartSlice.actions

export const selectItems = state => state.cart.items

export const selectItemsGroupByMerchant = state => {
    let itemsGropByMerchant = {}
    state.cart.items.forEach(item => {
        if(itemsGropByMerchant[item.merchant._id]) {
            itemsGropByMerchant[item.merchant._id].push(item)
        }else{
            itemsGropByMerchant[item.merchant._id] = [item]
        }
    })
    return itemsGropByMerchant
}

export const selectItemOrders = state => state.cart.itemOrders

export default cartSlice.reducer