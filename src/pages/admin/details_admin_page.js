import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminAsyncThunk, selectResponseGetOne, selectAdminAddress } from '../../features/admin/admin_slice';
import { useParams } from 'react-router-dom';

import Section from '../../components/UI_components/section';
import ErrorPage from '../../features/error/error_page';
import Loading from '../../components/UI_components/loading';
import ListAddress from '../../features/address/list_address';
import { H2 } from '../../components/UI_components/heading';
import GetAdminBasicInfo from '../../features/admin/get_basic_info_admin';

import LayoutAdmin, { LayoutAdminContent } from '../../layout/admin/layout_admin';
import { MenubarFiturAdmin } from './menubar_fitur_admin';
const DetailAdminPage = props => {
    let { id } = useParams()

    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAdminAsyncThunk(id))
    },[id])

    let { httpCode, success, loading } = useSelector(selectResponseGetOne)

    return (
        <>
        <LayoutAdmin>
            <MenubarFiturAdmin active=""/>
            <LayoutAdminContent>
                { httpCode && httpCode != 400 ? 
                    (<ErrorPage httpCode={httpCode}/>) : "" 
                }
                {loading && <Loading/> }
                { success && (
                    <>
                    <Section>
                        <H2>Basic Info</H2>
                        <GetAdminBasicInfo/>
                    </Section>
                    <Section>
                        <H2>Address</H2>
                        <ListAddress update={false} adminId={id} selector={selectAdminAddress}/>
                    </Section>
                    </>
                )}
            </LayoutAdminContent>
        </LayoutAdmin>
        </>
    )
}

export default DetailAdminPage