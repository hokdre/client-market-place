import React, { useState, useEffect } from 'react';
import { PopUpForm } from '../UI_components/popup';
import { InputText } from '../UI_components/form';
import { ButtonGroupsRight, ButtonOutlineBlackMedium, ButtonBlackMedium } from '../UI_components/button';

const InputNote = props => {
    let {value, change, show, close } = props
    let [note, setNote] = useState("")

    useEffect(() => {
        if(value) setNote(value)
    }, [value])

    const onChange = e => {
        if (e) setNote(e.target.value)
    }

    const saveChanged = () => {
        if(change) change(note)
        if(close) close()
    }

    return (
        <PopUpForm
            close={close}
            title="Catatan untuk penjual"
            show={show}
            >
                <div className="detil-product__note">
                    <InputText
                        label="Catatan :" 
                        value={note}
                        onChange={onChange}
                        placeholder="catatan.."
                        maxLength ={100}
                        />
                    <ButtonGroupsRight>
                        <ButtonOutlineBlackMedium 
                            event={close}
                            id={"btn-cancel-add-etalase"}
                            className="margin-right-small">
                            CANCEL
                        </ButtonOutlineBlackMedium>
                        <ButtonBlackMedium
                        id={"btn-add-etalase"}
                            event={saveChanged} className="margin-right-small">
                            SUBMIT
                        </ButtonBlackMedium>
                    </ButtonGroupsRight>
                </div>
        </PopUpForm>
    )

}

export default InputNote;