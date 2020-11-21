import React, { useState } from 'react';
import { ButtonTextBlackSmall } from '../UI_components/button';
import InputQuantity from './input_quantity';
import InputNote from './input_note';
import PopUpError from './popup_error';

const CartNoteQuantityDel = props => {
    let { 
        item = {}, 
        errors = {}, 
        httpCode = "",
        resetErr,
        updateItem,
        openDelete 
    } = props

    let [showNote, setShowNote] = useState(false)
    let openNote = () => setShowNote(true)
    let closeNote = () => setShowNote(false)

    let addNote = note => {
        if(note){
            let data = { ...item, note : note }
            updateItem(data)
        }
    }

    const changeQuantity = quantity => {
        if(quantity){
            let data = { ...item, quantity : quantity }
            updateItem(data)
        }
    }


    return (
        <>
        <div className="cart-note-quantity-del">
            <ButtonTextBlackSmall event={openNote}>
                Tambah Catatan
            </ButtonTextBlackSmall>
            <div className="cart-note-quantity-del__buttons">
                <i onClick={openDelete} className="cart-note-quantity-del__button fas fa-trash"></i>

                <InputQuantity
                    value={item.quantity}
                    change={(quantity) => changeQuantity(quantity)}/>
            </div>
        </div>

        <InputNote
            show={showNote}
            close={closeNote}
            value={item.note}
            change={addNote}/>

        <PopUpError 
            show={httpCode && httpCode !== "200" }
            close={resetErr}>
            {
                httpCode === 500 ?
                    "Maaf, service sedang tidak tersedia" :
                    httpCode === 401 ?
                        "Maaf, Anda tidak memiliki hak akses" :
                            httpCode === 400 ?
                                errors["Quantity"] : "Maaf, service sedang tidak tersedia"
            }
        </PopUpError>
        
        </>
    )
}

export default CartNoteQuantityDel;