import React from 'react';
import { SidebarList, SidebarItem } from '../sidebar';

const SidebarCustomer = props => {
    let merchantID = localStorage.getItem("merchantID")

    return (
        <SidebarList>
            <SidebarItem icon="fas fa-tachometer-alt" path={`/merchants`}>
                Dashboard 
            </SidebarItem>
             <SidebarItem icon="fas fa-boxes" path={`/merchants/${merchantID}/products`}>
                Product
            </SidebarItem>
            <SidebarItem icon="fas fa-sync" path={`/orders/merchant`}>
                Order 
            </SidebarItem>

            {/* <SidebarItem icon="fas fa-box-open" path={`/returs?merchant=${merchantID}`}>
                Retur
            </SidebarItem> */}
        </SidebarList>
    )
}

export default SidebarCustomer