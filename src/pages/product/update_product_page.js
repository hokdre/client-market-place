import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Section from '../../components/UI_components/section';
import LayoutMerchant, { LayoutMerchantContent } from '../../layout/merchant/layout_merchant';
import { H2 } from '../../components/UI_components/heading';
import { MenuProductForCustomer } from './menubar_fitur_product';

import FormUpdateProduct from '../../features/product/update_product';
import UpdateProductPhotos from '../../features/product/update_photos';
import FormAddProduct from '../../features/product/add_product';

import { selectProduct, getProductAsyncThunk } from "../../features/product/product_slice"

const UpdateProductPage = props => {
    let { productId } = useParams()
    let dispatch = useDispatch()

    let product = useSelector(selectProduct)
    useEffect(() => {
        /**
         * Handling when user refresh page
         */
        if(!product._id){
            dispatch(getProductAsyncThunk(productId))
        }
    },[])

    return (
        <LayoutMerchant>
            <MenuProductForCustomer active={"add"}/>
            <LayoutMerchantContent>
                <Section>
                    <H2 className="margin-bottom-medium"> Photos :</H2>
                    <UpdateProductPhotos product={product}/>
                </Section>
                <Section>
                    <H2 className="margin-bottom-medium">Update Product :</H2>
                    <FormUpdateProduct product={product} />
                </Section>
            </LayoutMerchantContent>
        </LayoutMerchant>
    )
}

export default UpdateProductPage;