import React from 'react'
import LayoutMerchant, { LayoutMerchantContent } from '../../layout/merchant/layout_merchant'
import ListOrderCustomer from '../../features/order/list_order_customer'
import Navbar from '../../layout/navbar'
import { Redirect, useParams } from 'react-router-dom'
import DetailsOrder from '../../features/order/details_order'

const DetailOrderMerchantPage = props => {
    let { id } = useParams()

    let userType = localStorage.getItem("loginType")
    let credentialValid = userType === "CUSTOMER"
    if (!credentialValid) return (<Redirect path="/"/>)
    
    return (
        <>
        <Navbar/>
        <LayoutMerchant>
            <LayoutMerchantContent>
                <DetailsOrder userType="merchant" id={id}/>
            </LayoutMerchantContent>
        </LayoutMerchant>
        </>
    )
}

export default DetailOrderMerchantPage