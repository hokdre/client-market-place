import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import ListOrderCustomerPage from '../pages/order/list_order_customer_page'
import ListOrderMerchantPage from '../pages/order/list_order_merchant_page'
import DetailOrderMerchantPage from '../pages/order/detail_order_merchant_page'
import DetailOrderCustomerPage from '../pages/order/detail_order_customer_page'

const OrderRoutes = props => {
    let { url } = useRouteMatch()

    return (
        <Switch>
           <Route path={`${url}/customer`}>
               <ListOrderCustomerPage/>
           </Route>
           <Route path={`${url}/admin`}>
               <ListOrderCustomerPage/>
           </Route>
           <Route path={`${url}/merchant`}>
               <ListOrderMerchantPage/>
           </Route>
           <Route path={`${url}/:id/customer`}>
               <DetailOrderCustomerPage/>
           </Route>
           <Route path={`${url}/:id/merchant`}>
               <DetailOrderMerchantPage/>
           </Route>
        </Switch>
    )
}

export default OrderRoutes