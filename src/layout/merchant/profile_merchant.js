import React from 'react';
import { useSelector } from 'react-redux';
import { selectMerchantBasicInfo } from '../../features/merchant/merchant_slice';
import Profile from '../profile';

const ProfileMerchant = props => {
    let { _id, avatar, name } = useSelector(selectMerchantBasicInfo)

    return (
        <Profile name={name} avatar={avatar} link={`/merchants/${_id}/update`} />
    )
}

export default ProfileMerchant