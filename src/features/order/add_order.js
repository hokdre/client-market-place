import React, { useState, useEffect } from 'react';
import { useReponse } from '../customs_hooks/useResponse';
import Axios from 'axios';
import { URL_ADD_ORDER } from '../../api/api';
import MerchantProfile from '../../components/style_components/merchant_profile';
import Receiver from '../../components/style_components/receiver';
import { ButtonGroupsRight, ButtonOutlineBlackSmall, ButtonBlackSmall } from '../../components/UI_components/button';
import OrderDropdownProduct from '../../components/style_components/order_dropdown_product';
import { useDispatch } from 'react-redux';
import { deleteManyItem } from '../cart/cart_slice'

const AddOrder = props => {
    let dispatch = useDispatch()

    let { 
        orders = [], 
        close,
        statLoading,
        statError,
        statSuccess,
        openResponse } = props

    let {
        loading,
        success,
        errors,
        httpCode,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse()

    useEffect(() => {
        if (httpCode && httpCode !== 200) {
            close()
            openResponse(statError, { errCode : httpCode})
        }
        return () => setIdle()
    },[httpCode])

    const addOrder = async () => {

        console.log(`post add order : `)
        let payloads = []
        let productIds = []
        orders.forEach(order => {
            let payloadOrder = {
                merchant_id : order.merchant_id,
                receiver_name : order.receiver_name,
                receiver_phone : order.receiver_phone,
                receiver_address : order.receiver_address,
                shipping_id : order.shipping_id,
                shipping_cost : order.shipping_cost,
                service_name : order.shipping_data ? order.shipping_data.service.description : "",
                products : []
            }
            let products = []
            order.products.forEach(product => {
                products.push({
                    product_id : product.product_id,
                    quantity : product.quantity,
                    buyer_note : product.buyer_note,
                    colors : product.colors,
                    sizes : product.sizes
                })
                productIds.push(product.product_id)
            })

            payloadOrder.products = products
            payloads.push(payloadOrder)

        })

        close()
        try {
            setLoading()
            let response = await Axios.post(URL_ADD_ORDER(), { orders : payloads}, {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let orders = response.data.data
            
            console.log(`returned response : `)
            console.log(orders)
            dispatch(deleteManyItem({ productIds : productIds }))
            setSuccess()
            openResponse(statSuccess,{})
        }catch(error){
            console.log(`returned error :`)
            console.log(error)
            setError(error)
        }
    }

    return (
        <div className="add-order">
            <p className="add-order__suggestion">Periksa data penerima dan barang pesanan anda :</p>
            <div className="add-order__scroll">

                {
                    orders.map(order => (
                        <div 
                        key={order.merchant_id} className="add-order__item">
                            <div className="add-order__item-merchant-product-col">
                                <div className="add-order__merchant">
                                    <MerchantProfile 
                                        merchant={order.merchant_data}/>
                                </div>
                                <div className="add-order__product">
                                    <OrderDropdownProduct
                                        products={order.products}/>
                                </div>
                            </div>
                            <div className="add-order__item-receiver-shippment-col">
                                <div className="add-order__receiver">
                                    <p className="add-order__title">Penerima :</p>
                                    <Receiver
                                        receiver={{
                                            name : order.receiver_name,
                                            phone : order.receiver_phone,
                                            address : order.receiver_address
                                        }}/>
                                </div>
                                <div className="add-order__shippment">
                                    <span className="add-order__courier">
                                        {order.shipping_data && order.shipping_data.service && order.shipping_data.service.description }
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            
            <ButtonGroupsRight>
                <ButtonOutlineBlackSmall 
                event={close}
                className="margin-right-medium">
                    Batal
                </ButtonOutlineBlackSmall>
                <ButtonBlackSmall event={addOrder} className="margin-right-medium">
                    Proses Order
                </ButtonBlackSmall>
            </ButtonGroupsRight>
        </div>   
    )
}

export default AddOrder