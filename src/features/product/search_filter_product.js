import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProductSearchKeyword } from './product_slice';
import { H3 } from '../../components/UI_components/heading';
import { useReponse } from '../customs_hooks/useResponse';
import Axios from 'axios';
import { URL_SEARCH_PRODUCT } from '../../api/api';
import FilterCategory from '../../components/style_components/filter_category';
import Categories from '../../components/style_components/input_categories';
import { useHistory } from 'react-router-dom';
import FilterCity from '../../components/style_components/filter_city';
import FilterPrice from '../../components/style_components/filter_price';
import CardProduct from '../../components/style_components/card_product';
import Pagination from '../../components/style_components/pagination';

const SearchAndFilterProduct = props => {
    let { keyword, category, secondCategory,thirdCategory, city, min, max  } = props
    
    let history = useHistory()

    let [products, setProducts] = useState([])
    let [categories, setCategories] = useState([])
    let [locations, setLocations] = useState([])
    let [page, setPage] = useState(1)
    let itemPerPage = 60
    let startIndex = (page-1) * itemPerPage
    let endIndex = page * itemPerPage

    useEffect(() => {
       fetchProducts(true,category, secondCategory,thirdCategory, city,min,max,keyword)
    },[category, secondCategory,thirdCategory, city,min,max,keyword])

    let {
        loading,
        success,
        httpCode,
        errors,
        setLoading,
        setSuccess,
        setError
    } = useReponse()

    let fetchProducts = async (reset, category, secondCategory,thirdCategory, city, min, max, keyword, last) => {
        let params = `?keyword=${keyword}`
        if(category) params += `&c=${encodeURIComponent(category)}`
        if(secondCategory) params += `&sc=${ encodeURIComponent( secondCategory)}`
        if(thirdCategory) params += `&tc=${encodeURIComponent( thirdCategory)}`
        if(city) params += `&city=${city}`
        if(min) params += `&min=${min}`
        if(max) params += `&max=${max}`
        if(last) params += `&last=${encodeURIComponent(last)}`


        console.log(`fetching page and bring keyword : ${keyword}, category : ${category}, second category : ${secondCategory}, city :${city} and price min : ${min} and price max : ${max} last: ${last}`)
        try{
            setLoading()
            let response = await Axios.get(URL_SEARCH_PRODUCT(params))
            console.log(`returned response ...`)
            console.log(response.data.data)
           if (response.data.data){
               let { categories, cities, products : resProducts } = response.data.data
               setCategories(categories.buckets)
               setLocations(cities.buckets)
               if(reset){
                   setProducts([...resProducts])
               }else{
                    setProducts([...products,...resProducts])
               }
           }else{
                setCategories([])
                setLocations([])
                setProducts([])
           }
           setSuccess()
        }catch(err){
           setError(err) 
        }

    }

    let fetchProductPage = async (page) => {
        let offset = page * itemPerPage
        if(products.length < offset){
            let last = products[products.length-1].created_at
            fetchProducts(false,category, secondCategory,thirdCategory, city, min, max, keyword, last)
        }
        setPage(page)
    }
    
    let filterCategory = ({ top, second, third } ) => {
        console.log(`filter category keyword : ${keyword}, category : ${top}, second category : ${second}, thrid : ${third} city :${city} and price min : ${min} and price max : ${max}`)

        let params = `?keyword=${keyword}`
        if(top) params += `&c=${encodeURIComponent(top)}`
        if(second) params += `&sc=${encodeURIComponent(second)}`
        if(third) params += `&tc=${encodeURIComponent(third)}`
        if(city) params += `&city=${city}`
        if(min) params += `&min=${min}`
        if(max) params += `&max=${max}`
        history.push(`/search${params}`)
    }

    let filterLocation = (lokasi = {}) => {
        let cities = Object.keys(lokasi)

        console.log(`filter city keyword : ${keyword}, category : ${category}, second category : ${secondCategory}, thrid : ${thirdCategory} city :${cities.toString()} and price min : ${min} and price max : ${max}`)

        let params = `?keyword=${keyword}`
        if(category) params += `&c=${encodeURIComponent(category)}`
        if(secondCategory) params += `&sc=${ encodeURIComponent( secondCategory)}`
        if(thirdCategory) params += `&tc=${encodeURIComponent( thirdCategory)}`
        if(cities.length > 0) params += `&city=${cities.toString()}`
        if(min) params += `&min=${min}`
        if(max) params += `&max=${max}`
        history.push(`/search${params}`)
    }

    let filterPrice = ({ min, max }) => {
        console.log(`filter price keyword : ${keyword}, category : ${category}, second category : ${secondCategory}, city :${city} and price min : ${min} and price max : ${max}`)

        let params = `?keyword=${keyword}`
        if(category) params += `&c=${encodeURIComponent(category)}`
        if(secondCategory) params += `&sc=${ encodeURIComponent( secondCategory)}`
        if(thirdCategory) params += `&tc=${encodeURIComponent( thirdCategory)}`
        if(city) params += `&city=${city}`
        if(min) params += `&min=${min}`
        if(max) params += `&max=${max}`
        history.push(`/search${params}`)
    }

    let openDetailProduct = (productId) => {
        console.log(`open products`)
        history.push(`/products/${productId}`)
    }

    let nextPage = () => {
        if(page < 5) {
            fetchProductPage(page+1)
            setPage(page + 1)
        }
    }

    let backPage = () => {
        if(page > 1) {
            fetchProductPage(page-1)
            setPage(page - 1)
        }
    }

    return (
        <div className="filter-product">
            <div className="filter-product__sidebar">
               <div className="filter-product__box">
                   <H3>Kategori</H3>
                   <FilterCategory
                        change={filterCategory} 
                        sCategory={category} 
                        sSecondCategory={secondCategory}
                        sThirdCategory={thirdCategory}
                        categories={categories}/>
               </div>
               <div className="filter-product__box">
                   <H3>City</H3>
                   <FilterCity
                        selectedCities={city}
                        change={filterLocation}
                        cities={locations}/>
               </div>
               <div className="filter-product__box">
                    <H3>Price</H3>
                    <FilterPrice
                        sMin={min}
                        sMax={max}
                        change={filterPrice}/>
               </div>
            </div>
            <div className="filter-product__content">
                <div className="filter-product__row">
                    { products.slice(startIndex, endIndex).map( product =>(
                        <div key={product._id} className="filter-product__col">
                            <CardProduct 
                                onClick={() => openDetailProduct(product._id)}
                                title={product.name}
                                image={product.photos}
                                price={product.price}
                                city={product.merchant.address.city.city_name}
                                rating={product.rating}/>
                        </div>
                    )) }
                </div>
               <Pagination
                back={backPage}
                choose={fetchProductPage}
                next={nextPage}
                canNext={(page * itemPerPage) <= products.length}
                page={page}/>
            </div>
        </div>
    )

}

export default SearchAndFilterProduct