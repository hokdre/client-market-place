import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col } from '../../layout/row';
import { InputText } from '../UI_components/form';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Axios from 'axios';
import { URL_SEARCH_CITY } from '../../api/api';
import { useReponse } from '../../features/customs_hooks/useResponse';
import { AlertError } from '../UI_components/alert';
import PopUpError from '../style_components/PopUpError';


const AutoCompCity = props => {
    let { setCity, selectedCity, errors } = props

    
    let [keyword, setKeyword ] = useState("")
    let [cities, setCities ] = useState([])
    
    let {
        error_message,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse()
    
    let optionBoxRef = useRef()
    useEffect(() => {
        function handleClickOutSide(event){
            if (optionBoxRef.current && !optionBoxRef.current.contains(event.target)) {
                setCities([])
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () =>  document.removeEventListener("mousedown", handleClickOutSide);

    },[optionBoxRef])

    useEffect(() => {
        setIdle()
    },[])

    useEffect(() => {
        if(selectedCity.city_name) setKeyword(selectedCity.city_name)
    }, [selectedCity])

    const fetchDebouncedCities = useCallback(AwesomeDebouncePromise(async (keyword) => {
        console.log(`fetching city with prefix : ${keyword}`)
        let params = `?keyword=${keyword}`
        setLoading()
        try{
            let response = await Axios.get(URL_SEARCH_CITY(params))
            console.log(`returned data fetching city`)
            console.log(response.data.data)
            setCities(response.data.data)
            setSuccess()
        }catch(error){
            console.log(`error while fetching city `)
            console.log(error)
            setError(error)
        }
    }, 500),[]) 

    const handleOnChange = e => {
        if(e) {
            let val = e.target.value 
            if (val) {
                fetchDebouncedCities(e.target.value)
            }
            setKeyword(val)
            setCity({})
        }
    }

    const chooseCity = city => {
        setCity(city)
        setCities([])
    }

    return (
        <>
        <PopUpError err_message={error_message}/>
        <Row>
            <Col>
                <div ref={optionBoxRef} className="auto-city">
                    <InputText
                        autoComplete="off"
                        name="City"
                        label="City :"
                        placeholder="masukan nama kota / kecamatan"
                        value={keyword}
                        onChange={handleOnChange}
                        error={errors["CityName"]}/>
                    {
                        cities.length != 0 && (<ul className="auto-city__options">
                            { cities.map(city => (
                                <li 
                                    key={city.city_id}
                                    onClick={() => chooseCity(city)}
                                    className="auto-city__option">
                                    {city.province}, {city.city_name}
                                </li>
                            )) }
                        </ul>)
                    }
                </div>
            </Col>
            <Col>
                <InputText
                    name="PostalCode"
                    label="Postal Code :"
                    placeholder="kode pos"
                    value={selectedCity.postal_code || ""}
                    disabled={true}
                    error={errors["PostalCode"]}/>
            </Col>
        </Row>
        </>
    )
}

export default AutoCompCity