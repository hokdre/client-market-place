import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { PopUpConfirm, PopUpForm } from '../../components/UI_components/popup';
import { ButtonGroupsBetween, ButtonTextBlackSmall, ButtonRedSmall } from '../../components/UI_components/button';
import UpdateAddress from './update_address';
import PopupDeleteAddress from './delete_address';

const ListAddress = props => {
    let { 
        selector, 
        adminId, 
        merchantId, 
        customerId, 
        update
    } = props
    let addresses = useSelector(selector)

    const [showDialogUpdate, setShowDialogUpdate] = useState(false)
    const [showDialogDelete, setShowDialogDelete] = useState(false)
    const [selectedAddress, setSelectedAddress ] = useState({})
    const openDialogUpdate = (add) => {
        setShowDialogUpdate(true)
        setSelectedAddress(add)
    }
    const openDialogDelete = (add) => {
        setShowDialogDelete(true)
        setSelectedAddress(add)
    }
    const closeDialogUpdate = () => {
        setSelectedAddress({})
        setShowDialogUpdate(false)
    }
    const closeDialogDelete = () => setShowDialogDelete(false)

    return (
        <>
        <ul className="address__list">
            {
                addresses.map((add) => (
                    <li key={add._id} className="address__item">
                        <h3 className="address__street">{add.street}</h3>
                        <p className="address__number">{add.number}</p>
                        <p className="address__city">{add.city && add.city.city_name}</p>
                        <p className="address__postal__code">{add.city && add.city.postal_code}</p>
                        {
                            update && 
                            (<ButtonGroupsBetween className="margin-top-small">
                                <ButtonTextBlackSmall event={(e)=> {
                                    e.stopPropagation()
                                    openDialogUpdate(add)
                                }}>Update</ButtonTextBlackSmall>
                                <ButtonRedSmall event={(e) => {
                                    e.stopPropagation()
                                    openDialogDelete(add)
                                }} className="btn--red">Delete</ButtonRedSmall>
                            </ButtonGroupsBetween>)
                        }
                    </li>
                ))
            }
            {
                update && (
                    <>
                    <PopupDeleteAddress 
                        id={"popup-delete-address"}
                        show={showDialogDelete} 
                        close={closeDialogDelete}
                        address={selectedAddress} 
                        adminId={adminId}
                        customerId={customerId}
                        merchantId={merchantId}/>
                    <PopUpForm
                        id={"popup-update-address"}
                        title="Update Address"
                        show={showDialogUpdate} 
                        close={closeDialogUpdate}>
                        <UpdateAddress 
                            attachCancel={closeDialogUpdate}
                            address={selectedAddress} 
                            adminId={adminId}
                            customerId={customerId}
                            merchantId={merchantId}/>
                    </PopUpForm>
                    </>
                )
            }
        </ul>
        </>
    )
}

export default ListAddress;