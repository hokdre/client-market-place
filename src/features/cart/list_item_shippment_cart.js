import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  selectItemOrders, updateItem } from './cart_slice';
import ItemShippmentCart from './item_shippment_cart';
import CartShippmentSummary from '../../components/style_components/cart_shippment_summary';
// let orders = [
//     {
//       merchant_id: 'd9435d21-3570-4c72-a8c2-525e79ef29e0',
//       merchant_data: {
//         _id: 'd9435d21-3570-4c72-a8c2-525e79ef29e0',
//         name: 'maco fashion',
//         avatar: 'default-merchant.jpg',
//         phone: '0813645877667',
//         address: {
//           _id: '18dce254-a43f-492e-ab52-dd47a9b469a1',
//           city: {
//             city_id: '155',
//             city_name: 'Jakarta Utara',
//             province_id: '6',
//             province: 'DKI Jakarta',
//             postal_code: '14140'
//           },
//           street: 'jl tanah kusir II',
//           number: '92'
//         },
//         shippings: [
//           {
//             _id: 'jne',
//             name: 'JNE',
//             created_at: '2020-09-09T10:25:33.248Z',
//             updated_at: '2020-09-09T10:25:33.248Z'
//           },
//           {
//             _id: 'pos',
//             name: 'Pos Indonesia',
//             created_at: '2020-09-09T10:25:33.248Z',
//             updated_at: '2020-09-09T10:25:33.248Z'
//           },
//           {
//             _id: 'tiki',
//             name: 'TIKI',
//             created_at: '2020-09-09T10:25:33.249Z',
//             updated_at: '2020-09-09T10:25:33.249Z'
//           }
//         ],
//         location_point: {
//           lat: 0,
//           lon: 0
//         }
//       },
//       receiver_name: 'Andre',
//       receiver_phone: '0813645877667',
//       receiver_address: {
//         _id: '132c29ce-f641-40c6-937c-d4ce1cc7c109',
//         city: {
//           city_id: '153',
//           city_name: 'Jakarta Selatan',
//           province_id: '6',
//           province: 'DKI Jakarta',
//           postal_code: '12230'
//         },
//         street: 'jl putri rambut selako no 52',
//         number: '52'
//       },
//       shipping_id: '',
//       shipping_cost: 0,
//       shipping_data: {},
//       products: [
//         {
//           product_id: '8efa8a7c-20d6-4cef-af91-9c5d050a29b1',
//           product_data: {
//             _id: '8efa8a7c-20d6-4cef-af91-9c5d050a29b1',
//             name: 'Kaos Pria MenRepublic Putih S,M,XL',
//             weight: 3,
//             width: 30,
//             height: 30,
//             'long': 10,
//             description: 'kaos pria ini menggunakan bahan cotton',
//             etalase: 'atasan cowok',
//             category: {
//               top: 'fashion pria',
//               second_sub: 'atasan pria',
//               third_sub: 'kaos pria'
//             },
//             tags: [
//               'kaos santai'
//             ],
//             colors: [
//               'putih'
//             ],
//             sizes: [
//               'S',
//               'XL',
//               'M'
//             ],
//             photos: [
//               'default-product.jpg'
//             ],
//             price: 150000,
//             stock: 12
//           },
//           quantity: 2,
//           buyer_note: 'tolong dicheck sebelum dikirim',
//           colors: [
//             'putih'
//           ],
//           sizes: [
//             'XL'
//           ]
//         }
//       ]
//     }
// ]
const ListItemShippmentCart = props => {
    let orders = useSelector(selectItemOrders)
    
    let [orderItems, setOrderItems ] = useState([])
    useEffect(() => {
        let orderItems = orders.map(order =>{return  { ...order } })
        setOrderItems(orderItems)
    },[orders])

    const changeOrderAddress = (receiver) => {
        let {
            merchant_id, 
            receiver_name, 
            receiver_phone, 
            receiver_address
        } = receiver

        let index = -1 
        orderItems.forEach((item, i) => {
            if(item.merchant_id === merchant_id) index = i
        })
        if(index !== -1){
            console.log(`list do change order : `)
            console.log(receiver)
            let newOrderItems = [...orderItems]
            let updatedItem = { ... newOrderItems[index] }
            updatedItem["receiver_name"] = receiver_name
            updatedItem["receiver_phone"] = receiver_phone
            updatedItem["receiver_address"] = receiver_address

            //reset shipping id and cost
            updatedItem["shipping_id"] = ""
            updatedItem["shipping_cost"] = 0
            updatedItem["shipping_data"] = {}

            newOrderItems[index] = updatedItem
            setOrderItems(newOrderItems)
        }
    }

    const changeShippingOrder = (data) => {
        let {
            merchant_id, 
            shipping,
            service
        } = data

        let index = -1 
        orderItems.forEach((item, i) => {
            if(item.merchant_id === merchant_id) index = i
        })
        if(index !== -1){
            console.log(`list do change shipping : `)
            console.log(shipping)

            let newOrderItems = [...orderItems]
            let updatedItem = { ... newOrderItems[index] }
            updatedItem["shipping_id"] = shipping._id
            updatedItem["shipping_cost"] = service.cost

            updatedItem["shipping_data"] = {
                shipping,
                service
            }

            newOrderItems[index] = updatedItem
            setOrderItems(newOrderItems)
        }
    }


    return (
       <div className="list-item-shippment-cart">
           <div className="list-item-shippment-cart__data-col">
                {
                    orderItems.map(order => (
                        <ItemShippmentCart 
                            key={order.merchant_id}
                            changeOrderAddress={changeOrderAddress}
                            changeOrderShipping={changeShippingOrder}
                            order={order}/>
                    ))
                }
           </div>
           <div className="list-item-shippment-cart__summary-col">
               <CartShippmentSummary
                orders={orderItems}/>
           </div>
       </div>
    )

}

export default ListItemShippmentCart