import React from 'react';
import { useHistory } from 'react-router-dom';
import MenuBar from '../../layout/menubar';
import { MenubarItem } from '../../layout/menubar';

export const MenuMerchantForAdmin = props => {
    let history = useHistory()
    let { active } = props

    const redirectSearch = () => {
        if(active !== "search") history.push("/merchants/list")
    }

    return (
        <MenuBar>
            <MenubarItem 
                icon={"fas fa-search"}
                onClick={redirectSearch}
                active={active === "search"}>
                Search
            </MenubarItem>
        </MenuBar>
    )  
}

export const MenuMerchantForCustomer = props => {
    return (<MenuBar></MenuBar>)
}