import React from 'react';
import { useSelector } from 'react-redux';
import { selectAdminBasicInfo} from './admin_slice';
import moment from 'moment';

import Avatar from '../../components/style_components/avatar';
import { Row, Col } from '../../layout/row';
import Loading from '../../components/UI_components/loading';
import ErrorPage from '../error/error_page';
import { H3 } from '../../components/UI_components/heading';

const GetAdminBasicInfo = props => {

    let basicInfo = useSelector(selectAdminBasicInfo)   
    
    return (
        <>
        <Row>
            <Col>
                <Avatar src={basicInfo.avatar}/>
            </Col>
            <Col>
                <H3>Name :</H3>
                <p className="paragraph">{basicInfo.name}</p>
                <H3>Email :</H3>
                <p className="paragraph">{basicInfo.email}</p>
                <H3>Phone :</H3>
                <p className="paragraph">{basicInfo.phone}</p>
            </Col>
            <Col>
                <H3>Gender :</H3>
                <p className="paragraph">
                    {
                        basicInfo.gender.toLowerCase() == "m" ? "Male" : "Female"
                    }
                </p>
                <H3>Born Place:</H3>
                <p className="paragraph">{basicInfo.born}</p>
                <H3>Birth Day :</H3>
                <p className="paragraph">
                    {
                        moment(basicInfo.birth_day).format("YYYY-MM-DD").toString()
                    }
                </p>
            </Col>
        </Row>
        </>
    )
}

export default GetAdminBasicInfo;