import React, { useRef, useState, useEffect } from 'react';

export const Form = React.forwardRef((props, ref) => {
    let {method, className = "", id = "", onSubmit} = props
    return (
        <form onSubmit={onSubmit? onSubmit : (e) =>  e.preventDefault()} id={id} className={className} ref={ref} method={method}>
            {props.children}
        </form>
    )
})

export const FormControl = React.forwardRef((props, ref) =>  {
    let { style = {} , className = "", children, ...rest } = props
    return ( 
        <div
            {...rest}
            {... { style : style} } 
            ref={ref} 
            className={`form__control ${className}`}>
            {children}
        </div> 
    )
})

export const FormButtonsLeft = React.forwardRef((props, ref) => {
    let { style = {} , className = "",children, ...rest } = props
    return (
        <div 
            {...rest}
            {... { style : style} }
            ref={ref}
            className={`form__buttons form__buttons--left ${className}`}>
            {children}
        </div>
    )
}) 

export const FormButtonsRight = React.forwardRef((props, ref) => {
    let { style = {} , className = "",children, ...rest } = props
    return (
        <div 
            {...rest}
            {... { style : style} }
            ref={ref}
            className={`form__buttons form__buttons--right ${className}`}>
            {children}
        </div>
    )
}) 

export const FormButtonsBetween = React.forwardRef((props, ref) => {
    let { style = {} , className = "",children, ...rest } = props
    return (
        <div
            {...rest}
            {... { style : style} } 
            ref={ref}
            className={`form__buttons form__buttons--beetwen ${className}`}>
            {children}
        </div>
    )
}) 

export const FormButtonsCenter = React.forwardRef((props, ref) => {
    let { style = {} , className = "",children, ...rest } = props

    return (
        <div 
            {...rest}
            {... { style : style} }
            ref={ref}
            className={`form__buttons form__buttons--center ${className}`}>
            {children}
        </div>
    )
}) 

export const InputText = React.forwardRef((props, ref) => {
    let { 
        value , 
        error = "", 
        onChange, 
        label = "", 
        className = "",
        ...rest
    } = props

    let [val, setVal ] = useState("")
    useEffect(() => {
        if(value !== undefined) setVal(value)
    },[value])

    return (
        <div className="form__control">
            <p className="form__label"> {label} </p>
            <input 
                
                className={error ? 
                    `form__input form__input--invalid ${className}` 
                    : `form__input ${className}`
                } 
                type="text" 
                { ... (value !== undefined) ? {value: val} : {} }
                ref={ref}
                { ... (onChange !== undefined) ?  { onChange : onChange} : {}}
                { ...rest }
            />
            <span className="form__error">{error} &nbsp; </span>
        </div>
    )
})

export const InputDate = React.forwardRef((props, ref) => {
    let { 
        value , 
        error = "", 
        onChange, 
        label = "", 
        className = "",
        ...rest
    } = props

    let [val, setVal ] = useState("")
    useEffect(() => {
        if(value !== undefined) setVal(value)
    },[value])

    return (
        <div className="form__control">
            <p className="form__label"> {label} </p>
            <input 
                type="date" 
                className={error ? 
                    `form__input form__input--invalid ${className}` : 
                    `form__input`
                }
                {... (onChange === undefined) ? 
                    { defaultValue : val } :
                    { value : val}
                }
                ref={ref} 
                { ... (onChange !== undefined) ?  { onChange : onChange} : {}}
                {...rest} 
            />
            <span className="form__error">{error} &nbsp; </span>
        </div>
    )
})

export const InputPassword = React.forwardRef((props, ref) => {
    let { 
        value , 
        error = "", 
        onChange, 
        label = "", 
        className = "",
        ...rest
    } = props

    return (
        <div className="form__control">
            <p className="form__label"> {label} </p>
            <input 
                type="password"
                className={error ? 
                    `form__input form__input--invalid ${className}` : 
                    `form__input`
                }
                ref={ref}
                { ... (onChange !== undefined) ?  { onChange : onChange} : {}}
                {...rest}
            />
            <span className="form__error">{error} &nbsp; </span>
        </div>
    )
})

export const InputFile = React.forwardRef((props, ref) => {

    let { className = "", onChange , error = "", ...rest } = props

    return (
        <div className="form__control">
            <label 
                className={
                    error ? 
                    `form__input--file form__input--invalid ${className}` :
                    `form__input--file ${className}`
                }
            >
                <input 
                    type="file"
                    ref={ref} 
                    { ...rest }
                    { ... (onChange !== undefined) ?  { onChange : onChange} : {}}
                    />
                <span className="content"></span>
                <span className="form__error">{error}</span>
            </label>
        </div>
        
    )
})

export const InputRadio = React.forwardRef((props, refs) => {
    let { 
        label = "", 
        options = [], 
        error="", 
        className = "", 
        name = "",
        onChange ,
        checked = "",
        ...rest
    } = props

    return (
        <div className="form__control">
            <p className="form__label"> {label} </p>
            <div className={ 
                error ? 
                    `form__radio--group form-input--invalid ${className}` :
                    `form__radio--group ${className}`
                }
            >

                {options.map((opt,i) => (
                    <span key={"option" + i}>
                        <input 
                            ref={refs[i]} 
                            id={i} type="radio" 
                            name={name} 
                            value={opt.value}
                            { ... (onChange !== undefined) ?  { onChange : onChange} : {}}
                            {...(onChange === undefined) ? 
                                {defaultChecked : opt.value === checked} :
                                {checked : opt.value === checked}
                            }
                           
                            {...rest}
                            />
                        <label className="form__radio" htmlFor={i} >{opt.name} </label>
                    </span>
                ))}

            </div>
            <span className="form__error">{error} &nbsp;
            </span>
        </div>
    )
})

export const InputSelect = React.forwardRef((props, ref) => {
    let { 
        label = "", 
        options = [], 
        error="", 
        className = "", 
        name="",
        onChange ,
        selected = "",
        ...rest
    } = props

    return (
        <div className="form__control">
            { label && <p className="form__label">{label}</p>}
            <select 
                { ... (onChange !== undefined) ?  { onChange : onChange} : {}}
                { ... (onChange === undefined) ? 
                    {defaultValue : selected } :
                    {value : selected}
                }
                name={name} 
                ref={ref} 
                className={ 
                    error ? 
                    `form__input form__input--select  form-input--invalid ${className}` :
                    `form__input form__input--select`
                }
                {...rest}
            >
                {
                    options.map((opt,i)=> (
                    <option key={i}
                        value={opt.value}>
                            {opt.name}
                    </option>
                    ))
                }
            </select>
            <span className="form__error"> {error} &nbsp; </span>
        </div>
    )
})

export const InputTextArea = React.forwardRef((props, ref) => {
    let { 
        value , 
        error = "", 
        onChange, 
        label = "", 
        className = "",
        ...rest
    } = props

    let [val, setVal ] = useState("")
    useEffect(() => {
        if(value !== undefined) setVal(value)
    },[value])

    return (
        <div className="form__control">
            <p className="form__label"> {label} </p>
            <textarea 
                className={error ? 
                    `form__input form__input--invalid ${className}` : 
                    `form__input`
                }
                { ... (onChange === undefined) ? 
                    { defaultValue : val } :
                    { value : val}
                }
                ref={ref} 
                { ... (onChange !== undefined) ?  { onChange : onChange} : {}}
                {...rest}>
            </textarea>
            <span className="form__error">{error} &nbsp;</span>
        </div>   
    )
})
