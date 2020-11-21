import React, { useState } from 'react'
import { PopUpEmpty } from '../UI_components/popup'
import { ButtonGroupsRight, ButtonBlackSmall } from '../UI_components/button'
import { H3 } from '../UI_components/heading'

const RejectPaymentReason = props => {
    let { transaction = {}  } = props
    let [showReason, setShowReason ] = useState(false)
    const openReason = () => setShowReason(true)
    const closeReason = () => setShowReason(false)

    return (
        <div className="reject-payment-reason">
            <span 
            onClick={openReason} className="reject-payment-reason__button-lihat">Alasan</span>
           
            <PopUpEmpty
                id="popup-reject-reason"
                style={{width : "15%"}}
                show={showReason}
                close={closeReason}
                >
                <div className="reject-payment-reason__reason-box">
                    <H3>Alasan Penolakan : </H3>
                    <p>{transaction.message}</p>
                </div>
            </PopUpEmpty>
        </div>
    )
}

export default RejectPaymentReason