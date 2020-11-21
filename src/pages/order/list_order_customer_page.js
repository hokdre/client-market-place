import React from 'react'
import LayoutCustomer, { LayoutCustomerContent } from '../../layout/customer/layout_customer'
import ListOrderCustomer from '../../features/order/list_order_customer'
import Navbar from '../../layout/navbar'
import { Redirect } from 'react-router-dom'

const ListOrderCustomerPage = props => {
    let userType = localStorage.getItem("loginType")
    let credentialValid = userType === "CUSTOMER"
    if (!credentialValid) return (<Redirect path="/"/>)
    
    return (
        <>
        <Navbar/>
        <LayoutCustomer>
            <LayoutCustomerContent>
                <ListOrderCustomer/>
            </LayoutCustomerContent>
        </LayoutCustomer>
        </>
    )
}

export default ListOrderCustomerPage