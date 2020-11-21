import React from 'react';

import FormAddProduct from '../../features/product/add_product';
import Section from '../../components/UI_components/section';
import LayoutMerchant, { LayoutMerchantContainer, LayoutMerchantContent } from '../../layout/merchant/layout_merchant';
import { H2 } from '../../components/UI_components/heading';
import { MenuProductForCustomer } from './menubar_fitur_product';

const AddProductPage = props => {
    return (
        <LayoutMerchant>
            <MenuProductForCustomer active={"add"}/>
            <LayoutMerchantContent>
                <Section>
                    <H2 className="margin-bottom-medium">New Product :</H2>
                    <FormAddProduct/>
                </Section>
            </LayoutMerchantContent>
        </LayoutMerchant>
    )
}

export default AddProductPage;