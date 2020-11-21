import React from 'react';

const Receiver = props => {
    let { receiver = {} } = props

    return (
        <div className="receiver">
            <p className="receiver__name">
                {receiver.name}
            </p>
            <p className="receiver__phone">
                { receiver.phone }
            </p>  
            <p className="receiver__street">
                {receiver.address && receiver.address.street} No.{receiver.address  && receiver.address.number}
            </p>
            <p className="receiver__city">
            {receiver.address && receiver.address.city.province}, {receiver.address && receiver.address.city.city_name}, { receiver.address && receiver.address.city.postal_code}
            </p>      
        </div>
    )
}

export default Receiver