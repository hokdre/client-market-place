import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InputFile } from '../../components/UI_components/form';
import { PopUpForm } from '../../components/UI_components/popup';
import { ButtonBlackSmall, ButtonGroupsRight } from '../../components/UI_components/button';
import { useReponse } from '../customs_hooks/useResponse';
import { URL_UPLOAD_BUKTI_TRANSFER } from '../../api/api';
import Axios from 'axios';
import { AlertSuccess } from '../../components/UI_components/alert';
import { updateTransaction } from './transaction_slice';

const DEFAULT_PHOTO = "https://storage.googleapis.com/ecommerce_s2l_assets/default-product.jpg"
const UploadTransfer = props => {
    let { transaction = {} } = props
    let dispatch = useDispatch()

    let fileInputRef = useRef()
    let imgRef = useRef()

    useEffect(() => {
        if(transaction.transfer_photo) {
            if(imgRef.current) {
                imgRef.current.src = transaction.transfer_photo
            }
        }else{
            imgRef.current.src = DEFAULT_PHOTO
        }
    },[transaction])

    let [showForm, setShowForm] = useState(false)
    const openForm = () => {
        setShowForm(true)
        if(transaction.transfer_photo){
            if(imgRef.current) imgRef.current.src = transaction.transfer_photo
        }
    }
    const closeForm = () =>{
        setIdle()
        setShowForm(false)  
        if(fileInputRef.current) fileInputRef.current.value = ""
        if(imgRef.current) imgRef.current.src = DEFAULT_PHOTO
    } 
    
    const setPreview = (img) => {
        let reader = new FileReader()
        reader.onload = function(){
            imgRef.current.src = reader.result
        }
        reader.readAsDataURL(img)
    }
    const handleChange = e => {
        let file = e.target.files[0]
        let allowedExtentions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; 
        if(file){
            let isImage = allowedExtentions.exec(file.name)
            if(!isImage) {
                alert("not image")
                return
            }
            setPreview(file)
        }
    }

    let {
        loading,
        success,
        errors,
        setIdle,
        setLoading,
        setSuccess,
        setError
    } = useReponse()
    const uploadTransfer = async (e) => {
        console.log(`trigger upload bukti transfer :`)
        e.preventDefault()
        setLoading()
        try{
            let data = new FormData()
            data.append("avatar", fileInputRef.current.files[0])

            let response = await Axios.put(URL_UPLOAD_BUKTI_TRANSFER(transaction._id),data,{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
           dispatch(updateTransaction({ transaction : response.data.data}))
            setSuccess()
            setTimeout(() =>{
                closeForm()
                setIdle()
            }, 3000)
        }catch(error){
            setError(error)
        }
    }

    return (
        <>
        <ButtonBlackSmall event={openForm}>Upload Transfer</ButtonBlackSmall>
        <PopUpForm
            id="popup-upload-transfer"
            title="Upload Bukti Transfer"
            show={showForm}
            close={closeForm}>
            <div className="upload-transfer">
                <AlertSuccess show={success}>Bukti Transfer Sukses di Upload</AlertSuccess>
                <div className="upload-transfer__img">
                    <img ref={imgRef} alt="transfer image"/>
                </div>
                <div className="upload-transfer__input">
                    <InputFile
                        onChange={handleChange}
                        ref={fileInputRef}
                        name="Transfer Foto"
                        label="Transfer :"
                        placeholder="transfer photo"
                        error={errors["TransferPhoto"]}/>
                </div>
                <div className="upload-transfer__button">
                    <ButtonBlackSmall event={uploadTransfer}>
                        Upload
                    </ButtonBlackSmall>
                </div>
            </div>
        </PopUpForm>
        </>
    )
}

export default UploadTransfer