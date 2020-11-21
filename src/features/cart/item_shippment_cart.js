import React, { useState, useEffect } from 'react'
import MerchantProfile from '../../components/style_components/merchant_profile'
import CartProduct from '../../components/style_components/cart_product'
import { useSelector } from 'react-redux'
import { selectCustomer } from '../customer/customer_slice'
import ItemShippmentReceiver from '../../components/style_components/item_shippment_receiver'
import CartAddressChooser from '../../components/style_components/cart_address_chooser'
import { ButtonBlackSmall } from '../../components/UI_components/button'
import ShippmentChooser from '../../components/logic_components/shippement_chooser'

const ItemShippmentCart = props => {
    let { 
        order = {}, 
        changeOrderAddress,
        changeOrderShipping
     } = props
    let customer = useSelector(selectCustomer)

    let [receiverName, setReceiverName ] = useState("")
    let [receiverPhone, setReceiverPhone] = useState("")
    let [receiverAddress, setReceiverAddress] = useState({})
    let [totalWeight, setTotalWeight] = useState(0)
    
    useEffect(() => {
        setReceiverName(order.receiver_name)
        setReceiverPhone(order.receiver_phone)
        setReceiverAddress(order.receiver_address)
        if(order.products && order.products.length != 0) {
            let totalWeight = 0
            order.products.forEach(product => {
                let subTotal = product.quantity * product.product_data.weight
                totalWeight += subTotal
            })
            if(totalWeight !== 0){
                setTotalWeight(totalWeight)
            }
        }
    },[order])

    let [showPopUpAddress, setShowPopUpAddress] = useState(false)
    const closePopUpAddress = () => setShowPopUpAddress(false)
    const openPopUpAddress  = () => setShowPopUpAddress(true)

    const changeReceiverData =  receiverData => {
        let {  receiver_name, receiver_phone, receiver_address } = receiverData
        console.log(`item shippment trigger change receiver data :`)
        console.log({
            merchant_id : order.merchant_id,
            receiver_name : receiver_name,
            receiver_phone : receiver_phone,
            receiver_address : receiver_address,
        })
        changeOrderAddress({
            merchant_id : order.merchant_id,
            receiver_name : receiver_name,
            receiver_phone : receiver_phone,
            receiver_address : receiver_address,
        })
    }

    return (
        <div 
            className="item-shippment-cart">
            <div className="item-shippment-cart__merchant-row">
                <MerchantProfile merchant={order.merchant_data}/>
            </div>

            <div className="item-shippment-cart__product-row">

                <div className="item-shippment-cart__product-col">
                {
                   order.products && order.products.map(product => (
                        <div key={product.product_id}>
                            <CartProduct product={product.product_data}/>
                            <p>{product.quantity} barang ({product.quantity * product.product_data.weight} gr)</p>
                        </div>
                    ))
                }
                </div>

                <div className="item-shippment-cart__shippment-col">
                    <ShippmentChooser
                        merchantId ={order.merchant_id}
                        weight={totalWeight}
                        chooseShipping={changeOrderShipping}
                        shippings={order.merchant_data && order.merchant_data.shippings}
                        selected_shipping={order.shipping_data}
                        destination_city={receiverAddress.city && receiverAddress.city.city_id}
                        origin_city={order.merchant_data && order.merchant_data.address.city.city_id}
                        />
                </div>
            </div>
            <div className="item-shippment-cart__address-row">
                <ItemShippmentReceiver
                    receiverName={receiverName}
                    receiverPhone={receiverPhone}
                    receiverAddress={receiverAddress}
                    openPopUpAddress={openPopUpAddress}/>
                <CartAddressChooser
                    selected={receiverAddress}
                    receiverName={receiverName}
                    receiverPhone={receiverPhone}
                    addresses={customer.addresses}
                    show={showPopUpAddress}
                    changeReceiverData={changeReceiverData}
                    close={closePopUpAddress}
                    open={openPopUpAddress}
                    />
            </div>
        </div>
    )
}

export default ItemShippmentCart