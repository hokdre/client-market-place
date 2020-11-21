import React, { useState, useEffect } from 'react';
import { PopUpForm } from '../UI_components/popup';
import CartAddressChooserOption from './cart_address_chooser_option';
import { InputText } from '../UI_components/form';
import PopUpCartAddAddress from './popup_cart_add_address';
import { ButtonOutlineBlackSmall, ButtonBlackSmall } from '../UI_components/button';


const CartAddressChooser = props => {
    let { 
        selected={},
        addresses = [],
        receiverName,
        receiverPhone,
        show,
        open,
        close,
        changeReceiverData
    } = props

    let [name, setName ] = useState("")
    let [phone, setPhone] = useState("")
    let [selectedAddress, setSelectedAddress] = useState({})
    useEffect(() => {
        setName(receiverName)
        setPhone(receiverPhone)
        setSelectedAddress(selected)
    },[selected, receiverName,receiverPhone])

    let [showAddAddress, setShowAddAddress ] = useState(false)
    let openAddAddress = () => {
        close()
        setShowAddAddress(true)
    } 
    let closeAddAddress = () => {
        open()
        setShowAddAddress(false)
    }
    

    const onChangeReceiverName = e => {
        if(e) setName(e.target.value)
    }

    const onChangeReceiverPhone = e => {
        if(e) setPhone(e.target.value)
    }

    const chooseAddress = address => {
        console.log(`choose address`)
        console.log(address)
        if(address) setSelectedAddress(address)
    }

    const save = () => {
        console.log(`chooser trigger change receiver data :`)
        console.log({
            receiver_name : name, 
            receiver_phone : phone, 
            receiver_address : selectedAddress  
        })
        changeReceiverData({
            receiver_name : name, 
            receiver_phone : phone, 
            receiver_address : selectedAddress
        })
        close()
    }

    return (
        <>
        <PopUpForm 
            id="popup-choose-address"
            close={close}
            show={show}
            title={"Pilih Alamat Pengiriman"}>
               <div className="cart-address-chooser">
                   <div className="cart-address-chooser__receiver-row">
                       <div className="cart-address-chooser__receiver-name">
                            <InputText 
                                label="Penerima :" 
                                value={name}
                                onChange={onChangeReceiverName}
                                />
                       </div>
                       <div className="cart-address-chooser__receiver-phone">
                            <InputText 
                                label="Phone :" 
                                value={phone}
                                onChange={onChangeReceiverPhone}
                                />
                       </div>
                   </div>

                   <div className="cart-address-chooser__addresses-row">
                        <ButtonOutlineBlackSmall className="cart-address-chooser__addresses-button" event={openAddAddress}>
                            Tambah Alamat
                        </ButtonOutlineBlackSmall>

                        {addresses.map(address => (
                            <CartAddressChooserOption
                                key={address._id}
                                address={address}
                                selected={selectedAddress}
                                chooseAddress={chooseAddress}/>
                        ))}
                   </div>

                   <div className="cart-address-chooser__button-save">
                       <ButtonBlackSmall event={save}>
                           Simpan
                       </ButtonBlackSmall>
                   </div>
               </div>
        </PopUpForm>
        <PopUpCartAddAddress
            show={showAddAddress}
            close={closeAddAddress}/>
        </>
    )


}

export default CartAddressChooser