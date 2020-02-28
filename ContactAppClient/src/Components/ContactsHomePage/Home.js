import React, {Component} from 'react';
import SearchBar from './SearchBar'
import ContactInfo from './ContactInfo'
import NewContact from './NewContact'
import axios from 'axios';


class ContactsHomePage extends Component {

	constructor(props){
		super(props);
		this.state = {
			contacts: [],
			searchBox: ""
		}
	}


	componentDidMount(){
		this.getContactsFromServer();
	}


	getContactsFromServer = () => {
		fetch('http://localhost:8000/api/contacts', {
			method: 'GET'
		  }).then((response) => {
			return response.json();
		  }).then((contacts) => {
			this.setState({contacts: contacts});
		  });
	}


	createRandomContact = () => {
		fetch('https://randomuser.me/api/', {
			method: 'GET'
		  }).then((response) => {
			return response.json();
		  }).then((contact) => {
			this.parseRandomContact(contact);
		});
	}


	parseRandomContact = (contact) => {
		const {name, picture, cell} = contact.results[0];
		const {first, last, title} = name;
		const fullName = `${first} ${last}`;
		const newContact = {
			name: fullName,
			phone: cell.split(/[ ()-]/).join(""),
			title: title,
			avatar: picture.large
		}
		const validInput = newContact.name.length<=30 && newContact.phone.length<=15 && newContact.title.length<=10 && newContact.avatar.length<=50;
		if (validInput){
			this.createContact(newContact);
		}
	}
	  
	
	handleSearchBarUpdate = (newSearchBoxValue) =>{
		this.setState({searchBox: newSearchBoxValue.toLowerCase()});
	}
	  

	createContact = (newContact) => {
		axios.post(`http://localhost:8000/api/contacts`, newContact)
		.then(res => {
			this.setState((prevState) => {
				return {contacts: [...prevState.contacts,res.data]}
			});
		}).catch(err =>{
			console.log(err);
		})
	}

	deleteContact = (id) => {
		axios.delete(`http://localhost:8000/api/contacts/${id}`)
      	.then(res => {
			this.setState((prevState) => {
				return {contacts: prevState.contacts.filter(contact => contact.id !== parseInt(id))}
			});	
		}).catch(err =>{
			console.log(err);
		})
	}


	render(){
		const filteredContacts = this.state.contacts.filter(
			contact => {
				return contact.name.toLowerCase().startsWith(this.state.searchBox) ||
					   contact.name.toLowerCase().includes(` ${this.state.searchBox}`)||
					   contact.phone.startsWith(this.state.searchBox)
			}
		)	

		const contacts = filteredContacts.map(contact => {
			return <ContactInfo 
					  key={contact.id}
					  id={contact.id}
					  name={contact.name} 
					  phone={contact.phone}
					  avatar={contact.avatar}
					  deleteContact={this.deleteContact}  
					/>
		});

		return (
				<div className="contact-container">
					<SearchBar handleSearchBarUpdate={this.handleSearchBarUpdate}/>
					<div className="contacts-container">
						{contacts}
					</div>
					<NewContact createRandomContact={this.createRandomContact}/>
				</div>
		);
	}
}

export default ContactsHomePage;
