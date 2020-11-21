import React, { useRef, useState, useEffect } from 'react';
import { useReponse } from '../customs_hooks/useResponse';
import Axios from 'axios';


import { AlertSuccess } from '../../components/UI_components/alert';
import Loading from '../../components/UI_components/loading';
import ErrorPage from '../error/error_page';

import { PopUpForm } from '../../components/UI_components/popup';
import { useDispatch } from 'react-redux';
import { ButtonGroupsRight, ButtonBlackMedium } from '../../components/UI_components/button';

import FormPhotos from '../../components/style_components/form_photos';
import ListPhotos from '../../components/style_components/list_photos';

import { URL_UPLOAD_PRODUCT_PHOTOS } from '../../api/api';
import { setPhotos } from '../../features/product/product_slice';
import { updateMerchantProduct } from '../../features/merchant/merchant_slice'

const  DEFAULT_PHOTOS = "https://storage.googleapis.com/ecommerce_s2l_assets/default-product.jpg"

const UpdateProductPhotos = props => {
    let { product } = props

    let dispatch = useDispatch()
    let [current, setCurrent] = useState(0);
    let [files, setFiles] = useState([])
   

    let form = useRef()
    let inputButton = useRef()
    let photo1 = useRef()
    let photo2 = useRef()
    let photo3 = useRef()
    let photo4 = useRef()
    let photo5 = useRef()
    const setDefaultPhoto = () => {
        if(photo1.current) photo1.current.src = DEFAULT_PHOTOS

        if(photo2.current) photo2.current.src = DEFAULT_PHOTOS

        if(photo3.current) photo3.current.src = DEFAULT_PHOTOS

        if(photo4.current) photo4.current.src = DEFAULT_PHOTOS

        if(photo5.current) photo5.current.src = DEFAULT_PHOTOS
    }
    useEffect(() => {
        setDefaultPhoto()
        return () => setDefaultPhoto()
    },[])

    const setPreview = (img) => {
        let reader = new FileReader()
        reader.onload = function(){
            if(current === 0) {
                photo1.current.src = reader.result
            }else if(current === 1) {
                photo2.current.src = reader.result
            }else if(current === 2) {
                photo3.current.src = reader.result
            }else if(current === 3) {
                photo4.current.src = reader.result
            }else {
                photo5.current.src = reader.result
            }
            
        }
        reader.readAsDataURL(img)
    }

    const handleChange = e => {
        let file = e.target.files[e.target.files.length-1]
        if(file) setPreview(file)
        
        let fileIndex = [...files]
        if(fileIndex[current]) {
            fileIndex[current] = {
                "fileName" : e.target.files[e.target.files.length-1].name,
                "file" : file
            }
        }else{
            fileIndex.push({
                "fileName" : e.target.files[e.target.files.length-1].name,
                "file" : file
            }) 
        }
        setFiles(fileIndex)
        let maxIndex = 4
        let nextIndex = fileIndex.length === maxIndex ? maxIndex : fileIndex.length
         
        setCurrent(nextIndex)
    }

    const [showForm, setShowForm] = useState(false)
    const closeForm = () => {
        reset()
        setShowForm(false)
    }
    const openForm = () => {
        setShowForm(true)
    }

    let {
        loading, 
        success, 
        httpCode, 
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse()

    const reset = (e) => {
        if(e) e.preventDefault()
        if(form) form.current.reset()
        setDefaultPhoto()
        inputButton.current.value = ""
        setCurrent(0)
        setFiles([])
    }
     
    const handleUpdate = async (e) => {
        if(e) e.preventDefault()
        setLoading()

        let formData = new FormData()
        files.forEach(file => {
            formData.append("photos", file.file)
        })

        try{
            let response = await Axios.put(URL_UPLOAD_PRODUCT_PHOTOS(product._id),formData,{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let updatedProduct = response.data.data
            dispatch(setPhotos({ photos : updatedProduct.photos }))
            dispatch(updateMerchantProduct({ product : updatedProduct}))
            setSuccess()
            setTimeout(() =>{
                setIdle() 
                closeForm() 
            }, 3000)
        }catch(error){
            setError(error)
        }
    }

    
    return (
        <>
        <ListPhotos 
            photos={product.photos}/>
        <ButtonGroupsRight className="margin-top-medium">
            <ButtonBlackMedium event={openForm}>Update</ButtonBlackMedium>
        </ButtonGroupsRight>
        <PopUpForm 
            id="popup-update-product-photos"
            show={showForm}
            title="Update Product Photos"
            close={closeForm}
            >
            { loading && <Loading/> }
            { (httpCode && httpCode != 400) ? <ErrorPage httpCode={httpCode} /> : "" }
            { success && <AlertSuccess>Product Photos Success Updated!</AlertSuccess>}
            <FormPhotos
                ref={[
                    form,
                    inputButton,
                    photo1,
                    photo2,
                    photo3,
                    photo4,
                    photo5
                ]}
                action={handleUpdate}
                onChange={handleChange}
                current={current}
                files={files}
                setCurrent={setCurrent}
                errors={errors}/>
        </PopUpForm>
        </>
    )
}

export default UpdateProductPhotos;