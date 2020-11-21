import React from 'react';
import LayoutAdmin, { LayoutAdminContent } from '../../layout/admin/layout_admin'
import FormAddAdmin from '../../features/admin/add_admin';

import Section from '../../components/UI_components/section';
import { MenubarFiturAdmin } from './menubar_fitur_admin';

const AddAdminPage = props => {

    return (
        <LayoutAdmin>
            <MenubarFiturAdmin active={"add"}/>
                <LayoutAdminContent>
                    <Section>
                        <FormAddAdmin/>
                    </Section>
                </LayoutAdminContent>
        </LayoutAdmin>
    )
}

export default AddAdminPage;