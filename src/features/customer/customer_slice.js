import Axios from 'axios';
import moment from 'moment';
import { action_error_format } from '../action_error_format';

import  { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const { URL_REGISTER_CUSTOMER, URL_GET_CUSTOMER_BYID } = require("../../api/api");

export const registerCustomerAsyncThunk = createAsyncThunk("customer/register", async(payload, { rejectWithValue }) => {
    try {
        let response = await Axios.post(URL_REGISTER_CUSTOMER(), {
            email : payload.email,
            name : payload.name,
            phone : payload.phone,
            born : payload.born,
            "birth_day" : payload.birthDay ? moment(payload.birthDay).format() : null,
            password : payload.password,
            "re_password" : payload.rePassword,
            gender : payload.gender,
            addresses : payload.addresses,

        })
        return response.data.data
    }catch(err) {
        return rejectWithValue(action_error_format(err))
    } 
})
/*
Get /admins/id
*/
export const getCustomerAsyncThunk= createAsyncThunk("customer/getById", async (id, {rejectWithValue}) => {
    try {
        let response = await Axios.get(URL_GET_CUSTOMER_BYID(id),{
            headers : {
                token : localStorage.getItem("token")
            }
        })
        return response.data.data
    }catch(err){
        return rejectWithValue(action_error_format(err))
    }
})

const customerSlice = createSlice({
    name : "customer",
    initialState : {
        customer : {
            _id : "",
            cart_id : "",
            merchant_id : "",
            name : "",
            email :"",
            addresses : [],
            born : "",
            birth_day : "",
            phone : "",
            avatar : "",
            gender : "",
            bank_accounts : [],
            confrimed : false,
            created_at : "",
            updated_at : ""
        },
        customers :[],
        responseGetOne : {
            httpCode : "",
            error_message : "",
            errors : [],
            loading : false,
            success : false
        },
        responseRegister : {
            httpCode : "",
            error_message : "",
            errors : [],
            loading : false,
            success : false
        }
    },
    reducers : {
        resetCustomer : state => {
            state.customer.id = ""
            state.customer.email = ""
            state.customer.name = ""
            state.customer.addresses = []
            state.customer.born = ""
            state.customer.birthDay = ""
            state.customer.phone = ""
            state.customer.avatar = ""
            state.customer.gender = ""
        },
        addCustomerAddress : (state, action) => {
            state.customer.addresses.push(action.payload.address)
        },
        updateCustomerAddress : (state, action) => {
            let index = -1
            state.customer.addresses.forEach((add, i) =>{
                if(action.payload.address._id === add._id) {
                    index = i
                }
            })
            if(index != -1){
                state.customer.addresses[index] = action.payload.address
            }
        },
        deleteCustomerAddress : (state, action) => {
            let index = -1
            state.customer.addresses.forEach((add, i) =>{
                if(action.payload.address._id === add._id) {
                    index = i
                }
            })
            if(index != -1){
              state.customer.addresses.splice(index, 1)
            }
        },
        updateCustomerBasicInfo : (state, action) => {
            let { basicInfo } = action.payload
            state.customer.name = basicInfo.name
            state.customer.born = basicInfo.born
            state.customer.birth_day = basicInfo.birth_day
            state.customer.phone = basicInfo.phone
            state.customer.gender = basicInfo.gender
        },
        updateCustomerAvatar : (state, action) => {
            let { avatar } = action.payload
            state.customer.avatar = avatar
        },
        addCustomerBank : (state, action) => {
            let { bankAccount } = action.payload
            state.customer.bank_accounts.push(bankAccount)
        },
        updateCustomerBank : (state, action ) => {
            let { bankAccount } = action.payload
            let index = -1
            state.customer.bank_accounts.forEach((bank,i)=> {
                if(bank._id === bankAccount._id){
                    index = i
                }
            })
            if(index != -1){
                state.customer.bank_accounts[index] = bankAccount
            }
        },
        fetchCustomers : (state, action) => {
            state.customers = action.payload.customers
        },
        resetCustomers : state => {           
            state.customers = []
        },
        resetResponseGetOne : state => {
            state.responseRegister.httpCode = ""
            state.responseRegister.error_message = ""
            state.responseRegister.errors = []
            state.responseRegister.loading = false
            state.responseRegister.success = false
        },
        resetResponseRegister : state => {
            state.responseRegister.httpCode = ""
            state.responseRegister.error_message = ""
            state.responseRegister.errors = []
            state.responseRegister.loading = false
            state.responseRegister.success = false
        },
        reset : (state, action) => {
            state.customer = {
                _id : "",
                cart_id : "",
                merchant_id : "",
                name : "",
                email :"",
                addresses : [],
                born : "",
                birth_day : "",
                phone : "",
                avatar : "",
                gender : "",
                bank_accounts : [],
                confrimed : false,
                created_at : "",
                updated_at : ""
            }
            state.customers = []
            state.responseGetOne = {
                httpCode : "",
                error_message : "",
                errors : [],
                loading : false,
                success : false
            }
            state.responseRegister = {
                httpCode : "",
                error_message : "",
                errors : [],
                loading : false,
                success : false
            }
        }
    },
    extraReducers : {
        [registerCustomerAsyncThunk.pending] : (state, action) => {
            state.responseRegister.loading = true
            state.responseRegister.success = false
        },
        [registerCustomerAsyncThunk.rejected] : (state, action) => {
            state.responseRegister.loading = false
            state.responseRegister.success = false
            state.responseRegister.httpCode = action.payload.httpCode
            state.responseRegister.error_message = action.payload.error_message
            state.responseRegister.errors = action.payload.errors 
        },
        [registerCustomerAsyncThunk.fulfilled] : (state, action) => {
            state.responseRegister.success = true
            state.responseRegister.loading = false
            state.responseRegister.httpCode = ""
            state.responseRegister.error_message = ""
            state.responseRegister.errors = []
        },
        [getCustomerAsyncThunk.pending] : (state, action) => {
            state.responseGetOne.loading = true
            state.responseGetOne.success = false
        },
        [getCustomerAsyncThunk.rejected] : (state, action) => {
            state.responseGetOne.loading = false
            state.responseGetOne.success = false
            state.responseGetOne.httpCode = action.payload.httpCode
            state.responseGetOne.error_message = action.payload.error_message
            state.responseGetOne.errors = action.payload.errors 
        },
        [getCustomerAsyncThunk.fulfilled] : (state, action) => {
            state.responseGetOne.success = true
            state.responseGetOne.loading = false
            if(!action.payload.bank_accounts) { action.payload.bank_accounts = []}
            state.customer = action.payload
            state.responseGetOne.httpCode = ""
            state.responseGetOne.error_message = ""
            state.responseGetOne.errors = []
        }
    }
})

export const { 
    resetCustomer, 
    resetCustomers, 
    resetResponseRegister,
    resetResponseGetOne, 
    addCustomerAddress,
    updateCustomerAddress, 
    deleteCustomerAddress, 
    updateCustomerBasicInfo, 
    updateCustomerAvatar,
    fetchCustomers,
    addCustomerBank,
    updateCustomerBank,
    reset
} = customerSlice.actions

export default customerSlice.reducer


export const selectCustomer = state => state.customer.customer
export const selectCustomerBasicInfo = state => {
    return {
        _id : state.customer.customer._id,
        email : state.customer.customer.email,
        name : state.customer.customer.name,
        born : state.customer.customer.born,
        birth_day : state.customer.customer.birth_day,
        phone : state.customer.customer.phone,
        avatar : state.customer.customer.avatar,
        gender : state.customer.customer.gender
    }
}
export const selectCustomerAddress = state => state.customer.customer.addresses
export const selectCustomerBankAccounts = state => state.customer.customer.bank_accounts
export const selectCustomers = state => state.customer.customers
export const selectResponseGetOne = state => state.customer.responseGetOne
export const selectResponseRegister = state => state.customer.responseRegister
