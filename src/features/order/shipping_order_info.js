import React from 'react';
import { H3 } from '../../components/UI_components/heading';
import AddResi from './add_resi';

const ShippingOrderInfo = props => {
    let { order = {}, updateOrder, userType="" } = props
    return (
        <div className="shipping-order-info">
            <H3>Riwayat Pengiriman :
                {
                    order.delivered && (
                        <span className="shipping-order-info__status">Diajukan Telah Sampai</span>
                    )
                }
            </H3>
            {
                userType === "customer" && order.resi_number && (
                <p className="paragraph">Resi : { " " +order.resi_number}</p>
                )
            }
            {
                 userType === "customer" && !order.resi_number && (
                    <p className="paragraph">Belum Ada Resi</p>
                )
            }
            {
                userType === "merchant" && (
                    <AddResi 
                        order={order}
                        updateOrder={updateOrder}/>
                )
            }
        </div>
    )
}

export default ShippingOrderInfo