import React, { useEffect, useState } from 'react';
import SidebarCustomer from './sidebar_customer';
import ProfileCustomer from './profile_customer';

export const LayoutCustomerContainer = props => {
    return (
        <div className="layout-customer">{props.children}</div>
    )
}

export const LayoutCustomerSidebar = props => {
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
            className="layout-customer__sidebar">
                {props.children}
        </div>
    )
}

export const LayoutCustomerContent = props => {
    return (
        <div className="layout-customer__content">{props.children}</div>
    )
}

export const LayoutCustomerMain = props => {
    return (
        <div className="layout-customer__main">{props.children}</div>
    )
}

const LayoutCustomer = props => {
    return (
        <LayoutCustomerContainer>
            <LayoutCustomerSidebar>
                <ProfileCustomer/>
                <SidebarCustomer/>
            </LayoutCustomerSidebar>
            <LayoutCustomerMain>
                {props.children}
            </LayoutCustomerMain>
        </LayoutCustomerContainer>
    )
}

export default LayoutCustomer