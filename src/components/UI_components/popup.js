import React from 'react';
import { ButtonGroupsRight, ButtonTextBlackSmall, ButtonRedSmall, ButtonOutlineMedium, ButtonGroupsCenter, ButtonOutlineBlackMedium, ButtonRedMedium, ButtonOutlineBlackLarge, ButtonRedLarge } from './button';
import { H2 } from './heading';


export const PopUpConfirm = props => {
    let { show, close, action, item, id, children, actionName } = props

    let style = {}
    if(show){
        style.opacity = 1
        style.visibility = "visible"
    }

    return (
        <div id={id} style={{...style}} className="backdrop">
            <div className="popup popup--confirm">
                <div className="popup--confirm__header">
                    <div className="popup--confirm__title">
                        <i className="fas fa-exclamation-triangle popup--confirm__icon"></i>
                        <span className="popup--confirm__text"></span>
                        {actionName} {item} ?
                    </div>
                    <i onClick={close} className="fas fa-times popup--confirm__close"></i>
                </div>
                <div className="popup--confirm__content">
                    {children}
                    <ButtonGroupsCenter className="margin-vertical-small">
                        <ButtonOutlineBlackLarge className="margin-right-medium" event={close}>No</ButtonOutlineBlackLarge>
                        <ButtonRedLarge event={action}>YES</ButtonRedLarge>
                    </ButtonGroupsCenter>
                </div>
            </div>
        </div>
    )
    
}

export const PopUpForm = props => {
    let {show, title, close , children, id, width, style={} } = props

    if(show){
        style.opacity = 1
        style.visibility = "visible"
    }

    return (
        <div id={id} style={{...style}} className="backdrop">
            <div {...width && { style : { width : width } } } className="popup popup--form">
                <div className="popup--form__header">
                    <H2 className="popup--form__title">{title}</H2>
                    <i onClick={close} className="fas fa-times popup--form__close"></i>
                </div>
                <div className="popup--form__content">
                   {children}
                </div>
            </div>
        </div>
    )
}

export const PopUpEmpty = props => {
    let { style = {} , show , close, children, ...rest } = props 

    let hideCss = {}
    if(show){
        hideCss.opacity = 1
        hideCss.visibility = "visible"
    }

    return (
    <div style={{...hideCss}} {...rest} className="backdrop">
        <div style={style} className="popup popup--empty">
            <div className="popup--empty__header">
                <i onClick={close} className="fas fa-times popup--empty__close"></i>
            </div>
            <div className="popup--empty__content">
               {children}
            </div>
        </div>
    </div>
    )
}