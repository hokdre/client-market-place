import React from 'react';
import { PopUpForm } from '../UI_components/popup';
import AddAddress from '../../features/address/add_address';
import { useSelector } from 'react-redux';
import { selectCustomer } from '../../features/customer/customer_slice';

const PopUpCartAddAddress = props => {
    let customer = useSelector(selectCustomer)
    let { show, close } = props

    return (
        <PopUpForm
                id="popup-form-add-address"
                title="Tambah Alamat"
                close={close}
                show={show}>
                    <div className="popup-cart-add-address">
                        <AddAddress
                            attachSubmit={close}
                            attachCancel={close}
                            customerId={customer._id}/>
                    </div>
            </PopUpForm>
    )
}

export default PopUpCartAddAddress