import React from 'react';

import Section from '../../components/UI_components/section';
import LayoutCustomer, { LayoutCustomerContent } from '../../layout/customer/layout_customer';
import LayoutAdmin, {LayoutAdminContent } from '../../layout/admin/layout_admin';

import { MenuCustomerForAdmin } from './menubar_fitur_customer';
import SearchCustomer from '../../features/customer/search_cutomer';
import ListCustomer from '../../features/customer/list_customer';


const ListCustomerPage = props => {
    let loginType = localStorage.getItem("loginType")
    return (
        <>
        {
            loginType === "CUSTOMER" && (
                <LayoutCustomer>
                    <LayoutCustomerContent>
                        <Section>
                            <SearchCustomer/>
                            <ListCustomer/>
                        </Section>
                    </LayoutCustomerContent>
                </LayoutCustomer>
            )
        }
        {
            loginType === "ADMIN" && (
                <LayoutAdmin>
                    <MenuCustomerForAdmin active={"search"}/>
                    <LayoutAdminContent>
                        <Section>
                            <SearchCustomer/>
                            <ListCustomer/>
                        </Section>
                    </LayoutAdminContent>
                </LayoutAdmin>
            )
        }
        </>
    )
}

export default ListCustomerPage