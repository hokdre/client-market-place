import React from 'react';
import { Form, InputFile } from '../UI_components/form';
import { ButtonGroupsRight, ButtonBlackMedium } from '../UI_components/button';

const FormAvatar = React.forwardRef((props, refs) => {
    let { onChange, errors, action} = props
    return (
    <Form ref={refs[0]} className="form-avatar" method="POST">
        <div className="form-avatar__content">
            <div className="form-avatar__image-row">
                <img ref={refs[1]} src="" className="form-avatar__preview"/>
            </div>
            <div className="form-avatar__input-row">
                <InputFile 
                    onChange={onChange}
                    ref={refs[2]}
                    name="avatar"
                    label="Avatar :"
                    placeholder="avatar"
                    error={errors["Avatar"]}/>
            </div>
        </div>
        <ButtonGroupsRight>
            <ButtonBlackMedium event={action} >Update</ButtonBlackMedium>
        </ButtonGroupsRight>
    </Form>
    )
})

export default FormAvatar