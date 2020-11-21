import React from 'react';
import { useSelector } from 'react-redux';
import { selectAdminBasicInfo } from '../../features/admin/admin_slice';
import Profile from '../profile';

const ProfileAdmin = props => {
    let { _id, avatar, name } = useSelector(selectAdminBasicInfo)

    return (
        <Profile name={name} avatar={avatar} link={`/admins/${_id}/update`} />
    )
}

export default ProfileAdmin