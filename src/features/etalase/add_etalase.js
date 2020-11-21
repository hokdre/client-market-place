import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { URL_ADD_MERCHANT_ETALASE } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';


import { Row, Col } from '../../layout/row';
import { InputText, Form } from '../../components/UI_components/form';
import Loading from '../../components/UI_components/loading';
import { AlertSuccess } from '../../components/UI_components/alert';
import { ButtonGroupsRight, ButtonOutlineBlackMedium, ButtonBlackMedium } from '../../components/UI_components/button';
import { addMerchantEtalase } from '../merchant/merchant_slice';
import AlertError from '../../components/style_components/AlertError';

const AddEtalase = (props) => {
    let dispatch = useDispatch()

    let { attachCancel, attachSubmit, merchantId } = props

    let formAdd = useRef()
    let nameInput = useRef()

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


    const submit = async (e) => {
        e.preventDefault()
        setIdle()
        setLoading()
        let data = {
           name : nameInput.current.value
        }

        try {
            let response = await Axios.post(URL_ADD_MERCHANT_ETALASE(merchantId), data,
            {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let lastestEtalase = response.data.data.etalase
            let addedEtalase = lastestEtalase[lastestEtalase.length-1]
            dispatch(addMerchantEtalase({etalase : addedEtalase}))
            reset()
            setSuccess()
            setTimeout(() => {
                setIdle()
            }, 3000)
        }catch(error){
            setError(error)
        }
    }

    const cancel = (e) => {
        setIdle()
        if(e) e.preventDefault()
        if(attachCancel) attachCancel()
        reset(e)
    }

    const reset = (e) => {
        if (e) e.preventDefault()
        if(formAdd) formAdd.current.reset()
    } 

    return (
       <div className="add-etalase">

            
            {
                loading && (<Loading/>)
            }
            <AlertError err_message={error_message}/>
            <AlertSuccess show={success} >
                Etalase sucess added!
            </AlertSuccess>

            <Form 
                ref={formAdd} 
                id={"form-add-etalase"} 
                method="POST">
                <Row>
                    <Col>
                        <InputText 
                            ref={nameInput}
                            name="name"
                            label="Etalase Name :"
                            placeholder="etalase name"
                            error={errors["Etalase"]}/>
                    </Col>
                </Row>
                <ButtonGroupsRight className="margin-vertical-small">
                    <ButtonOutlineBlackMedium 
                        event={cancel}
                        id={"btn-cancel-add-etalase"}
                        className="margin-right-small">
                        CANCEL
                    </ButtonOutlineBlackMedium>
                    <ButtonBlackMedium
                    id={"btn-add-etalase"}
                        event={submit} className="margin-right-small">
                        SUBMIT
                    </ButtonBlackMedium>
                </ButtonGroupsRight>
            </Form>
       </div>
    )
}

export default AddEtalase