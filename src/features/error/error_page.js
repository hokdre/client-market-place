import React from 'react';
import InternalServerPage from './internal_page';
import ForbidenPage from './forbiden_page';
import NotFoundPage from './not_found_page';


const ErrorPage = props => {
    let { httpCode } = props

    let page = null
   
    switch(httpCode) {
        case 403 : {
            page = (<ForbidenPage/>)
            break;
        }
        case 404 : {
            page = (<NotFoundPage/>)
            break;
        }
        case 500 : {
            page = (<InternalServerPage/>)
        }
        default : {
            page = null
        }
    }

    return (
        page
    )
}

export default ErrorPage;