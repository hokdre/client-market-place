import React, { useState } from 'react';
import { H3 } from '../UI_components/heading';
import { ButtonBlackLarge } from '../UI_components/button';
import AddOrder from '../../features/order/add_order';
import { PopUpForm, PopUpEmpty } from '../UI_components/popup';
import MessageSuccess from './message-success';
import InternalServerMessage from '../../features/error/internal_page';

const CartShippmentSummary = props => {
    let { orders = [] } = props

    let [showOrder, setShowOrder] = useState(false)
    let openOrder = () => setShowOrder(true)
    let closeOrder = () => setShowOrder(false)

    let responseStatus = {
        statLoading : "LOADING",
        statSuccess : "SUCCESS",
        statError : "ERROR",
        statusIDLE : "IDLE"
    }
    let [statusResponse, setStatusResponse ] = useState(responseStatus.statusIDLE)
    let [errorCode, setErrorCode ] = useState("")
    let openResponse = (status, payload = {}) => {
        setStatusResponse(status)
        if(payload.errCode){
            setErrorCode(payload.errCode)
        }

    }
    let closeResponse = () => setStatusResponse(responseStatus.statusIDLE)


    let totalBelanja = 0
    let totalOngkir = 0
    let totalProduct = 0
    let isAllShippingHasSelected = true
    orders.forEach(order => {
        let products = order.products

        let subTotalPrice = 0
        let subTotalQuantity = 0
        products.forEach(product => {
            subTotalPrice += product.quantity * product.product_data.price
            subTotalQuantity += product.quantity
        })

        totalBelanja += subTotalPrice
        totalProduct += subTotalQuantity
        totalOngkir += order.shipping_cost

        if(!order.shipping_id) isAllShippingHasSelected = false
    })

    return (
        <>
        <div className="cart-shippment-summary">
            <H3 className="cart-shippment-summary__title">
                Ringkasan Belanja
            </H3>
            <div className="cart-shippment-summary__flex">
                <span>
                    Total Harga Barang
                </span>
                <span>
                    Rp . {totalBelanja}
                </span>
            </div>
            <div className="cart-shippment-summary__flex">
                <span>
                    Total Ongkos Kirim
                </span>
                <span>
                    Rp . {totalOngkir}
                </span>
            </div>
            <div className="cart-shippment-summary__flex">
                <span className="cart-shippment-summary__title-total">
                    Total Tagihan
                </span>
                <span className="cart-shippment-summary__price-total">
                    Rp . {totalBelanja + totalOngkir}
                </span>
            </div>
            {
                isAllShippingHasSelected ? 
                (
                    <ButtonBlackLarge event={openOrder} className="cart-shippment-summary__buy-button">
                        Beli({totalProduct})
                    </ButtonBlackLarge>
                ) 
                    :
                (
                    <ButtonBlackLarge 
                    event={() => {}} 
                    className="
                    cart-shippment-summary__buy-button 
                    cart-shippment-summary__buy-button--disabled
                    ">
                        Beli({totalProduct})
                    </ButtonBlackLarge>
                )
            }
        </div>
        <PopUpForm
            show={showOrder}
            close={closeOrder}
            title={"Pesanan Anda"}
            id="popup-order"
            >
            <AddOrder
                {...responseStatus}
                openResponse={openResponse}
                close={closeOrder}
                orders={orders}/>
        </PopUpForm>
        
        <PopUpEmpty
            style={{width : "30%"}}
            close={closeResponse}
            show={statusResponse !== responseStatus.statusIDLE}>

           { 
            statusResponse === responseStatus.statSuccess && (<MessageSuccess
                title="Order Berhasil Dibuat!"
                message="kembali ke cart"
                button_message="Lihat Cart"
                redirect_link="/carts"/>)
           }
           {
            (statusResponse === responseStatus.statError && errorCode === 500) && (<InternalServerMessage/>)
           }
        </PopUpEmpty>
          
        </>
    )
}

export default CartShippmentSummary