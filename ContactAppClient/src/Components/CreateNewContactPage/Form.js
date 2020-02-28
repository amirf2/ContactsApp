import React from 'react';
import {Link} from 'react-router-dom';
import FormInput from './FormInput';

function Form(props){
    const {handleSubmit, formData, disabled} = props;
    const {name, phone, title} = formData;
    return (
        <form onSubmit={handleSubmit}>
            <div className="new-contact-inputs">
                <FormInput labelName={"Name"} value={name} disabled={disabled}/>
                <FormInput labelName={"Phone"} value={phone} disabled={disabled}/>
                <FormInput labelName={"Title"} value={title} disabled={disabled}/>
            </div>
            <div className="new-contact-buttons">
                <button type="submit" className="button-ok" disabled={disabled}>Save</button>
                <Link to="/contacts">
                    <button className="button-cancel">Cancel</button>
                </Link>
            </div>
        </form>
    )
}

export default Form;

