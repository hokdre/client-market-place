import React from 'react';

import Section from '../../components/UI_components/section';
import Navbar from '../../layout/navbar';
import FormAddMerchant from '../../features/merchant/add_merchant';
import { LayoutCustomerContainer, LayoutCustomerContent } from '../../layout/customer/layout_customer';
import { H2 } from '../../components/UI_components/heading';

const AddMerchantPage = props => {
    return (
        <LayoutCustomerContainer>
            <Navbar/>
            <LayoutCustomerContent>
                <Section>
                    <H2 className="margin-bottom-medium"> Create Merchant</H2>
                    <FormAddMerchant/>
                </Section>
            </LayoutCustomerContent>
        </LayoutCustomerContainer>
    )
}

export default AddMerchantPage;