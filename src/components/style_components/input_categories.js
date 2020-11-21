import React, { useState, useEffect } from 'react';

let categoriesData = {
    "elektronik" : {
        "dapur" : {
            "blender":        true,
            "juicer":         true,
            "kompor listrik": true,
            "kulkas":         true,
            "microwave":      true,
            "mixer":          true
        },
        "kantor" : {
            "mesin fax":         true,
            "mesin fotocopy":    true,
            "mesin hitung uang": true,
            "mesin kasir":       true
        },
        "rumah" : {
            "mesin cuci": true,
            "setrika":    true
        },
        "lainnya" : {
            "lain-lain": true
        } 
    },
    "komputer & laptop" : {
        "komputer & laptop" : {
            "komputer" : true,
            "laptop" : true
        },
        "aksesoris" : {
            "keyboard" : true,
            "mouse" : true,
            "lain lain" : true
        }
    },
    "handphone & tablet" : {
        "handphone & tablet" : {
            "handphone" : true,
            "tablet" : true 
        },
        "aksesoris" : {
            "charger" : true,
            "casing" : true,
            "anti gores" : true
        }
    },
    "fashion pria" : {
        "atasan pria" : {
            "kaos pria" : true,
            "kaos polo pria": true,
            "kemeja pria":    true
        },
        "celana pria" : {
            "celana jeans pria":  true,
            "celana pendek pria": true,
            "celana chino pria":  true
        }
    },
    "fashion wanita": {
        "atasan wanita": {
            "kaos wanita":      true,
            "kaos polo wanita": true,
            "kemeja wanita":    true
        },
        "celana wanita": {
            "celana jeans wanita":  true,
            "celana pendek wanita": true,
            "celana chino wanita":  true
        }
    }
}

const InputCategories = props => { 
    let { category, setCategory } = props
    let optionBoxRef = React.createRef()

    let [showOptions, setShowOptions] = useState(false)
    let [topOptions, setTopOptions] = useState("")
    let [secondOptions, setSecondOptions] = useState("")
    let [thirdOptions, setThirdOptions] = useState("")

    const toogleOptions = () => {
        if(!showOptions){
            if(category){
                let categories = category.split(">")
                setTopOptions(categories[0])
                setSecondOptions(categories[1])
                setThirdOptions(categories[2])
            }
        }
        setShowOptions(!showOptions)
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

    const setFinalCategory = (thirdOption) => {
        setThirdOptions(thirdOption)
        setCategory(`${topOptions}>${secondOptions}>${thirdOption}`)
        setShowOptions(false)
    }

    return (
        <div ref={optionBoxRef} className="categories">
            <div 
                onClick={toogleOptions}
                className="categories__box">
               <span className="categories__name">
                   {!category ? "categories" : category }
                </span>
               <i className="categories__icon fas fa-chevron-down"></i>
            </div>
            <div className="categories__group">
                {
                    showOptions && (
                        <>
                        <CategoriesTop
                            showOptions={showOptions} 
                            topOptions={topOptions} 
                            setTopOptions={setTopOptions}/>
                        <CategoriesSecond 
                            showOptions={showOptions} 
                            topOptions={topOptions}
                            secondOptions={secondOptions}
                            setSecondOptions={setSecondOptions}/>
                        <CategoriesThird
                            showOptions={showOptions} 
                            topOptions={topOptions}
                            secondOptions={secondOptions}
                            thirdOptions={thirdOptions}
                            setFinalCategory={setFinalCategory}/>
                        </>
                    )
                }
            </div>
        </div>
    )
}


const CategoriesTop = props => {
    let { showOptions, setTopOptions, topOptions } = props
    return (
        <>
        <div className="categories__options">
            {
                showOptions && Object.keys(categoriesData).map((option, i) => (
                    <div 
                        onClick={()=> setTopOptions(option)} key={i} className={topOptions === option ? `categories__option categories__option--selected` : `categories__option`}>
                        {option}
                    </div>
                ))
            }
        </div>
        </>
    )
}

const CategoriesSecond = props => {
    let { showOptions, topOptions, setSecondOptions, secondOptions } = props
    
    return (
        <>
        {
            (showOptions && topOptions) ? (

                <div className="categories__options">
                    {
                        Object.keys(categoriesData[topOptions]).map((option, i) => (
                            <div 
                                onClick={()=> setSecondOptions(option)} key={i} className={secondOptions === option ? `categories__option categories__option--selected` : `categories__option`}>
                                {option}
                            </div>
                        ))
                    }
                </div>
            ) : ""
        }
        </>
    )
}

const CategoriesThird = props => {
    let { showOptions, topOptions, secondOptions ,thirdOptions, setFinalCategory } = props
    return (
        <>
        {
            (showOptions && secondOptions && categoriesData[topOptions][secondOptions]) ? (
                <div className="categories__options">
                { 
                    Object.keys(categoriesData[topOptions][secondOptions]).map((option, i) => (
                        <div 
                            onClick={()=> setFinalCategory(option)} key={i} className={thirdOptions === option ? `categories__option categories__option--selected` : `categories__option`}>
                            {option}
                        </div>
                    ))   
                }
                </div>
            ) : ""
        }
        </>
    )
}

export default InputCategories