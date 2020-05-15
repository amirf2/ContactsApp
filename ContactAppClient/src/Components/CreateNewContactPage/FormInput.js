import React from 'react';
import {connect} from 'react-redux';


function FormInput(props){
    const {labelName, value , disabled} = props;
    const id = labelName.toLowerCase();

    return (
        <div className="new-contact-input">
            <label htmlFor={id}>{labelName}</label>
            <input type="text" id={id} name={id} defaultValue={value} disabled={disabled}/>
        </div>
    )

}

const mapStateToProps = state => {
	return {contactData: state.contactData};
}

export default connect(mapStateToProps, null)(FormInput);