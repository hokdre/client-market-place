import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ButtonBlackMedium, ButtonRedMedium, ButtonGroupsRight, ButtonTextBlackMedium } from '../../components/UI_components/button';
import { H3 } from '../../components/UI_components/heading';

import { setProduct, setProducts } from '../../features/product/product_slice'

import InputSearch from '../../components/style_components/input_search';
import PopUpDeleteProduct from './delete_product';
import { selectMerchantProduct, addMerchantProduct, fetchMerchantProduct } from '../merchant/merchant_slice';
import Axios from 'axios';
import { URL_GET_MERCHANT_PRODUCT } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';
import Loading from '../../components/UI_components/loading';
import ErrorPage from '../error/error_page';

const ListMerchantProduct = props => {
    let itemPerPage = 10
    let { etalase, merchantId } = props
    const prevEtalase = React.createRef("")

    let dispatch = useDispatch()
    let history = useHistory()
    let searchInput = React.createRef()
    let products = useSelector(selectMerchantProduct)
    let [productSearched, setProductSearched] = useState([])
    let [keyword, setKeyword] = useState("")
    let prevKeyword = useRef("")
    let [page, setPage] = useState(1);
    
    const [showDialogUpdate, setShowDialogUpdate] = useState(false)
    const [showDialogDelete, setShowDialogDelete] = useState(false)
    const [selectedProduct, setSelectedProduct ] = useState({})

    let {
        httpCode,
        loading,
        setSuccess,
        setLoading,
        setError,
        setIdle
    } = useReponse()

    useEffect(() => {
        if(etalase){
            if(prevEtalase != etalase){
                let firstPage = 1
                setPage(firstPage)
                setKeyword("")
                if(searchInput.current) searchInput.current.value = ""
                if (!products[etalase]){
                    let size = 10
                    let last = ""
                    fetchProduct(last, size)
                }
            }
        }
    },[etalase])

    const fetchProduct = async (last, size) => {
        console.log(`fetching product merchant id : ${merchantId} - etalase : ${etalase} - last ${last} - size : ${size}`)

        let params = `?etalase=${etalase}&size=${size}`
        if(last){
            params += `&last=${last}`
        }
        try{
            setLoading()
            let response = await Axios.get(URL_GET_MERCHANT_PRODUCT(merchantId, params))
            console.log("response fetching : ")
            console.log(response.data.data)
            if (response.data.data){
                dispatch(
                    fetchMerchantProduct({ etalase : etalase , products : response.data.data})
                )
            }
            setSuccess()
        }catch(error){
            setError(error)
        }
    }

    const searchProduct = async (last, size) => {
        let searchedKeyword = searchInput.current.value
        console.log(`search product merchant id : ${merchantId} - etalase : ${etalase} - last ${last} - size : ${size ? size : itemPerPage} - keyword : ${searchInput.current.value} `)

        let params = `?etalase=${etalase}&name=${searchedKeyword}`
        if(last){
            params += `&last=${last}`
        }
        if(size){
            params += `&size=${size ? size : itemPerPage}`
        }
    
        try{
            setLoading()
            let response = await Axios.get(URL_GET_MERCHANT_PRODUCT(merchantId, params))
            console.log("response searching : ")
            console.log(response.data.data)
            console.log(`prev keyword : ${prevKeyword.current}`)
            console.log(`current keyword : ${searchedKeyword}`)
            if(response.data.data){
                if(prevKeyword.current !== searchedKeyword){                    
                    //reset product
                    console.log(`do reset product because keyword changed : old keyword ${prevKeyword.current} and new : ${searchedKeyword}`)
                    setProductSearched(response.data.data)
                } else {
                    //push product
                    console.log(`do push product because keyword not changed : old keyword ${prevKeyword.current} and new : ${searchInput.current.value}`)
                    setProductSearched([...productSearched, ...response.data.data])
                }
            }else{
                setProductSearched([])
            }
            setSuccess()
        }catch(error){
            setError(error)
        }
        console.log(searchedKeyword)
        console.log(prevKeyword.current)
        if(prevKeyword.current !== searchedKeyword){
            prevKeyword.current = searchedKeyword
        }
        setKeyword(searchedKeyword)
    }

    const ToPage = (direction) => {
        let size = itemPerPage
        let lastDate = ""
        let start = page * itemPerPage
        let end = page+1 * itemPerPage
        if(direction === "back"){
            start = (page-2) * itemPerPage
            end = (page-1) * itemPerPage
        }

        let needFetch = false
        if(keyword) {
            if(productSearched.length < end && productSearched.length >= start){
                needFetch = true
                size = end - productSearched.length
            }
            if(productSearched[productSearched.length-1]){
               lastDate = productSearched[productSearched.length-1].created_at
            }
            if(productSearched.length >= start){
                size = end - productSearched.length
            }
        }else{
            if(products[etalase].length < end && productSearched.length >= start){
                needFetch = true
                size = end - products[etalase].length
            }
            if(products[etalase][products[etalase].length-1]){
                lastDate = products[etalase][products[etalase].length-1].created_at
            }
            if(products[etalase].length >= start){
                size = end - products[etalase].length
            }
        }

        if(needFetch){
            keyword ? searchProduct(lastDate, size) : fetchProduct(lastDate, size)  
        }
       
        if(direction === "back") {
            setPage(page-1) 
        }else {
            setPage(page+1)
        } 
    }

    const navigateToUpdateForm = (product) => {
        dispatch(setProduct({ product : product }))
        history.push(`/merchants/${merchantId}/products/${product._id}`)
    }

    const openDialogDelete = (product) => {
        setShowDialogDelete(true)
        setSelectedProduct(product)
    }
    const closeDialogUpdate = () => setShowDialogUpdate(false)
    const closeDialogDelete = () => setShowDialogDelete(false)

    let productToShow = []
    let start = page === 1 ? 0 : (page-1) * itemPerPage
    let end = page * itemPerPage
    if(keyword) {
        if(productSearched.length > 0 && productSearched.length >= start){
            productToShow = productSearched.slice(start, end)
        }
    }else {
        if(products[etalase] && products[etalase].length >= start){
            productToShow = products[etalase].slice(start, end)
        }
    }
    
    return (
       <div className="merchant-product margin-top-medium">
            <div className="search-customer">
                <div className="search-customer__row">
                    <div className="search-customer__search">
                        <InputSearch 
                            ref={searchInput}
                            placeholder="masukan nama product di etalase.."
                            search={() => { searchProduct() }}/>
                    </div>
                </div>
            </div>

            <ul className="merchant-product__products">
                <li className="merchant-product__item">
                    <div className="merchant-product__info merchant-product__title">Product Info</div>
                    <div className="merchant-product__price merchant-product__title">Price</div>
                    <div className="merchant-product__stock merchant-product__title">Stock</div>
                    <div className="merchant-product__action merchant-product__title">Action</div>
                </li>
                {
                    loading && <Loading/>
                }
                {
                    httpCode && <ErrorPage httpCode={httpCode}/>
                }
                {
                    productToShow.map((product,i )=> (
                        <li key={i} className="merchant-product__item">
                            <div className="merchant-product__info">
                                <div className="merchant-product__avatar">
                                    <img alt="product-picture" src={product.photos && product.photos[0]}/>
                                </div>
                            <H3>{product.name}</H3>
                            </div>
                            <p className="merchant-product__price">
                                Rp {product.price},-
                            </p>
                            <p className="merchant-product__stock">
                                {product.stock}
                            </p>
                            <div className="merchant-product__action">
                                <ButtonBlackMedium event={() => navigateToUpdateForm(product)}className="margin-right-small">Update</ButtonBlackMedium>
                                <ButtonRedMedium event={() => openDialogDelete(product)}>Delete</ButtonRedMedium>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <ButtonGroupsRight>
                <ButtonTextBlackMedium
                    disabled={page === 1}
                    event={() => ToPage("back")}>
                    Back
                </ButtonTextBlackMedium>
                <ButtonTextBlackMedium
                    disabled={page === 5}
                    event={() => ToPage("next")}>
                    Next
                </ButtonTextBlackMedium>
            </ButtonGroupsRight>
            <PopUpDeleteProduct
            show={showDialogDelete}
            close={closeDialogDelete}
            product={selectedProduct}/> 
       </div>
    )
}

export default ListMerchantProduct