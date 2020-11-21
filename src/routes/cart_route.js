import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import ListItemsCartPage from '../pages/cart/list_items_cart_page'
import CartShippmentPage from '../pages/cart/cart_shippment_page'

const CartRoutes = (props) => {
    let { url } = useRouteMatch()
    
    return (
        <Switch>
            <Route path={`${url}/shippment`}>
                <CartShippmentPage/>
            </Route>
            <Route path="/">
                <ListItemsCartPage/>
            </Route>
        </Switch>
    )

}

export default CartRoutes;