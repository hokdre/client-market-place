import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import DetilProductPage from '../pages/product/detill_product_page';

const ProductRoutes = props => {
    let { url } = useRouteMatch()
    return (
        <Switch>
            <Route path={`${url}/:productId`}>
                <DetilProductPage/>
            </Route>
        </Switch>
    )
}

export default ProductRoutes