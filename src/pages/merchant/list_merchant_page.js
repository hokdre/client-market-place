import React from 'react';


import Section from '../../components/UI_components/section';

import ListMerchant from '../../features/merchant/list_merchant';
import SearchMerchant from '../../features/merchant/search_merchant';
import LayoutCustomer, { LayoutCustomerContent } from '../../layout/customer/layout_customer';
import LayoutAdmin, {LayoutAdminContent } from '../../layout/admin/layout_admin';
import { MenuMerchantForAdmin } from './menubar_fitur_merchant';
import Navbar from '../../layout/navbar';

const ListMerchantPage = props => {
    let loginType = localStorage.getItem("loginType")
    return (
        <>
        {
            loginType === "CUSTOMER" && (
                <>
                <Navbar/>
                <LayoutCustomerContent>
                    <Section>
                        <SearchMerchant/>
                        <ListMerchant/>
                    </Section>
                </LayoutCustomerContent>
                </>
            )
        }
        {
            loginType === "ADMIN" && (
                <LayoutAdmin>
                    <MenuMerchantForAdmin active={"search"}/>
                    <LayoutAdminContent>
                        <Section>
                            <SearchMerchant/>
                            <ListMerchant/>
                        </Section>
                    </LayoutAdminContent>
                </LayoutAdmin>
            )
        }
        </>
    )
}

export default ListMerchantPage