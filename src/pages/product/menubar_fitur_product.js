import React from 'react';
import { useHistory } from 'react-router-dom';
import MenuBar from '../../layout/menubar';
import { MenubarItem } from '../../layout/menubar';

export const MenuProductForAdmin = props => {
    let history = useHistory()
    let { active } = props

    const redirectSearch = () => {
        if(active !== "search") history.push("/customers/list")
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

export const MenuProductForCustomer = props => {
    let history = useHistory()
    let { active } = props
    let merchantID = localStorage.getItem("merchantID")

    const redirectSearch = () => {
        if(active !== "search") history.push(`/merchants/${merchantID}/products`)
    }
    const redirectAdd = () => {
        if(active !== "add") history.push(`/merchants/${merchantID}/add-product`)
    }  
    return (
        <MenuBar>
            <MenubarItem 
                icon={"fas fa-search"}
                onClick={redirectSearch}
                active={active === "search"}>
                Search
            </MenubarItem>
            <MenubarItem 
                icon={"fas fa-folder-plus"}
                onClick={redirectAdd}
                active={active === "add"}>
                New
            </MenubarItem>
        </MenuBar>
    )  
}