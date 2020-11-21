import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectTransactions } from './transaction_slice'
import Pagination from '../../components/style_components/pagination'
import FilterStatusTransaction from '../../components/style_components/filter_status_transaction'
import UploadTransfer from './upload_transfer'
import VerifikasiTransfer from './verifikasi_transaction'
import TransferPhoto from '../../components/style_components/transfer_photo'
import RejectPaymentReason from '../../components/style_components/reject_payment_reason'

const ITEM_PER_PAGE = 10
const PEMBAYARAN_MENUNGGU_VERIFIKASI = "PEMBAYARAN_MENUNGGU_VERIFIKASI"
const PEMBAYARAN_SEDANG_DIVERIFIKASI = "PEMBAYARAN_SEDANG_DIVERIFIKASI"
const PEMBAYARAN_SUCCESS             = "PEMBAYARAN_SUCCESS"
const PEMBAYARAN_GAGAL               = "PEMBAYARAN_GAGAL"

const ListTransaction = props => {
    let { fetch, userType } = props

    let transactions = useSelector(selectTransactions)
    let [selectedStatusTransaction, setSelectedStatusTransaction] = useState("")
    const changeFilterStatus = (status) => {
        console.log("trigger change status : ", status)
        setSelectedStatusTransaction(status) 
        fetch("", status)
    }

    const [page, setPage ] = useState(1)

    useEffect(() => {
        fetch()
    },[])

    const nextPage = () => {
        let isTransactionssAlreadyFetch = transactions.length >= (page) * ITEM_PER_PAGE
        if(!isTransactionssAlreadyFetch) {
            let lastOrder = encodeURIComponent(transactions[transactions.length -1 ].created_at)
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
        let isTransactionssAlreadyFetch = transactions.length >= (page) * ITEM_PER_PAGE
        if(!isTransactionssAlreadyFetch) {
            let lastOrder = encodeURIComponent(transactions[transactions.length -1 ].created_at)
            fetch( lastOrder)
        }

        setPage(page)
    }

    let startIndex = (page -1) * ITEM_PER_PAGE
    let endIndex = page * ITEM_PER_PAGE
    let showedTransactions = transactions.slice(startIndex, endIndex)

    return (
        <>
        <div className="list-transaction">
            <FilterStatusTransaction
                selectedStatus={selectedStatusTransaction}
                changeStatus={changeFilterStatus}/>
            <div className="list-transaction__row">
                <div className="
                list-transaction__date-col
                list-transaction__title
                ">
                    Tanggal
                </div>
                <div className="
                list-transaction__nomor-col
                list-transaction__title
                ">
                    Nomor
                </div>
                <div className="
                list-transaction__total-col
                list-transaction__title
                ">
                    Total Transfer
                </div>
                <div className="
                list-transaction__status-col
                list-transaction__title
                ">
                    Status 
                </div>
                <div className="
                list-transaction__action-col
                list-transaction__title
                ">
                    Aksi
                </div>
            </div>
            {
            showedTransactions.map(transaction => (
            <div
                key={transaction._id}
                className="list-transaction__row">
                <div className="list-transaction__date-col">
                    {new Date(transaction.created_at).toDateString()}
                </div>
                <div className="list-transaction__nomor-col">
                    {transaction._id}
                </div>
                <div className="list-transaction__total-col">
                    Rp.  {transaction.total_transfer}
                    <TransferPhoto transaction={transaction}/>
                </div>
                <div className="list-transaction__status-col">
                    <span className={`list-transaction__${transaction.payment_status}`}>
                        {transaction.payment_status}
                    </span>
                 
                  {transaction.payment_status === PEMBAYARAN_GAGAL && (
                      <RejectPaymentReason transaction={transaction}/>
                  )}

                </div>
                <div className="list-transaction__action-col">
                    { (userType === "customer" && transaction.payment_status !== PEMBAYARAN_SUCCESS )&& (
                        <UploadTransfer transaction={transaction}/>
                    )}

                    {
                        (userType === "admin") && 
                        (transaction.payment_status === PEMBAYARAN_SEDANG_DIVERIFIKASI) && 
                        (
                            <VerifikasiTransfer transaction={transaction}/>
                        )
                    }
                    {
                        (transaction.payment_status === PEMBAYARAN_SUCCESS) && (
                            <span>-</span>
                        )
                    }
                </div>
            </div>
            ))
            }
        </div>
        <Pagination
            back={prevPage}
            choose={choosePage}
            next={nextPage}
            canNext={(page * ITEM_PER_PAGE) <= transactions.length}
            page={page}/>
        </>
    )
}

export default ListTransaction
