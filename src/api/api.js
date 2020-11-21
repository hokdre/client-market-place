const domain = "http://34.101.166.221:80"

export const URL_LOGIN_CUSTOMER = () => `${domain}/login-customers`
export const URL_LOGIN_ADMIN = () => `${domain}/login-admins`

/**
 * CUSTOMER API
*/
export const URL_GET_CUSTOMERS = (params) => {
    if(params){
        return `${domain}/customers${params}`
    }
    return `${domain}/customers`
}
export const URL_REGISTER_CUSTOMER = () => `${domain}/customers`
export const URL_GET_CUSTOMER_BYID = (id) => `${domain}/customers/${id}`
export const URL_UPDATE_CUSTOMER_BASIC_INFO = (id) => `${domain}/customers/${id}`
export const URL_UPDATE_CUSTOMER_AVATAR = (id) => `${domain}/customers/${id}/photo-profile`
export const URL_UPDATE_CUSTOMER_PASSWORD = (id) => `${domain}/customers/${id}/password`
export const URL_DELETE_CUSTOMER_ADDRESS = (id, addressID) => `${domain}/customers/${id}/addresses/${addressID}`
export const URL_ADD_CUSTOMER_ADDRESS = (id) => `${domain}/customers/${id}/addresses`
export const URL_UPDATE_CUSTOMER_ADDRESS = (id, addressID) => `${domain}/customers/${id}/addresses/${addressID}`
export const URL_ADD_CUSTOMER_BANK_ACCOUNT = (id) => `${domain}/customers/${id}/bank-accounts`
export const URL_UPDATE_CUSTOMER_BANK_ACCOUNT = (id, bankId) => `${domain}/customers/${id}/bank-accounts/${bankId}`

/**
 * MERCHANT API 
*/
export const URL_GET_MERCHANTS = (params) => {
    if(params){
        return `${domain}/merchants${params}`
    }
    return `${domain}/merchants`
}
export const URL_REGISTER_MERCHANT = () => `${domain}/merchants`
export const URL_GET_MERCHANT_BYID = (id) => `${domain}/merchants/${id}`
export const URL_UPDATE_MERCHANT_BASIC_INFO = (id) => `${domain}/merchants/${id}`
export const URL_UPDATE_MERCHANT_AVATAR = (id) => `${domain}/merchants/${id}/photo-profile`
export const URL_ADD_MERCHANT_SHIPPING = (id, shippingId) => `${domain}/merchants/${id}/shippings/${shippingId}`
export const URL_DELETE_MERCHANT_SHIPPING = (id, shippingId) => `${domain}/merchants/${id}/shippings/${shippingId}`
export const URL_DELETE_MERCHANT_ADDRESS = (id, addressID) => `${domain}/merchants/${id}/addresses/${addressID}`
export const URL_ADD_MERCHANT_ADDRESS = (id) => `${domain}/merchants/${id}/addresses`
export const URL_UPDATE_MERCHANT_ADDRESS = (id, addressID) => `${domain}/merchants/${id}/addresses/${addressID}`
export const URL_ADD_MERCHANT_BANK_ACCOUNT = (id) => `${domain}/merchants/${id}/bank-accounts`
export const URL_UPDATE_MERCHANT_BANK_ACCOUNT = (id, bankId) => `${domain}/merchants/${id}/bank-accounts/${bankId}`
export const URL_ADD_MERCHANT_ETALASE = (id) => `${domain}/merchants/${id}/etalase`
export const URL_DELETE_MERCHANT_ETALASE = (id, name) => `${domain}/merchants/${id}/etalase/${name}`
export const URL_GET_MERCHANT_PRODUCT = (id, params) => `${domain}/merchants/${id}/products${params}`

/**
 * ADMIN API
*/
export const URL_GET_ADMINS = (params) => {
    if(params){
        return `${domain}/admins${params}`
    }
    return `${domain}/admins`
}
export const URL_REGISTER_ADMIN = () => `${domain}/admins`
export const URL_GET_ADMIN_BYID = (id) => `${domain}/admins/${id}`
export const URL_UPDATE_ADMIN_BASIC_INFO = (id) => `${domain}/admins/${id}`
export const URL_UPDATE_ADMIN_AVATAR = (id) => `${domain}/admins/${id}/photo-profile`
export const URL_ADD_ADMIN_ADDRESS = (id) => `${domain}/admins/${id}/addresses`
export const URL_UPDATE_ADMIN_ADDRESS = (id, addId) => `${domain}/admins/${id}/addresses/${addId}`
export const URL_DELETE_ADMIN_ADDRESS = (id, addId) => `${domain}/admins/${id}/addresses/${addId}`
export const URL_UPDATE_ADMIN_PASSWORD = (id) => `${domain}/admins/${id}/password`


