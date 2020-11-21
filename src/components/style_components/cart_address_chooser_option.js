import React from 'react'

const CartAddressChooserOption = props => {
    let { chooseAddress , selected={} , address={} } = props

    return (
        <div 
            key={address._id}
            onClick={() => chooseAddress(address)}
            className={
                selected._id === address._id ? 
                 `cart-address-chooser-option cart-address-chooser-option--selected` :
                 `cart-address-chooser-option`
            }>
            <p className="cart-address-chooser-option__street">
                {address.street} No.{address.number}
            </p>
            <p className="cart-address-chooser-option__city">
                {address.city && address.city.province}, {address.city && address.city.city_name}, { address.city && address.city.postal_code}
            </p> 
        </div>
    )
}

export default CartAddressChooserOption
