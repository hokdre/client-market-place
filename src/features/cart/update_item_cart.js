import React, { useEffect, useState } from 'react';
import CartMerchantCheck from '../../components/style_components/cart_merchant_check';
import CartProductCheck from '../../components/style_components/cart_product_check';
import CartNoteQuantityDel from '../../components/style_components/cart_note_quantity_del';
import { useReponse } from '../customs_hooks/useResponse';
import Axios from 'axios';
import { URL_UPDATE_ITEM_CART } from '../../api/api';
import { useDispatch } from 'react-redux';
import { updateItem as storeUpdateItem  } from './cart_slice';
import DeleteItemCart from './delete_item_cart';

const UpdateItemCart = props => {
    let {
        checkedItems = [], 
        items = [], 
        checkMerchant, 
        unCheckMerchant,
        checkProduct,
        unCheckProduct, 
        className = "",
        ...rest
    } = props

    let dispatch = useDispatch()
    let [showPopUpDel, setShowPopUpDel] = useState(false)
    const openDelete = () => setShowPopUpDel(true)
    const closeDelete = () => setShowPopUpDel(false)

    let {
        httpCode,
        errors,
        setError,
        setIdle,
        setSuccess
    } = useReponse()

    let dictCheckedProducts = {}
    checkedItems.forEach(item => {
        dictCheckedProducts[item.product._id] = true
    })

    let updateItem = async (item) => {
        console.log(`update item in cart...`)
        console.log(item)
        if(item) {
            try{
                let cartId = localStorage.getItem("cartID")
               let response =  await Axios.put(URL_UPDATE_ITEM_CART(cartId, item.product._id), item, {
                    headers : {
                        token : localStorage.getItem("token")
                    }
                })
                dispatch(storeUpdateItem({item :  item}))
                setSuccess()
                console.log(`returned response : `)
                console.log(response.data.data)
            }catch(error){
                setError(error)
                console.log(`returned error : `)
                console.log(error)
            }
        }
    }

    return (
        <>
        <li 
            {...rest}
            className="update-item-cart">
            <div className="update-item-cart__merchant-row">
                {
                    items.length !== 0 && (
                        <CartMerchantCheck
                            checked = { checkedItems.length > 0 }
                            merchant={items[0].merchant}
                            unCheckMerchant={unCheckMerchant}
                            checkMerchant={checkMerchant}/>
                    )
                }
            </div>

            <div className="update-item-cart__product-row">
                {
                    items.map(item => (
                        <>
                        <CartProductCheck
                            checked = { dictCheckedProducts[item.product._id] === true }
                            merchantId = { item.merchant && item.merchant._id }
                            product = { item.product }
                            checkProduct = { checkProduct }
                            unCheckProduct = { unCheckProduct }
                            />
                        <CartNoteQuantityDel
                            item = {item}
                            errors = {errors}
                            httpCode = {httpCode}
                            resetErr = {setIdle}
                            updateItem = {updateItem}
                            openDelete={openDelete}
                            />
                        <DeleteItemCart
                            item={item}
                            show={showPopUpDel}
                            close={closeDelete}/>
                        </>
                    ))
                }
            </div>
        </li>
        </>
    )
}

export default UpdateItemCart