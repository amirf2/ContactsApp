import React, {Component} from 'react';
import { connect } from 'react-redux' 
import { createContact, getContactsFromDB } from '../../actions'
import SearchBar from './SearchBar'
import ContactInfo from './ContactInfo'
import NewContact from './NewContact'
import axios from 'axios';


class ContactsHomePage extends Component {

	constructor(props){
		super(props);
		this.state = {
			searchBox: ""
		}
	}

	componentDidMount(){
		//console.log("componentDidMount");
		this.props.getContactsFromDB()
	}

	
	handleSearchBarUpdate = (newSearchBoxValue) =>{
		this.setState({searchBox: newSearchBoxValue.toLowerCase()});
	}
	  
	filterContacts = (contact) => {
		return contact.name.toLowerCase().startsWith(this.state.searchBox) ||
			contact.name.toLowerCase().includes(` ${this.state.searchBox}`)||
			contact.phone.startsWith(this.state.searchBox)
	}

	render(){
		const contacts = this.props.contacts.filter(this.filterContacts).map(contact => {
			return <ContactInfo 
					  key={contact.id}
					  id={contact.id}
					  name={contact.name} 
					  phone={contact.phone}
					  avatar={contact.avatar}
					/>
		});

		return (
				<div className="contact-container">
					<SearchBar handleSearchBarUpdate={this.handleSearchBarUpdate}/>
					<div className="contacts-container">
						{contacts}
					</div>
					<NewContact/>
				</div>
		);
	}
}


const mapStateToProps = state => {
	return {contacts: state.contacts};
}

export default connect(mapStateToProps,
	{ createContact, getContactsFromDB }
	)(ContactsHomePage);
