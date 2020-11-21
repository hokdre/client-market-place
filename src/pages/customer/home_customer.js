import React from 'react';
import LayoutCustomer, { LayoutCustomerContent } from '../../layout/customer/layout_customer'

const CustomerHomePage = props => {
    return (
        <LayoutCustomer>
            <LayoutCustomerContent>
                <div>Home page</div>
            </LayoutCustomerContent>
        </LayoutCustomer>
    )
}

export default CustomerHomePage;