import React, { useRef } from 'react';
import { InputSelect } from '../../components/UI_components/form';
import { H3 } from '../../components/UI_components/heading';
import Axios from 'axios';
import { URL_GET_ADMINS } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';
import { fetchAdmins } from './admin_slice';
import { useDispatch } from 'react-redux';
import ErrorPage from '../error/error_page';
import Loading from '../../components/UI_components/loading';
import InputSearch from '../../components/style_components/input_search';

const SearchAdmin = props => {
    let dispatch = useDispatch()

    let {
        loading, 
        httpCode, 
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse() 

    const options = [
        { name : "name", value : "name"},
        { name : "email", value : "email"}
    ]

    const inputQuery = useRef()
    const inputValue = useRef()

    const search = async ( keyword ) => {
        let param = inputQuery.current.value

        if(param){
            setLoading()
            try{
                let response = await Axios.get(URL_GET_ADMINS(`?${param}=${keyword}`),{
                    headers : {
                        token : localStorage.getItem("token")
                    }
                })
                let admins = response.data.data
                if(!admins){
                    admins = []
                }
                dispatch(fetchAdmins({ admins : admins }))
                setSuccess()
                setTimeout(() => setIdle(), 3000)
            }catch(error){
                setError(error)
            }
        }
    }

    return (
        <>
        {
            (httpCode && httpCode != 400) ? <ErrorPage httpCode={httpCode}/> : ""
        }
        {
            loading && <Loading/>
        }
        <div className="search-admin">
            <H3>Search By :</H3>
            <div className="search-customer__row">
                <div className="search-customer__filter">
                    <InputSelect ref={inputQuery} name={"queryBy"} options={options}/>
                </div>
                <div className="search-customer__search">
                    <InputSearch 
                        placeholder="masukan nama admin.."
                        search={(keyword) => search(keyword)}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default SearchAdmin;