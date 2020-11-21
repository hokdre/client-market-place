import React from 'react';
import { useHistory } from 'react-router-dom';
import MenuBar from '../../layout/menubar';
import { MenubarItem } from '../../layout/menubar';

export const MenubarFiturAdmin = props => {
    let history = useHistory()
    let { active } = props

    const redirectSearch = () => {
        if(active !== "search") history.push("/admins/list")
    }
    const redirectAdd = () => {
        if(active !== "add") history.push("/admins/add")
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