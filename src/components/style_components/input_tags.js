import React, { useRef } from 'react';

const InputTags = props => {

    let { 
        tags = [] , 
        setTag = () => {} , 
        error="", 
        placeholder="", 
        className="",  
        ...rest
    } = props 
    const inputTag = useRef()

    const findTag = (value) => {
        let index = -1 
        if(tags.length != 0) {
            tags.forEach((tag,i )=>{
                if(tag === value ) index = i
            })
        }

        return index
    }

    const update = (index, value) => {
        let newTags = [...tags]
        newTags[index] = value
        setTag(newTags)
    }

    const add = (value) => {
        let newTags = [...tags]
        newTags.push(value)
        setTag(newTags)
    }

    const remove = (e,index) => {
        if(e)  e.stopPropagation()
        let newTags = [...tags]
        newTags.splice(index, 1)
        setTag(newTags)
    }

    const submit = (e) =>  {
        if(e) e.preventDefault();
        let val = inputTag.current.value
        if (val){
            let index = findTag(val)
            if(index != -1) update(index, val)
            else add(val)
            inputTag.current.value = ""
        }
    }

    const selectTag = (tag) => {
        inputTag.current.value = tag
    }

    return (
        <div 
            className={`input-tags ${className}`}
            {...rest}
        >
            {
                tags.length === 0 && (
                <p>Belum ada {placeholder}</p>
                )
            }
            {
                tags.length !== 0 && (
                    <ul className="input-tags__tags">
                        {
                            tags.map( (tag, i )=>(
                                <li onClick={() => selectTag(tag)} key={i} className="input-tags__tag">
                                    <span className="input-tags__name">{tag}</span>
                                    <i onClick={(e) => remove(e, i)} className="input-tags__close fas fa-times"></i>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            <div className="input-tags__form">
                <input type="text" ref={inputTag} placeholder={placeholder}/>
                <button onClick={submit}>Add</button>
            </div>
            <span className="form__error">{error} &nbsp;
            </span>
        </div>
    )
}

export default InputTags;