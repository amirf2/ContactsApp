import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Form from './Form'
import Avatar from './Avatar'
import axios from 'axios';


class CreateNewContactPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            contact: {},
            avatarImage: this.getRandomAvatarImage(),
            update: false,
            disabled: ""
        }
        this.checkIfEditOrNewContact();
    }

    componentDidMount(){
		this.getRandomAvatarImage();
	}

    checkIfEditOrNewContact = () => {
        const id = this.props.match.params.id; 
        if (id){
            this.getContact(id);
        }
    }

    getContact = (id) => {
        fetch(`http://localhost:8000/api/contacts/${id}`, {
            method: 'GET'
            }).then((response) => {
            return response.json();
            }).then((contact) => {
                if (contact.length>0){
                    this.setState({update: true, contact: contact[0], avatarImage: contact[0].avatar});
                } else this.setState({disabled: "true"});
            });
    }

    getRandomAvatarImage = () => {
        const gender = Math.random()<0.5? "men" : "women";
        const imageNumber = Math.floor(Math.random() * 100); 
        return `https://randomuser.me/api/portraits/${gender}/${imageNumber}.jpg`;
    }

    updateAvatarImage = () => {
        this.setState({avatarImage: this.getRandomAvatarImage()})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const image = this.state.avatarImage
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
            if (this.state.update){
                this.updateContact(newContact);
            } else {
                this.createContact(newContact);

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

    updateContact = (newContact) => {
        axios.put(`http://localhost:8000/api/contacts/${this.state.contact.id}`, newContact)
        .then(res => {
            this.props.history.push('/contacts')
        }).catch(err =>{
            console.log(err);
        });
    }


    createContact = (newContact) => {
        axios.post(`http://localhost:8000/api/contacts`, newContact)
        .then(res => {
            this.props.history.push('/contacts')
        }).catch(err =>{
            console.log(err);
        });
    }

    render(){
        const id = this.props.match.params.id; 
        const formData = this.state.update? this.state.contact : []
        const error = <h3 style={{color: "red"}}> Error: Contact with id {id} doesn't exist!</h3>;
        return (
            <div className="contact-container">
                <div className="new-contact-container">
                    {this.state.disabled? error : undefined}
                    <Avatar image={this.state.avatarImage} updateAvatarImage={this.updateAvatarImage} disabled={this.state.disabled} />
                    <Form handleSubmit={this.handleSubmit} formData={formData} disabled={this.state.disabled}/>
                </div>
            </div>
        )
    }
}


export default withRouter(CreateNewContactPage);
