import React from 'react';

const PEMBAYARAN_MENUNGGU_VERIFIKASI = "PEMBAYARAN_MENUNGGU_VERIFIKASI"
const PEMBAYARAN_SEDANG_DIVERIFIKASI = "PEMBAYARAN_SEDANG_DIVERIFIKASI"
const PEMBAYARAN_SUCCESS             = "PEMBAYARAN_SUCCESS"
const PEMBAYARAN_GAGAL               = "PEMBAYARAN_GAGAL"
const DAFTAR_STATUS_TRANSACTION = [
   PEMBAYARAN_MENUNGGU_VERIFIKASI,
   PEMBAYARAN_SEDANG_DIVERIFIKASI,
   PEMBAYARAN_SUCCESS,
   PEMBAYARAN_GAGAL
]
const FilterStatusTransaction = props => {
    let { selectedStatus = "", changeStatus } = props

    return (
        <div className="filter-status-transaction">
            {

            DAFTAR_STATUS_TRANSACTION.map(status => (
            <div 
                key={status} 
                onClick={() => changeStatus(status)}
                className={
                    status === selectedStatus ? 
                    `filter-status-transaction__item
                    filter-status-transaction__item--selected
                    `
                    :
                    `filter-status-transaction__item`
                }>
                {status}
            </div>
            ))

            }
        </div>
    )
}

export default FilterStatusTransaction

