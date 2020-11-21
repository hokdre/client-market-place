import React, { useEffect, useState } from 'react'
import MerchantProfile from '../../components/style_components/merchant_profile'
import CustomerProfile from '../../components/style_components/customer_profile'
import CartProduct from '../../components/style_components/cart_product'
import { H3, H2 } from '../../components/UI_components/heading'
import Axios from 'axios'
import { URL_GET_ORDER_BY_ID } from '../../api/api'
import { useReponse } from '../customs_hooks/useResponse'
import Receiver from '../../components/style_components/receiver'
import StatusOrder from '../../components/style_components/status_order'
import { ButtonRedSmall } from '../../components/UI_components/button'
import RejectOrder from './reject_order'
import ShippingOrderInfo from './shipping_order_info'
import { PopUpEmpty } from '../../components/UI_components/popup'
import FinishOrder from './finish_order'
import AddReviewMerchant from '../review_merchant/add_review_merchant'
import AddReviewProduct from '../review_product/add_review_product'

const STATUS_ORDER_MENUNGGU_PEMBAYARAN = "STATUS_ORDER_MENUNGGU_PEMBAYARAN"
const STATUS_ORDER_SEDANG_DIPROSES     = "STATUS_ORDER_SEDANG_DIPROSES"
const STATUS_ORDER_SEDANG_DIKIRIM      = "STATUS_ORDER_SEDANG_DIKIRIM"
const STATUS_ORDER_DI_CANCEL           = "STATUS_ORDER_DI_CANCEL"
const STATUS_ORDER_SELESAI = "STATUS_ORDER_SELESAI"

const DetailsOrder = props => {
    let {id="", userType="" } = props
    let [order, setOrder] = useState({})

    useEffect(() => {
        fetchOrderById(id)
    },[id])

    let {
        loading,
        success,
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse()
    const fetchOrderById = async (orderId) => {
        console.log(`fetching order by id : ${orderId}`)
        try {
            let response = await Axios.get(URL_GET_ORDER_BY_ID(id),{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            console.log(`returned data :`)
            let order = response.data.data
            console.log(order)
            if(order){
                setOrder(order)
            }
        }catch(error){
            console.log(`returned error :`)
            console.log(error)
            setError(error)
        }

    }

    const updateOrder = order => {
        setOrder(order)
    }

    let totalTransaksi = 0
    order.order_items && order.order_items.forEach(item => {
        totalTransaksi += (item.quantity * item.product.price)
    })

    return (
        <>
        <div className="details-order__header">
            <H3>Status : <StatusOrder status={order.status_order}/> </H3>
            { (
                userType === "merchant" 
                && order.status_order !==  STATUS_ORDER_DI_CANCEL  
                && order.status_order !==  STATUS_ORDER_SELESAI
                ) && (
                <RejectOrder updateOrder={updateOrder} order={order}/>
            )}
        </div>
        <div className="details-order">
            <div className="details-order__user-row">

                { userType === "customer" && (
                    <>
                    <H3>Merchant : </H3>
                    <MerchantProfile merchant={order.merchant}/>
                    </>
                )}
                { userType === "merchant" && (
                    <>
                    <H3>Customer : </H3>
                    <CustomerProfile customer={order.customer}/>
                    </>
                )}
            </div>
            <div className="details-order__product-row">
                <H3>Produk :</H3>
                {
                    order.order_items && order.order_items.map(item => (
                        <div className="details-order__product-box" key={item.product._id}>
                        <div className="details-order__product-pic">
                            <CartProduct key={item.product.product_id} product={item.product}/>
                        </div>
                        <div className="details-order__flex">

                            <div className="details-order__order-detail">
                                <p>
                                    <span className="details-order__title">Qty : </span> 
                                    <span className="details-order__value">{item.quantity}</span>
                                </p>
                                { item.colors && (
                                    <p>
                                        <span className="details-order__title">Colors : </span> 
                                        <span className="details-order__value">{item.colors.toString()}</span>
                                    </p>
                                )}
                                { item.sizes && (
                                    <p>
                                        <span className="details-order__title">Sizes : </span> 
                                        <span className="details-order__value">{item.sizes.toString()}</span>
                                    </p>
                                )}
                            </div>
                            <div className="details-order__note-row">
                                <H3 className="details-order__title-heading">Catatan :</H3>
                                <p>{item.buyer_note}</p>
                            </div>
                        </div>
                        <div className="details-order__sub-total-row">
                        <H3 className="details-order__title-heading">Subtotal :</H3>
                        <span className="details-order__sub-total">
                            Rp. {item.quantity * item.product.price}
                        </span>
                        </div>
                        </div>
                    ))
                }
                <div className="details-order__total-row">
                    <H3 className="details-order__title-heading">Total Transaksi :</H3>
                    <span className="details-order__total">
                        Rp. { totalTransaksi }
                    </span>
                </div>
            </div>
            <div className="details-order__shipping-row">
                <H3>Penerima : </H3>
                <Receiver receiver={{
                    name : order.receiver_name,
                    phone : order.receiver_phone,
                    address : order.receiver_address
                }}/>
                <div className="details-order__total-row">
                    <H3>
                        {order.shipping && order.shipping.name + " "} | 
                        { " " +order.service_name}
                    </H3>
                    <span className="details-order__total">
                        Rp. {order.shipping_cost}
                    </span>
                </div>
            </div>

            <div className="details-order__shipping-info-row">
                <ShippingOrderInfo
                    userType={userType}
                    updateOrder={updateOrder}
                    order={order}/>
            </div>
        </div>
        { userType === "customer" && (
            <>
            <FinishOrder
                updateOrder={updateOrder}
                order={order}/>
            <AddReviewMerchant 
                updateOrder={updateOrder}
                order={order}/>
            <AddReviewProduct
                updateOrder={updateOrder}
                order={order}/>
            </>
        )}
        </>
    )
}

export default DetailsOrder