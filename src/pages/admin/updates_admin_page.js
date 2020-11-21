import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminAsyncThunk, selectResponseGetOne, selectAdminAddress } from '../../features/admin/admin_slice';
import { useParams, useHistory } from 'react-router-dom';

import Section from '../../components/UI_components/section';
import ErrorPage from '../../features/error/error_page';
import Loading from '../../components/UI_components/loading';
import ListAddress from '../../features/address/list_address';
import UpdateAdminBasicInfo from '../../features/admin/update_basic_info_admin';
import { H2, H3 } from '../../components/UI_components/heading';
import AddAddress from '../../features/address/add_address';
import UpdatePasswordAdmin from '../../features/admin/update_password';
import LayoutAdmin, { LayoutAdminContent } from '../../layout/admin/layout_admin';
import Navbar from '../../layout/navbar';

const UpdateAdminPage = props => {
    let { id } = useParams()
    let history = useHistory()

    let userID = localStorage.getItem("userID")
    let loginType = localStorage.getItem("loginType")
    if(id !== userID || loginType !== "ADMIN") {
        history.replace( `/${loginType.toLocaleLowerCase()}s`)
    }
    
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAdminAsyncThunk(id))
    },[id])

    let { httpCode, errors, success, loading } = useSelector(selectResponseGetOne)

    return (
        <>
        <Navbar/>
        <LayoutAdmin>
            <LayoutAdminContent>
                { httpCode && httpCode != 400 ? 
                    (<ErrorPage httpCode={httpCode}/>) : "" 
                }
                {loading && <Loading/> }
                { success && (
                    <>
                    <Section>
                        <H2>Basic Info</H2>
                        <UpdateAdminBasicInfo adminId={id}/>
                    </Section>
                    <Section>
                        <H2>Address</H2>
                        <ListAddress update={true} adminId={id} selector={selectAdminAddress}/>
                        <H3 className={"margin-top-medium"}>Add Address</H3>
                        <AddAddress adminId={id}/>
                    </Section>
                    <Section>
                        <H2>Password</H2>
                        <UpdatePasswordAdmin adminId={id}/>
                    </Section>
                    </>
                )}
            </LayoutAdminContent>
        </LayoutAdmin>
        </>
    )
}

export default UpdateAdminPage