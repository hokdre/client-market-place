import React, { useState, useEffect, useRef } from 'react'
import { useReponse } from '../../features/customs_hooks/useResponse'
import {  ButtonBlackLarge } from '../UI_components/button'
import Axios from 'axios'
import { URL_GET_ONGKIR } from '../../api/api'
import { H3 } from '../UI_components/heading'

const ShippmentChooser = props => {
    let { 
        shippings = [], 
        merchantId = "",
        selected_shipping = {} ,
        chooseShipping, 
        destination_city = "",
        origin_city = "" ,
        weight = 0
    } = props

    let [shippingOptions, setShippingOptions ] = useState([])
    useEffect(() => {
       if(shippings.length > 0) {
           let shippingOptions = []
           shippings.forEach(provider => {
               shippingOptions.push({
                   ...provider,
                   services : []
                })
            })
           setShippingOptions(shippingOptions)
       }
    },[shippings])

    let prevDestinationCity = useRef()
    useEffect(() => {
        if(prevDestinationCity !== destination_city ) {
            prevDestinationCity = destination_city
            let providerIds = shippingOptions.map(provider => provider._id)
            fetchPrice(providerIds, destination_city) 
        }
    },[destination_city])

    let [show, setShow] = useState(false)
    let openOption = () => {
        setShow(true)
    }
    let closeOption = () => {
        setShow(false)
    }
    let toogleOption = () => {
        setShow(!show)
    }
    let chooseOption = (shipping, service) => {
        console.log(`trigger choose option`)
        let shippingData =  {
            merchant_id : merchantId,
            shipping : shipping,
            service : service
        } 

        console.log(shippingData)
        chooseShipping(shippingData)

        closeOption()
    }

    let {
        loading,
        success,
        httpCode,
        setLoading,
        setSuccess,
        setError
    } = useReponse()
    const fetchPrice = async (shippings, destination_city) => {
        if(shippings.length !== 0 && destination_city && origin_city & (weight !== 0) ) {
            console.log(`fetching price shipping from ${origin_city} to : ${destination_city} with weight : ${weight} : shippings ${shippings.toString()}`)

            let params = `?origin=${origin_city}&destination=${destination_city}&weight=${weight}&providers=${shippings.toString()}`
            try{
                setLoading()
                let response = await Axios.get(URL_GET_ONGKIR(params))
                console.log(`returned value :`)
                console.log(response.data.data)
                setOngkirPrice(response.data.data)
                setSuccess()
            }catch(error){
                console.log(`returned error :`)
                console.log(error)
                setError(error)
            }
        }
    }

    const setOngkirPrice = dataShippings => {
        let newShippingsOptions = [...shippingOptions]
        dataShippings.forEach(shippingData => {
            newShippingsOptions.forEach((shipping, index )=>{
                if(shippingData.provider._id === shipping._id) {
                    newShippingsOptions[index]["services"] = shippingData.services
                }
            })
        })
        setShippingOptions(newShippingsOptions)
    }

    let optionBoxRef = useRef()
    useEffect(() => {
        function handleClickOutSide(event){
            if (optionBoxRef.current && !optionBoxRef.current.contains(event.target)) {
                closeOption()
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () =>  document.removeEventListener("mousedown", handleClickOutSide);

    },[optionBoxRef])

    return (
        <div ref={optionBoxRef} className="shippment-chooser">
            <div className="shippment-chooser__button-row">   
                <ButtonBlackLarge
                    className="shippment-chooser__button" 
                    event={toogleOption}>
                    Pilih Pengiriman
                </ButtonBlackLarge>
                {
                    (Object.keys(selected_shipping).length !== 0) && (
                    <div className="shippment-chooser__selected-shipping">
                       <p className="shippment-chooser__selected-shipping-title">Kurir Pilihan :</p>
                        <p className="shippment-chooser__selected-shipping-flex">
                            <span className="shippment-chooser__selected-shipping-name">{selected_shipping.shipping.name}</span>
                            <span className="shippment-chooser__selected-shipping-name">Rp.{selected_shipping.service.cost}</span>
                        </p> 
                    </div>
                    )
                }
            </div>
            {
                show && (
                    <div className="shippment-chooser__shipping-row">
                        {
                            shippingOptions.map(shipping => (
                                <div 
                                key={shipping._id}
                                className="shippment-chooser__shipping">
                                    <p className="shippment-chooser__shipping-name">
                                        {shipping.name}
                                    </p>

                                    {
                                        shipping.services.map(service =>(
                                            <div
                                            key={service.name}
                                            onClick={() => chooseOption(shipping, service)}
                                            className="shippment-chooser__service-flex">
                                                <p>
                                                    <span className="shippment-chooser__service-name">
                                                        {service.description} 
                                                    </span>
                                                    <span>
                                                        ({service.etd})
                                                    </span>
                                                </p>
                                                <span className="shippment-chooser__service-price">
                                                    Rp.{service.cost}
                                                    
                                                </span>
                                            </div>
                                        ))
                                    }
                                    
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
    
}

export default ShippmentChooser