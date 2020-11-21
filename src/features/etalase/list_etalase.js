import React, { useState, useEffect } from 'react';

const ListEtalase = props => {
    let optionBoxRef = React.createRef()
    let { selectedEtalase, changeEtalase, etalase } = props 
    let [showOptions, setShowOptions] = useState(false)

    const toogleOptions = () => {
        setShowOptions(!showOptions)
    }

    const selectEtalase = name => {
        console.log(`change etalase : ${name}`)
        changeEtalase(name)
        setShowOptions(false)
    }

    useEffect(() => {
        function handleClickOutSide(event){
            if (optionBoxRef.current && !optionBoxRef.current.contains(event.target)) {
                setShowOptions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () =>  document.removeEventListener("mousedown", handleClickOutSide);

    },[optionBoxRef])

    return (
        <div ref={optionBoxRef} className="etalase-list">
            <div 
                onClick={toogleOptions}
                className="etalase-list__box">
               <span className="etalase-list__name">
                   {!selectedEtalase ? "etalase" : selectedEtalase }
                </span>
               <i className="etalase-list__icon fas fa-chevron-down"></i>
            </div>
            {
                showOptions && (
                    <div className="etalase-list__options">
                        {etalase.map(name =>(
                            <div 
                                key={name} 
                                onClick={()=> selectEtalase(name)} 
                                className={selectedEtalase === name ? `etalase-list__option etalase-list__option--selected` : `etalase-list__option`}>
                                {name}
                            </div>
                        ))}
                    </div>
                )
            }
     </div>
    )
}

export default ListEtalase