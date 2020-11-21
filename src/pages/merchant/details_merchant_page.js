import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMerchantAsyncThunk, selectMerchantBankAccounts } from '../../features/merchant/merchant_slice';
import { useParams } from 'react-router-dom';

import Section from '../../components/UI_components/section';
import Loading from '../../components/UI_components/loading';
import { H2 } from '../../components/UI_components/heading';

import ErrorPage from '../../features/error/error_page';
import ListBankAccounts from '../../features/bank_account/list_bank';
import GetMerchantBasicInfo from '../../features/merchant/get_basic_info_merchant';

import LayoutAdmin, { LayoutAdminContent } from '../../layout/admin/layout_admin';
import LayoutCustomer, { LayoutCustomerContent } from '../../layout/customer/layout_customer';
import Navbar from '../../layout/navbar';
import { MenuMerchantForAdmin } from './menubar_fitur_merchant';
import ListShipping from '../../features/shipping/list_shipping';
import { useReponse } from '../../features/customs_hooks/useResponse';
import { unwrapResult } from '@reduxjs/toolkit';
import Axios from 'axios';
import { URL_GET_MERCHANT_BYID } from '../../api/api';
import ListReviewMerchant from '../../features/review_merchant/list_review_merchant';

const DetailMerchantPage = props => {
    let dispatch = useDispatch()
    let { id } = useParams()
    let loginType = localStorage.getItem("loginType")
    let [merchant, setMerchant] = useState({
        _id : "",
        name : "",
        address : {},
        categories : [],
        avatar : "",
        phone : "",
        description : "",
        etalase : [],
        reviews : [],
        rating : 0,
        shippings : [],
        bank_accounts : [],
        created_at : "",
        updated_at : ""
    })
    
    let {
        loading, 
        httpCode, 
        errors,
        success,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse() 

    useEffect( () => {
        fetch(id)
    },[id])

    const fetch = async (id) => {     
        setLoading()
        try {
           let response = await Axios.get(URL_GET_MERCHANT_BYID(id))
           setMerchant(response.data.data)
           setSuccess()
        }catch(error){
           setError(error)
        }
    }

    return (
        <>
        {
            (loginType === "CUSTOMER" || !loginType)&& (
                <>
                <Navbar/>
                <LayoutCustomerContent>
                    { httpCode && httpCode != 400 ? 
                        (<ErrorPage httpCode={httpCode}/>) : "" 
                    }
                    {loading && <Loading/> }
                    { success && (
                        <>
                        <Section>
                            <H2>Basic Info</H2>
                            <GetMerchantBasicInfo merchant={merchant}/>
                        </Section>
                        <Section>
                            <H2>Shippings</H2>
                            <ListShipping merchantId={id} merchant={merchant}/>
                        </Section>
                        <Section>
                            <H2>Reviews </H2>
                            <ListReviewMerchant merchantId={id}/>
                        </Section>
                        </>
                    )}
                </LayoutCustomerContent>
                </>
            )
        }
        {
            loginType === "ADMIN" && (
                <LayoutAdmin>
                    <MenuMerchantForAdmin active={""}/>
                    <LayoutAdminContent>
                        { httpCode && httpCode != 400 ? 
                            (<ErrorPage httpCode={httpCode}/>) : "" 
                        }
                        {loading && <Loading/> }
                        { success && (
                            <>
                            <Section>
                                <H2>Basic Info</H2>
                                <GetMerchantBasicInfo merchant={merchant}/>
                            </Section>
                            <Section>
                                <H2>Shipping</H2>
                                <ListShipping merchantId={id} merchant={merchant}/>
                            </Section>
                            <Section>
                                <H2>Bank Accounts</H2>
                                <ListBankAccounts update={false} merchantId={id} selector={selectMerchantBankAccounts} banks={merchant.banks}/>
                            </Section>
                            <Section>
                                <H2>Reviews </H2>
                                <ListReviewMerchant merchantId={id}/>
                            </Section>
                            </>
                        )}
                    </LayoutAdminContent>
                </LayoutAdmin>
            )
        }
        </>
    )
}

export default DetailMerchantPage