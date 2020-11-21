import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import DetailAdminPage from '../pages/admin/details_admin_page';
import UpdateAdminPage from '../pages/admin/updates_admin_page';
import ListAdminPage from '../pages/admin/list_admin_page';
import AddAdminPage from '../pages/admin/add_admin_page';
import AdminHomePage from '../pages/admin/home_admin';

import { ValidateAsAdmin } from './authentication';

const AdminRoutes = (props) => {
    let { url } = useRouteMatch()
    
    return (
        <Switch>
            <ValidateAsAdmin path={`${url}/add`} component={AddAdminPage}/>

            <ValidateAsAdmin path={`${url}/list`} component={ListAdminPage}/>

            <ValidateAsAdmin path={`${url}/:id/update`} component={UpdateAdminPage}/>

            <ValidateAsAdmin path={`${url}/:id/details`} component={DetailAdminPage}/>

            <ValidateAsAdmin path="/" component={AdminHomePage}/>
        </Switch>
    )

}

export default AdminRoutes;