/**
 * PRODUCT API
*/
export const URL_UPLOAD_PRODUCT_PHOTOS = (id) => `${domain}/products/${id}/photos`
export const URL_GET_PRODUCTS = (params) => `${domain}/products${params}`
export const URL_GET_PRODUCT_TERLARIS = () => `${domain}/products/terlaris`
export const URL_ADD_PRODUCT = () => `${domain}/products` 
export const URL_GET_PRODUCT_BYID = (id) => `${domain}/products/${id}`
export const URL_UPDATE_PRODUCT = (id) => `${domain}/products/${id}`
export const URL_DELETE_PRODUCT = (id) => `${domain}/products/${id}`
/**
 * SEARCH API
*/
export const URL_SEARCH_SEGGUSTION = (params) => `${domain}/suggestion${params}`
export const URL_SEARCH_PRODUCT = (params) => `${domain}/search/products${params}`

/**
 * CITY API
 */
export const URL_SEARCH_CITY = (params) => `${domain}/cities${params}`

/** 
 * ONGKIR API
*/
export const URL_GET_ONGKIR = (params) => `${domain}/ongkirs${params}`

/**
 * CART API
 */
export const URL_GET_CART_BY_ID = cartId => `${domain}/carts/${cartId}`
export const URL_ADD_PRODUCT_TO_CART = cartId => `${domain}/carts/${cartId}/items`
export const URL_CLEAR_CART = cartId => `${domain}/carts/${cartId}/items`
export const URL_UPDATE_ITEM_CART = (cartId, productId) => `${domain}/carts/${cartId}/items/${productId}`
export const URL_DELETE_ITEM_CART = (cartId, productId) => `${domain}/carts/${cartId}/items/${productId}`

/*
* ORDER API
*/
export const URL_ADD_ORDER = () => `${domain}/orders`
export const URL_GET_ORDER_BY_ID = (orderId) => `${domain}/orders/${orderId}`
export const URL_GET_ORDER_CUSTOMER = (customerId, params) => `${domain}/orders-customer/${customerId}${params}`
export const URL_GET_ORDER_MERCHANT = (merchantId, params) => `${domain}/orders-merchant/${merchantId}${params}`
export const URL_REJECT_ORDER = (orderId) => `${domain}/orders/${orderId}/reject-order`
export const URL_ADD_RESI_ORDER = (orderId) => `${domain}/orders/${orderId}/resi-number`
export const URL_AJUKAN_ORDER_SAMPAI = (orderId) => `${domain}/orders/${orderId}/ajukan-sampai`
export const URL_FINISH_ORDER = (orderId) => `${domain}/orders/${orderId}/finish-order`
export const URL_GET_ESTIMASI_PENDAPATAN_ORDER = (params) => `${domain}/orders/estimasi-pendapatan${params}` 
export const URL_GET_REPORT_ORDER = (params) => `${domain}/orders/summary${params}`

/**
 * Transaction Buyer API
*/
export const URL_GET_TRANSACTION = (params) => `${domain}/transactions-buyers${params}`
export const URL_UPLOAD_BUKTI_TRANSFER = (tID) =>  `${domain}/transactions-buyers/${tID}/transfer-photo`
export const URL_ACCEPT_TRANSACTION = (tID) => `${domain}/transactions-buyers/${tID}/accept-transaction`
export const URL_REJECT_TRANSACTION = (tID) => `${domain}/transactions-buyers/${tID}/reject-transaction`

/**
 * Review Merchant API
*/

export const URL_ADD_REVIEW_MERCHANTS = () => `${domain}/reviews-merchants`
export const URL_FETCH_REVIEW_MERCHANTS = (params) => `${domain}/reviews-merchants${params}`

/**
 * Review Product API 
*/
export const URL_ADD_REVIEW_PRODUCTS = () => `${domain}/reviews-products`
export const URL_FETCH_REVIEW_PRODUCTS = (params) => `${domain}/reviews-products${params}`
