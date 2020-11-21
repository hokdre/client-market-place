import React, { useRef, useState, useEffect } from 'react';
import { URL_UPDATE_CUSTOMER_AVATAR } from '../../api/api';
import Axios from 'axios';

import { updateCustomerAvatar } from './customer_slice';

import { AlertSuccess } from '../../components/UI_components/alert';
import Loading from '../../components/UI_components/loading';
import { useReponse } from '../customs_hooks/useResponse';
import { PopUpForm } from '../../components/UI_components/popup';
import Avatar from '../../components/style_components/avatar';
import FormAvatar from '../../components/style_components/form_avatar';
import { useDispatch } from 'react-redux';
import AlertError from '../../components/style_components/AlertError';

const UpdateAvatarCustomer = props => {
    let { customerId, avatar } = props

    let dispatch = useDispatch()
    let form = useRef()
    let avatarInput = useRef()
    let imgInput = useRef()

    useEffect(() => {
        if(imgInput.current) imgInput.current.src = avatar
    },[avatar])

    let {
        loading, 
        success, 
        error_message, 
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse()

    const [showForm, setShowForm] = useState(false)
    const closeForm = (event, newAvatar) => {
        setIdle()
        if(newAvatar){
            if(imgInput.current) imgInput.current.src = newAvatar
        }else {
            if(imgInput.current) imgInput.current.src = avatar
        }
        setShowForm(false)
    }
    const openForm = () => {
        setShowForm(true)
    }

    const reset = (e) => {
        if(e) e.preventDefault()
        if(form) form.current.reset()
        // if(imgInput.current) imgInput.current.src = avatar
    }
     
    const handleUpdate = async (e) => {
        e.preventDefault()
        let file = avatarInput.current.files[0]
        if(!file) {
            setSuccess()
            setTimeout(() =>{
                closeForm()
                setIdle()
            }, 3000)
            return
        }
        setLoading()
        try{
            let data = new FormData()
            data.append("avatar", file)

            let response = await Axios.put(URL_UPDATE_CUSTOMER_AVATAR(customerId),data,{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            dispatch(updateCustomerAvatar({avatar : response.data.data.avatar}))
            reset()
            setSuccess()
            setTimeout(() =>{
                closeForm(null,response.data.data.avatar)
                setIdle()
            }, 3000)
        }catch(error){
            setError(error)
        }
    }
    const setPreview = (img) => {
        let reader = new FileReader()
        reader.onload = function(){
            imgInput.current.src = reader.result
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
    
    return (
        <>
        <Avatar src={avatar} onClick={openForm}/>
        <PopUpForm
            id="popup-update-avatar"
            show={showForm}
            close={closeForm}
            title="Avatar"
            >
            {
                loading && <Loading/>
            }
            <AlertError err_message={error_message}/>
            <AlertSuccess show={success}>Avatar is success updated</AlertSuccess>
            <FormAvatar 
                ref={[form,imgInput,avatarInput]}
                errors={errors}
                onChange={handleChange} 
                action={handleUpdate}/>
        </PopUpForm>
        </>
    )
}

export default UpdateAvatarCustomer;