import React from 'react'
import LayoutMerchant, { LayoutMerchantContent } from '../../layout/merchant/layout_merchant'

import Navbar from '../../layout/navbar'
import { Redirect } from 'react-router-dom'
import ListOrderMerchant from '../../features/order/list_order_merchant'

const ListOrderMerchantPage = props => {
    let userType = localStorage.getItem("loginType")
    let credentialValid = userType === "CUSTOMER"
    if (!credentialValid) return (<Redirect path="/"/>)
    
    return (
        <>
        <Navbar/>
        <LayoutMerchant>
            <LayoutMerchantContent>
                <ListOrderMerchant/>
            </LayoutMerchantContent>
        </LayoutMerchant>
        </>
    )
}

export default ListOrderMerchantPage