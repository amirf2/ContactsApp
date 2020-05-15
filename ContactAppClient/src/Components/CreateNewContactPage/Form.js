import React from 'react';
import {Link} from 'react-router-dom';
import FormInput from './FormInput';
import {connect} from 'react-redux';

function Form(props){

    const {handleSubmit, contactData} = props;
    const {disabled} = contactData;
    const {name, phone, title} = contactData.contact;

    return (
        <form onSubmit={handleSubmit}>
            <div className="new-contact-inputs">
                <FormInput labelName={"Name"}  value={name}  disabled={disabled}/>
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



const mapStateToProps = state => {
	return {contactData: state.contactData};
}

export default connect(mapStateToProps, null)(Form);