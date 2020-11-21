import React, { useEffect } from 'react';
import { URL_GET_MERCHANTS } from '../../api/api';
import Axios from 'axios';

import { H3 } from '../../components/UI_components/heading';
import { ButtonBlackMedium } from '../../components/UI_components/button';
import Loading from '../../components/UI_components/loading';
import ErrorPage from '../error/error_page';
import { useReponse } from '../customs_hooks/useResponse';
import { selectMerchants, fetchMerchants } from './merchant_slice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ListMerchant = props => {
    let dispatch = useDispatch()
    let history = useHistory()

    const merchants = useSelector(selectMerchants)
    let {
        loading, 
        httpCode, 
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse()

    useEffect(() => {
        async function fetch(){
            setLoading()
            try{
                let response = await Axios.get(URL_GET_MERCHANTS(),{
                    headers : {
                        token : localStorage.getItem("token")
                    }
                })
                dispatch(fetchMerchants({merchants : response.data.data}))
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

    const details = (merchantId) => {
        if(merchantId) history.push("/merchants/"+merchantId+"/details")
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
        <ul className="list-merchant">
            {
                merchants.map((merchant, i) => (
                    <li key={i} className="list-merchant__merchant">
                        <div className="list-merchant__avatar">
                            <img className="list-merchant__img" src={merchant.avatar}/>
                        </div>
                        <div className="list-merchant__biodata">
                            <H3 className="list-merchant__name">{merchant.name}</H3>
                        <p className="list-merchant__alamat">
                            { merchant.address.city.city_name}
                        </p>
                        </div>
                        <ButtonBlackMedium event={() => details(merchant._id)}>
                            SHOW
                        </ButtonBlackMedium>
                    </li>
                ))
            }
        </ul>
        </>
    )
}

export default ListMerchant;