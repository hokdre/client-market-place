import React, { useState, useEffect } from 'react';
import { ButtonBlackMedium, ButtonOutlineRedMedium } from '../../components/UI_components/button';
import { useSelector } from 'react-redux';
import { selectMerchantEtalase } from '../merchant/merchant_slice';
import { PopUpForm } from '../../components/UI_components/popup';
import AddEtalase from './add_etalase';
import PopUpDeleteEtalase from './delete_etalase';
import ListEtalase from './list_etalase';

const ManageEtalase = props => {
    let etalase = useSelector(selectMerchantEtalase)
    let { 
        changeEtalase, 
        selectedEtalase,
        merchantId
    } = props

    useEffect(() => {
        if (etalase && etalase.length !== 0) {
            changeEtalase(etalase[etalase.length-1])
        }else{
            changeEtalase("")
        }
    },[etalase])

    let [showPopUpAdd, setShowPopUpAdd] = useState(false)
    const openPopUpAddEtalase = () => {
        setShowPopUpAdd(true)
    }
    const closePopUpAddEtalase = () => {
        setShowPopUpAdd(false)
    }

    let [showPopUpDelete, setShowPopUpDelete] = useState(false)
    const openPopUpDeleteEtalase = () => {
        setShowPopUpDelete(true)
    }
    const closePopUpDeleteEtalase = () => {
        setShowPopUpDelete(false)
    }

    return (
        <>
        <div className="manage-etalase">
            <div className="manage-etalase__label margin-right-medium">
                <p className="form__label">Etalase : </p>
            </div>

            <ListEtalase
                etalase={etalase}
                selectedEtalase={selectedEtalase}
                changeEtalase={changeEtalase}/>

            <div className="manage-etalase__buttons">
                        <ButtonBlackMedium 
                        event={openPopUpAddEtalase}
                        className="margin-left-medium margin-right-medium">Add Etalase</ButtonBlackMedium>
                        <ButtonOutlineRedMedium
                        event={openPopUpDeleteEtalase}>Delete Etalase</ButtonOutlineRedMedium>
            </div>
            
        </div>
        <PopUpForm
            width={'30%'}
            show={showPopUpAdd}
            title={"Add Etalase"}
            close={closePopUpAddEtalase}
            id={"popup-add-etalase"}>
            <AddEtalase
                merchantId={merchantId}
                attachCancel={closePopUpAddEtalase}
                />
        </PopUpForm>
        <PopUpDeleteEtalase 
            show={showPopUpDelete}
            close={closePopUpDeleteEtalase}
            etalase={selectedEtalase}
            merchantId={merchantId}/>
        </>
    )
}

export default ManageEtalase;