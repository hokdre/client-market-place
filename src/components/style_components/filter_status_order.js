import React from 'react';

const STATUS_ORDER_MENUNGGU_PEMBAYARAN = "STATUS_ORDER_MENUNGGU_PEMBAYARAN"
const STATUS_ORDER_SEDANG_DIPROSES     = "STATUS_ORDER_SEDANG_DIPROSES"
const STATUS_ORDER_SEDANG_DIKIRIM      = "STATUS_ORDER_SEDANG_DIKIRIM"
const STATUS_ORDER_DI_CANCEL           = "STATUS_ORDER_DI_CANCEL"
const STATUS_ORDER_DI_AJUKAN_RETUR     = "STATUS_ORDER_DI_AJUKAN_RETUR"
const STATUS_ORDER_RETUR_DITERIMA      = "STATUS_ORDER_RETUR_DITERIMA"
const STATUS_ORDER_RETUR_DITOLAK       = "STATUS_ORDER_RETUR_DITOLAK"
const STATUS_ORDER_DIPUTUSKAN          = "STATUS_ORDER_DIPUTUSKAN"
const STATUS_ORDER_SELESAI             = "STATUS_ORDER_SELESAI"
const DAFTAR_STATUS_ORDER = [
    STATUS_ORDER_MENUNGGU_PEMBAYARAN,
    STATUS_ORDER_SEDANG_DIPROSES,
    STATUS_ORDER_SEDANG_DIKIRIM,
    STATUS_ORDER_DI_CANCEL,
    STATUS_ORDER_DI_AJUKAN_RETUR,
    STATUS_ORDER_RETUR_DITERIMA,
    STATUS_ORDER_RETUR_DITOLAK,
    STATUS_ORDER_DIPUTUSKAN,
    STATUS_ORDER_SELESAI
]
const FilterStatusOrder = props => {
    let { selectedStatus = "", changeStatus } = props

    return (
        <div className="filter-status-order">
            {

            DAFTAR_STATUS_ORDER.map(status => (
            <div 
                key={status} 
                onClick={() => changeStatus(status)}
                className={
                    status === selectedStatus ? 
                    `filter-status-order__item
                    filter-status-order__item--selected
                    `
                    :
                    `filter-status-order__item`
                }>
                {status}
            </div>
            ))

            }
        </div>
    )
}

export default FilterStatusOrder

