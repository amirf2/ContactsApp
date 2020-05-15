import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createNewContact, updateContact, getContact, newContactForm, resetForm} from '../../actions';
import Form from './Form'
import Avatar from './Avatar'
import axios from 'axios';


class CreateNewContactPage extends Component {

    constructor(props){
        super(props);
        this.checkIfEditOrNewContact();
    }

    checkIfEditOrNewContact = () => {
        const {getContact, newContactForm, resetForm} = this.props;
        const id = this.props.match.params.id; 
        if (id){
            resetForm()
            getContact(id);
        } else {
            newContactForm();
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {contactData, updateContact, createNewContact} = this.props;
        const image = this.props.contactData.avatarImage
        const {name, phone, title} = event.target
        let phoneSplitted = phone.value.split(/[ -]/).join("");
		const newContact = {
			name: name.value,
			phone: phoneSplitted,
			title: title.value,
			avatar: image
        }
        const validInput = this.checkIfInputIsValid(newContact);
        if (validInput){
            if (contactData.update){
                updateContact(this.props.contactData.contact.id, newContact, this.props.history);
            } else {
                createNewContact(newContact, this.props.history);
            }
        } else {
            this.invalidInputAlerts(newContact);
        }
        
    }


    checkIfInputIsValid = (newContact) => {
       return ((newContact.name.length>0 && newContact.name.length<=30) && 
              (newContact.phone.length>0 && newContact.phone.length<=15 && newContact.phone.match(/^[0-9- ]+$/)) && 
              (newContact.title.length>0 && newContact.title.length<=10));
    }

    invalidInputAlerts = (newContact) => {
        if (!(newContact.name.length>0 && newContact.name.length<=30)){
            alert("name must be between 0 to 30 characters");
        }
        else if (!(newContact.phone.length>0 && newContact.phone.length<=15)){
            alert("phone number must be between 0 to 15 characters");
        } 
        else if (!newContact.phone.match(/^[0-9- ]+$/)) {
            alert("phone number can only contain numbers and hyphen and cannot be empty");
        }
        else if (!(newContact.title.length>0 && newContact.title.length<=10)){
            alert("title must be between 0 to 10 characters");
        }
    }


    render(){

        const id = this.props.match.params.id; 
        const error = <h3 style={{color: "red"}}> Error: Contact with id {id} doesn't exist!</h3>;
        return (
            <div className="contact-container">
                <div className="new-contact-container">
                    {this.props.contactData.disabled? error : undefined}
                    <Avatar />
                    <Form handleSubmit={this.handleSubmit}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
	return {contactData: state.contactData};
}


export default connect(mapStateToProps, {createNewContact, updateContact, getContact, newContactForm, resetForm})(CreateNewContactPage);
