import React from 'react';
import SearchAndFilterProduct from '../../features/product/search_filter_product';
import { useLocation } from 'react-router-dom';
import Qs from 'qs';
import LayoutCustomer, { LayoutCustomerContent } from '../../layout/customer/layout_customer';
import Navbar from '../../layout/navbar';

const SearchProductPage = props => {
    let location = useLocation()
    let { keyword, c, sc, tc, city, min, max } = Qs.parse(location.search,{ ignoreQueryPrefix: true })
    console.log(`params : keyword ${keyword}`)
    return (
        <>
        <Navbar inputKeyword={keyword}/>
        <SearchAndFilterProduct 
            keyword={keyword} 
            category={c}
            secondCategory={sc}
            thirdCategory={tc}
            city={city}
            min={min}
            max={max}/>
        </>
    ) 
}

export default SearchProductPage