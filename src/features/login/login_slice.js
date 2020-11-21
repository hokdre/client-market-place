import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    URL_LOGIN_CUSTOMER,
    URL_LOGIN_ADMIN
} from '../../api/api'
import Axios from 'axios';
import { action_error_format } from '../action_error_format';

export const IDLE = "IDLE"
export const LOADING = "LOADING"
export const SUCCESS = "SUCCESS"
export const FAILED = "FAILED"
export const LOGIN_ADMIN = "ADMIN"
export const LOGIN_CUSTOMER = "CUSTOMER"

/**
 * POST : /login-customers
*/
export const loginCustomerAsyncThunk = createAsyncThunk("login/customer", async (payload, { rejectWithValue }) => {
    let {email , password } = payload
    try {
        let response = await Axios.post(URL_LOGIN_CUSTOMER(), {
            email : email,
            password : password
        })
        return response.data.data
    }catch(err) {
        return rejectWithValue(action_error_format(err))
    }
   
})

export const loginAdminAsyncThunk = createAsyncThunk("login/admin", async(payload, { rejectWithValue }) => {
    let {email , password } = payload
    try {
        let response = await Axios.post(URL_LOGIN_ADMIN(), {
            email : email,
            password : password
        })
        let serverResponse = response.data
        return serverResponse.data
    }catch(err) {
        return rejectWithValue(action_error_format(err))
    }
})

export const loginSlice = createSlice({
    name : "login",
    initialState : {
        isLogin : false,
        response : {
            loading : false,
            httpCode : '',
            error_message : '',
            errors : [],
            success : false
        },
        credential : {
            userID : "",
            cartID : "",
            email : "",
            merchantID : "",
            loginType : ""
        },
    },
    reducers : {
        checkLogin : state => {
            let token = localStorage.getItem("token")
            if(token){
                state.isLogin = true
            }
            let userID = localStorage.getItem("userID")
            if(userID) {
                state.credential.userID = userID
            }
            let cartID = localStorage.getItem("cartID")
            if(cartID) {
                state.credential.cartID = cartID
            }
            let email = localStorage.getItem("email")
            if(email) {
                state.credential.email = email
            }
            let merchantID = localStorage.getItem("merchantID")
            if(merchantID) {
                state.credential.merchantID = merchantID
            }
            let loginType = localStorage.getItem("loginType")
            if(loginType) {
                state.credential.loginType = loginType
            }
        },
        logOut : state => {
            localStorage.clear()
            state.isLogin = false
        },
        logIn : (state, action) => {
            state.isLogin = true
            let { user_id, merchant_id, cart_id, email, login_type } = action.payload.credential
            state.credential.loginType = login_type
            state.credential.userID = user_id
            state.credential.merchant_id = merchant_id
            state.credential.cartID = cart_id
            state.credential.email = email

            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("userID", user_id)
            localStorage.setItem("merchantID", merchant_id)
            localStorage.setItem("cartID", cart_id)
            localStorage.setItem("email", email)
            localStorage.setItem("loginType", login_type)
        }
    }
})

export const { checkLogin, logOut, logIn } = loginSlice.actions
export default loginSlice.reducer

/**
 * SELECTOR 
*/
export const selectCredential = state =>  state.login.credential
export const selectIsLogin = state => state.login.isLogin

