import React, { useRef, useEffect } from 'react';
import { URL_GET_CUSTOMERS } from '../../api/api';
import Axios from 'axios';

import { H3 } from '../../components/UI_components/heading';
import { ButtonBlackMedium, ButtonBlackSmall } from '../../components/UI_components/button';
import Loading from '../../components/UI_components/loading';
import ErrorPage from '../error/error_page';
import { useReponse } from '../customs_hooks/useResponse';
import { selectCustomers, fetchCustomers } from './customer_slice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ListCustomer = props => {
    let dispatch = useDispatch()
    let history = useHistory()

    const customers = useSelector(selectCustomers)
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
                let response = await Axios.get(URL_GET_CUSTOMERS(),{
                    headers : {
                        token : localStorage.getItem("token")
                    }
                })
                dispatch(fetchCustomers({customers : response.data.data}))
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

    const details = (customerId) => {
        if(customerId) history.push("/customers/"+customerId+"/details")
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
        <ul className="list-customer">
            {
                customers.map((customer, i) => (
                    <li className="list-customer__user">
                        <div className="list-customer__avatar">
                            <img className="list-customer__img" src={customer.avatar}/>
                        </div>
                        <div className="list-customer__biodata">
                            <H3 className="list-customer__name">{customer.name}</H3>
                        <p className="list-customer__alamat">
                            {
                                customer.addresses.map((address, i )=>{
                                    if(i === customer.addresses.length-1) return `${address.city.city_name}`

                                    return `${address.city.city_name}, `
                                })
                            }
                        </p>
                        </div>
                        <ButtonBlackMedium event={() => details(customer._id)}>
                            SHOW
                        </ButtonBlackMedium>
                    </li>
                ))
            }
        </ul>
        </>
    )
}

export default ListCustomer;