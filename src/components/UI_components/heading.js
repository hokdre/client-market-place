import React from 'react';

export const H1 = props => {
    let { className } = props
    return (
    <h1 className={`heading-primary ${className}`}>{props.children}</h1>
    )   
}

export const H2 = props => {
    let { className } = props
    return (
    <h2 className={`heading-secondary ${className}`}>{props.children}</h2>
    )   
}

export const H3 = props => {
    let { className } = props
    return (
    <h3 className={`heading-tertiary ${className}`}>{props.children}</h3>
    )   
}