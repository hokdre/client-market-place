import React, { useState } from 'react'
import { useReponse } from '../customs_hooks/useResponse'
import Axios from 'axios'
import { URL_ACCEPT_TRANSACTION, URL_REJECT_TRANSACTION } from '../../api/api'
import { useDispatch } from 'react-redux'
import { updateTransaction } from './transaction_slice'
import { ButtonOutlineBlackSmall, ButtonBlackSmall, ButtonGroupsRight } from '../../components/UI_components/button'
import { PopUpConfirm, PopUpForm } from '../../components/UI_components/popup'
import { InputText } from '../../components/UI_components/form'

const VerifikasiTransfer = props => {
    let { transaction = {} } = props
    let dispatch = useDispatch()

    let [rejectReason, setRejectReason ] = useState("")
    const handleChangeRejectReason = e => {
        if(e.target) {
            setRejectReason(e.target.value)
        }
    }

    let [showConfirmAccept, setShowConfirmAccept ] = useState(false)
    let openConfirmAccept = () => setShowConfirmAccept(true)
    let closeConfirmAccept = () => setShowConfirmAccept(false)

    let [showConfirmReject, setShowConfirmReject ] = useState(false)
    let openConfirmReject = () => setShowConfirmReject(true)
    let closeConfirmReject = () => {
        setShowConfirmReject(false)
        setRejectReason("")
    }

    let {
        loading,
        success,
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse()
    const acceptTransaction = async () => {
        console.log(`accept transaction with id : ${transaction._id}`)
        try {
            setLoading()
            let response = await Axios.put(URL_ACCEPT_TRANSACTION(transaction._id), {}, {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let updatedTransaction = response.data.data
            dispatch(updateTransaction({ transaction : updatedTransaction }))
            setSuccess()

            console.log(`returned data :`)
            console.log(updatedTransaction)

            setTimeout(() => {
               closeConfirmAccept()
                setIdle()
            }, 3000);
        }catch(error){
            console.log(`returned error :`)
            console.log(error)
            setError(error)
        }
    }
    const rejectTransaction = async () => {
        console.log(`reject transaction with id : ${transaction._id}`)
        try {
            setLoading()
            let response = await Axios.put(URL_REJECT_TRANSACTION(transaction._id), {
                message : rejectReason
            }, {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let updatedTransaction = response.data.data
            dispatch(updateTransaction({ transaction : updatedTransaction }))
            setSuccess()

            console.log(`returned data :`)
            console.log(updatedTransaction)

            setTimeout(() => {
                closeConfirmReject()
                setIdle()
            }, 3000);
        }catch(error){
            console.log(`returned error :`)
            console.log(error)
            setError(error)
        }
    }
    
    return (
        <>
        <ButtonBlackSmall
            event={openConfirmAccept}
            className="margin-bottom-small">
            Accept
        </ButtonBlackSmall>
        <ButtonOutlineBlackSmall
            event={openConfirmReject}>
            Reject
        </ButtonOutlineBlackSmall>
        <PopUpConfirm
            id="popup-confirm-transaksi"
            show={showConfirmAccept}
            action={acceptTransaction}
            close={closeConfirmAccept}
            actionName={"terima"}
            item={"transaksi"}>
                Anda yakin menerima transaksi ini ?
        </PopUpConfirm>

        <PopUpForm
            id="popup-form-reject"
            title="Reject Transaksi"
            show={showConfirmReject}
            close={closeConfirmReject}
            >
            <div className="verifikasi-transaction">
                <div className="verifikasi-transaction__input-reject-reason">
                    <InputText
                        label="Message :"
                        error={errors["Message"]}
                        onChange={handleChangeRejectReason}
                        value={rejectReason}
                        />
                </div>
                <div className="verifikasi-transaction__button-row">
                    <ButtonGroupsRight >
                        <ButtonOutlineBlackSmall 
                        event={closeConfirmReject}
                        className="margin-right-medium">
                            Cancel
                        </ButtonOutlineBlackSmall>
                        <ButtonBlackSmall 
                        event={rejectTransaction}
                        className="margin-right-medium">
                            Reject
                        </ButtonBlackSmall>
                    </ButtonGroupsRight>
                </div>
            </div>
        </PopUpForm>
        </>
    )
}

export default VerifikasiTransfer