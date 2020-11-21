import React from 'react'
import LayoutAdmin, { LayoutAdminContent } from '../../layout/admin/layout_admin'
import Navbar from '../../layout/navbar'
import { Redirect } from 'react-router-dom'
import ListTransactionAdmin from '../../features/transaction_buyer/list_transaction_admin'
import { MenuTransactionBuyerForAdmin } from './menubar_fitur_transaction_buyer'

const ListTransactionAdminPage = props => {

    let userType = localStorage.getItem("loginType")
    let credentialValid = userType === "ADMIN"
    if (!credentialValid) return (<Redirect path="/"/>)

    return (
        <>
        <LayoutAdmin>
            <MenuTransactionBuyerForAdmin active=""/>
            <LayoutAdminContent>
                <ListTransactionAdmin/>
            </LayoutAdminContent>
        </LayoutAdmin>
        </>
    )
}

export default ListTransactionAdminPage