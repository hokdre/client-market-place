import React from 'react'

const Pagination = props => {
    let {back, choose, next, page, canNext } = props
    
    let page1Disabled = (1 <= page && canNext) ? "" : "pagination__page--disabled"
    let page2Disabled = (2 <= page && canNext) ? "" : "pagination__page--disabled"
    let page3Disabled = 3 <= page && canNext ? "" : "pagination__page--disabled"
    let page4Disabled = 4 <= page && canNext ? "" : "pagination__page--disabled"
    let page5Disabled = 5 <= page && canNext ? "" : "pagination__page--disabled"

    return (
        <ul className="pagination">
            <li onClick={back} className={page === 1 ? "pagination__back pagination__back--disable" : "pagination__back"}>
                <i className="fas fa-angle-double-left"></i>
            </li>
            <li onClick={(1 <= page && canNext) ? () => choose(1) : ()=>{}} className={page === 1 ? `pagination__page pagination__page--selected ${page1Disabled}` : `pagination__page ${page1Disabled}`}>
                1 
            </li>
            <li onClick={(2 <= page && canNext) ? ()=> choose(2) : ()=>{}} className={page === 2 ? `pagination__page pagination__page--selected ${page2Disabled}` : `pagination__page ${page1Disabled}`}>
                2 
            </li>
            <li onClick={(3 <= page && canNext) ? ()=> choose(3) : ()=>{}} className={page === 3 ? `pagination__page pagination__page--selected ${page3Disabled}` : `pagination__page ${page1Disabled}`}>
                3 
            </li>
            <li onClick={(4 <= page && canNext) ? ()=> choose(4) : ()=>{}} className={page === 4 ? `pagination__page pagination__page--selected ${page4Disabled}` : `pagination__page ${page1Disabled}`}>
                4 
            </li>
            <li onClick={(5 <= page && canNext) ? ()=> choose(5) : ()=>{}} className={page === 5 ? `pagination__page pagination__page--selected ${page5Disabled}` : `pagination__page ${page1Disabled}`}>
                5 
            </li>
            <li onClick={next} className={page === 5 ? "pagination__next pagination__next--disable" : "pagination__next"}>
                <i className="fas fa-angle-double-right"></i>
            </li>
        </ul>
    )
}

export default Pagination