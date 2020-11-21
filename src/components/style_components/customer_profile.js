import React from 'react';
import { H3 } from '../UI_components/heading';

const CustomerProfile = props => {
    let { customer = {} } = props
    return (
        <div className="customer-profile">
            <div className="customer-profile__photo">
                <img src={customer.avatar} />
            </div>
            <div className="customer-profile__data">
                <H3 className="customer-profile__name">
                    {customer.name}
                </H3>
                <p className="customer-profile__city">
                    {customer.addresses && customer.addresses[0].city.city_name}
                </p>
            </div>
        </div>
    )
}

export default CustomerProfile