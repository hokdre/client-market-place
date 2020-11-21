import moment from 'moment';
import { action_error_format } from '../action_error_format';
import Axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const { URL_REGISTER_ADMIN, URL_GET_ADMIN_BYID } = require("../../api/api");

export const registerAdminAsyncThunk = createAsyncThunk("admin/register", async(payload, { rejectWithValue }) => {
    try {
        let response = await Axios.post(URL_REGISTER_ADMIN(), {
            email : payload.email,
            name : payload.name,
            phone : payload.phone,
            born : payload.born,
            "birth_day" : moment(payload.birthDay).format(),
            password : payload.password,
            "re_password" : payload.rePassword,
            gender : payload.gender,
            addresses : [
                {
                    city : payload.city,
                    street : payload.street,
                    number : payload.houseNumber,
                    "postal_code" : payload.postalCode 
                }
            ]
        },{
            headers : {
                token : localStorage.getItem("token")
            }
        })
        return response.data.data
    }catch(err) {
        return rejectWithValue(action_error_format(err))
    } 
})
/*
Get /admins/id
*/
export const getAdminAsyncThunk= createAsyncThunk("admin/getById", async (id, {rejectWithValue}) => {
    try {
        let response = await Axios.get(URL_GET_ADMIN_BYID(id),{
            headers : {
                token : localStorage.getItem("token")
            }
        })
        return response.data.data
    }catch(err){
        return rejectWithValue(action_error_format(err))
    }
})

const adminSlice = createSlice({
    name : "admin",
    initialState : {
        admin : {
            _id : "",
            name : "",
            email :"",
            addresses : [],
            born : "",
            birth_day : "",
            phone : "",
            avatar : "",
            gender : "",
            confrimed : false,
            created_at : "",
            updated_at : ""
        },
        admins :[],
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
        resetAdmin : state => {
            state.admin.id = ""
            state.admin.email = ""
            state.admin.name = ""
            state.admin.addresses = []
            state.admin.born = ""
            state.admin.birthDay = ""
            state.admin.phone = ""
            state.admin.avatar = ""
            state.admin.gender = ""
        },
        addAdminAddress : (state, action) => {
            state.admin.addresses.push(action.payload.address)
        },
        updateAdminAddress : (state, action) => {
            let index = -1
            state.admin.addresses.forEach((add, i) =>{
                if(action.payload.address._id === add._id) {
                    index = i
                }
            })
            if(index != -1){
                state.admin.addresses[index] = action.payload.address
            }
        },
        deleteAdminAddress : (state, action) => {
            let index = -1
            state.admin.addresses.forEach((add, i) =>{
                if(action.payload.address._id === add._id) {
                    index = i
                }
            })
            if(index != -1){
              state.admin.addresses.splice(index, 1)
            }
        },
        updateAdminBasicInfo : (state, action) => {
            let { basicInfo } = action.payload
            state.admin.name = basicInfo.name
            state.admin.born = basicInfo.born
            state.admin.birth_day = basicInfo.birth_day
            state.admin.phone = basicInfo.phone
            state.admin.gender = basicInfo.gender
        },
        updateAdminAvatar : (state, action) => {
            let { avatar } = action.payload
            state.admin.avatar = avatar
        },
        fetchAdmins : (state, action) => {
            state.admins = action.payload.admins
        },
        resetAdmins : state => {           
            state.admins = []
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
            state.admin = {
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
            state.admins = []
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
        [registerAdminAsyncThunk.pending] : (state, action) => {
            state.responseRegister.loading = true
            state.responseRegister.success = false
        },
        [registerAdminAsyncThunk.rejected] : (state, action) => {
            state.responseRegister.loading = false
            state.responseRegister.success = false
            state.responseRegister.httpCode = action.payload.httpCode
            state.responseRegister.error_message = action.payload.error_message
            state.responseRegister.errors = action.payload.errors 
        },
        [registerAdminAsyncThunk.fulfilled] : (state, action) => {
            state.responseRegister.success = true
            state.responseRegister.loading = false
            state.responseRegister.httpCode = ""
            state.responseRegister.error_message = ""
            state.responseRegister.errors = []
        },
        [getAdminAsyncThunk.pending] : (state, action) => {
            state.responseGetOne.loading = true
            state.responseGetOne.success = false
        },
        [getAdminAsyncThunk.rejected] : (state, action) => {
            state.responseGetOne.loading = false
            state.responseGetOne.success = false
            state.responseGetOne.httpCode = action.payload.httpCode
            state.responseGetOne.error_message = action.payload.error_message
            state.responseGetOne.errors = action.payload.errors 
        },
        [getAdminAsyncThunk.fulfilled] : (state, action) => {
            state.responseGetOne.success = true
            state.responseGetOne.loading = false
            state.admin = action.payload
            state.responseGetOne.httpCode = ""
            state.responseGetOne.error_message = ""
            state.responseGetOne.errors = []
        }
    }
})

export const { 
    resetAdmin, 
    resetAdmins, 
    resetResponseRegister,
    resetResponseGetOne, 
    addAdminAddress,
    updateAdminAddress, 
    deleteAdminAddress, 
    updateAdminBasicInfo, 
    updateAdminAvatar,
    fetchAdmins,
    reset
} = adminSlice.actions

export default adminSlice.reducer

export const selectAdminAddress = state => state.admin.admin.addresses

export const selectAdmin = state => state.admin.admin
export const selectAdminBasicInfo = state => {
    return {
        _id : state.admin.admin._id,
        email : state.admin.admin.email,
        name : state.admin.admin.name,
        born : state.admin.admin.born,
        birth_day : state.admin.admin.birth_day,
        phone : state.admin.admin.phone,
        avatar : state.admin.admin.avatar,
        gender : state.admin.admin.gender
    }
}
export const selectAdmins = state => state.admin.admins
export const selectResponseGetOne = state => state.admin.responseGetOne
export const selectResponseRegister = state => state.admin.responseRegister
