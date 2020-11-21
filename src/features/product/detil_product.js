import React, { useEffect, useState, useRef } from 'react';
import { useReponse } from '../customs_hooks/useResponse';
import Axios from 'axios';
import { URL_GET_PRODUCT_BYID, URL_ADD_PRODUCT_TO_CART } from '../../api/api';
import { Row, Col } from '../../layout/row';
import { H3 } from '../../components/UI_components/heading';
import { ButtonBlackSmall, ButtonGroupsRight, ButtonOutlineBlackMedium, ButtonBlackMedium } from '../../components/UI_components/button';
import { useDispatch } from 'react-redux';
import { addItem } from '../cart/cart_slice';
import Quantity from '../../components/style_components/input_quantity';
import Note from '../../components/style_components/input_note';
import MerchantProfile from '../../components/style_components/merchant_profile';
import { PopUpEmpty } from '../../components/UI_components/popup';
import MessageSuccess from '../../components/style_components/message-success';
import Stars from '../../components/style_components/stars';
import { useHistory } from 'react-router-dom';

const DetilProduct = props => {
    let history = useHistory()
    let { productId } = props
    let dispatch = useDispatch()
    let [product, setProduct ] = useState({})
    let [displayImg, setDisplayImg] = useState("")
    let [quantity, setQuantity] = useState(1)
    let [colors, setColors] = useState([])
    let [dicColors, setDicColors] = useState({})
    let [sizes, setSizes] = useState([])
    let [dicSizes, setDicSizes] = useState({})
    let [note, setNote] = useState("")
    let [showNote, setShowNote] = useState(false)

    let {
        loading,
        success,
        errors,
        error_message,
        setLoading,
        setSuccess,
        setError,
        setIdle,
    } = useReponse()

    useEffect(() => {
        console.log(`[FEATURE] DETIL-PRODUCT : receiving product id : ${productId}`)
        fetchProductById(productId)
    },[productId])

    let addColor = color => {
        let newColors = [...colors]
        newColors.push(color)
        setColors(newColors)

        let newDicColors = { ... dicColors }
        newDicColors[color] = true
        setDicColors(newDicColors)
    }
    let removeColor = val => {
        let index = -1
        colors.forEach((color, i)=> {
            if(color === val) index = i
        })
        if(index != -1) {
            let newColors = [...colors]
            newColors.splice(index, 1)
            setColors(newColors)

            let newDicColors = { ... dicColors }
            delete newDicColors[val]
            setDicColors(newDicColors)
        }
    }

    let addSize = size => {
        let newSizes = [...sizes]
        newSizes.push(size)
        setSizes(newSizes)

        let newDicSizes = { ... dicSizes }
        newDicSizes[size] = true
        setDicSizes(newDicSizes)
    }
    let removeSize = val => {
        let index = -1
        sizes.forEach((size, i)=> {
            if(size === val) index = i
        })

        if(index != -1) {
            let newSizes = [...sizes]
            newSizes.splice(index, 1)
            setSizes(newSizes)

            let newDicSizes = { ... dicSizes }
            delete newDicSizes[val]
            setDicSizes(newDicSizes)
        }
    }

    let addNote = (note) => {
        setNote(note)
        closeNote()
    }

    let openNote = () => {
        setShowNote(true)
    }
    let closeNote = () => {
        setShowNote(false)
    }

    let fetchProductById = async (productId) => {
        if (productId) {
            try {
                console.log(`fetching product by id : ${productId}`)
                setLoading()
                let response = await Axios.get(URL_GET_PRODUCT_BYID(productId))
                console.log(`return response :`)
                console.log(response.data.data)
                if(response.data.data) {
                    setProduct(response.data.data)
                    setDisplayImg(response.data.data.photos[0])
                }else{
                    setProduct({})
                    setDisplayImg("")
                }
                setSuccess()
            }catch(error){
                console.log(`returned error :`)
                console.log(error)
                setError(error)
            }

        }
    }

    let [showSuccess, setShowSuccess] = useState(false)
    const openSuccess = () => setShowSuccess(true)
    const closeSuccess = () =>  setShowSuccess(false)
    let addToCart = async () => {
        let token = localStorage.getItem("token")
        if(!token) {
            history.push(`/login`)
            return
        }
        
        console.log(`adding product to cart : payload`)
        let data = {
            product_id : productId,
            quantity : quantity,
            note : note,
            colors : colors,
            sizes : sizes
        }
        
        try {
            setLoading()
            let cartId = localStorage.getItem("cartID")
            let response = await Axios.post(URL_ADD_PRODUCT_TO_CART(cartId),data, {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            console.log(`returned response :`)
            console.log(response.data.data)
            
            let newCarts = response.data.data
            let lastAddedItems = newCarts.items[newCarts.items.length-1]
            dispatch(addItem({ item : lastAddedItems}))
            setSuccess()
            openSuccess()
        }catch(error){
            console.log(`returned error :`)
            console.log(error)
            setError(error)
        }
    }

    let buyProduct = async () => {

    }

    return (
        <div className="detil-product">
           <Row>
               <Col>
                    <div className="detil-product__display">
                        <img src={displayImg} />
                    </div>
                    <ul className="detil-product__images">
                        {
                            product.photos && product.photos.map(photo =>(
                                <li 
                                    key={photo} className="detil-product__image">
                                    <img 
                                        onClick={() => setDisplayImg(photo)}
                                        className={ photo === displayImg ? "detil-product__img detil-product__img--selected" : "detil-product__img" } 
                                        src={photo}/>
                                </li>
                            ))
                        }
                    </ul>
               </Col>
               <Col>
                    <ul className="detil-product__informations">
                        <li className="detil-product__information">
                            <div>
                                <H3 className="detil-product__name">    {product.name && product.name}
                                </H3>
                                <p>
                                    <Stars rating={product.rating}/>
                                    <span>{`  (${product.num_review})  `}</span>
                                </p> 
                            </div>
                        </li>
                        <li className="detil-product__information">
                            <div className="detil-product__title-col">
                                <p className="detil-product__title">
                                 Harga   
                                </p>
                            </div>
                            <div className="detil-product__description-col">
                                <H3 className="detil-product__price">
                                    Rp. {product.price && product.price}
                                </H3>
                            </div>
                        </li>
                        <li className="detil-product__information">
                            <div className="detil-product__title-col">
                                <p className="detil-product__title">
                                 Jumlah   
                                </p>
                            </div>
                            <div className="detil-product__description-col">
                               <Quantity 
                                    value={quantity}
                                    change={setQuantity}/>
                                <ButtonBlackSmall className="margin-top-small" event={openNote}>
                                    Tulis catatan untuk penjual
                                </ButtonBlackSmall>
                            </div>
                        </li>
                        <li className="detil-product__information">
                            <div className="detil-product__title-col">
                                <p className="detil-product__title">
                                 INFO PRODUK   
                                </p>
                            </div>
                            <div    className="detil-product__description-col">
                                <ul className="detil-product__demensions">
                                    <li className="detil-product__demension">
                                        <p className="detil-product__demension-title">Berat</p>
                                        <p
                                            className="detil-product__demension-value">
                                            {product.weight && product.weight}
                                        </p>
                                    </li>
                                    <li className="detil-product__demension">
                                        <p className="detil-product__demension-title">Panjang</p>
                                        <p
                                            className="detil-product__demension-value">
                                            {product.weight && product.weight}
                                        </p>
                                    </li>
                                    <li className="detil-product__demension">
                                        <p className="detil-product__demension-title">Lebar</p>
                                        <p className="detil-product__demension-value">{product.width && product.width}</p>
                                    </li>
                                    <li className="detil-product__demension">
                                        <p className="detil-product__demension-title">Tinggi</p>
                                        <p className="detil-product__demension-value">{product.height && product.height}</p>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="detil-product__information">
                            <div className="detil-product__title-col">
                                <p className="detil-product__title">
                                 Etalase  
                                </p>
                            </div>
                            <div    className="detil-product__description-col">
                                <p className="detil-product__etalase">
                                    {product.etalase && product.etalase}
                                </p>
                            </div>
                        </li>
                        {
                             product.sizes && (
                                <li 
                                className="detil-product__information">
                                    <div className="detil-product__title-col">
                                        <p className="detil-product__title">
                                        Sizes   
                                        </p>
                                    </div>
                                    <div className="detil-product__description-col">
                                        <ul className="detil-product__options">
                                            {
                                            product.sizes.map(size => (
                                                <li 
                                                key={size}
                                                className={dicSizes[size] ? "detil-product__option detil-product__option--selected":
                                                "detil-product__option"}
                                                onClick={
                                                    !dicSizes[size]? 
                                                    ()=> addSize(size) :
                                                    () => removeSize(size) 
                                                }
                                                >
                                                    {size}
                                                </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </li>
                             )
                        }
                        {
                             product.colors && (
                                <li className="detil-product__information">
                                    <div className="detil-product__title-col">
                                        <p className="detil-product__title">
                                        Warna   
                                        </p>
                                    </div>
                                    <div className="detil-product__description-col">
                                        <ul className="detil-product__options">
                                            {
                                            product.colors.map(color => (
                                                <li 
                                                key={color}
                                                className={dicColors[color] ? "detil-product__option detil-product__option--selected":
                                                "detil-product__option"}
                                                onClick={
                                                    !dicColors[color]? 
                                                    ()=> addColor(color) :
                                                    () => removeColor(color) 
                                                }
                                                >
                                                    {color}
                                                </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </li>
                             )
                        }
                        <li className="detil-product__information">
                            <div className="detil-product__title-col">
                                <p className="detil-product__title">
                                 Merchant  
                                </p>
                            </div>
                            <div className="detil-product__description-col">
                                <MerchantProfile merchant={product.merchant} />
                            </div>
                        </li>
                    </ul>
               </Col>
           </Row>
           <ButtonGroupsRight>
               <ButtonBlackMedium 
                    event={addToCart}
                    className="margin-right-small">
                   <i className="fas fa-shopping-cart margin-right-small"></i>
                   keranjang
                </ButtonBlackMedium>
           </ButtonGroupsRight>
           <Note
            show={showNote}
            close={closeNote}
            value={note}
            change={addNote}/>
            <PopUpEmpty
                style={{width : "30%"}}
                close={() => {
                    closeSuccess() 
                    setIdle() 
                }}
                show={showSuccess || error_message === "ENTITY VALIDATION"}>
                { error_message === "" && (
                    <MessageSuccess
                        title="Produk Berhasil Ditambahkan ke cart!"
                        message="Lihat produk di keranjang"
                        button_message="Lihat cart"
                        redirect_link="/carts"
                        />
                )}
                {
                    error_message === "ENTITY VALIDATION" && (
                        <p>Tidak dapat membeli produk diri sendiri!</p>
                    )
                }
            </PopUpEmpty>
        </div>
    )
}

export default DetilProduct