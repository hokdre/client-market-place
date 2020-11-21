import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import DetailCustomerPage from '../pages/customer/details_customer_page';
import UpdateCustomerPage from '../pages/customer/updates_customer_page';
import ListCustomerPage from '../pages/customer/list_customer_page';
import CustomerHomePage from '../pages/customer/home_customer';

import { ValidateAsAdmin, ValidateAsCustomer } from './authentication';

const CustomerRoutes = (props) => {
    let { url } = useRouteMatch()
    
    return (
        <Switch>

            <ValidateAsAdmin path={`${url}/list`} component={ListCustomerPage}/>

            <ValidateAsCustomer path={`${url}/:id/update`} component={UpdateCustomerPage}/>

            <ValidateAsAdmin path={`${url}/:id/details`} component={DetailCustomerPage}/>

            <ValidateAsCustomer path="/" component={CustomerHomePage}/>
        </Switch>
    )

}

export default CustomerRoutes;