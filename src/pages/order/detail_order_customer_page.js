import React from 'react'
import LayoutCustomer, { LayoutCustomerContent } from '../../layout/customer/layout_customer'

import Navbar from '../../layout/navbar'
import { Redirect, useParams } from 'react-router-dom'
import DetailsOrder from '../../features/order/details_order'

const DetailOrderCustomerPage = props => {
    let { id } = useParams()

    let userType = localStorage.getItem("loginType")
    let credentialValid = userType === "CUSTOMER"
    if (!credentialValid) return (<Redirect path="/"/>)
    
    return (
        <>
        <Navbar/>
        <LayoutCustomer>
            <LayoutCustomerContent>
                <DetailsOrder userType="customer" id={id}/>
            </LayoutCustomerContent>
        </LayoutCustomer>
        </>
    )
}

export default DetailOrderCustomerPage