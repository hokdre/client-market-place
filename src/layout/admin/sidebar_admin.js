import React from 'react';
import { SidebarList, SidebarItem } from '../sidebar';

const SidebarAdmin = props => {
    return (
        <SidebarList>
            <SidebarItem icon="far fa-user" path="/admins/list">
                Admin
            </SidebarItem>
            <SidebarItem icon="fas fa-user-friends" path="/customers/list">
                Customer
            </SidebarItem>
            <SidebarItem icon="fas fa-building" path="/merchants/list">
                Merchant
            </SidebarItem>
            <SidebarItem icon="fas fa-sync" path="/transactions/admin">
                Transaction 
            </SidebarItem>
            {/* <SidebarItem icon="fas fa-box-open" path="/returs">
                Retur
            </SidebarItem>
            <SidebarItem icon="fas fa-dolly" path="/shippings">
                Retur
            </SidebarItem> */}
        </SidebarList>
    )
}

export default SidebarAdmin