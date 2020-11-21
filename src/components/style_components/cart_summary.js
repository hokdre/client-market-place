import React from 'react';
import { H3 } from '../UI_components/heading';
import { ButtonBlackLarge } from '../UI_components/button';

const CartSummary = props => {
    let { checkedItems = {}, processShipment } = props
    
    let totalPrice = 0
    let totalProduct = 0
    Object.keys(checkedItems).forEach(merchantId => {
        let items = checkedItems[merchantId]

        let subTotal = 0
        items.forEach(item => {
            subTotal += item.quantity * item.product.price
            totalProduct += item.quantity
        })

        totalPrice += subTotal
    })

    let hasProductChecked = totalProduct !== 0

    return (
        <div className="cart-summary">
            <H3 className="cart-summary__title">
                Ringkasan Belanja
            </H3>
            <div className="cart-summary__flex">
                <span className="cart-summary__title-total">
                    Total Harga
                </span>
                <span className="cart-summary__price-total">
                    Rp . {totalPrice}
                </span>
            </div>

            {
                hasProductChecked ? 
                (
                    <ButtonBlackLarge event={processShipment} className="cart-summary__buy-button">
                        Beli({totalProduct})
                    </ButtonBlackLarge>
                ) :
                (

                    <ButtonBlackLarge 
                    event={() => {}}
                    className="cart-summary__buy-button cart-summary__buy-button--disabled">
                        Beli({ totalProduct})
                    </ButtonBlackLarge>
                )
            }
        </div>
    )
}

export default CartSummary