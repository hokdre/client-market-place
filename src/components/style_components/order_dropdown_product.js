import React, { useState, useRef, useEffect } from 'react'

const OrderDropdownProduct = props => {
    let { products = [] } = props
    let [show, setShow] = useState(false)
    let toogleDropddown = () => setShow(!show)

    let optionBoxRef = useRef()
    useEffect(() => {
        function handleClickOutSide(event){
            if (optionBoxRef.current && !optionBoxRef.current.contains(event.target)) {
               setShow(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () =>  document.removeEventListener("mousedown", handleClickOutSide);

    },[optionBoxRef])

    
    let arrow = show ? "fas fa-angle-up" : "fas fa-angle-down"

    return (
        <div ref={optionBoxRef} className="order-dropdown-product">
            <div
                onClick={toogleDropddown} 
                className="order-dropdown-product__button ">
                <span 
                className="order-dropdown-product__button-text">
                    {products.length} Products
                </span>
                <i className={`order-dropdown-product__button-icon ${arrow}`}></i>
            </div>

            {
                show && (
                <div className="order-dropdown-product__options">
                    <div className="order-dropdown-product__product-row">
                        <span className="
                        order-dropdown-product__product-name 
                        order-dropdown-product__product-name-title
                        ">
                            Product
                        </span>
                        <span className="
                        order-dropdown-product__product-quantity
                        order-dropdown-product__product-quantity-title
                        ">
                            Quantity
                        </span>
                    </div>
                    {products.map(product => (
                        <div 
                        key={product.product_id}
                        className="order-dropdown-product__product-row">
                        <span className="order-dropdown-product__product-name">
                            {product.product_data && product.product_data.name}
                        </span>
                        <span className="order-dropdown-product__product-quantity">
                            {product.quantity}
                        </span>
                    </div>
                    ))}
                </div>
                )
            }
        </div>
    )
}

export default OrderDropdownProduct