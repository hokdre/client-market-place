import React, { useState, useEffect } from 'react';

export const AlertError = props => {
    let {children,close, httpCode, forceShow, message } = props
    let show = false
    if (httpCode === 400 && forceShow) {
        show = true
    } else if(httpCode && httpCode !== 400){
        show = true
    }

    return (
        <>
        {
            show && (
                <div className="alert alert--error">
                    <i className="aler__icon fa fa-check">
                    {
                        (httpCode === 400 && forceShow) ? children : message
                    }
                    </i>
                    <span className="alert__close" onClick={()=>close()}>&times;</span>
                </div>
            )
        }
        </>
    )
}

export const AlertSuccess = props => {
    let { show } = props

    const [display, setDisplay] = useState(show)
    useEffect(() => {
        setDisplay(show)
    }, [show])

    return (
        <>
        {
            display && 
            (
                <div className="alert alert--success">
                    <i className="fa fa-check"></i>
                    {props.children}
                    <span className="alert__close" onClick={()=>setDisplay(false)}>&times;</span>
                </div>
            )
        }
        </>
    )
}