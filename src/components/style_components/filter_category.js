import React, { useState } from 'react';

const FilterCategoryItem = props => {
    let {show, children, className, ...rest } = props 
    return (
        <div key={rest.key} {...rest} className={`filter-category__item ${className}`}>
            {children}
        </div>
    )
}

const FilterCategoryTitle = props => {
    let { category, show, open, close, selected, change, type } = props
    return (
        <div onClick={(e) => change(e, type, category.key)} 
            className={
                selected === category.key ? 
                "filter-category__title filter-category__title--selected" :
                "filter-category__title"
            }>
            <span className="filter-category__name">
                {category.key} ({category.doc_count})
            </span>

            <i onClick= {
                show === category.key ? close : open
                }  
                className={show === category.key ? `filter-category__icon fas fa-angle-up` :`filter-category__icon fas fa-angle-down`}></i>
        </div>
    )
}

const FilterCategory = props => {
    let { categories, sCategory, sSecondCategory, sThirdCategory, change } = props

    let [showedTop, setShowedTop] = useState("")
    let [showedSecond, setShowedSecond] = useState("")

    const showChildTop = (e, topCategory) => {
        if(e) {
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation();
        }
        console.log(`show top category for category : ${topCategory}`)
        setShowedTop(topCategory)
    }
    const closeChildTop = (e) => {
        if(e) e.stopPropagation()
        setShowedTop("")
        setShowedSecond("")
    }

    const showChildSecond = (e, secondCategory) => {
        if(e) {
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation();
        }
        console.log(`show second category for category : ${secondCategory}`)
        setShowedSecond(secondCategory)
    }
    const closeChildSecond = (e) => {
        if(e) e.stopPropagation()
        setShowedSecond("")
    }

    const changeCategory = (e, type, value) => {
        let params = {
            top : sCategory,
            second : sSecondCategory,
            third : sThirdCategory
        }
       if(e) e.stopPropagation()
       if(type === "top") {
           params.top = value
           params.second = null
           params.third = null
       }
       if(type === "second") {
           params.second = value
           params.third = null
       }
       if(type === "third") params.third = value

       change(params)
    }

    return (
        <>
        {
        categories.length > 0 && (
        <div className="filter-category">
            {
            categories.map(category => (
            <FilterCategoryItem 
                show={showedTop}
                key={category.key}
                className="filter-category__item--top">
                <FilterCategoryTitle
                    type="top"
                    change={changeCategory}
                    open={(e) => showChildTop(e,category.key)}
                    close={closeChildTop}
                    category={category} 
                    show={showedTop}
                    selected={sCategory}/>

                {
                    (category.key === showedTop) && category.second_category.buckets.map(category => (
                    <FilterCategoryItem 
                        key={category.key}
                        className="filter-category__item--second">
                        <FilterCategoryTitle 
                            type="second"
                            open={(e) => showChildSecond(e, category.key)}
                            close={closeChildSecond}
                            category={category} 
                            show={showedSecond}
                            change={changeCategory}
                            selected={sSecondCategory}/>
                            {
                                (category.key === showedSecond) &&category.third_category.buckets.map(category => (
                                    <FilterCategoryItem
                                        key={category.key}
                                        className="filter-category__item--third">
                                        <div   
                                            onClick={(e) => changeCategory(e, "third", category.key)} 
                                            className=  {category.key === sThirdCategory ? "filter-category__title filter-category__title--selected" : "filter-category__title"}>
                                            <span className="filter-category__name">
                                                {category.key} ({category.doc_count})
                                            </span>
                                        </div>
                                    </FilterCategoryItem>))
                            }      
                        </FilterCategoryItem>))
                }
            </FilterCategoryItem>))
            }
        </div>)
        }
        </>
    )

}

export default FilterCategory;