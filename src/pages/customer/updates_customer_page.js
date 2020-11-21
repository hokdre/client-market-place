import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import LayoutCustomer, { LayoutCustomerContent } from '../../layout/customer/layout_customer'
import Section from '../../components/UI_components/section';
import Loading from '../../components/UI_components/loading';
import { H2, H3 } from '../../components/UI_components/heading';

import ErrorPage from '../../features/error/error_page';
import UpdateCustomerBasicInfo from '../../features/customer/update_basic_info_customer';
import ListAddress from '../../features/address/list_address';
import AddAddress from '../../features/address/add_address';
import ListBankAccounts from '../../features/bank_account/list_bank'
import AddBankAccount from '../../features/bank_account/add_bank';
import UpdatePasswordCustomer from '../../features/customer/update_password';

import { 
    getCustomerAsyncThunk, 
    selectResponseGetOne, 
    selectCustomerAddress,
    selectCustomerBankAccounts 
} from '../../features/customer/customer_slice';
import { MenuCustomerForCustomer } from './menubar_fitur_customer';
import Navbar from '../../layout/navbar';

const UpdateCustomerPage = props => {
    let { id } = useParams()
    let history = useHistory()

    let userID = localStorage.getItem("userID")
    let loginType = localStorage.getItem("loginType")
    if(id !== userID || loginType !== "CUSTOMER") {
        history.replace( `/${loginType.toLocaleLowerCase()}s`)
    }
    
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCustomerAsyncThunk(id))
    },[id])

    let { httpCode, success, loading } = useSelector(selectResponseGetOne)

    return (
        <>
        <Navbar/>
        <LayoutCustomer>
            <LayoutCustomerContent>
                { httpCode && httpCode != 400 ? 
                    (<ErrorPage httpCode={httpCode}/>) : "" 
                }
                {loading && <Loading/> }
                { success && (
                    <>
                    <Section>
                        <H2>Basic Info</H2>
                        <UpdateCustomerBasicInfo customerId={id}/>
                    </Section>
                    <Section>
                        <H2>Bank Accounts</H2>
                        <ListBankAccounts update={true} customerId={id} selector={selectCustomerBankAccounts}/>
                        <H3 className={"margin-top-medium"}>Add Bank Account</H3>
                        <AddBankAccount customerId={id}/>
                    </Section>
                    <Section>
                        <H2>Address</H2>
                        <ListAddress update={true} customerId={id} selector={selectCustomerAddress}/>
                        <H3 className={"margin-top-medium"}>Add Address</H3>
                        <AddAddress customerId={id}/>
                    </Section>
                    <Section>
                        <H2>Password</H2>
                        <UpdatePasswordCustomer customerId={id}/>
                    </Section>
                    </>
                )}
            </LayoutCustomerContent>
        </LayoutCustomer>
        </>
    )
}

export default UpdateCustomerPage