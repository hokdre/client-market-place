import React, {useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

import { Row, Col } from '../../layout/row';
import { 
    InputText,
    Form,
    InputTextArea
} from '../../components/UI_components/form';
import { ButtonTextBlackMedium, ButtonBlackMedium, ButtonGroupsBetween } from '../../components/UI_components/button';
import { H3 } from '../../components/UI_components/heading';
import { AlertSuccess } from '../../components/UI_components/alert';


import ErrorPage from '../error/error_page';
import Loading from '../../components/UI_components/loading';

import InputTags from '../../components/style_components/input_tags';
import InputSizes from '../../components/style_components/input_sizes';
import InputColors from '../../components/style_components/input_colors';

import { useReponse } from '../customs_hooks/useResponse';
import { URL_ADD_PRODUCT } from '../../api/api';
import { addMerchantProduct, selectMerchantEtalase } from '../merchant/merchant_slice';
import InputCategories from '../../components/style_components/input_categories';
import ListEtalase from '../etalase/list_etalase';

const FormAddProduct = () => {
    let dispatch = useDispatch()
    let etalase = useSelector(selectMerchantEtalase)

    let { 
        httpCode, 
        errors, 
        loading,
        success,
        setError,
        setSuccess,
        setLoading,
        setIdle
    } = useReponse()

    let formRef = useRef()
    let nameInput = useRef()
    let weightInput = useRef()
    let widthInput = useRef()
    let heightInput = useRef()
    let longInput = useRef()
    let descriptionInput = useRef()
    let priceInput = useRef()
    let stockInput = useRef()
    let [category, setCategory] = useState("")
    let [selectedEtalase, setSelectedEtalase] = useState("")
    let [tags, setTags] = useState([])
    let [sizes, setSizes] = useState([])
    let [colors, setColors] = useState([])


    const submit = async (e) => {
        console.log({
            name : nameInput.current.value,
            weight : Number(weightInput.current.value),
            width : Number(widthInput.current.value),
            height : Number(heightInput.current.value),
            long : Number(longInput.current.value),
            description : descriptionInput.current.value,
            price : Number(priceInput.current.value),
            stock : Number(stockInput.current.value),
            etalase : selectedEtalase,
            tags : tags,
            category :  {
                top : category.split(">").length !== 0 ? category.split(">")[0] : "",
                second_sub : category.split(">").length !== 0 ? category.split(">")[1] : "",
                third_sub : category.split(">").length !== 0 ? category.split(">")[2] : ""
            },
            colors : colors,
            sizes : sizes
        })
        e.preventDefault()
        setLoading()
        try {
            let response = await Axios.post(URL_ADD_PRODUCT(), {
                name : nameInput.current.value,
                weight : Number(weightInput.current.value),
                width : Number(widthInput.current.value),
                height : Number(heightInput.current.value),
                long : Number(longInput.current.value),
                description : descriptionInput.current.value,
                price : Number(priceInput.current.value),
                stock : Number(stockInput.current.value),
                etalase : selectedEtalase,
                tags : tags,
                category :  {
                    top : category.split(">").length !== 0 ? category.split(">")[0] : "",
                    second_sub : category.split(">").length !== 0 ? category.split(">")[1] : "",
                    third_sub : category.split(">").length !== 0 ? category.split(">")[2] : ""
                },
                colors : colors,
                sizes : sizes
            },{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            dispatch(
                addMerchantProduct({
                    etalase : selectedEtalase, 
                    product : response.data.data})
            )
            setSuccess()
            reset()
            setTimeout(() => setIdle(), 3000)
        }catch(error){
            console.log(error)
            setError(error)
        }
       
    }

    const reset = (e) => {
        if (e) e.preventDefault()
        if(formRef) formRef.current.reset()
        setTags([])
        setColors([])
        setSizes([])
    } 

    return (
        <>
        {
            (httpCode && httpCode != 400) ? (
                <ErrorPage httpCode={httpCode}/>
            ) : ""
        }
        {
            loading && (<Loading/>)
        }

        {
            <AlertSuccess show={success} >Product Success Created</AlertSuccess>
        }      

        <Form ref={formRef} className="form-admin">
            <H3 className="form-admin__title">Basic Info</H3>
            <Row>
                <Col>
                    <InputText 
                        ref={nameInput}
                        name="name"
                        label="Name :"
                        placeholder="name"
                        error={errors["Name"]}/>
                </Col>
                <Col>
                    <InputText 
                        ref={priceInput}
                        name="price"
                        label="Price :"
                        placeholder="Rp 10.000"
                        error={errors["Price"]}/>
                </Col>
                <Col>
                    <InputText 
                        ref={stockInput}
                        name="stock"
                        label="Stock :"
                        placeholder="0"
                        error={errors["Stock"]}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputTextArea
                        ref={descriptionInput}
                        name="description"
                        label="Description :"
                        placeholder="description"
                        error={errors["Description"]}/>
                </Col>
            </Row>
            <H3 className="form-admin__title">Etalase</H3>
            <Row>
                <Col>
                  <ListEtalase
                    etalase={etalase}
                    selectedEtalase={selectedEtalase}
                    changeEtalase={setSelectedEtalase}/>
                </Col>
            </Row>
            <H3 className="form-admin__title">Category</H3>
            <Row>
                <Col>
                    <InputCategories
                        category={category} 
                        setCategory={setCategory}/>
                </Col>
            </Row>
            <H3 className="form-admin__title">Keywords</H3>
            <Row>
                <Col>
                    <InputTags 
                        error={errors["Tags"]}
                        tags={tags} 
                        setTag={setTags}
                        placeholder="keyword product.."/>
                </Col>
            </Row>
            <H3 className="form-admin__title">Colors</H3>
            <Row>
                <Col>
                    <InputColors 
                        error={errors["Colors"]}
                        colors={colors} 
                        setColors={setColors}/>
                </Col>
            </Row>
            <H3 className="form-admin__title">Sizes</H3>
            <Row>
                <Col>
                    <InputSizes 
                        error={errors["Sizes"]}
                        sizes={sizes}
                        setSizes={setSizes}/>
                </Col>
            </Row>
            <H3 className="form-admin__title">Dimention</H3>
            <Row>
                <Col>
                    <InputText 
                        ref={weightInput}
                        name="weight"
                        label="weight :"
                        placeholder="100ons"
                        error={errors["Weight"]}/>
                </Col>
                <Col>
                    <InputText 
                        ref={widthInput}
                        name="width"
                        label="Width :"
                        placeholder="10 cm"
                        error={errors["Width"]}/>
                </Col>
                <Col>
                    <InputText 
                        ref={heightInput}
                        name="height"
                        label="Height :"
                        placeholder="10 cm"
                        error={errors["Height"]}/>
                </Col>
                <Col>
                    <InputText 
                        ref={longInput}
                        name="long"
                        label="Long :"
                        placeholder="10 cm"
                        error={errors["Long"]}/>
                </Col>
            </Row>
            <ButtonGroupsBetween className="margin-vertical-medium">
                <ButtonTextBlackMedium event={reset}>Clear All</ButtonTextBlackMedium>
                <ButtonBlackMedium event={submit}>SUBMIT</ButtonBlackMedium>
            </ButtonGroupsBetween>
        </Form>
        </>
    )
} 

export default FormAddProduct;