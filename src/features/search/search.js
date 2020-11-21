import React, { useState, useEffect, useCallback } from 'react';
import { useReponse } from '../customs_hooks/useResponse';
import Axios from 'axios';
import { URL_SEARCH_SEGGUSTION } from '../../api/api';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import FormSearch from '../../components/style_components/form_search';
import { H3 } from '../../components/UI_components/heading';
import { useHistory } from 'react-router-dom';

const SearchSuggestion = props => {
    let { inputKeyword } = props
    let history = useHistory()
    
    const [options, setOptions] = useState({
        tags : [],
        products : [],
        merchants : []
    })
    
    const [keyword, setKeyword] = useState("")
    const [show, setShow] = useState(false)
    const containerRef = React.createRef()

    useEffect(() => {
        setKeyword(inputKeyword)
    },[inputKeyword])

    useEffect(() => {
        function handleClickOutside(e){
            if(containerRef.current && !containerRef.current.contains(e.target)){
                setShow(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    },[containerRef])

    const handleChange = async e => {
        //take input 
        if(e){
            setKeyword(e.target.value)
            if(!e.target.value) setShow(false)
            if(e.target.value) await fetchOptionsDebounce(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        console.log(`handle submit : ${keyword}`)
        setShow(false)
        history.push(`/search?keyword=${keyword}`)
    }

    const suggestionClick = (suggestion) => {
        //navigate to search page with suggestion keyword
        console.log(`clicking suggestion : ${suggestion}`)
        setShow(false)
        history.push(`/search?keyword=${suggestion}`)
    }

    const productClick = (id) => {
        console.log(`clicking product : ${id}`)
        setShow(false)
        history.push(`/products/${id}`)
    }
    const merchantClick = (id) => {
        console.log(`clicking merchant : ${id}`)
        setShow(false)
        history.push(`/merchants/${id}/details`)
    }

    let {
        httpCode,
        loading,
        success,
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse()

    const fetchOptions = useCallback(async (keyword) => {
        //fetch and setter the option
        console.log("fetching options ... with keyword : ", keyword)
        setShow(true)
        setLoading()
        try{
            let params = `?keyword=${keyword}`
            let response = await Axios.get(URL_SEARCH_SEGGUSTION(params))
            if(response.data.data){
                let {tags, products, merchants } = response.data.data
                if(tags.length === 0 && products.length === 0 && merchants.length === 0){
                    setShow(false)
                }else{
                    setShow(true)
                }
               
                setOptions({
                    tags : response.data.data.tags,
                    products : response.data.data.products,
                    merchants : response.data.data.merchants
                })
            }else{
                setShow(false)
                setOptions({
                    tags : [],
                    products : [],
                    merchants : []
                })
            }
            setSuccess()
        }catch(error){
            setError(error)
        }
    },[])
    let fetchOptionsDebounce = useCallback(AwesomeDebouncePromise(fetchOptions,500),[])
    

    return (
        <div ref={containerRef} className="search-box">
            <FormSearch
                keyword={keyword}
                onChange={handleChange}
                onSubmit={handleSubmit}
                />
            {
                show && (
                    <ul className="search-box__options">
                        {
                            (options.tags && options.tags.length > 0) && (
                                <>
                                    <li className="search-box__title">Pencarian</li>
                                    { options.tags.map((suggestion, i ) => (
                                        <li 
                                            onClick={() => suggestionClick(suggestion)}
                                            key={"suggestion"+i} className="search-box__option">{suggestion}</li>
                                    ))}
                                </>
                            )
                        }
                        {
                            (options.products && options.products.length > 0 ) && (
                                <>
                                <li className="search-box__title">Product</li>
                                {
                                    options.products.map((product, i) => (
                                        <li 
                                            key={product._id}
                                            onClick={()=>productClick(product._id)}
                                            className="search-box__option">
                                            <div className="search-box__product">
                                                <div className="search-box__img">
                                                    <img src={product.photos && product.photos[0]} alt="product"/>
                                                </div>
                                                <div className="search-box__description">
                                                    <H3>{product.name}</H3>
                                                    <span className="search-box__price">
                                                       Rp. {product.price}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                                </>
                            )
                        }
                        {
                            (options.merchants && options.merchants.length > 0) && (
                                <>
                                <li className="search-box__title">Merchant</li>
                                {
                                    options.merchants.map((merchant, i) => (
                                        <li 
                                            key={merchant._id}
                                            onClick={()=>merchantClick(merchant._id)}
                                            className="search-box__option">
                                            <div className="search-box__merchant">
                                                <div className="search-box__img">
                                                    <img src={merchant.avatar} alt="merchant"/>
                                                </div>
                                                <div className="search-box__description">
                                                    <H3>{merchant.name}</H3>
                                                    <span className="search-box__city">
                                                        {merchant.address.city.city_name}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                                </>
                            )
                        }
                    </ul>
                )
            }
            </div>
    )
}

export default SearchSuggestion