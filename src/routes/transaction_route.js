import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import ListTransactionCustomerPage from '../pages/transaction_buyer/list_transaction_customer_page'
import ListTransactionAdminPage from '../pages/transaction_buyer/list_transaction_admin_page'

const OrderRoutes = props => {
    let { url } = useRouteMatch()

    return (
        <Switch>
           <Route path={`${url}/customer`}>
               <ListTransactionCustomerPage/>
           </Route>
           <Route path={`${url}/admin`}>
               <ListTransactionAdminPage/>
           </Route>
        </Switch>
    )
}

export default OrderRoutes