import React from 'react'
import LayoutCustomer, { LayoutCustomerContent } from '../../layout/customer/layout_customer'

import Navbar from '../../layout/navbar'
import ListTransactionCustomer from '../../features/transaction_buyer/list_transaction_customer'

const ListTransactionCustomerPage = props => {

    return (
        <>
        <Navbar/>
        <LayoutCustomer>
            <LayoutCustomerContent>
                <ListTransactionCustomer/>
            </LayoutCustomerContent>
        </LayoutCustomer>
        </>
    )
}

export default ListTransactionCustomerPage