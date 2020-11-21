import React, { useState, useEffect } from 'react';

export const FormSearch = props => {
    let { onChange, onSubmit, keyword } = props
   
    let [val, setVal ] = useState("")
    useEffect(() => {
       setVal(keyword === undefined ? "" : keyword)
    },[keyword])

    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === 13) {
              console.log(val)
              //onSubmit(val)
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, []);

    return (
        <form onSubmit={onSubmit} className={"form-search"}>
            <i className="form-search__icon fas fa-search"></i>
            <input onChange={onChange} value={val}  className="form-search__text" type="text" placeholder="Start typing to search "/>
        </form>
    )
}


export default FormSearch;