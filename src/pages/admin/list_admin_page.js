import React, { useEffect } from 'react';
import LayoutAdmin, { LayoutAdminContent } from '../../layout/admin/layout_admin'
import Section from '../../components/UI_components/section';

import ListAdmin from '../../features/admin/list_admin';
import SearchAdmin from '../../features/admin/search_admin';
import { MenubarFiturAdmin } from './menubar_fitur_admin';

const ListAdminPage = props => {
    return (
        <LayoutAdmin>
            <MenubarFiturAdmin active="search"/>
            <LayoutAdminContent>
                <Section>
                    <SearchAdmin/>
                    <ListAdmin/>
                </Section>     
            </LayoutAdminContent>
        </LayoutAdmin>
    )
}

export default ListAdminPage