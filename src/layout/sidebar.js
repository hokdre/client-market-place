import React from 'react';
import { Link } from 'react-router-dom';

export const SidebarList = props => {
    return (
        <div className="sidebar">
            <ul className="sidebar__list">
                {props.children}
            </ul>
        </div>
    )
}

export const SidebarItem = props => {
    let {icon, path } = props
    return (
        <li className="sidebar__item">
            <i className={`sidebar__icon ${icon}`}></i>
            <Link className="sidebar__link" to={path} >{props.children}</Link>
        </li>
    )
}