import React from 'react';
import { Form, InputFile } from '../UI_components/form';
import { ButtonGroupsRight, ButtonBlackMedium } from '../UI_components/button';
import Section from '../UI_components/section';

const FormPhotos = React.forwardRef((props, refs) => {
    let { onChange, errors, action, files, current, setCurrent } = props

    return (
    <Section>
        <Form ref={refs[0]} className="form-photos" method="POST">
            <div className="form-photos__previews">
                <div onClick={()=> setCurrent(0)} className="form-photos__preview">
                    <img ref={refs[2]} alt="dashboard-picture"/>
                </div>
                <div onClick={()=> setCurrent(1)} className="form-photos__preview">
                    <img ref={refs[3]} alt="dashboard-picture"/>
                </div>
                <div onClick={()=> setCurrent(2)} className="form-photos__preview">
                    <img ref={refs[4]} alt="dashboard-picture"/>
                </div>
                <div onClick={()=> setCurrent(3)} className="form-photos__preview">
                    <img ref={refs[5]} alt="dashboard-picture"/>
                </div>
                <div onClick={()=> setCurrent(4)} className="form-photos__preview">
                    <img ref={refs[6]} alt="dashboard-picture"/>
                </div>
            </div>
            <div className="form-photos__input">
                <span>{files[current] ? files[current].fileName : "select a file.."}</span>
                <InputFile 
                    onChange={onChange}
                    ref={refs[1]}
                    name="photos"
                    label="Photos :"
                    placeholder="photos"
                    error={errors["Photos"]}
                    multiple={true}/>
            </div>

            <ButtonGroupsRight>
                <ButtonBlackMedium event={action} >Update</ButtonBlackMedium>
            </ButtonGroupsRight>
        </Form>
    </Section>
    )
})

export default FormPhotos