import React from 'react';
import { SidebarList, SidebarItem } from '../sidebar';

const SidebarCustomer = props => {
    let userID = localStorage.getItem("userID")

    return (
        <SidebarList>
            <SidebarItem icon="fas fa-sync" path={`/transactions/customer`}>
                Transaction 
            </SidebarItem>
            <SidebarItem icon="fas fa-sync" path={`/orders/customer`}>
                Order 
            </SidebarItem>
            {/* <SidebarItem icon="fas fa-box-open" path={`/returs?customer=${userID}`}>
                Retur
            </SidebarItem> */}
        </SidebarList>
    )
}

export default SidebarCustomer