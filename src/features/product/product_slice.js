import Axios from 'axios';
import { action_error_format } from '../action_error_format';

import  { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const { URL_GET_PRODUCT_BYID } = require("../../api/api");

/*
Get /product/id
*/
export const getProductAsyncThunk= createAsyncThunk("product/getById", async (id, {rejectWithValue}) => {
    try {
        let response = await Axios.get(URL_GET_PRODUCT_BYID(id))
        return response.data.data
    }catch(err){
        return rejectWithValue(action_error_format(err))
    }
})

const productSlice = createSlice({
    name : "product",
    initialState : {
        product : {
            _id : "",
            name : "",
            weight : 0,
            width : 0,
            height : 0,
            long : 0,
            description : 0,
            category : {
                top : "",
                second_sub : "",
                third_sub : ""
            },
            tags : [],
            etalase : "",
            colors : [],
            sizes : [],
            photos : [],
            stock : 0,
            merchant : {},
            reviews : [],
            rating : 0
        },
        products :[],
        responseGetOne : {
            httpCode : "",
            error_message : "",
            errors : [],
            loading : false,
            success : false
        }
    },
    reducers : {
        setProduct : (state, action) => {
            state.product = action.payload.product
        },
        setProducts : (state, action) => {
            state.products = action.payload.products
        },
        setPhotos : (state, action) => {
            state.product.photos = action.payload.photos
        }
    },
    extraReducers : {
        [getProductAsyncThunk.pending] : (state, action) => {
            state.responseGetOne.loading = true
            state.responseGetOne.success = false
        },
        [getProductAsyncThunk.rejected] : (state, action) => {
            state.responseGetOne.loading = false
            state.responseGetOne.success = false
            state.responseGetOne.httpCode = action.payload.httpCode
            state.responseGetOne.error_message = action.payload.error_message
            state.responseGetOne.errors = action.payload.errors 
        },
        [getProductAsyncThunk.fulfilled] : (state, action) => {
            state.responseGetOne.success = true
            state.responseGetOne.loading = false
            if(!action.payload.colors) { action.payload.colors = []}
            if(!action.payload.sizes) { action.payload.sizes = []}
            if(!action.payload.photos) { action.payload.photos = []}
            if(!action.payload.tags) { action.payload.tags = [] }
            if(!action.payload.reviews) { action.payload.reviews = [] }
            state.product = action.payload
            state.responseGetOne.httpCode = ""
            state.responseGetOne.error_message = ""
            state.responseGetOne.errors = []
        }
    }
})

export const { setProduct, setProducts, setPhotos, setProductKeyword } = productSlice.actions

export default productSlice.reducer
export const selectProduct = state => state.product.product
export const selectProductBasicInfo = state => {
    return {
        _id : state.product.product._id,
        name : state.product.product.name, 
        weight : state.product.product.weight,
        width : state.product.product.width,
        height : state.product.product.height,
        long : state.product.product.long,
        description : state.product.product.description,
        stock : state.product.product.stock,
        rating : state.product.product.rating
    }
}
export const selectProductCategories = state => state.product.product.categories
export const selectProductColors = state => state.product.product.colors
export const selectProductSizes = state => state.product.product.sizes
export const selectProductPhotos = state => state.product.product.photos
export const selectProductReview = state => state.product.product.reviews
export const selectProducts = state => state.product.products
export const selectResponseGetOne = state => state.product.responseGetOne
export const selectResponseRegister = state => state.product.responseRegister
