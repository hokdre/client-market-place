import React, { useEffect, useState } from 'react';

import SidebarAdmin from './sidebar_admin';
import ProfileAdmin from './profile_admin';

export const LayoutAdminContainer = props => {
    return (
        <div className="layout-admin">{props.children}</div>
    )
}

export const LayoutAdminSidebar = props => {
    let navbarHeight = 59
    let [scrollPosition, setScrollPosition] = useState(0)
    useEffect(_ => {
        const handleScroll = _ => { 
            setScrollPosition(window.pageYOffset)
        }
        window.addEventListener('scroll', handleScroll)
        return _ => {
          window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div 
            style={{'top' : scrollPosition >= navbarHeight ? `0px` : `${navbarHeight - scrollPosition}px`}}
            className="layout-admin__sidebar">
                {props.children}
        </div>
    )
}

export const LayoutAdminContent = props => {
    return (
        <div className="layout-admin__content">{props.children}</div>
    )
}

export const LayoutAdminMain = props => {
    return (
        <div className="layout-admin__main">{props.children}</div>
    )
}

const LayoutAdmin = props => {
    return (
    <LayoutAdminContainer>
        <LayoutAdminSidebar>
            <ProfileAdmin/>
            <SidebarAdmin/>
        </LayoutAdminSidebar>
        <LayoutAdminMain>
           {props.children}
        </LayoutAdminMain>
    </LayoutAdminContainer>
    )
}

export default LayoutAdmin;