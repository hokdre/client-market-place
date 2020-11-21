import React from 'react';
import { useSelector } from 'react-redux';
import { selectCustomerBasicInfo } from '../../features/customer/customer_slice';
import Profile from '../profile';

const ProfileCustomer = props => {
    let { _id, avatar, name } = useSelector(selectCustomerBasicInfo)

    return (
        <Profile name={name} avatar={avatar} link={`/customers/${_id}/update`} />
    )
}

export default ProfileCustomer