import Axios from 'axios';
import { action_error_format } from '../action_error_format';

import  { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const { URL_GET_MERCHANT_BYID } = require("../../api/api");

export const getMerchantPribadiAsyncThunk= createAsyncThunk("merchant/getPribadiID", async (id, {rejectWithValue}) => {
    try {
        let response = await Axios.get(URL_GET_MERCHANT_BYID(id),{
            headers : {
                token : localStorage.getItem("token")
            }
        })
        return response.data.data
    }catch(err){
       return rejectWithValue(action_error_format(err))
    }
})

const merchantSlice = createSlice({
    name : "merchant",
    initialState : {
        merchant : {
            _id : "",
            name : "",
            address : {},
            etalase : [],
            avatar : "",
            phone : "",
            description : "",
            products : {},
            reviews : [],
            rating : 0,
            shippings : [],
            bank_accounts : [],
            created_at : "",
            updated_at : ""
        },
        merchants :[]
    },
    reducers : {
        updateMerchantAddress : (state, action) => {
            state.merchant.address = action.payload.address
        },
        updateMerchantBasicInfo : (state, action) => {
            let { basicInfo } = action.payload
            state.merchant.phone = basicInfo.phone
            state.merchant.description = basicInfo.description
            state.merchant.address = basicInfo.address
        },
        addMerchantShipping : (state, action) => {
            state.merchant.shippings.push(action.payload.shipping)
        },
        deleteMerchantShipping : (state, action) => {
            let index = -1
            state.merchant.shippings.forEach((shipping, i) => {
                if(shipping._id === action.payload.shipping._id){
                    index = i
                }
            })
            if(index !== -1) {
               state.merchant.shippings.splice(index, 1)
            }
        },
        updateMerchantAvatar : (state, action) => {
            let { avatar } = action.payload
            state.merchant.avatar = avatar
        },
        addMerchantBank : (state, action) => {
            let { bankAccount } = action.payload
            state.merchant.bank_accounts.push(bankAccount)
        },
        updateMerchantBank : (state, action ) => {
            let { bankAccount } = action.payload
            let index = -1
            state.merchant.bank_accounts.forEach((bank,i)=> {
                if(bank._id === bankAccount._id){
                    index = i
                }
            })
            if(index != -1){
                state.merchant.bank_accounts[index] = bankAccount
            }
        },
        fetchMerchantProduct : (state, action) => {
            let etalase = action.payload.etalase
            let products = action.payload.products
            if(state.merchant.products[etalase]){
                if(products) {
                    state.merchant.products[etalase] = [
                        ...state.merchant.products[etalase],
                        ...products
                    ]
                }
            }else{
                if(products){
                    state.merchant.products[etalase] = products
                }
            }
        },
        addMerchantProduct : (state, action) => {
            let etalase = action.payload.etalase
            if(!state.merchant.products[etalase]){
                state.merchant.products = {...state.merchant.products, [ etalase ] : [ action.payload.product ]}
            }else{
                state.merchant.products[etalase].unshift(action.payload.product)
            }
        },
        updateMerchantProduct : (state, action) => {
            let etalase = action.payload.etalase
            let newEtalase = action.payload.newEtalase

            let index = -1 
            if(state.merchant.products[etalase]){
                if(state.merchant.products[etalase]){
                    state.merchant.products[etalase].forEach((product, i) => {
                        if(product._id === action.payload.product._id) {
                            index = i
                        }
                    })
                }
            }
            if(index !== -1){
                let product = action.payload.product
                if(etalase !== newEtalase) {
                    //remove product from old etalase
                    state.merchant.products[etalase].splice(index, 1)
                    //add product to new etalase
                    if(state.merchant.products[newEtalase]) {
                        state.merchant.products[newEtalase].unshift(product)
                    }else{
                        state.merchant.products[newEtalase]=[product]
                    }
                }else {
                    //just update product in etalase
                    state.merchant.products[etalase][index] = product
                }
            }
        },
        deleteMerchantProduct : (state, action) => {
            let etalase = action.payload.etalase
            let index = -1 
            if(state.merchant.products[etalase]){
                state.merchant.products[etalase].forEach((product, i) => {
                    if(product._id === action.payload.product._id) {
                        index = i
                    }
                })
            }
            if(index !== -1){
                state.merchant.products[etalase].splice(index, 1)
            }
        },
        addMerchantEtalase : (state, action) => {
            state.merchant.etalase.push(action.payload.etalase)
        },
        deleteMerchantEtalase : (state, action) => {
            let index = -1
            state.merchant.etalase.forEach((name, i )=> {
                if(name === action.payload.etalase){
                    index = i
                }
            })
            if(index != -1) {
               state.merchant.etalase.splice(index, 1)
            }
        },
        fetchMerchants : (state, action) => {
            state.merchants = action.payload.merchants
        },
        registerMerchant : (state, action) => {
            let merchant = action.payload.merchant

            localStorage.setItem("merchantID", merchant._id)
            if(!merchant.bank_accounts) merchant.bank_accounts = []
            if(!merchant.products) merchant.products = []
            if(!merchant.etalase) merchant.etalase = []
            if(!merchant.shipping) merchant.shipping = []
            state.merchant = merchant
        },
        reset : (state, action) => {
            state.merchant = {
                _id : "",
                name : "",
                address : {},
                etalase : [],
                avatar : "",
                phone : "",
                description : "",
                products : {},
                reviews : [],
                rating : 0,
                shippings : [],
                bank_accounts : [],
                created_at : "",
                updated_at : ""
            }
            state.merchants = []
        }
    },
    extraReducers : {
        [getMerchantPribadiAsyncThunk.fulfilled] : (state, action) => {
            if(!action.payload.bank_accounts) { action.payload.bank_accounts = []}
            if(!action.payload.shippings) { action.payload.shippings = []}
            if(!action.payload.products) {
                action.payload.products = {}
            }
            if(!action.payload.etalase) {
                action.payload.etalase = []
            }
            localStorage.setItem("merchantID", action.payload._id)
            state.merchant = action.payload
        }
    }
})

export const { 
    registerMerchant,
    addMerchantShipping,
    deleteMerchantShipping,
    updateMerchantAddress,
    fetchMerchantProduct, 
    addMerchantProduct,
    updateMerchantProduct,
    deleteMerchantProduct,
    updateMerchantBasicInfo, 
    updateMerchantAvatar,
    fetchMerchants,
    addMerchantBank,
    updateMerchantBank,
    addMerchantEtalase,
    deleteMerchantEtalase,
    reset
} = merchantSlice.actions

export default merchantSlice.reducer


export const selectMerchant = state => state.merchant.merchant
export const selectMerchantEtalase = state => state.merchant.merchant.etalase
export const selectMerchants = state => state.merchant.merchants
export const selectMerchantBasicInfo = state => {
    return {
        _id : state.merchant.merchant._id,
        name : state.merchant.merchant.name,
        address : state.merchant.merchant.address,
        avatar : state.merchant.merchant.avatar,
        phone : state.merchant.merchant.phone,
        description : state.merchant.merchant.description,
        rating : state.merchant.merchant.rating,
        categories : state.merchant.merchant.categories
    }
}
export const selectMerchantProduct = state => state.merchant.merchant.products
export const selectMerchantAddress = state => state.merchant.merchant.addresses
export const selectMerchantBankAccounts = state => state.merchant.merchant.bank_accounts
export const selectMerchantShippings = state => state.merchant.merchant.shippings
export const selectMerchantProducts = state  => state.merchant.products
export const selectMerchantReviews = state => state.merchant.reviews
export const selectResponseGetOne = state => state.merchant.responseGetOne
export const selectPageData = state => state.merchant.pageData