import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectOrders } from './order_slice'
import FilterStatusOrder from '../../components/style_components/filter_status_order'
import MerchantProfile from '../../components/style_components/merchant_profile'
import OrderDropdownProduct from '../../components/style_components/order_dropdown_product'
import Pagination from '../../components/style_components/pagination'
import CustomerProfile from '../../components/style_components/customer_profile'
import { useHistory } from 'react-router-dom'
import { ButtonBlackSmall } from '../../components/UI_components/button'
import StatusOrder from '../../components/style_components/status_order'

const ITEM_PER_PAGE = 10

const STATUS_ORDER_MENUNGGU_PEMBAYARAN = "STATUS_ORDER_MENUNGGU_PEMBAYARAN"
const STATUS_ORDER_SEDANG_DIPROSES     = "STATUS_ORDER_SEDANG_DIPROSES"
const STATUS_ORDER_SEDANG_DIKIRIM      = "STATUS_ORDER_SEDANG_DIKIRIM"
const STATUS_ORDER_SELESAI = "STATUS_ORDER_SELESAI"

const ListOrder = props => {
    let { fetch, userType="" } = props
    let history = useHistory()

    let orders = useSelector(selectOrders)
    let [selectedStatusOrder, setSelectedStatusOrder] = useState("")
    const changeFilterStatus = (status) => {
        console.log("trigger change status : ", status)
        setSelectedStatusOrder(status) 
        fetch("", status)
    }

    const [page, setPage ] = useState(1)

    useEffect(() => {
        fetch()
    },[])

    const nextPage = () => {
        let isOrdersAlreadyFetch = orders.length >= (page) * ITEM_PER_PAGE
        if(!isOrdersAlreadyFetch) {
            let lastOrder = encodeURIComponent(orders[orders.length -1 ].created_at)
            fetch(lastOrder)
        }

        setPage(page + 1)
    }

    const prevPage = () => {
        if(page > 1) {
            setPage(page -1)
        }
    }

    const choosePage = page => {
        let isOrdersAlreadyFetch = orders.length >= (page) * ITEM_PER_PAGE
        if(!isOrdersAlreadyFetch) {
            let lastOrder = encodeURIComponent(orders[orders.length -1 ].created_at)
            fetch( lastOrder)
        }

        setPage(page)
    }

    const goToPageDetail = (order_id, userType )=> {
        history.push(`/orders/${order_id}/${userType}`)
    }

    let startIndex = (page -1) * ITEM_PER_PAGE
    let endIndex = page * ITEM_PER_PAGE
    let showedOrders = orders.slice(startIndex, endIndex)

    return (
        <>
        <div className="list-order">
            <FilterStatusOrder
                selectedStatus={selectedStatusOrder}
                changeStatus={changeFilterStatus}
                />
            <div className="list-order__row">
                <div className="
                list-order__date-col
                list-order__title
                ">
                    Tanggal
                </div>
                <div className="
                list-order__merchant-col
                list-order__title
                ">
                    {userType === "customer" && ("Merchant") }
                    {userType === "merchant" && ("Customer") }
                </div>
                <div className="
                list-order__product-col
                list-order__title
                ">
                    Product
                </div>
                <div className="
                list-order__status-col
                list-order__title
                ">
                    Status
                </div>
                <div className="
                list-order__action-col
                list-order__title
                ">
                    Aksi
                </div>
            </div>
            {
            showedOrders.map(order => (
            <div
                key={order._id}
                className="list-order__row">
                <div className="list-order__date-col">
                    {new Date(order.created_at).toDateString()}
                </div>
                <div className="list-order__merchant-col">
                    { userType === "customer" && (
                        <MerchantProfile
                            merchant={order.merchant}/>
                    )}
                    {
                        userType === "merchant" && (
                            <CustomerProfile
                                customer={order.customer}/>
                        )
                    }
                </div>
                <div className="list-order__product-col">
                    <OrderDropdownProduct
                        products={order.order_items.map(item => {
                            return {
                                product_id : item.product._id,
                                product_data : item.product,
                                quantity : item.quantity
                            }
                        })}/>
                </div>
                <div className="list-order__status-col">
                    <StatusOrder status={order.status_order}/>
                </div>
                <div className="list-order__action-col">
                    <ButtonBlackSmall event={() => goToPageDetail(order._id, userType)}>
                        Detail
                    </ButtonBlackSmall>
                </div>
            </div>
            ))
            }
        </div>
        <Pagination
            back={prevPage}
            choose={choosePage}
            next={nextPage}
            canNext={(page * ITEM_PER_PAGE) <= orders.length}
            page={page}/>
        </>
    )
}

export default ListOrder
