import React, { useRef } from 'react';
import Axios from 'axios';

import { H3 } from '../../components/UI_components/heading';

import { URL_GET_PRODUCTS } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';

import { useDispatch } from 'react-redux';
import ErrorPage from '../error/error_page';
import Loading from '../../components/UI_components/loading';
import InputSearch from '../../components/style_components/input_search';

import { 
    fetchMerchantProduct,
} from '../merchant/merchant_slice';

const SearchProductInMerchant = props => {
    let { 
        merchantId, 
    } = props

    let dispatch = useDispatch()

    let {
        loading, 
        httpCode, 
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse() 

    const inputQuery = useRef()
    const inputValue = useRef()

    const search = async ( ) => {
        let category = inputQuery.current.value
        let keyword = inputValue.current.value
        if(category){
          
            
            setLoading()
            try{
                let response = await Axios.get(URL_GET_PRODUCTS(`?category=${category}&name=${keyword}&merchant_id=${merchantId}`),{
                    headers : {
                        token : localStorage.getItem("token")
                    }
                })
                let products = response.data.data
                if(!products){
                    products = []
                }
                
                dispatch(fetchMerchantProduct({ products : products }))
                setSuccess()
                setTimeout(() => setIdle(), 3000)
            }catch(error){
                setError(error)
            }
        }
    }

    return (
        <>
        {
            (httpCode && httpCode != 400) ? <ErrorPage httpCode={httpCode}/> : ""
        }
        {
            loading && <Loading/>
        }
        <div className="search-customer">
            <H3>Search By :</H3>
            <div className="search-customer__row">
                <div className="search-customer__search">
                    <InputSearch 
                        placeholder="masukan nama product.."
                        search={(keyword) => search(keyword)}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default SearchProductInMerchant;