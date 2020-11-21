import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import LayoutMerchant, { LayoutMerchantContent } from '../../layout/merchant/layout_merchant'
import Section from '../../components/UI_components/section';
import Loading from '../../components/UI_components/loading';
import { H2, H3 } from '../../components/UI_components/heading';

import ErrorPage from '../../features/error/error_page';
import UpdateMerchantBasicInfo from '../../features/merchant/update_basic_info_merchant';
import ListBankAccounts from '../../features/bank_account/list_bank'
import AddBankAccount from '../../features/bank_account/add_bank';


import { 
    selectMerchantBankAccounts, 
} from '../../features/merchant/merchant_slice';
import ListShipping from '../../features/shipping/list_shipping';
import AddShipping from '../../features/shipping/add_shipping';
import { MenuMerchantForCustomer } from './menubar_fitur_merchant';
import ListMerchantProduct from '../../features/product/list_product_merchant';
import SearchProductInMerchant from '../../features/product/search_product_in_merchant';
import Navbar from '../../layout/navbar';


const UpdateMerchantPage = props => {
    let { id } = useParams()
    let history = useHistory()
    let merchantID = localStorage.getItem("merchantID")
    let loginType = localStorage.getItem("loginType")
    if(id !== merchantID || loginType !== "CUSTOMER") {
        history.replace( `/${loginType.toLocaleLowerCase()}s`)
    }

    return (
        <>
        <Navbar/>
        <LayoutMerchant>
            <LayoutMerchantContent>
                    <>
                    <Section>
                        <H2>Basic Info</H2>
                        <UpdateMerchantBasicInfo merchantId={id}/>
                    </Section>
                    <Section>
                        <H2>Bank Accounts</H2>
                        <ListBankAccounts update={true} merchantId={id} selector={selectMerchantBankAccounts}/>
                        <H3 className={"margin-top-medium"}>Add Bank Account</H3>
                        <AddBankAccount merchantId={id}/>
                    </Section>
                    <Section>
                        <H2>Shippings</H2>
                        <ListShipping update={true} merchantId={id}/>
                        <H3 className={"margin-top-medium"}>Add Shipping</H3>
                        <AddShipping merchantId={id}/>
                    </Section>
                    </>
            </LayoutMerchantContent>
        </LayoutMerchant>
        </>
    )
}

export default UpdateMerchantPage