import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {  ButtonRedSmall, ButtonGroupsRight } from '../../components/UI_components/button';
import PopupDeleteShipping from './delete_shipping';

import { selectMerchantShippings } from '../merchant/merchant_slice';

const ListShipping = props => {
    let {  merchantId, update, merchant } = props
    let shippingsPribadi = useSelector(selectMerchantShippings)
    
    const [showDialogDelete, setShowDialogDelete] = useState(false)
    const [selectedShipping, setSelectedShipping ] = useState({})
    const openDialogDelete = (shipping) => {
        setShowDialogDelete(true)
        setSelectedShipping(shipping)
    }
    const closeDialogDelete = () => setShowDialogDelete(false)

    return (
        <>
        <ul className="shipping__list">
            {
               !merchant && shippingsPribadi.length == 0 ? "Belum ada shippings" : ""
            }
            {
               merchant && merchant.shippings.length == 0 ? "Belum ada shippings" : ""
            }
            {
               (merchant ? merchant.shippings :  shippingsPribadi).map((shipping) => (
                    <li key={shipping._id} className="shipping__item">
                       <p className="paragraph">{shipping.name}</p>
                        {
                            update && 
                            (<ButtonGroupsRight className="margin-top-small">
                                <ButtonRedSmall event={() => openDialogDelete(shipping)} className="btn--red">Delete</ButtonRedSmall>
                            </ButtonGroupsRight>)
                        }
                    </li>
                ))
            }
            {
                update && (
                    <>
                    <PopupDeleteShipping 
                        id={"popup-delete-shipping"}
                        show={showDialogDelete} 
                        close={closeDialogDelete}
                        shipping={selectedShipping} 
                        merchantId={merchantId}/>
                    </>
                )
            }
        </ul>
        </>
    )
}

export default ListShipping;