import React, { useState, useEffect } from 'react';
import ConfirmDelAllItems from './confirm_del_all_items';
import { useSelector, useDispatch } from 'react-redux';
import { selectItemsGroupByMerchant,  setItemOrders } from './cart_slice';
import CartCheckAll from '../../components/style_components/cart_check_all';
import UpdateItemCart from './update_item_cart';
import CartSummary from '../../components/style_components/cart_summary';
import { useHistory } from 'react-router-dom';
import { selectCustomer } from '../customer/customer_slice';

const ListItemsCart = props => {
    let dispatch = useDispatch()
    let history = useHistory()
    let customer = useSelector(selectCustomer)

    let items = useSelector(selectItemsGroupByMerchant)
    let [checkedItems, setCheckedItems ] = useState({})

    /**
     * syncronize item data with checked items
    */
    useEffect(() => {
        console.log("items")
        console.log(items)
        console.log("checked item")
        console.log(checkedItems)
        let newChecked = { ...checkedItems }
        Object.keys(items).forEach(merchantId => {
            if(newChecked[merchantId]) {
                let cartItems = items[merchantId]
                let dicProduct = {}
                cartItems.forEach(cartItem => {
                    dicProduct[cartItem.product._id] = cartItem
                })

                let merchantCheckedItems = newChecked[merchantId]
                merchantCheckedItems.forEach((merchantItem,i)=> {
                    if(!dicProduct[merchantItem.product._id]) {
                        merchantCheckedItems.splice(i, 1)
                    }else{
                        merchantCheckedItems[i] = dicProduct[merchantItem.product._id]
                    }
                })
                newChecked[merchantId] = [...items[merchantId]]
            }
        })
        setCheckedItems(newChecked)
    },[items])

    let [showDeleteAll, setShowDeleteAll ] = useState(false)
    const openDeleteall = () => setShowDeleteAll(true)
    const closeDeleteall = () => setShowDeleteAll(false)
    const addAll = () => {
        setCheckedItems({ ...items })
    }
    let clearAll = () => {
        setCheckedItems({ })
    }

    const checkMerchant = merchantId => {
        console.log("check merchant : ", merchantId)

        let merchantItems = items[merchantId]
        if(merchantItems) {
            let newCheckedMerchants = { ...checkedItems}
            newCheckedMerchants[merchantId] = merchantItems
            setCheckedItems(newCheckedMerchants)
        }
    }
    const unCheckMerchant = merchantId => {
        if(checkedItems[merchantId]){
            let newCheckedMerchants = {  ...checkedItems }
            delete newCheckedMerchants[merchantId]
            setCheckedItems(newCheckedMerchants)
        }
    }

    const checkProduct = (merchantId, productId) => {
        console.log(`checked product with id : ${productId} and merchantId : ${merchantId}`)
        let merchantItems = items[merchantId]
        if(merchantItems) {
            let index = -1
            merchantItems.forEach((item , i) => {
                if(item.product._id === productId)  index = i
            })
            if(index !== -1) {
                let checkedItem = { ...merchantItems[index] }
                let newChecked = { ...checkedItems }
                if(newChecked[merchantId]){
                    newChecked[merchantId].push(checkedItem)
                }else{
                    newChecked[merchantId] = [checkedItem]
                }
                setCheckedItems(newChecked)
            }
        }
    }

    const unCheckProduct = (merchantId, productId) => {
        console.log(`unchecked product with id : ${productId} and merchant id : ${merchantId}`)
        let merchantItems = [ ...checkedItems[merchantId] ]
        if(merchantItems){
            let index = -1 
            merchantItems.forEach((item, i) => {
                if(item.product._id === productId) index = i
            })

            if(index !== -1) {
                merchantItems.splice(index, 1)
                let newChecked = { ...checkedItems }
                newChecked[merchantId] = merchantItems
                if(merchantItems.length === 0) {
                    delete newChecked[merchantId]
                }
                setCheckedItems(newChecked)
            }
        }
    }

    const processShipment = () => {
        // adding shipping id and cost 
        let orders = []
        Object.keys(checkedItems).forEach((merchantId)=> {
            let items = checkedItems[merchantId]
            let merchant = items[0].merchant

            let order = {
                merchant_id : merchant._id,
                merchant_data : merchant,
                receiver_name : customer.name,
                receiver_phone : customer.phone,
                receiver_address : customer.addresses[0],
                shipping_id : "",
                shipping_cost : 0,
                shipping_data : {},
                products : []
            }

            let products = []
            items.forEach(item => {
                products.push({
                    product_id : item.product._id,
                    product_data : item.product,
                    quantity : item.quantity,
                    buyer_note : item.note,
                    colors : item.colors,
                    sizes : item.sizes
                })
            })
            order.products = products

            orders.push(order)
        })

        dispatch(setItemOrders({itemOrders : orders}))
        history.push(`/carts/shippment`)
    }

    let updateItemComponents = []
    Object.keys(items).forEach(merchantId => {
        let merchantItems = items[merchantId]
        updateItemComponents.push(<UpdateItemCart
            key={merchantId}
            checkedItems = {checkedItems[merchantId]} 
            items = {merchantItems} 
            checkMerchant = {checkMerchant} 
            unCheckMerchant = {unCheckMerchant}
            checkProduct = { checkProduct }
            unCheckProduct = { unCheckProduct }
        />)
    })
    
    return (
        <>
        <div className="list-cart">
            <div className="list-cart__data-col">
                <CartCheckAll
                    addAll={addAll}
                    clearAll={clearAll}
                    openRemove={openDeleteall}/>

                <ul className="list-cart__items">
                    { updateItemComponents }
                </ul>
            </div>
            <div className="list-cart__summary-col">
                <CartSummary
                    checkedItems={checkedItems}
                    processShipment={processShipment}/>
            </div>
        </div>
        <ConfirmDelAllItems 
            show={showDeleteAll}
            close={closeDeleteall}
            number={Object.keys(items).length}/> 
        </>
    )
}

export default ListItemsCart