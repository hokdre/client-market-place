import React, { useRef, useEffect } from 'react';
import { URL_GET_ADMINS } from '../../api/api';
import Axios from 'axios';

import { H3 } from '../../components/UI_components/heading';
import { ButtonBlackMedium, ButtonBlackSmall } from '../../components/UI_components/button';
import Loading from '../../components/UI_components/loading';
import ErrorPage from '../error/error_page';
import { useReponse } from '../customs_hooks/useResponse';
import { selectAdmins, fetchAdmins } from './admin_slice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ListAdmin = props => {
    let dispatch = useDispatch()
    let history = useHistory()

    const admins = useSelector(selectAdmins)
    let {
        loading, 
        success, 
        httpCode, 
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse()

    useEffect(() => {
        async function fetch(){
            setLoading()
            try{
                let response = await Axios.get(URL_GET_ADMINS(),{
                    headers : {
                        token : localStorage.getItem("token")
                    }
                })
                dispatch(fetchAdmins({admins : response.data.data}))
                setSuccess()
                setTimeout(() => {
                    setIdle()
                }, 3000)
            }catch(error){
                setError(error)
            }
        }
        fetch()
    },[])

    const details = (adminId) => {
        if(adminId) history.push("/admins/"+adminId+"/details")
    }
    
    return (
        <>
        {
            httpCode && httpCode != 400 ? 
                <ErrorPage httpCode={httpCode}/> : ""
        }
        {
            loading && <Loading/>
        }
        <ul className="list-admin">
            {
                admins.map((admin, i) => (
                    <li className="list-admin__user">
                        <div className="list-admin__avatar">
                            <img className="list-admin__img" src={admin.avatar}/>
                        </div>
                        <div className="list-admin__biodata">
                            <H3 className="list-admin__name">{admin.name}</H3>
                        <p className="list-admin__alamat">
                            {
                                admin.addresses.map((address, i )=>{
                                    if(i === admin.addresses.length-1) return `${address.city.city_name}`
                                })
                            }
                        </p>
                        </div>
                        <ButtonBlackMedium event={() => details(admin._id)}>
                            SHOW
                        </ButtonBlackMedium>
                    </li>
                ))
            }
        </ul>
        </>
    )
}

export default ListAdmin;