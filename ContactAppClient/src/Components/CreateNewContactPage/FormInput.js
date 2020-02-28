import React from 'react';

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


export default FormInput;
