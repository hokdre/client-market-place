import React from 'react';

import Section from '../../components/UI_components/section';
import Navbar from '../../layout/navbar';
import FormAddCustomer from '../../features/customer/add_customer';
import { LayoutCustomerContainer, LayoutCustomerContent } from '../../layout/customer/layout_customer';
import { useSelector } from 'react-redux';
import { selectIsLogin, selectCredential } from '../../features/login/login_slice';
import { useHistory } from 'react-router-dom';
import { H2 } from '../../components/UI_components/heading';

const AddCustomerPage = props => {
    let isLogin = useSelector(selectIsLogin)
    let { loginType } = useSelector(selectCredential)
    let history = useHistory()
    if(isLogin) history.replace(`/${loginType.toLowerCase()}s`)

    return (
        <LayoutCustomerContainer>
            <Navbar/>
            <LayoutCustomerContent>
                <Section>
                    <H2 className="margin-bottom-medium">Register New Customer</H2>
                    <FormAddCustomer/>
                </Section>
            </LayoutCustomerContent>
        </LayoutCustomerContainer>
    )
}

export default AddCustomerPage;