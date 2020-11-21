import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedMerchantBasicInfo} from './merchant_slice';

import Avatar from '../../components/style_components/avatar';
import { Row, Col } from '../../layout/row';
import { H3, H2 } from '../../components/UI_components/heading';
import Stars from '../../components/style_components/stars';

const GetMerchantBasicInfo = props => {
    let { merchant = {} } = props
    return (
        <>
        <Row>
            <Col>
                <Avatar src={merchant.avatar}/>
            </Col>
            <Col>
                <H2>{merchant.name}</H2>
                <div>
                    <Stars rating={merchant.rating}/> 
                    {`  (${merchant.num_review})  `}</div>
                <H3> <i className="fas fa-map-marker-alt"></i>
                   {merchant.address ? `${merchant.address.city && merchant.address.city.city_name} | ${merchant.phone}` : ""}
                </H3>
                <p className="paragraph">{merchant.address ? `${merchant.address.street} | ${merchant.address.number}` : ""}</p>
                <p className="paragraph">{merchant.postal_code}</p>
                <p className="paragraph">{merchant.description}</p>
            </Col>
        </Row>
        </>
    )
}

export default GetMerchantBasicInfo;