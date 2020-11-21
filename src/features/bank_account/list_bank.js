import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { PopUpForm } from '../../components/UI_components/popup';
import {  ButtonTextBlackSmall, ButtonGroupsRight } from '../../components/UI_components/button';
import UpdateBank from './update_bank';
import { H3 } from '../../components/UI_components/heading';

const ListBankAccounts = props => {
    const banksProvider = {
        "014" : "BCA",
        "008" : "MANDIRI",
        "009" : "BNI",
        "002" : "BRI"
    }

    let { selector, merchantId, customerId, update, banks } = props
    let accounts = useSelector(selector)

    const [showDialogUpdate, setShowDialogUpdate] = useState(false)
    const [selectedAccount, setSelectedAccount ] = useState({})
    const openDialogUpdate = (account) => {
        setShowDialogUpdate(true)
        setSelectedAccount(account)
    }
  
    const closeDialogUpdate = () => setShowDialogUpdate(false)

    return (
        <>
        {
           (!banks && accounts.length === 0) && 
                (<p>Belum ada account </p>)
        }
        {
            (banks && banks.length === 0 ) &&
            (<p>Belum ada account </p>)
        }
            
        <ul className="banks__list">
            {
               (banks ? banks : accounts).map((account) => (
                    <li key={account._id} className="banks__item">
                        <h3 className="banks__name">
                            {
                                banksProvider[account.bank_code]
                            }
                        </h3>
                        <p className="banks__number">{account.number}</p>
                        {
                            update && 
                            (<ButtonGroupsRight className="margin-top-small">
                                <ButtonTextBlackSmall event={()=> openDialogUpdate(account)}>Update</ButtonTextBlackSmall>
                            </ButtonGroupsRight>)
                        }
                    </li>
                ))
            }
            {
                update && (
                    <>
                    <PopUpForm
                        id={"popup-update-banks"}
                        title="Update Bank"
                        show={showDialogUpdate} 
                        close={closeDialogUpdate}>
                        <UpdateBank 
                            attachCancel={closeDialogUpdate}
                            account={selectedAccount} 
                            customerId={customerId}
                            merchantId={merchantId}/>
                    </PopUpForm>
                    </>
                )
            }
        </ul>
        </>
    )
}

export default ListBankAccounts;