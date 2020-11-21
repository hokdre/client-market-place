import React, { useState } from 'react';
import LayoutMerchant, { LayoutMerchantContent } from '../../layout/merchant/layout_merchant';
import ListMerchantProduct from '../../features/product/list_product_merchant';
import Section from '../../components/UI_components/section';
import { MenuProductForCustomer } from './menubar_fitur_product';
import { useParams } from 'react-router-dom';
import SearchProductInMerchant from '../../features/product/search_product_in_merchant';
import {  useSelector } from 'react-redux';

import ManageEtalase from '../../features/etalase/manage_etalase';
import Navbar from '../../layout/navbar';

const ListProductMerchantPage = props => {
    let { id } = useParams()
    let [selectedEtalase, setSelectedEtalase] = useState("")

    return (
        <>
        <MenuProductForCustomer active={"search"}/>
        <LayoutMerchant>
            <LayoutMerchantContent>
                <Section>
                    <ManageEtalase
                        merchantId={id}
                        selectedEtalase={selectedEtalase}
                        changeEtalase={setSelectedEtalase}
                        />
                    {/* <SearchProductInMerchant
                        merchantId={id}/> */}
                    <ListMerchantProduct
                        etalase={selectedEtalase}
                        merchantId={id}/>
                </Section>
            </LayoutMerchantContent>
        </LayoutMerchant>
        </>
    )
}

export default ListProductMerchantPage;