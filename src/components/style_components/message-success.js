import React from 'react'
import { ButtonBlackSmall } from '../UI_components/button'
import { H3 } from '../UI_components/heading'
import { useHistory } from 'react-router-dom'

const MessageSuccess = props => {
    let history = useHistory()

    let { title="",message="", button_message="", redirect_link="" } = props

    const redirect = () => {
        if(redirect_link) history.replace(redirect_link)
    }

    return (
        <div className="message-success">
            <div className="message-success__icon-row">
                <i className="message-success__icon far fa-check-circle"></i>
            </div>
            <div className="message-success__text-row">
                <H3 className="message-success__big-message">
                    { title }
                </H3>
                <p className="message-success__small-message">
                    { message }
                </p>
            </div>
            <div className="message-success__button-row">
                <ButtonBlackSmall event={redirect}>
                  {button_message}
                </ButtonBlackSmall>
            </div>
        </div>
    )
}

export default MessageSuccess;