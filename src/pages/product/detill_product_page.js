import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../layout/navbar'
import DetilProduct from '../../features/product/detil_product'
import Section from '../../components/UI_components/section'
import { H3 } from '../../components/UI_components/heading'
import ListReviewProduct from '../../features/review_product/list_review_product'

const DetilProductPage = props => {
    let { productId } = useParams()

    return (
        <>
            <Navbar/>
            <DetilProduct
                productId={productId}/>
            <Section>
                <H3>Reviews </H3>
                <ListReviewProduct productId={productId}/>
            </Section>
        </>
    )
}

export default DetilProductPage