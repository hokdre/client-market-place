import React from 'react';

export const Row = props => {
    let { children, style, className } = props
    return (
        <div className={`row ${className}`} style={{...style}}>
            { children }
        </div>
    )
}

export const Col = props  => {
    let { children, style, className } = props
    return (
        <div className={`col ${className}`} style={{...style}}>
            { children }
        </div>
    )
}

export const ColOneOfFour = props => {
    let { children } = props
    return (
        <div className="col-1-of-4">
            { children }
        </div>
    )
}

export const ColTwoOfFour = props => {
    let { children } = props
    return (
        <div className="col-2-of-4">
            { children }
        </div>
    )
}

export const ColThreeOfFour = props => {
    let { children } = props
    return (
        <div className="col-3-of-4">
            { children }
        </div>
    )
}

export const ColFourOfFour = props => {
    let { children } = props
    return (
        <div className="col-4-of-4">
            { children }
        </div>
    )
}




