import React from 'react';


export const ButtonGroupsLeft = (props) => {
    let {className, ...rest } = props
    return (
        <div {...rest} className={`btn__group btn__group--left ${className}`}>
            {props.children}
        </div>
    )
} 

export const ButtonGroupsRight = (props) => {
    let { className, ...rest } = props
    return (
        <div {...rest} className={`btn__group btn__group--right ${className}`}>
            {props.children}
        </div>
    )
} 

export const ButtonGroupsBetween = (props) => {
    let { className, ...rest } = props
    return (
        <div {...rest}  className={`btn__group btn__group--between ${className}`}>
            {props.children}
        </div>
    )
} 

export const ButtonGroupsCenter = (props) => {
    let { className, ...rest } = props
    return (
        <div {...rest} className={`btn__group btn__group--center ${className}`}>
            {props.children}
        </div>
    )
} 

export const ButtonRedSmall = (props) => {
    let {event, className, ...rest } = props
    return (
        <button 
            {...rest}
            onClick={(e)=> event(e)}
            className={`btn btn--red btn--small ${className}`}>
        {props.children}
        </button>
    )
} 

export const ButtonRedMedium = (props) => {
    let {event, className, ...rest } = props
    return (
        <button 
            {...rest}
            onClick={(e)=> event(e)}
            className={`btn btn--red btn--medium ${className}`}>
        {props.children}
        </button>
    )
} 

export const ButtonRedLarge = (props) => {
    let {event, className, ...rest } = props
    return (
        <button 
            {...rest}
            onClick={(e)=> event(e)}
            className={`btn btn--red btn--large ${className}`}>
        {props.children}
        </button>
    )
}

export const ButtonBlackSmall = (props) => {
    let {event, className, ...rest } = props
    return (
        <button 
            {...rest}
            onClick={(e)=> event(e)}
            className={`btn btn--black btn--small ${className}`}>
        {props.children}
        </button>
    )
} 

export const ButtonBlackMedium = (props) => {
    let {event, className, ...rest } = props
    return (
        <button 
            {...rest}
            onClick={event}
            className={`btn btn--black btn--medium ${className}`}>
        {props.children}
        </button>
    )
} 

export const ButtonBlackLarge = (props) => {
    let {event, className, ...rest } = props
    return (
        <button 
            {...rest}
            onClick={(e)=> event(e)}
            className={`btn btn--black btn--large ${className}`}>
        {props.children}
        </button>
    )
} 

export const ButtonTextBlackSmall = (props) => {
    let {event, className} = props
    return (
        <button 
            onClick={(e)=> event(e)}
            className={`btn btn--text btn--small ${className}`}>
        {props.children}
        </button>
    )
}

export const ButtonTextBlackMedium = (props) => {
    let {event, className, ...rest} = props
    return (
        <button 
            {...rest}
            onClick={(e)=> event(e)}
            className={`btn btn--text btn--medium ${className}`}>
        {props.children}
        </button>
    )
}

export const ButtonTextBlackLarge = (props) => {
    let {event, className, ...rest} = props
    return (
        <button 
            {...rest}
            onClick={(e)=> event(e)}
            className={`btn btn--text btn--large ${className}`}>
        {props.children}
        </button>
    )
}

export const ButtonOutlineBlackSmall = (props) => {
    let {event, className, ...rest } = props
    return (
        <button 
            {...rest}
            onClick={(e)=> event(e)}
            className={`btn btn--outline btn--outline--black btn--small ${className}`}>
        {props.children}
        </button>
    )
}

export const ButtonOutlineBlackMedium = (props) => {
    let {event, className, ...rest } = props
    return (
        <button 
            {...rest}
            onClick={(e)=> event(e)}
            className={`btn btn--outline btn--outline--black btn--medium ${className}`}>
        {props.children}
        </button>
    )
}

export const ButtonOutlineBlackLarge = (props) => {
    let {event, className, ...rest } = props
    return (
        <button 
            {...rest}
            onClick={(e)=> event(e)}
            className={`btn btn--outline btn--outline--black btn--large ${className}`}>
        {props.children}
        </button>
    )
}

export const ButtonOutlineRedSmall = (props) => {
    let {event, className, ...rest } = props
    return (
        <button 
            {...rest}
            onClick={(e)=> event(e)}
            className={`btn btn--outline btn--outline--red btn--small ${className}`}>
        {props.children}
        </button>
    )
}

export const ButtonOutlineRedMedium = (props) => {
    let {event, className, ...rest } = props
    return (
        <button
            {...rest} 
            onClick={(e)=> event(e)}
            className={`btn btn--outline btn--outline--red btn--medium ${className}`}>
        {props.children}
        </button>
    )
}

export const ButtonOutlineBlueMedium = (props) => {
    let {event, className, ...rest } = props
    return (
        <button
            {...rest} 
            onClick={(e)=> event(e)}
            className={`btn btn--outline btn--outline--blue btn--medium ${className}`}>
        {props.children}
        </button>
    )
}

export const ButtonOutlineBlueLarge = (props) => {
    let {event, className, ...rest } = props
    return (
        <button
            {...rest} 
            onClick={(e)=> event(e)}
            className={`btn btn--outline btn--outline--blue btn--large ${className}`}>
        {props.children}
        </button>
    )
}


