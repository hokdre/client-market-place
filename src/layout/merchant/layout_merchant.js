import React, { useEffect, useState } from 'react';
import SidebarMerchant from './sidebar_merchant';
import ProfileMerchant from './profile_merchant';

export const LayoutMerchantContainer = props => {
    return (
        <div className="layout-merchant">{props.children}</div>
    )
}

export const LayoutMerchantSidebar = props => {
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
            className="layout-merchant__sidebar">
                {props.children}
        </div>
    )
}

export const LayoutMerchantContent = props => {
    return (
        <div className="layout-merchant__content">{props.children}</div>
    )
}

export const LayoutMerchantMain = props => {
    return (
        <div className="layout-merchant__main">{props.children}</div>
    )
}

const LayoutMerchant = props => {

    return (
        <LayoutMerchantContainer>
            <LayoutMerchantSidebar>
                <ProfileMerchant/>
                <SidebarMerchant/>
            </LayoutMerchantSidebar>
            <LayoutMerchantMain>
                {props.children}
            </LayoutMerchantMain>
        </LayoutMerchantContainer>
    )
}

export default LayoutMerchant