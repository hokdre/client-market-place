import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const IDLE = "IDLE"
export const LOADING = "LOADING"
export const SUCCESS = "SUCCESS"
export const FAILED = "FAILED"

import {
    LOGIN_CUSTOMER, 
    LOGIN_ADMIN
} from '../../api/api'
import Axios from 'axios';
/**
 * POST : /login-customers
*/
export const loginCustomerAsyncThunk = createAsyncThunk("login/customer", async (payload) => {
    let {email , password } = payload
    let response = await Axios.post(LOGIN_CUSTOMER, {
        email : email,
        password : password
    })
})

export const loginSlice = createSlice({
    name : "login",
    initialState : {
        status : IDLE,
        error : '',
        isLogin : false
    },
    extraReducers: {
        [loginCustomerAsyncThunk.pending]: (state, action) => {
            state.status = LOADING
        },
        [loginCustomerAsyncThunk.rejected] : (state, action) => {
            state.status = FAILED
        },
        [loginCustomerAsyncThunk.fulfilled] : (state, action) => {
            state.status = SUCCESS
        }
    }
})

