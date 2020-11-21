import React from 'react';
import { useHistory } from 'react-router-dom';

const MenuBarCustomer = props => {
    let history = useHistory()
    let { active } = props

    const redirectSearch = props => {
        if(active !== "search") history.push("/admins/list")
    }
    const redirectAdd = props => {
        if(active !== "add") history.push("/admins/add")
    }

    return (
        <div className="menubar">
            <ul className="menubar__list">
                
                <li onClick={redirectSearch} className={ active === "search" ? "menubar__item menubar__item--active" :"menubar__item"}>
                    <i className="menubar__icon fas fa-search"></i>
                    <h3>search</h3>
                </li>
                <li onClick={redirectAdd} className={ active === "add" ? "menubar__item menubar__item--active" : "menubar__item" }>
                    <i className="menubar__icon fas fa-folder-plus"></i>
                    <h3>new</h3>
                </li>
            </ul>
        </div>
    )
}

export default MenuBarCustomer