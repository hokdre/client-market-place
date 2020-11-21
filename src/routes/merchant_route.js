import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';

import AddProductPage from '../pages/product/add_product_page';
import DetialsMerchantPage from '../pages/merchant/details_merchant_page';
import UpdateMerchantPage from '../pages/merchant/updates_merchant_page';
import ListMerchantPage from '../pages/merchant/list_merchant_page';
import MerchantHomePage from '../pages/merchant/home_merchant';
import AddMerchantPage from '../pages/merchant/add_merchant_page';

import { ValidateAsMerchant, ValidateAsCustomer } from './authentication';
import ListProductMerchantPage from '../pages/product/list_product_merchant_page';
import UpdateProductPage from '../pages/product/update_product_page';

const MerchantRoutes = (props) => {
    let { url } = useRouteMatch()
    
    return (
        <Switch>
            <ValidateAsCustomer path={`${url}/add`} comp={AddMerchantPage}/>
            <Route path={`${url}/list`}>
                <ListMerchantPage/>
            </Route>
            <Route path={`${url}/:id/details`}>
                <DetialsMerchantPage/>
            </Route>
            <ValidateAsMerchant path={`${url}/:id/update`} comp={UpdateMerchantPage}/>

            <ValidateAsMerchant path={`${url}/:id/products/:productId`} comp={UpdateProductPage}/>

            <Route path={`${url}/:id/products`}>
                <ListProductMerchantPage/>
            </Route>
            
            <ValidateAsMerchant path={`${url}/:id/add-product`} comp={AddProductPage}/>

            <ValidateAsMerchant path="/" comp={MerchantHomePage}/>
        </Switch>
    )

}

export default MerchantRoutes;