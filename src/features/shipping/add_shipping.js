import React, { useRef } from 'react';
import Axios from 'axios';

import { URL_ADD_MERCHANT_SHIPPING } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';

import { 
    Form, InputSelect,
} from '../../components/UI_components/form';
import { ButtonGroupsBetween, ButtonTextBlackMedium, ButtonBlackMedium } from '../../components/UI_components/button';
import { useDispatch } from 'react-redux';
import { Row, Col } from '../../layout/row';

import Loading from '../../components/UI_components/loading';

import { addMerchantShipping } from '../merchant/merchant_slice';
import AlertError from '../../components/style_components/AlertError';

const  AddShipping = (props)=> {
    const { merchantId } = props

    let dispatch = useDispatch()
    let {
        loading, 
        error_message, 
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse() 


    let formAdd = useRef()
    let shippingInput = useRef()

    const reset = (e) => {
       if(e) e.preventDefault()
       if(formAdd) formAdd.current.reset()
    }

    const submit = async (e) => {
        e.preventDefault()
        setIdle()
        setLoading()
        try{
            let response = await Axios.post(URL_ADD_MERCHANT_SHIPPING(merchantId, shippingInput.current.value),null,{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let responseShippings = response.data.data.shippings
            let newShipping = responseShippings[responseShippings.length-1]
            reset()
            dispatch(addMerchantShipping({ shipping : newShipping }))
            setSuccess()
            setTimeout(() => {
                setIdle() 
            }, 3000)
        }catch(error){
            setError(error)
        }
    }

    return (
        <>
        
        {
            loading && <Loading/>
        }
        <AlertError err_message={error_message}/>
        <Form id={"form-add-shipping"} ref={formAdd} method="POST">
            <Row>
                <Col>
                    <InputSelect
                        options={[
                            {name : "Pos Indonesia", value : "pos"},
                            {name : "JNE", value : "jne"},
                            {name : "TIKI", value : "tiki"}
                        ]}
                        label="Shipping :"
                        ref={shippingInput}
                        name="Shipping :"
                        error={errors["Shippings"]}/>
                </Col>
            </Row>
            <ButtonGroupsBetween>
                <ButtonTextBlackMedium id={"btn-reset-shipping"} event={reset} >RESET</ButtonTextBlackMedium>
                <ButtonBlackMedium id={"btn-submit-shipping"} event={submit}>
                    SUBMIT
                </ButtonBlackMedium>
            </ButtonGroupsBetween>
        </Form>
        </>
    )
}

export default AddShipping;