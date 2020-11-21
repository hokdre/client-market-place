import { configureStore } from '@reduxjs/toolkit'

import loginReducer from '../features/login/login_slice';
import adminReducer from '../features/admin/admin_slice';
import customerReducer from '../features/customer/customer_slice';
import merchantReducer from '../features/merchant/merchant_slice';
import productReducer from '../features/product/product_slice';
import cartReducer from '../features/cart/cart_slice';
import orderReducer from '../features/order/order_slice';
import transactionReducer from '../features/transaction_buyer/transaction_slice';

export default configureStore({
    reducer : {
        login : loginReducer,
        admin : adminReducer,
        customer : customerReducer,
        merchant : merchantReducer,
        product : productReducer,
        cart : cartReducer,
        order : orderReducer,
        transaction : transactionReducer
    }
})