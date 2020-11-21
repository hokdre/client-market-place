import React from 'react';
import { H3 } from '../UI_components/heading';
import { useHistory } from 'react-router-dom';

const MerchantProfile = props => {
    let { merchant = {} } = props

    let history = useHistory()

    const goToDetailPage = () => {
        history.push(`/merchants/${merchant._id}/details`)
    }

    return (
        <div onClick={goToDetailPage} className="merchant-profile">
            <div className="merchant-profile__photo">
                <img src={merchant.avatar} />
            </div>
            <div className="merchant-profile__data">
                <H3 className="merchant-profile__name">
                    {merchant.name}
                </H3>
                <p className="merchant-profile__city">
                    {merchant.address && merchant.address.city.city_name}
                </p>
            </div>
        </div>
    )
}

export default MerchantProfile