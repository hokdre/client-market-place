import React from 'react';
import { useHistory } from 'react-router-dom';
import MenuBar from '../../layout/menubar';
import { MenubarItem } from '../../layout/menubar';

export const MenuTransactionBuyerForAdmin = props => {
    let history = useHistory()
    let { active } = props

    const redirectSearch = () => {
        if(active !== "search") history.push("/transaction/admins")
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