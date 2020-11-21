import React, { useState } from 'react'
import { H2 } from '../UI_components/heading'
import CartAddressChooser from './cart_address_chooser'

const ItemShippmentReceiver = props => {
    let { 
        receiverName = "",
        receiverPhone= "" ,
        receiverAddress = {},
        changeReceiverName, 
        changeReceiverPhone,
        changeReceiverAddress,
        openPopUpAddress,
    } = props

    return (
    <>
    <div className="item-shippment-receiver">
        <H2 className="item-shippment-receiver__title">
            Alamat Pengiriman :</H2>
        <div className="item-shippment-receiver__data">
            <div className="item-shippment-receiver__flex">
                <span className="item-shippment-receiver__name">
                    {receiverName}
                </span>
                <span onClick={openPopUpAddress} className="item-shippment-receiver__button">
                    Ubah
                </span>
            </div>
            <p className="item-shippment-receiver__phone">
                { receiverPhone }
            </p>  
            <p className="item-shippment-receiver__street">
                {receiverAddress.street} No.{receiverAddress.number}
            </p>
            <p className="item-shippment-receiver__city">
            {receiverAddress.city && receiverAddress.city.province}, {receiverAddress.city && receiverAddress.city.city_name}, { receiverAddress.city && receiverAddress.city.postal_code}
            </p>      
        </div>
    </div>
    </>
    )
}

export default ItemShippmentReceiver