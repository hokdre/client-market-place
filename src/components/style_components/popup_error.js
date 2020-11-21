import React from 'react';
import { PopUpConfirm } from '../UI_components/popup';

const PopUpError = props => {
    let { 
        show, 
        close, 
        children
    } = props

    return (
        <PopUpConfirm
            show={show}
            close={close}
            action={close}
            >
            { children }
        </PopUpConfirm>
    )
}

export default PopUpError;