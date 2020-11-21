import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerAsyncThunk, selectResponseGetOne, selectCustomerAddress } from '../../features/customer/customer_slice';
import { useParams } from 'react-router-dom';

import Section from '../../components/UI_components/section';
import Loading from '../../components/UI_components/loading';
import { H2 } from '../../components/UI_components/heading';

import ErrorPage from '../../features/error/error_page';
import ListAddress from '../../features/address/list_address';
import GetCustomerBasicInfo from '../../features/customer/get_basic_info_customer';

import LayoutAdmin, { LayoutAdminContent } from '../../layout/admin/layout_admin';
import { MenuCustomerForAdmin } from './menubar_fitur_customer';

const DetailCustomerPage = props => {
    let { id } = useParams()

    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCustomerAsyncThunk(id))
    },[id])

    let { httpCode, success, loading } = useSelector(selectResponseGetOne)

    return (
        <LayoutAdmin>
            <MenuCustomerForAdmin active={""}/>
            <LayoutAdminContent>
                { httpCode && httpCode != 400 ? 
                    (<ErrorPage httpCode={httpCode}/>) : "" 
                }
                {loading && <Loading/> }
                { success && (
                    <>
                    <Section>
                        <H2>Basic Info</H2>
                        <GetCustomerBasicInfo/>
                    </Section>
                    <Section>
                        <H2>Address</H2>
                        <ListAddress update={false} customerId={id} selector={selectCustomerAddress}/>
                    </Section>
                    </>
                )}
            </LayoutAdminContent>
        </LayoutAdmin>
    )
}

export default DetailCustomerPage