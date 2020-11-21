import React, { useState } from 'react'
import { PopUpEmpty } from '../UI_components/popup'
import { ButtonGroupsRight, ButtonBlackSmall } from '../UI_components/button'

const TransferPhoto = props => {
    let { transaction = {}  } = props
    let [showPhoto, setShowPhoto ] = useState(false)
    const openPhoto = () => setShowPhoto(true)
    const closePhoto = () => setShowPhoto(false)

    return (
        <div className="transfer-photo">
            {
                transaction.transfer_photo ? 
                (
                    <span 
                    onClick={openPhoto} className="transfer-photo__button-lihat">Lihat Photo </span>
                ) :
                (
                    <span className="transfer-photo__no-photo">Belum Ada Photo</span>
                )
            }
           
            <PopUpEmpty
                id="popup-bukti-transfer"
                style={{width : "15%"}}
                show={showPhoto}
                close={closePhoto}
                >
                    <div className="transfer-photo__popup-struk">
                        <div className="transfer-photo__image">
                            <img src={transaction.transfer_photo} alt="transfer photo"/>
                        </div>
                        <ButtonGroupsRight>
                            <ButtonBlackSmall event={closePhoto}>
                                OK
                            </ButtonBlackSmall>
                        </ButtonGroupsRight>
                    </div>
            </PopUpEmpty>
        </div>
    )
}

export default TransferPhoto